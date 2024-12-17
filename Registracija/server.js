const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3001',  
  credentials: true,               
}));


const { Schema } = mongoose;
const korisnikShema = new Schema({
  username: String,
  email: { type: String, unique: true },
  role: { type: String, default: "user" },
  password: String,
});

const Korisnik = mongoose.model("Korisnik", korisnikShema, "korisnici");

mongoose.connect("mongodb://127.0.0.1:27017/registracijaBaza");

const db = mongoose.connection;

db.on("error", (error) => {
  console.error("Greška pri spajanju:", error);
});
db.once("open", function () {
  console.log("Spojeni smo na MongoDB bazu");
});

app.get("/", (req, res) => {
  res.send("Pozdrav od Express poslužitelja!");
});

const saltRunde = 10;

app.post('/registracija', async (req, res) => {
  try {
    const hashLozinka = await bcrypt.hash(req.body.password, saltRunde);
    const noviKorisnik = new Korisnik({ ...req.body, password: hashLozinka });
    await noviKorisnik.save();
    res.status(201).send('Korisnik uspješno registriran');
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.post("/prijava", async (req, res) => {
    try {
      const korisnikBaza = await Korisnik.findOne({ email: req.body.email });
      if (korisnikBaza && await bcrypt.compare(req.body.password, korisnikBaza.password)) {
        const token = jwt.sign(
          { idKorisnika: korisnikBaza.username, uloga: korisnikBaza.role },
          "tajniKljuc",
          { expiresIn: "1h" }
        );
        
        res.cookie('accessToken', token, {
          httpOnly: true,  
          secure: false,   
          maxAge: 3600000, 
        });
  
        res.json({ message: 'Prijava uspješna!', role: korisnikBaza.role });
      } else {
        res.status(401).send("Neispravni podaci za prijavu");
      }
    } catch (error) {
      res.status(500).send(error.message);
    }
  });
  
  
const provjeriToken = (req, res, next) => {
    const token = req.cookies['accessToken']; 
    if (!token) {
      return res.status(403).send('Token nije pronađen'); 
    }
  
    try {
      const dekodiraniToken = jwt.verify(token, 'tajniKljuc'); 
      req.korisnik = dekodiraniToken;  
      next(); 
    } catch (err) {
      return res.status(401).send('Neispravan token'); 
    }
  };
  
app.get('/zasticena-ruta', provjeriToken, (req, res) => {
    res.json({ message: 'Uspješan pristup', role: req.korisnik.uloga });
  });
  
  

const provjeriUlogu = (uloga) => (req, res, next) => {
  if (!req.korisnik) {
    return res.status(403).send('Nema korisničkih podataka u zahtjevu');
  }
  if (req.korisnik.uloga === uloga) {
    return next();
  } else {
    return res.status(403).send(`Zabranjen pristup - vaša uloga je ${req.korisnik.uloga}`);
  }
};

app.get('/samo-admin', provjeriToken, provjeriUlogu('admin'), (req, res) => {
  res.send('Ovo je podatak samo za admina');
});

  app.get('/admin-podaci', provjeriToken, provjeriUlogu('admin'), (req, res) => {
    res.send('Podaci samo za admina');
  });
  
  app.get('/korisnik-podaci', provjeriToken, (req, res) => {
    res.send('Podaci za sve korisnike');
  });

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server sluša zahtjeve na portu ${PORT}`);
});

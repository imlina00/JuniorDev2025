const express = require("express");
const app = express();
const mongoose = require('mongoose');
const db = mongoose.connection;

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Pozdrav od Express poslužitelja!");
   });

mongoose.connect('mongodb://127.0.0.1:27017/blog', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

// Upravljanje događajima
db.on('error', (error) => {
 console.error('Greška pri spajanju:', error);
});
db.once('open', function() {
 console.log('Spojeni smo na MongoDB bazu');
});


/* const { Schema } = mongoose;
const korisnikShema = new Schema{}
 */

const korisnikSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true, match: /\S+@\S+\.\S+/ },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  });
  
  const objavaSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'Korisnik', required: true },
    tags: [String],
    createdAt: { type: Date, default: Date.now },
  });
  
  const Korisnik = mongoose.model('Korisnik', korisnikSchema);
  const Objava = mongoose.model('Objava', objavaSchema);


  app.post('/korisnici', async (req, res) => {
    try {
      const { username, email, password } = req.body;
      const noviKorisnik = new Korisnik({ username, email, password });
/*       const noviKorisnik = new Korisnik({
            username: "darija",
            email: "darija@fesb.hr",
            password: 12345678
        }); */
      await noviKorisnik.save();
      res.status(201).json(noviKorisnik);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }); 

  app.get('/korisnici', async (req, res) => {
    try {
    const sviKorisnici = await Korisnik.find();
    res.json(sviKorisnici);
    } catch (error) {
    res.status(500).send(error.message);
    }
   });

  app.get('/korisnici/:id', async (req, res) => {
    const idKor = req.params.id //
    try {
      const korisnik = await Korisnik.findById(req.params.id);
      if (!korisnik) return res.status(404).json({ error: 'Korisnik nije pronađen' });
      res.json(korisnik);
    } catch (error) {
      res.status(400).json({ error: '' });
    }
  });

  app.delete('/korisnici/:id', async (req, res) => {
    try {
      const id = req.params.id;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Netočan ID' });
      }
      const korisnik = await Korisnik.findByIdAndDelete(id);
      if (!korisnik) {
        return res.status(404).json({ error: 'Korisnik nije pronađen' });
      }
      await Objava.deleteMany({ author: korisnik._id });
      res.json({ message: 'Korisnik i njegove objave su obrisani' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
   
  app.post('/objave', async (req, res) => {
    try {
      const { title, content, author, tags } = req.body;
      const korisnik = await Korisnik.findById(author);
      if (!korisnik) return res.status(404).json({ error: 'Autor nije pronađen' });
      const novaObjava = new Objava({ title, content, author, tags });
      await novaObjava.save();
      res.status(201).json(novaObjava);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

/*   {
    "title": "Komentar 1",
    "content": "Ovo je prva objava",
    "author": "675593c79d7e06d762b0a5ad",
    "tags": "ljeto"
  }  */

app.get('/objave', async (req, res) => {
    try {
      const { author, tag, search } = req.query;
      const filter = {};
      if (author) filter.author = author;
      if (tag) filter.tags = tag;

      // pretraživanje postova prema ključnim riječima u naslovu ili sadržaju (npr. GET /objave?search=keyword)
      if (search) {
        filter.$or = [
          { title: { $regex: search, $options: 'i' } },  // i - neosjetljivo na velika i mala slova
          { content: { $regex: search, $options: 'i' } }
        ];
      }

      const objave = await Objava.find(filter).populate('author', 'username email').sort({ createdAt: -1 });; //sortiranje po vremenu
      res.json(objave);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  
  app.get('/objave/:id', async (req, res) => {
    try {
      const objava = await Objava.findById(req.params.id).populate('author', 'username email');
      if (!objava) return res.status(404).json({ error: 'Objava nije pronađena' });
      res.json(objava);
    } catch (error) {
      res.status(400).json({ error: 'Netočan ID' });
    }
  });
  
  app.put('/objave/:id', async (req, res) => {
    try {
      const { title, content } = req.body;
      const uredeniPost = await Objava.findByIdAndUpdate(
        req.params.id,
        { title, content },
        { new: true, runValidators: true }
      );
      if (!uredeniPost) return res.status(404).json({ error: 'Objava ne postoji' });
      res.json(uredeniPost);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  
  app.delete('/objave/:id', async (req, res) => {
    try {
      const objava = await Objava.findByIdAndDelete(req.params.id);
      if (!objava) return res.status(404).json({ error: 'Objava nije pronađena' });
      res.json({ message: 'Objava izbrisana' });
    } catch (error) {
      res.status(400).json({ error: 'Netočan ID' });
    }
  });

  //prikaz broja postova po autoru 
  app.get('/korisnici/:id/objave/broj', async (req, res) => {
    try {
        const korisnikId = req.params.id;
        const broj = await Objava.countDocuments({ author: korisnikId });
        res.json({ broj });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

   const PORT = 3000;
app.listen(PORT, () => {
 console.log(`Server sluša zahtjeve na portu ${PORT}`);
});



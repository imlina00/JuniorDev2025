const express = require("express");
const app = express();
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("Pozdrav od Express poslužitelja!");
   });

let knjige = [
    { 
        id: 1, 
        naslov: "Be Useful: Seven Tools for Life", 
        autor: "Arnold Schwarzenegger", 
        isbn: "531642506", 
        godinaIzdavanja: 2023, 
        cijena: 18.90
    },
    { 
        id: 2, 
        naslov: "Pismo mlađem sebi", 
        autor: "Jane Graham", 
        isbn: "624575810", 
        godinaIzdavanja: 2020, 
        cijena: 17.90
    }
];

// GET : Dohvatite sve knjige iz inventara knjižare.
app.get('/knjige', (req, res) => {
    res.json(knjige);
});

// POST : Dodajte novu knjigu u inventar knjižare.
app.post('/knjige', (req, res) => {
    const { naslov, autor, isbn, godinaIzdavanja, cijena } = req.body;
    // Dodatan zadatak: provjera valjanosti za parametre ruta i tijela zahtjeva
    if (!naslov || !autor || !isbn || !godinaIzdavanja || !cijena) {
        return res.status(400).json({ error: 'Sva polja su obvezna!' });
    }

    const novaKnjiga = {
        id: knjige.length + 1,
        naslov,
        autor,
        isbn,
        godinaIzdavanja,
        cijena
    };

    knjige.push(novaKnjiga);
    res.status(201).json(novaKnjiga); // Dodatan zadatak: provjera valjanosti za parametre ruta i tijela zahtjeva
});

// GET : Dohvatite određenu knjigu prema njenom ID-u.
app.get('/knjige/:id', (req, res) => {
    const knjiga = knjige.find(k => k.id == req.params.id);
    // Dodatan zadatak: provjera valjanosti za parametre ruta i tijela zahtjeva
    if (!knjiga) {
        return res.status(404).json({ error: 'Knjiga nije pronađena.' });
    }

    res.json(knjiga);
});

// PUT : Ažurirajte postojeću knjigu prema njenom ID-u.
app.put('/knjige/:id', (req, res) => {
    const knjiga = knjige.find(k => k.id == req.params.id);

    if (!knjiga) {
        return res.status(404).json({ error: 'Knjiga nije pronađena.' });
    }

    const { naslov, autor, isbn, godinaIzdavanja, cijena } = req.body;

    if (!naslov || !autor || !isbn || !godinaIzdavanja || !cijena) {
        return res.status(400).json({ error: 'Sva polja su obvezna!' });
    }

    knjiga.naslov = naslov;
    knjiga.autor = autor;
    knjiga.isbn = isbn;
    knjiga.godinaIzdavanja = godinaIzdavanja;
    knjiga.cijena = cijena;

    res.json(knjiga);
});


// PATCH : Ažurirajte određene podatke o knjizi prema njenom ID-u.
app.patch('/knjige/:id', (req, res) => {
    const knjiga = knjige.find(k => k.id == req.params.id);

    if (!knjiga) {
        return res.status(404).json({ error: 'Knjiga nije pronađena.' });
    }

    const { naslov, autor, isbn, godinaIzdavanja, cijena } = req.body;

    if (naslov) knjiga.naslov = naslov;
    if (autor) knjiga.autor = autor;
    if (isbn) knjiga.isbn = isbn;
    if (godinaIzdavanja) knjiga.godinaIzdavanja = godinaIzdavanja;
    if (cijena) knjiga.cijena = cijena;

    res.json(knjiga);
});

// DELETE : Obrišite knjigu iz knjižare prema njenom ID-u.
app.delete('/knjige/:id', (req, res) => {
    const index = knjige.findIndex(k => k.id == req.params.id);

    if (index === -1) {
        return res.status(404).json({ error: 'Knjiga nije pronađena.' });
    }

    knjige.splice(index, 1);
    res.json({ message: `Knjiga s ID-om ${req.params.id} je obrisana.` });
});


const PORT = 3000;
   app.listen(PORT, () => {
    console.log(`Server sluša zahtjeve na portu ${PORT}`);
});
   
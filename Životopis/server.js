const express = require("express");
const cors = require("cors")
const app = express();
app.use(cors())
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Pozdrav od Express poslužitelja!");
   });

/* app.get("/api/name", (req, res) => { //vracanje imena
    res.json({ name: "Yvonne" });
});

app.get("/api/city", (req, res) => {
    res.json({ city: "Pariz" });
});

app.get("/api/job", (req, res) => {
    res.json({ job: "Programerka" });
});

app.get("/api/color", (req, res) => {
    res.json({ color: "Roza" });
});
   
app.get("/api/skills", (req, res) => {
    const skills = [
        { id: 1, skill: "Superkoncentracija", percentage: 74 },
        { id: 2, skill: "Otpornost na stres", percentage: 58 },
        { id: 3, skill: "Moć motivacije", percentage: 99 }
    ];
    res.json(skills);
}); // prva 2 zadatka */

app.get("/api/profile", (req, res) => {
    const profile = {
        name: "Yvonne",
        dateOfBirth: "31.02.1999.",
        address: "Rue du Soleil 12, Pariz, Francuska",
        city: "Pariz",
        job: "Programerka",
        color: "Roza",
        contact: "",
        skills: [
            { id: 1, skill: "Superkoncentracija", percentage: 74 },
            { id: 2, skill: "Otpornost na stres", percentage: 58 },
            { id: 3, skill: "Moć motivacije", percentage: 99 }
        ]
    };
    res.json(profile);
});

app.get("/api/contact", (req, res) => {
    const generateRandomContact = () => {
        const prefix = "+33";
        const randomNumber = Math.floor(100000000 + Math.random() * 900000000);
        return `${prefix} ${randomNumber}`;
    };

    res.json({ contact: generateRandomContact() });
});

   const PORT = 3000;
app.listen(PORT, () => {
 console.log(`Server sluša zahtjeve na portu ${PORT}`);
});

app.use(express.json());

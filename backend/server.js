const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express()
app.use(cors())
app.use(express.json())

function sendServerError(res, err) {
  console.error(err)
  return res.status(500).json({ message: err?.message ?? String(err) })
}


const PORT = 8081;
app.listen(PORT, () => {
  console.log(`Serwer działa na porcie ${PORT}`);
});

app.get('/users', (req, res)=>{
    const sql = "SELECT id_uzytkownika, imie, nazwisko, email, haslo FROM uzytkownicy";
    db.query(sql, (err, data)=>{
        if(err) return sendServerError(res, err);
        return res.json(data);
    })
})

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'szafa'
})

app.get('/', (req, res)=> {
    return res.json("Backend dziala")
})

app.get('/users', (req, res)=>{
    const sql = "SELECT id_uzytkownika, imie, nazwisko FROM uzytkownicy";
    db.query(sql, (err, data)=>{
        if(err) return res.json(err);
        return res.json(data);
    })
})

app.get('/tshirts', (req,res) => {
    const sql= "SELECT nazwa, opis AS id, zdjecie FROM bluzka";
    db.query(sql,(err, data)=>{
        if(err) return res.json(err);
        return res.json(data);
    })
})
app.get('/shoes', (req,res) => {
    const sql= "SELECT nazwa AS id, opis, zdjecie FROM buty";
    db.query(sql,(err, data)=>{
        if(err) return res.json(err);
        return res.json(data);
    })
})
app.get('/bottoms', (req,res) => {
    const sql= "SELECT nazwa AS id, opis, zdjecie FROM spodnie";
    db.query(sql,(err, data)=>{
        if(err) return res.json(err);
        return res.json(data);
    })
})
app.get('/tops', (req,res) => {
    const sql= "SELECT nazwa AS id, opis, zdjecie FROM top";
    db.query(sql,(err, data)=>{
        if(err) return res.json(err);
        return res.json(data);
    })
})

app.get('/others', (req,res) => {
    const sql= "SELECT nazwa AS id, opis, zdjecie FROM akcesoria";
    db.query(sql,(err, data)=>{
        if(err) return res.json(err);
        return res.json(data);
    })
})

app.get('/bags', (req,res) => {
    const sql= "SELECT nazwa AS id, opis, zdjecie FROM torebka";
    db.query(sql,(err, data)=>{
        if(err) return res.json(err);
        return res.json(data);
    })
})


app.get('/wardrobe', (req, res) => {
    const queries = [
        { table: 'bluzka', category: 'T-Shirts' },
        { table: 'top', category: 'Tops' },
        { table: 'spodnie', category: 'Bottoms' },
        { table: 'buty', category: 'Shoes' },
        { table: 'akcesoria', category: 'Others' },
        { table: 'torebka', category: 'Bags' }
    ];
    const results = [];
    let completed = 0;
    queries.forEach(({ table, category }) => {
        const sql = `SELECT nazwa, opis, zdjecie FROM ${table}`;
        db.query(sql, (err, data) => {
            if (err) {
                console.error(`Błąd zapytania dla tabeli ${table}:`, err);
                return res.status(500).json({ error: err });
            }
            const mapped = data.map(item => ({
                category,
                nazwa: item.nazwa,
                opis: item.opis,
                zdjecie: item.zdjecie
            }));
            results.push(...mapped);
            completed++;
            if (completed === queries.length) {
                console.log('laczenie')
                res.json(results);
            }
        });
    });
 });



 app.get("/create", (req, res) => {
    const queries = [
      { table: "bluzka", category: "T-Shirts" },
      { table: "top", category: "Tops" },
      { table: "spodnie", category: "Bottoms" },
      { table: "buty", category: "Shoes" },
      { table: "akcesoria", category: "Others" },
      { table: "torebka", category: "Bags" },
    ];
  
    const results = [];
    let completed = 0;
  
    queries.forEach(({ table, category }) => {
      const sql = `SELECT id_${table}, nazwa, opis, zdjecie FROM ${table} ORDER BY RAND() LIMIT 1`;
      db.query(sql, (err, data) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: err });
        }
        if (data.length > 0) {
          results.push({
            category,
            id: data[0][`id_${table}`],
            nazwa: data[0].nazwa,
            opis: data[0].opis,
            zdjecie: data[0].zdjecie,
          });
        }
        completed++;
        if (completed === queries.length) res.json(results);
      });
    });
  });

  app.post("/saved", (req, res) => {
    const {name, id_spodnie, id_buty, id_bluzka, id_top, id_akcesoria, id_torebka, id_uzytkownika} = req.body;
    console.log("Body przy POST /saved:", req.body);
    const sql = "INSERT INTO saved (nazwa, id_spodnie, id_buty, id_bluzka, id_top, id_akcesoria, id_torebka, id_uzytkownika) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    db.query(
      sql,
      [name, id_spodnie, id_buty, id_bluzka, id_top, id_akcesoria, id_torebka, id_uzytkownika],
      (err) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Outfit zapisany!" });
      }
    );
  });
  

  app.get("/saved/:userId", (req, res) => {
    const userId = req.params.userId;
    const sql = `SELECT 
                    saved.id_outfit, 
                    saved.nazwa AS outfit_name, 
                    top.zdjecie AS top_zdjecie, 
                    bluzka.zdjecie AS bluzka_zdjecie, 
                    spodnie.zdjecie AS spodnie_zdjecie,
                    buty.zdjecie AS buty_zdjecie, 
                    akcesoria.zdjecie AS akcesoria_zdjecie, 
                    torebka.zdjecie AS torebka_zdjecie
                FROM saved 
                JOIN akcesoria ON saved.id_akcesoria = akcesoria.id_akcesoria
                JOIN bluzka ON saved.id_bluzka = bluzka.id_bluzka
                JOIN buty ON saved.id_buty = buty.id_buty
                JOIN spodnie ON saved.id_spodnie = spodnie.id_spodnie
                JOIN top ON saved.id_top = top.id_top
                JOIN torebka ON saved.id_torebka = torebka.id_torebka
                WHERE saved.id_uzytkownika = ?;`;

    db.query(sql, [userId], (err, results) => {
    if (err) {
      console.error("Błąd zapytania SQL:", err);
      return res.status(500).json({ error: "Błąd serwera" });
    }
    res.json(results);
  });
});

  app.delete("/delete/:id", (req, res) => {
    const { id } = req.params;
    const deleteOutfit = "DELETE FROM saved WHERE id_outfit = ?";
      db.query(deleteOutfit, [id], (err2) => {
        if (err2) return res.status(500).json(err2);
        res.json({ message: "Outfit usunięty!" });
      });
  });
  
  app.put("/update_name/:id", (req, res) => {
    const { id } = req.params;
    const { newName } = req.body;
    const sql = "UPDATE saved SET nazwa = ? WHERE id_outfit = ?";
    db.query(sql, [newName, id], (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Nazwa outfitu zaktualizowana" });
    });
  });

app.get("/user/:userId", (req, res) => {
  const userId = req.params.userId;
  const sql = `
      SELECT id_uzytkownika, imie, nazwisko, email, nazwa_uzytkownika, logo
      FROM uzytkownicy
      WHERE id_uzytkownika = ?`;

  db.query(sql, [userId], (err, data) => {
      if (err) {
        console.error("Blad zapytania  SQL: ", err)
        return res.status(500).json(err);}
      if (data.length === 0) return res.status(404).json({ message: "Użytkownik nie istnieje" });

      res.json(data[0]);
  });
});

app.post("/user/update/:userId", (req, res) => {
  const userId = req.params.userId;
  const { imie, nazwisko, email, nazwa_uzytkownika, logo } = req.body;

  const sql = `
    UPDATE uzytkownicy
    SET imie=?, nazwisko=?, email=?, nazwa_uzytkownika=?, logo=?
    WHERE id_uzytkownika=?
  `;

  db.query(sql, [imie, nazwisko, email, nazwa_uzytkownika, logo, userId], (err) => {
    if (err) {
      console.error("Błąd aktualizacji:", err);
      return res.status(500).json(err);
    }
    res.json({ message: "Dane zaktualizowane pomyślnie" });
  });
});



app.post("/login", (req, res) => {
  const { email, password } = req.body;

  const sql = `
      SELECT id_uzytkownika, email, haslo, imie, nazwisko, nazwa_uzytkownika 
      FROM uzytkownicy 
      WHERE email = ?`;

  db.query(sql, [email], (err, data) => {
      if (err) return res.status(500).json(err);

      if (data.length === 0) {
          return res.status(401).json({ message: "Nieprawidłowy email" });
      }

      const user = data[0];

      if (user.haslo !== password) {
          return res.status(401).json({ message: "Błędne hasło" });
      }

      res.json({
          message: "Zalogowano",
          user
      });
  });
});

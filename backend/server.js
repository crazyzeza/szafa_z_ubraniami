const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express()
app.use(cors())
app.use(express.json())

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
    const sql = "INSERT INTO saved (nazwa, id_spodnie, id_buty, id_bluzka, id_top, id_akcesoria, id_torebka, id_uzytkownika) VALUES (?, ?, ?, ?, ?, ?, ?, 1)";
    db.query(
      sql,
      [name, id_spodnie, id_buty, id_bluzka, id_top, id_akcesoria, id_torebka, id_uzytkownika],
      (err) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Outfit zapisany!" });
      }
    );
  });
  

  app.get("/saved", (req, res) => {
    const sql = `SELECT id_outfit, saved.nazwa AS outfit_name, top.zdjecie, bluzka.zdjecie, spodnie.zdjecie,buty.zdjecie,  akcesoria.zdjecie, torebka.zdjecie
                FROM saved 
                JOIN akcesoria ON saved.id_akcesoria = akcesoria.id_akcesoria
                JOIN bluzka ON saved.id_bluzka = bluzka.id_bluzka
                JOIN buty ON saved.id_buty = buty.id_buty
                JOIN spodnie ON saved.id_spodnie = spodnie.id_spodnie
                JOIN top ON saved.id_top =top.id_top
                JOIN torebka ON saved.id_torebka = torebka.id_torebka;`;
    db.query(sql, (err, data) => {
      if (err) return res.status(500).json(err);
  
      const grouped = {};
      data.forEach((row) => {
        if (!grouped[row.id_outfit]) {
          grouped[row.id_outfit] = {
            id: row.id_outfit,
            name: row.outfit_name,
            items: [],
          };
        }
        grouped[row.id_outfit].items.push({
          category: row.category,
          nazwa: row.nazwa,
          opis: row.opis,
          zdjecie: row.zdjecie,
        });
      });
      res.json(Object.values(grouped));
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


app.listen(8081, () =>{
    console.log("dziala")
})
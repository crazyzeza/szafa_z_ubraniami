const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express()
app.use(cors())

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
    const sql= "SELECT nazwa, opis, zdjecie FROM bluzka";
    db.query(sql,(err, data)=>{
        if(err) return res.json(err);
        return res.json(data);
    })
})
app.get('/shoes', (req,res) => {
    const sql= "SELECT nazwa, opis, zdjecie FROM buty";
    db.query(sql,(err, data)=>{
        if(err) return res.json(err);
        return res.json(data);
    })
})
app.get('/bottoms', (req,res) => {
    const sql= "SELECT nazwa, opis, zdjecie FROM spodnie";
    db.query(sql,(err, data)=>{
        if(err) return res.json(err);
        return res.json(data);
    })
})
app.get('/tops', (req,res) => {
    const sql= "SELECT nazwa, opis, zdjecie FROM top";
    db.query(sql,(err, data)=>{
        if(err) return res.json(err);
        return res.json(data);
    })
})
/*SELECT akcesoria.nazwa, akcesoria.opis, akcesoria.zdjecie 
FROM szafa 
JOIN akcesoria ON akcesoria.id_akcesoria = szafa.id_akcesoria;*/

app.get('/others', (req,res) => {
    const sql= "SELECT nazwa, opis, zdjecie FROM akcesoria";
    db.query(sql,(err, data)=>{
        if(err) return res.json(err);
        return res.json(data);
    })
})

app.listen(8081, () =>{
    console.log("dziala")
})
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logoMartini from "./assets/logoMartini.png";
import "./Wardrobe.css";
import createIkona from "./assets/CreateIkona.png";
import clothesIkona from "./assets/UbraniaIkona.png";
import accountIkona from "./assets/UserLogo.png";
import forumIkona from "./assets/ForumIkona.png";
import savedIkona from "./assets/savedIkona.png";


export default function Wardrobe() {
 const [clothes, setClothes] = useState([]);
 const [selectedItem, setSelectedItem] = useState(null);
 const [activeCategory, setActiveCategory] = useState("All");


 useEffect(() => {
   fetch("http://localhost:8081/wardrobe")
     .then((res) => res.json())
     .then((data) => {
       console.log("Dane z backendu:", data);
       setClothes(data);
     })
     .catch((err) => console.error("Błąd pobierania danych:", err));
 }, []);
 const categories = ["All", "T-Shirts", "Tops", "Bottoms", "Shoes", "Others"];
 const filteredClothes =
   activeCategory === "All"
     ? clothes
     : clothes.filter((item) => item.category === activeCategory);
 return (
<div>
     {/* Pasek menu */}
      <header className="navbar">
      <div className="nav-left">
      <Link to="/wardrobe">
      <img src={clothesIkona} alt="Ikona clothes" className="clothes" />
      </Link>
      <Link to="/create">
      <img src={createIkona} alt="Ikona create" className="create" />
      </Link>
      <Link to="/saved">
      <img src={savedIkona} alt="Ikona saved" className="saved" />
      </Link>
      </div>
      <div className="nav-center">
      <img src={logoMartini} alt="Logo Martini" className="logo3" />
      </div>
      <div className="nav-right">
      <Link to="/forum">
      <img src={forumIkona} alt="Ikona forum" className="forum" />
      </Link>
      <Link to="/account">
      <img src={accountIkona} alt="Ikona user" className="user" />
      </Link>
      </div>
      </header>
     {/* Kategorie */}
    <div className="category-bar">
       {categories.map((cat) => (
      <button
           key={cat}
           className={`category-btn ${activeCategory === cat ? "active" : ""}`}
           onClick={() => setActiveCategory(cat)}>
           {cat}
      </button>
       ))}
    </div>
     {/* Ubrania */}
      <div className="wardrobe-grid">
       {filteredClothes.map((item, index) => (
      <div
           key={index}
           className="wardrobe-card"
           onClick={() => setSelectedItem(item)}>
            <img
             src={'images/'+item.zdjecie}
             alt={item.nazwa}
             className="clothes-img"
           />
          <p>{item.nazwa}</p>
      </div>
       ))}
    </div>
     {/* Modal */}
     {selectedItem && (
    <div className="modal-overlay" onClick={() => setSelectedItem(null)}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
      <img
          src={selectedItem.zdjecie}
          alt={selectedItem.nazwa}
          className="modal-img"/>
      <h2>{selectedItem.nazwa}</h2>
      <p>{selectedItem.opis}</p>
      <button onClick={() => setSelectedItem(null)}>Zamknij</button>
      </div>
    </div>
        )}
    </div>
 );
}
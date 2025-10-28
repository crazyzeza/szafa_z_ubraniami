import React, { useState } from "react";
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

  const fetchData = async () => {
    try {
      const endpoints = [
        { url: "http://localhost:8081/tshirts", category: "T-Shirts" },
        { url: "http://localhost:8081/tops", category: "Tops" },
        { url: "http://localhost:8081/bottoms", category: "Bottoms" },
        { url: "http://localhost:8081/shoes", category: "Shoes" },
        { url: "http://localhost:8081/others", category: "Others" },
      ];
      const results = await Promise.all(
        endpoints.map(async (ep) => {
          const res = await fetch(ep.url);
          const data = await res.json();
          return data.map((item, index) => ({
            id: `${ep.category}-${index}`,
            category: ep.category,
            name: item.nazwa,
            desc: item.opis,
            img: item.zdjecie.startsWith("http")
              ? item.zdjecie
              : `/images/${item.zdjecie}`,
          }));
        })
      );
      const merged = results.flat();
      setClothes(merged);
    } catch (error) {
      console.error("Błąd przy pobieraniu danych:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredClothes =
   activeCategory === "All"
     ? clothes
     : clothes.filter((item) => item.category === activeCategory);
  const categories = ["All", "T-Shirts", "Tops", "Bottoms", "Shoes", "Others"];


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
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Ubrania */}
      <div className="wardrobe-grid">
        {filteredClothes.map((item) => (
          <div
            key={item.id}
            className="wardrobe-card"
            onClick={() => setSelectedItem(item)}
          >
            <img src={item.img} alt={item.name} className="clothes-img" />
            <p>{item.name}</p>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedItem && (
        <div className="modal-overlay" onClick={() => setSelectedItem(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <img
              src={selectedItem.img}
              alt={selectedItem.name}
              className="modal-img"
            />
            <h2>{selectedItem.name}</h2>
            <p>{selectedItem.desc}</p>
            <button onClick={() => setSelectedItem(null)}>Zamknij</button>
          </div>
        </div>
      )}
    </div>
  );
}
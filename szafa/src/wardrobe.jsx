import React, { useState } from "react";
import { Link } from "react-router-dom";
import logoMartini from "./assets/logoMartini.png";
import "./Wardrobe.css";
import createIkona from "./assets/CreateIkona.png";
import clothesIkona from "./assets/UbraniaIkona.png";
import accountIkona from "./assets/UserLogo.png";
import forumIkona from "./assets/ForumIkona.png";

import tshirtImg from "./assets/tshirts/tshirts1.png";
import hoodieImg from "./assets/tshirts/tshirts2.png";
import jeansImg from "./assets/bottoms/bottoms0.png";
import shoesImg from "./assets/others/others0.png";
import beltImg from "./assets/others/others1.png"; 

export default function Wardrobe() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");

  // przykładowa baza ubrań
  const clothes = [
    {
      id: 1,
      category: "T-Shirts",
      img: hoodieImg,
      name: "Mężobijka",
      desc: "Kolor: żółty • Pogoda: lato • Styl: street",
    },
    {
      id: 2,
      category: "Tops",
      img: tshirtImg,
      name: "Top na ramiączka",
      desc: "Kolor: czarny • Pogoda: lato • Styl: grunge",
    },
    {
      id: 3,
      category: "Bottoms",
      img: jeansImg,
      name: "Adidas wannabe",
      desc: "Kolor: czarny • Pogoda: uniwersalne • Styl: street",
    },
    {
      id: 4,
      category: "Shoes",
      img: shoesImg,
      name: "Białe sneakersy",
      desc: "Kolor: biały • Pogoda: wiosna/lato • Styl: sportowy",
    },
    {
      id: 5,
      category: "Others",
      img: beltImg,
      name: "Swag pasek",
      desc: "Kolor: czarny • Pogoda: każda • Styl: street",
    },
  ];

  // filtrowanie
  const filteredClothes =
    activeCategory === "All"
      ? clothes
      : clothes.filter((item) => item.category === activeCategory);

  // kategorie
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

      {/* Zawartość strony */}
      <h1>Twoja szafa 👕👖👗</h1>
      <p>Witaj w Wardrobe!</p>

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
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logoMartini from "./assets/logoMartini.png";
import "./create.css";
import createIkona from "./assets/CreateIkona.png";
import clothesIkona from "./assets/UbraniaIkona.png";
import accountIkona from "./assets/UserLogo.png";
import forumIkona from "./assets/ForumIkona.png";
import savedIkona from "./assets/savedIkona.png";

import tshirtImg from "./assets/tshirts/tshirts1.png";
import tshirtImg1 from "./assets/tshirts/tshirts0.png";
import tshirtImg2 from "./assets/tshirts/tshirts2.png";
import tshirtImg3 from "./assets/tshirts/tshirts3.png";
import tshirtImg4 from "./assets/tshirts/tshirts4.png";
import tshirtImg5 from "./assets/tshirts/tshirts5.png";
import shoesImg from "./assets/shoes/shoes0.png";
import shoesImg1 from "./assets/shoes/shoes1.png";
import shoesImg2 from "./assets/shoes/shoes2.png";
import shoesImg3 from "./assets/shoes/shoes3.png";
import shoesImg4 from "./assets/shoes/shoes4.png";
import shoesImg5 from "./assets/shoes/shoes5.png";
import shoesImg6 from "./assets/shoes/shoes6.png";
import shoesImg7 from "./assets/shoes/shoes7.png";
import shoesImg8 from "./assets/shoes/shoes8.png";
import shoesImg9 from "./assets/shoes/shoes9.png";
import shoesImg10 from "./assets/shoes/shoes10.png";
import shoesImg11 from "./assets/shoes/shoes11.png";
import topsImg from "./assets/tops/tops0.png";
import topsImg1 from "./assets/tops/tops1.png";
import topsImg2 from "./assets/tops/tops2.png";
import topsImg3 from "./assets/tops/tops3.png";
import topsImg4 from "./assets/tops/tops4.png";
import othersImg from "./assets/others/others0.png";
import othersImg1 from "./assets/others/others1.png";
import othersImg2 from "./assets/others/others2.png";
import othersImg3 from "./assets/others/others3.png";
import othersImg4 from "./assets/others/others4.png";
import bottomsImg from "./assets/bottoms/bottoms0.png";
import bottomsImg1 from "./assets/bottoms/bottoms1.png";
import bottomsImg2 from "./assets/bottoms/bottoms2.png";
import bottomsImg3 from "./assets/bottoms/bottoms3.png";
import bottomsImg4 from "./assets/bottoms/bottoms4.png";

export default function Create() {
  const clothes = [
    { category: "T-Shirts", img: tshirtImg },
    { category: "T-Shirts", img: tshirtImg1 },
    { category: "T-Shirts", img: tshirtImg2 },
    { category: "T-Shirts", img: tshirtImg3 },
    { category: "T-Shirts", img: tshirtImg4 },
    { category: "T-Shirts", img: tshirtImg5 },
    { category: "Tops", img: topsImg },
    { category: "Tops", img: topsImg1 },
    { category: "Tops", img: topsImg2 },
    { category: "Tops", img: topsImg3 },
    { category: "Tops", img: topsImg4 },
    { category: "Bottoms", img: bottomsImg },
    { category: "Bottoms", img: bottomsImg1 },
    { category: "Bottoms", img: bottomsImg2 },
    { category: "Bottoms", img: bottomsImg3 },
    { category: "Bottoms", img: bottomsImg4 },
    { category: "Shoes", img: shoesImg },
    { category: "Shoes", img: shoesImg1 },
    { category: "Shoes", img: shoesImg2 },
    { category: "Shoes", img: shoesImg3 },
    { category: "Shoes", img: shoesImg4 },
    { category: "Shoes", img: shoesImg5 },
    { category: "Shoes", img: shoesImg6 },
    { category: "Shoes", img: shoesImg7 },
    { category: "Shoes", img: shoesImg8 },
    { category: "Shoes", img: shoesImg9 },
    { category: "Shoes", img: shoesImg10 },
    { category: "Shoes", img: shoesImg11 },
    { category: "Others", img: othersImg },
    { category: "Others", img: othersImg1 },
    { category: "Others", img: othersImg2 },
    { category: "Others", img: othersImg3 },
    { category: "Others", img: othersImg4 },
  ];

  const categories = ["T-Shirts", "Tops", "Bottoms", "Shoes", "Others"];
  const [currentOutfit, setCurrentOutfit] = useState(null);

  const generateOutfit = () => {
    const outfit = categories.map((cat) => {
      const items = clothes.filter((c) => c.category === cat);
      return items[Math.floor(Math.random() * items.length)];
    });
    setCurrentOutfit(outfit);
  };

  const saveOutfit = () => {
    if (currentOutfit) {
      const saved = JSON.parse(localStorage.getItem("savedOutfits") || "[]");
      const newOutfit = {
        name: `Outfit #${saved.length + 1}`,
        items: currentOutfit,
      };
      const updated = [...saved, newOutfit];
      localStorage.setItem("savedOutfits", JSON.stringify(updated));
      setCurrentOutfit(null);
      alert("Outfit zapisany! Sprawdź w zakładce 'Saved'");
    }
  };

  const discardOutfit = () => {
    setCurrentOutfit(null);
  };

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

      <h1>Stwórz outfit 👕👖👗</h1>
      <p>Wylosuj swój unikalny look!</p>

      <div className="category-bar">
        <button className="category-btn" onClick={generateOutfit}>
          ➕ Nowy outfit
        </button>
      </div>

      {currentOutfit && (
        <>
          <div className="wardrobe-grid">
            {currentOutfit.map((item, index) => (
              <div key={index} className="wardrobe-card">
                <img src={item.img} alt={item.category} className="clothes-img" />
                <p>{item.category}</p>
              </div>
            ))}
          </div>
          <div className="category-bar">
            <button className="category-btn" onClick={saveOutfit}>
              ✅ Zapisz
            </button>
            <button className="category-btn" onClick={discardOutfit}>
              ❌ Odrzuć
            </button>
            <button className="category-btn" onClick={generateOutfit}>
              🎲 Losuj ponownie
            </button>
          </div>
        </>
      )}
    </div>
  );
}

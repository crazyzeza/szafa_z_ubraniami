import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logoMartini from "./assets/logoMartini.png";
import "./create.css";
import createIkona from "./assets/CreateIkona.png";
import clothesIkona from "./assets/UbraniaIkona.png";
import accountIkona from "./assets/UserLogo.png";
import forumIkona from "./assets/ForumIkona.png";
import savedIkona from "./assets/savedIkona.png";


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


      <div className="category-bar">
        <button className="category-btn" onClick={generateOutfit}>
          Nowy outfit
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
              Zapisz
            </button>
            <button className="category-btn" onClick={discardOutfit}>
              Odrzuć
            </button>
            <button className="category-btn" onClick={generateOutfit}>
              Losuj ponownie
            </button>
          </div>
        </>
      )}
    </div>
  );
}

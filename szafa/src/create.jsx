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

  const categories = ["T-Shirts", "Tops", "Bottoms", "Shoes", "Others"];
  const [currentOutfit, setCurrentOutfit] = useState(null);



const generateOutfit = async () => {
  try {
    const res = await fetch("http://localhost:8081/create");
    const data = await res.json();
    setCurrentOutfit(data);
  } catch (error) {
    console.error("Błąd generowania outfitu:", error);
  }
};

const saveOutfit = async () => {
  if (currentOutfit) {
    try {
      const res = await fetch("http://localhost:8081/saved", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: `Outfit #${Date.now()}`,
          items: currentOutfit,
        }),
      });
      const result = await res.json();
      alert(result.message || "Outfit zapisany");
      setCurrentOutfit(null);
    } catch (error) {
      console.error("Błąd zapisu outfitu:", error);
    }
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
                <img src={'images/'+item.img} alt={item.category} className="clothes-img" />
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

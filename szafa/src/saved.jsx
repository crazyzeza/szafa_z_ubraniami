import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logoMartini from "./assets/logoMartini.png";
import "./saved.css";
import createIkona from "./assets/CreateIkona.png";
import clothesIkona from "./assets/UbraniaIkona.png";
import accountIkona from "./assets/UserLogo.png";
import forumIkona from "./assets/ForumIkona.png";
import savedIkona from "./assets/savedIkona.png";

export default function Saved() {
  const [savedOutfits, setSavedOutfits] = useState([]);

  useEffect(() => {
    const outfits = JSON.parse(localStorage.getItem("savedOutfits") || "[]");
    setSavedOutfits(outfits);
  }, []);

  const deleteOutfit = (index) => {
    const updated = savedOutfits.filter((_, i) => i !== index);
    setSavedOutfits(updated);
    localStorage.setItem("savedOutfits", JSON.stringify(updated));
  };

  return (
    <div>
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

      <h1>Zapisane outfity 👕👖👗</h1>

      {savedOutfits.length === 0 ? (
        <p style={{ textAlign: "center", color: "#555" }}>
          Brak zapisanych outfitów. Stwórz coś w zakładce „Create”!
        </p>
      ) : (
        <div
          className="saved-horizontal"
          style={{
            display: "flex",
            overflowX: "auto",
            gap: "20px",
            padding: "20px",
            background: "linear-gradient(90deg, #dad6d8, #888888)",
          }}
        >
          {savedOutfits.map((outfit, i) => (
            <div key={i} className="wardrobe-card" style={{ minWidth: "250px" }}>
              {outfit.items.map((item, j) => (
                <img
                  key={j}
                  src={item.img}
                  alt={item.category}
                  className="clothes-img"
                />
              ))}
              <p>{outfit.name}</p>
              <button
                className="category-btn"
                onClick={() => deleteOutfit(i)}
                style={{ marginTop: "10px" }}
              >
                ❌ Usuń
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

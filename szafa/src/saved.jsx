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
  const [editingIndex, setEditingIndex] = useState(null);
  const [newName, setNewName] = useState("");

  useEffect(() => {
    const outfits = JSON.parse(localStorage.getItem("savedOutfits") || "[]");
    setSavedOutfits(outfits);
  }, []);

  const deleteOutfit = (index) => {
    const updated = savedOutfits.filter((_, i) => i !== index);
    setSavedOutfits(updated);
    localStorage.setItem("savedOutfits", JSON.stringify(updated));
  };

  const startEditing = (index, currentName) => {
    setEditingIndex(index);
    setNewName(currentName);
  };

  const saveNameChange = (index) => {
    const updated = [...savedOutfits];
    updated[index].name = newName;
    setSavedOutfits(updated);
    localStorage.setItem("savedOutfits", JSON.stringify(updated));
    setEditingIndex(null);
    setNewName("");
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

    <p>  </p>
      {savedOutfits.length === 0 ? (
        <p style={{ textAlign: "center", color: "#555" }}>
          Brak zapisanych outfitów. Stwórz coś w zakładce „Create”!
        </p>
      ) : (
        <div className="saved-container">
          <div className="saved-horizontal">
            {savedOutfits.map((outfit, i) => (
              <div key={i} className="wardrobe-card">
                {/* zdjęcia outfitu */}
                {outfit.items.map((item, j) => (
                  <img
                    key={j}
                    src={item.img}
                    alt={item.category}
                    className="clothes-img"
                  />
                ))}

                {/* nazwa + edycja */}
                {editingIndex === i ? (
                  <div>
                    <input
                      type="text"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      className="edit-input"
                    />
                    <button
                      className="category-btn"
                      onClick={() => saveNameChange(i)}
                    >
                      💾 Zapisz nazwę
                    </button>
                  </div>
                ) : (
                  <p>{outfit.name}</p>
                )}

                {/* przyciski akcji */}
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {editingIndex !== i && (
                    <button
                      className="category-btn"
                      onClick={() => startEditing(i, outfit.name)}
                    >
                      ✏️ Zmień nazwę
                    </button>
                  )}
                  <button
                    className="category-btn"
                    onClick={() => deleteOutfit(i)}
                  >
                    ❌ Usuń
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

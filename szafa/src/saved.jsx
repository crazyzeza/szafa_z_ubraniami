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
  const [selectedOutfit, setSelectedOutfit] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8081/saved/${localStorage.getItem("userId")}`)
      .then((res) => res.json())
      .then((data) => setSavedOutfits(data))
      .catch((err) => console.error("Błąd pobierania outfitów:", err));
  }, []);

  const deleteOutfit = async (id) => {
    if (!window.confirm("Czy na pewno chcesz usunąć ten outfit?")) return;
    try {
      const res = await fetch(`http://localhost:8081/delete/${id}`, {
        method: "DELETE",
      });
      const result = await res.json();
      alert(result.message || "Outfit usunięty");
      setSavedOutfits(savedOutfits.filter((o) => o.id !== id));
    } catch (error) {
      console.error("Błąd usuwania outfitu:", error);
    }
  };

  const startEditing = (index, currentName) => {
    setEditingIndex(index);
    setNewName(currentName);
  };

  const saveNameChange = async (id, index) => {
    try {
      const res = await fetch(`http://localhost:8081/update_name/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newName }),
      });
      const result = await res.json();
      if (result.message) {
        const updated = [...savedOutfits];
        updated[index].name = newName;
        setSavedOutfits(updated);
        setEditingIndex(null);
        setNewName("");
        alert("Nazwa outfitu zaktualizowana!");
      }
    } catch (error) {
      console.error("Błąd aktualizacji nazwy:", error);
    }
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

      {savedOutfits.length === 0 ? (
        <div style={{ textAlign: "center", marginTop: "40px" }}>
          <h1>Brak zapisanych outfitów</h1>
        </div>
      ) : (
        <div className="saved-container">
          <div className="saved-horizontal">
            {savedOutfits.map((outfit, i) => (
              <div
                key={outfit.id}
                className="wardrobe-card"
                onClick={() => setSelectedOutfit(outfit)}
                style={{ cursor: "pointer" }}
              >
                <div className="outfit-images-small">
                  {outfit.items.map((item, j) => (
                    <img
                      key={j}
                      src={"images/" + item.zdjecie}
                      alt={item.category}
                      className="clothes-icon"
                    />
                  ))}
                </div>

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
                      onClick={(e) => {
                        e.stopPropagation();
                        saveNameChange(outfit.id, i);
                      }}
                    >
                      Zapisz nazwę
                    </button>
                  </div>
                ) : (
                  <p>{outfit.name}</p>
                )}

                <div className="button-box">
                  {editingIndex !== i && (
                    <button
                      className="category-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        startEditing(i, outfit.name);
                      }}
                    >
                      Zmień nazwę
                    </button>
                  )}
                  <button
                    className="category-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteOutfit(outfit.id);
                    }}
                  >
                    Usuń
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {selectedOutfit && (
        <div className="modal-bg" onClick={() => setSelectedOutfit(null)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <h2 className="modal-box-name">{selectedOutfit.name}</h2>

            <div className="modal-images">
              {selectedOutfit.items.map((item, i) => (
                <img
                  key={i}
                  src={"images/" + item.zdjecie}
                  alt={item.category}
                  className="modal-img-large"
                />
              ))}
            </div>

            <button className="close-btn" onClick={() => setSelectedOutfit(null)}>
              Zamknij
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

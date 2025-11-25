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
    const userId = localStorage.getItem("userId");
    if (!userId) {
      console.error("Brak userId w localStorage");
      return;
    }
      fetch(`http://localhost:8081/saved/${userId}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Błąd podczas pobierania zapisanych outfitów");
        }
        return res.json();
      })
      .then((data) => {
        const transformedData = data.map((outfit) => ({
          id_outfit: outfit.id_outfit,
          name: outfit.outfit_name,
          items: [
            { category: "Top", zdjecie: outfit.top_zdjecie },
            { category: "Bluzka", zdjecie: outfit.bluzka_zdjecie },
            { category: "Spodnie", zdjecie: outfit.spodnie_zdjecie },
            { category: "Buty", zdjecie: outfit.buty_zdjecie },
            { category: "Akcesoria", zdjecie: outfit.akcesoria_zdjecie },
            { category: "Torebka", zdjecie: outfit.torebka_zdjecie },
          ],
        }));
        setSavedOutfits(transformedData);
      })
      .catch((err) => {
        console.error("Błąd:", err);
      });
  }, []);

  const deleteOutfit = async (id) => {
    if (!window.confirm("Czy na pewno chcesz usunąć ten outfit?")) return;
    try {
      const res = await fetch(`http://localhost:8081/delete/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error("Błąd podczas usuwania outfitu");
      }
      const result = await res.json();
      alert(result.message || "Outfit usunięty");
      setSavedOutfits(savedOutfits.filter((o) => o.id_outfit !== id));
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
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newName }),
      });
      if (!res.ok) {
        throw new Error("Błąd podczas aktualizacji nazwy outfitu");
      }
      const result = await res.json();
      if (result.message) {
        const updated = [...savedOutfits];
        updated[index].outfit_name = newName;
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
                key={outfit.id_outfit}
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
                      deleteOutfit(outfit.id_outfit);
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

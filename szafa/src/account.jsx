import React from "react";
import { Link } from "react-router-dom";
import logoMartini from "./assets/logoMartini.png";
import "./account.css"; 
import createIkona from './assets/CreateIkona.png'
import clothesIkona from './assets/UbraniaIkona.png'
import accountIkona from './assets/UserLogo.png'
import forumIkona from './assets/ForumIkona.png'
import savedIkona from "./assets/savedIkona.png";


export default function Account() {

  const [user, setUser] = useState(null);
  const [tab, setTab] = useState("info");

  const [editData, setEditData] = useState({
    imie: "",
    nazwisko: "",
    email: "",
    nazwa_uzytkownika: "",
    logo: ""
  });

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!userId) return;

    fetch(`http://localhost:8081/user/${userId}`)
      .then(res => res.json())
      .then(data => {
        setUser(data);
        setEditData(data);
      })
      .catch(err => console.error("Błąd pobierania użytkownika:", err));
  }, [userId]);

  const handleChange = (e) => {
    setEditData({
      ...editData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = () => {
    fetch(`http://localhost:8081/user/update/${userId}`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(editData)
    })
      .then(res => res.json())
      .then(() => {
        alert("Zaktualizowano!");
        setUser(editData);
        setTab("info");
      })
      .catch(err => console.error("Błąd aktualizacji:", err));
  };

  return (
    <div>
      {/* Pasek menu */}
      <header className="navbar">
        <div className="nav-left">
          <Link to="/wardrobe"><img src={clothesIkona} className="clothes" /></Link>
          <Link to="/create"><img src={createIkona} className="create" /></Link>
          <Link to="/saved"><img src={savedIkona} className="saved" /></Link>
        </div>

        <div className="nav-center">
          <img src={logoMartini} className="logo3" />
        </div>

        <div className="nav-right">
          <Link to="/forum"><img src={forumIkona} className="forum" /></Link>
          <Link to="/account"><img src={accountIkona} className="user" /></Link>
        </div>
      </header>

      <h1>Konto</h1>

      {!user ? (
        <p>Ładowanie danych...</p>
      ) : (
        <div className="account-box">
          {/* Zakładki */}
          <div className="tabs">
            <button 
              className={tab === "info" ? "active" : ""} 
              onClick={() => setTab("info")}
            >
              Informacje
            </button>

            <button 
              className={tab === "edit" ? "active" : ""} 
              onClick={() => setTab("edit")}
            >
              Zmień dane
            </button>
          </div>

           {/* PANEL INFORMACYJNY */}
           {tab === "info" && (
            <div>
              {user.logo && (
                <img
                  src={"images/" + user.logo}
                  alt="logo"
                  className="account-logo"
                />
              )}

              <p><strong>Nazwa użytkownika:</strong> {user.nazwa_uzytkownika}</p>
              <p><strong>Imię:</strong> {user.imie}</p>
              <p><strong>Nazwisko:</strong> {user.nazwisko}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Logo:</strong> {user.logo}</p>
            </div>
          )}

          {/* PANEL EDYCJI */}
          {tab === "edit" && (
            <div className="edit-form">

              <label>Imię:</label>
              <input name="imie" value={editData.imie} onChange={handleChange} />

              <label>Nazwisko:</label>
              <input name="nazwisko" value={editData.nazwisko} onChange={handleChange} />

              <label>Email:</label>
              <input name="email" value={editData.email} onChange={handleChange} />

              <label>Nazwa użytkownika:</label>
              <input name="nazwa_uzytkownika" value={editData.nazwa_uzytkownika} onChange={handleChange} />

              <label>Link do logo:</label>
              <input name="logo" value={editData.logo} onChange={handleChange} />

              <button className="save-btn" onClick={handleSave}>Zapisz</button>
            </div>
          )}
      





        </div>
      )}
    </div>
  );
}
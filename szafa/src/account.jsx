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
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!userId) return;

    fetch(`http://localhost:8081/user/${userId}`)
      .then(res => res.json())
      .then(data => setUser(data))
      .catch(err => console.error("Błąd pobierania użytkownika:", err));
  }, [userId]);

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
          
          {user.logo && (
            <img 
              src={"images/" + user.logo} 
              alt="logo" 
              className="account-logo" 
            />
          )}

          <p><strong>ID:</strong> {user.id_uzytkownika}</p>
          <p><strong>Imię:</strong> {user.imie}</p>
          <p><strong>Nazwisko:</strong> {user.nazwisko}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Nazwa użytkownika:</strong> {user.nazwa_uzytkownika}</p>
        </div>
      )}
    </div>
  );
}
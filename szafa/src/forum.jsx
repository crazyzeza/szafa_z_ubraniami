import React from "react";
import { Link } from "react-router-dom";
import logoMartini from "./assets/logoMartini.png";
import "./forum.css"; 
import createIkona from './assets/CreateIkona.png'
import clothesIkona from './assets/UbraniaIkona.png'
import accountIkona from './assets/UserLogo.png'
import forumIkona from './assets/ForumIkona.png'

export default function Wardrobe() {
  return (
    <div>
      {/* Pasek menu */}
      <header className="navbar">
        <div className="nav-left">
          <Link to="/wardrobe"><img src={clothesIkona} alt="Ikona clothes" className="clothes" /></Link>
          <Link to="/create"><img src={createIkona} alt="Ikona create" className="create" /></Link>
        </div>

        <div className="nav-center">
          <img src={logoMartini} alt="Logo Martini" className="logo3" />
        </div>

        <div className="nav-right">
          <Link to="/forum"><img src={forumIkona} alt="Ikona forum" className="forum" /></Link>
          <Link to="/account"><img src={accountIkona} alt="Ikona user" className="user" /></Link>
        </div>
      </header>

      {/* Zawartość strony */}
      <h1>Forum 👕👖👗</h1>
      <p>Witaj w Wardrobe!</p>
    </div>
  );
}

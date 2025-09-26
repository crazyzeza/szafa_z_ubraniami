import React, { useState } from "react";
import { Link } from "react-router-dom";
import logoMartini from "./assets/logoMartini.png";
import "./Wardrobe.css";
import createIkona from "./assets/CreateIkona.png";
import clothesIkona from "./assets/UbraniaIkona.png";
import accountIkona from "./assets/UserLogo.png";
import forumIkona from "./assets/ForumIkona.png";

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
import bottomsImg from "./assets/bottoms/bottoms0.png";
import bottomsImg1 from "./assets/bottoms/bottoms1.png";
import bottomsImg2 from "./assets/bottoms/bottoms2.png";
import bottomsImg3 from "./assets/bottoms/bottoms3.png";
import bottomsImg4 from "./assets/bottoms/bottoms4.png";
import othersImg4 from "./assets/others/others4.png"; 



export default function Wardrobe() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");

  // przykładowa baza ubrań
  const clothes = [
    {
      id: 1,
      category: "T-Shirts",
      img: tshirtImg,
      name: "Mężobijka",
      desc: "Kolor: żółty • Pogoda: lato • Styl: street",
    },
    {
      id: 2,
      category: "Tops",
      img: topsImg,
      name: "Hoa hoa hoa girl",
      desc: "Kolor: szary • Pogoda: jesień • Styl: downtown",
    },
    {
      id: 3,
      category: "Bottoms",
      img: bottomsImg,
      name: "Adidas wannabe",
      desc: "Kolor: czarny • Pogoda: każda • Styl: street",
    },
    {
      id: 4,
      category: "Shoes",
      img: shoesImg,
      name:"Bagi codded :*",
      desc: "Kolor: panterka • Pogoda: każda • Styl: bagi",
    },
    {
      id: 5,
      category: "Others",
      img: othersImg1,
      name: "Swag pasek",
      desc: "Kolor: czarny • Pogoda: każda • Styl: street",
    },
    {
      id: 6,
      category: "Shoes",
      img: shoesImg1,
      name: "Fancy adidaski",
      desc: "Kolor: czarny • Pogoda: każda • Styl: sportowy",
    },{
      id: 7,
      category: "Shoes",
      img: shoesImg2,
      name: "Białe sneakersy",
      desc: "Kolor: biały • Pogoda: wiosna/lato • Styl: sportowy",
    },{
      id: 8,
      category: "Shoes",
      img: shoesImg3,
      name: "brązowe sneakersy",
      desc: "Kolor: brązowe • Pogoda: wiosna/lato • Styl: sportowy",
    },{
      id: 9,
      category: "Shoes",
      img: shoesImg5,
      name: "Dior z kakobuj",
      desc: "Kolor: biały, niebieskie • Pogoda: wiosna/lato • Styl: rich bitch",
    },{
      id: 10,
      category: "Shoes",
      img: shoesImg4,
      name: "Lustro",
      desc: "Kolor: biały • Pogoda: wiosna/lato • Styl: sportowy",
    },{
      id: 11,
      category: "Shoes",
      img: shoesImg6,
      name: "Brazil sneakersy",
      desc: "Kolor: zielony, zolty • Pogoda: wiosna/lato • Styl: sportowy",
    },{
      id: 12,
      category: "Shoes",
      img: shoesImg7,
      name: "Najacze",
      desc: "Kolor: różowy • Pogoda: każda • Styl: sportowy",
    },{
      id: 13,
      category: "Shoes",
      img: shoesImg8,
      name: "'I`m not like other girls'",
      desc: "Kolor: czarne • Pogoda: wiosna/lato • Styl: sportowy",
    },{
      id: 14,
      category: "Shoes",
      img: shoesImg9,
      name: "Buty najwiekszej sigmy",
      desc: "Kolor: żółty • Pogoda: każda • Styl: sigmowy",
    },{
      id: 15,
      category: "Shoes",
      img: shoesImg10,
      name: "Polska gurom",
      desc: "Kolor: biały, czerwony • Pogoda: wiosna/lato • Styl: sportowy",
    },{
      id: 16,
      category: "Shoes",
      img: shoesImg11,
      name: "Tung tung tung sahur",
      desc: "Kolor: fioletowy • Pogoda: zima • Styl: classy",
    },{
      id: 17,
      category: "T-Shirts",
      img: tshirtImg1,
      name: "Firanka",
      desc: "Kolor: kremowy • Pogoda: lato • Styl: classy",
    },{
      id: 18,
      category: "T-Shirts",
      img: tshirtImg2,
      name: "Nauczyciel ci powie, że kusisz chłopców",
      desc: "Kolor: żółty • Pogoda: lato • Styl: sigmowy",
    },{
      id: 19,
      category: "T-Shirts",
      img: tshirtImg3,
      name: "Stary Jork",
      desc: "Kolor: czarny, biały • Pogoda: wiosna/lato • Styl: sportowy",
    },{
      id: 20,
      category: "T-Shirts",
      img: tshirtImg4,
      name: "Tung tung tung sahur",
      desc: "Kolor: czarny • Pogoda: każda • Styl: street",
    },{
      id: 21,
      category: "T-Shirts",
      img: tshirtImg5,
      name: "Tung tung tung sahur",
      desc: "Kolor: czarny • Pogoda: każda • Styl: street",
    },{
      id: 22,
      category: "Tops",
      img: topsImg1,
      name: "Male manipulator final boss",
      desc: "Kolor: czarny • Pogoda: lato • Styl: street",
    },{
      id: 23,
      category: "Tops",
      img: topsImg2,
      name: "ayesha erotica vibe",
      desc: "Kolor: brązowy • Pogoda: zzima • Styl: mob wife",
    },{
      id: 24,
      category: "Tops",
      img: topsImg3,
      name: "drzewo",
      desc: "Kolor: leśny • Pogoda: jesień • Styl: las",
    },{
      id: 25,
      category: "Tops",
      img: topsImg4,
      name: "krzaki",
      desc: "Kolor: leśny • Pogoda: jesień • Styl: las",
    },
    {
      id: 26,
      category: "Others",
      img: othersImg,
      name: "vivienne westwood",
      desc: "Kolor: czarny • Pogoda: każda • Styl: street",
    },
    {
      id: 27,
      category: "Others",
      img: othersImg2,
      name: "'widzisz mnie?'",
      desc: "Kolor: czarny • Pogoda: każda • Styl: street",
    },
    {
      id: 28,
      category: "Others",
      img: othersImg3,
      name: "krołm harts",
      desc: "Kolor: czarny • Pogoda: każda • Styl: street",
    },
    {
      id: 29,
      category: "Bottoms",
      img: bottomsImg1,
      name: "kurde ucieło",
      desc: "Kolor: czarny • Pogoda: każda • Styl: street",
    },
    {
      id: 30,
      category: "Bottoms",
      img: bottomsImg2,
      name: "wsm spk",
      desc: "Kolor: czarny • Pogoda: każda • Styl: street",
    },
    {
      id: 31,
      category: "Bottoms",
      img: bottomsImg3,
      name: "Opium franeczek",
      desc: "Kolor: czarny • Pogoda: każda • Styl: street",
    },
    {
      id: 32,
      category: "Bottoms",
      img: bottomsImg4,
      name: "kojarzy mi sie z zuzia wiec not cool",
      desc: "Kolor: czarny • Pogoda: każda • Styl: street",
    },
    {
      id: 33,
      category: "Others",
      img: othersImg4,
      name: "krołm harts ale wsm nie jednak",
      desc: "Kolor: czarny • Pogoda: każda • Styl: street",
    }
    
  ];

  const filteredClothes =
    activeCategory === "All"
      ? clothes
      : clothes.filter((item) => item.category === activeCategory);

  const categories = ["All", "T-Shirts", "Tops", "Bottoms", "Shoes", "Others"];

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

      {/* Zawartość strony */}
      <h1>Twoja szafa 👕👖👗</h1>
      <p>Witaj w Wardrobe!</p>

      {/* Kategorie */}
      <div className="category-bar">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`category-btn ${activeCategory === cat ? "active" : ""}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Ubrania */}
      <div className="wardrobe-grid">
        {filteredClothes.map((item) => (
          <div
            key={item.id}
            className="wardrobe-card"
            onClick={() => setSelectedItem(item)}
          >
            <img src={item.img} alt={item.name} className="clothes-img" />
            <p>{item.name}</p>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedItem && (
        <div className="modal-overlay" onClick={() => setSelectedItem(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <img
              src={selectedItem.img}
              alt={selectedItem.name}
              className="modal-img"
            />
            <h2>{selectedItem.name}</h2>
            <p>{selectedItem.desc}</p>
            <button onClick={() => setSelectedItem(null)}>Zamknij</button>
          </div>
        </div>
      )}
    </div>
  );
}
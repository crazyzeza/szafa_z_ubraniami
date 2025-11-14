import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './App.css'
import logoMartini from './assets/logoMartini.png'
//Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
//npm install nodemon cors expressnp

function App() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    fetch("http://localhost:8081/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
      .then(async (res) => {
        if (!res.ok) {
          const msg = await res.json();
          alert(msg.message);
          return;
        }
        return res.json();
      })
      .then((data) => {
        if (!data) return;
        const user = data.user;
        localStorage.setItem("userId", user.id_uzytkownika);
        navigate("/wardrobe");
      })
      .catch((err) => {
        console.error("Błąd logowania:", err);
      });
  };

  return (
    <div className="login-container">
      <img src={logoMartini} alt="Martini Logo" className="logo" />

      <div className="login-box">
        <div className="avatar"></div>
        <form onSubmit={handleSubmit} className="form">
          <input
            type="text"
            placeholder="Email ID"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <div className="options">
            <label>
              <input type="checkbox" /> Remember me
            </label>
            <a href="#">Forgot Password?</a>
          </div>

          <button type="submit" className="login-button">
            LOGIN
          </button>
          <div className='createaccount'>
            <a href="#">Stworz konto</a>
          </div>

        </form>
      </div>
    </div>
  )
}

export default App

import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './App.css'
import logoMartini from './assets/logoMartini.png'
//Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
//npm install nodemon cors express

function App() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("handleSubmit wywołane, email:", email);
  
    try {
      const res = await fetch("http://localhost:8081/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
  
      if (!res.ok) {
        const body = await res.json().catch(() => null);
        const errMsg = body?.message ?? "Błąd serwera";
        alert(errMsg);
        return;
      }
  
      const body = await res.json();
      const user = body.user ?? body;
  
      if (!user) {
        alert("Brak danych użytkownika w odpowiedzi: " + JSON.stringify(body));
        return;
      }
  
      localStorage.setItem("userId", user.id_uzytkownika);
      navigate("/wardrobe");
    } catch (err) {
      console.error("Błąd logowania:", err);
      alert("Błąd połączenia z serwerem: " + String(err));
    }
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

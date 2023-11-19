'use client'
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import '../styles/global.css'

export default function Login() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch('https://rattler-major-severely.ngrok-free.app/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    const data = await response.json();
    if (response.ok) {
      localStorage.setItem('username', data.name);
      localStorage.setItem('user',data.username);
      router.push("/Home");
    } else {
      window.alert('Error in login!');
    }
  };

  return (
    <>
      <div className="login">
        <div style={{ display: "flex", justifyContent: "center", marginTop: "3%" }}>
          <h1 style={{ fontSize: "3em" }}>Event<span style={{ color: "red" }}> Lister</span></h1>
        </div>
        <nav style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "65vh" }}>
          <div style={{ backgroundColor: 'white', display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", width: "300px", padding: "1.5%", borderRadius: "1em", boxShadow: "0 0 1.5em rgba(0,0,0,0.1)" }}>
            <h2 style={{ marginBottom: '8%' }}>Login</h2>
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '1em' }}>
                <input type="text" placeholder="Username" style={{ padding: '10px' }} value={username} onChange={(e) => setUsername(e.target.value)} autoFocus />
              </div>
              <div style={{ marginBottom: '1.6em' }}>
                <input type="password" placeholder="Password" style={{ padding: '10px' }} value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
              <div>
                <input type="submit" value="Log In" style={{ width: '60%', padding: '0.9em', marginLeft: "20%", borderRadius: "0.9em", cursor: "pointer" }} />
              </div>
              <p>Not Registered? <Link href="./SignUp" style={{ textDecoration: "none" }}>Sign Up</Link></p>
            </form>
          </div>
        </nav>
      </div>
    </>
  );
}

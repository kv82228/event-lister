'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import '../styles/global.css';

const handleLogout = async () => {
  window.location.replace('Login');
}

const Page = () => {
  const [username, setUsername] = useState('');
  const [events, setEvents] = useState([]);
  const name = typeof window === 'undefined' ? '' : localStorage.getItem('user');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setUsername(localStorage.getItem('username'));
    }
    fetchEvents();
  }, []);

  const router = useRouter();

  const createEvent = async () => {
    router.push('CreateEvent');
  }

  const fetchEvents = async () => {
    const response = await fetch('https://rattler-major-severely.ngrok-free.app/getevents', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name })
    });
    const data = await response.json();
    if (response.ok) {
      // Sort events by date in descending order
      const sortedEvents = data.sort((a, b) => new Date(b.eventdate) - new Date(a.eventdate));
      setEvents(sortedEvents);
    } else {
      window.alert('Error in fetching events!');
    }
  };

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px' }}>
        <h2 style={{ color: 'black', margin: '2px' }}>Event <span style={{ color: "red" }}>Lister</span></h2>
        <h3 style={{ color: 'black', margin: '2px' }}>Welcome, {username}!</h3>
        <button style={{ backgroundColor: 'rgb(249, 49, 49)', color: 'white', padding: '7px 25px', textAlign: 'center', textDecoration: 'none', display: 'inline-block', fontSize: '16px', marginRight: '2px', cursor: 'pointer', borderRadius: "20px" }} onClick={handleLogout}>
          Log Out
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: 'calc(100vh - 115px)' }}>
        {events.length > 0 ? (
          events.map(event => {
            const eventdate = new Date(event.date);
            return (
              <div key={event._id} style={{ backgroundColor: 'white', margin: '10px', padding: '7px', borderRadius: '15px', width: '40%', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
                <span style={{ fontWeight: "bold" }}>Event Name: </span><span>{event.eventname}</span>
                <br /><br />
                <span style={{ fontWeight: "bold" }}>Event Description: </span><span>{event.description}</span>
                <p style={{ color: 'grey', textAlign: 'right', fontSize: "0.8em" }}>{eventdate.toLocaleString()}</p>
              </div>
            );
          })
        ) : (
          <h3>No Events to show</h3>
        )}
        <button onClick={createEvent} style={{ padding: "0.5em", borderRadius: "0.6em", cursor: "pointer",marginTop:"0.6em" }}>+ Create New Event</button>
      </div>
    </>
  );
};

export default Page;

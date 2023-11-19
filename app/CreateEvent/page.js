'use client'
import { useState , useEffect } from 'react'
import { useRouter } from 'next/navigation'
import '../styles/global.css'

const Page = () => {

    const [eventname, setEventname] = useState('');
    const [eventdescription, setEventdescription] = useState('');
    const [eventdate, setEventdate] = useState('');
    const [minDate, setMinDate] = useState('');
    const username = localStorage.getItem('user');
    const router = useRouter();

    useEffect(() => {
        const today = new Date();
        const day = String(today.getDate()).padStart(2, '0');
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const year = today.getFullYear();
        const minDateValue = `${year}-${month}-${day}T00:00`;
        setMinDate(minDateValue);
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await fetch('https://rattler-major-severely.ngrok-free.app/createevent', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, eventname, eventdescription, eventdate })
        });
        const data = await response.json();
        if (response.ok) {
            window.alert('Event Created!');
            localStorage.setItem('eventname', data.eventname);
            router.push('/Home');
            return;
        }
        if (response.status === 401) {
            window.alert('Event already exists');
        } else {
            window.alert('Error in Creating Event!');
        }
    };

    return (
        <>
            <div style={{ display: "flex", justifyContent: "center", marginTop: "3%" }}>
                <h1 style={{ fontSize: "3em" }}>Event<span style={{ color: "red" }}> Lister</span></h1>
            </div>
            <nav style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "65vh" }}>
                <div style={{ backgroundColor: 'white', display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", width: "300px", padding: "1.5%", borderRadius: "1em", boxShadow: "0 0 1.5em rgba(0,0,0,0.1)" }}>
                    <h2 style={{ marginBottom: '8%' }}>Create Event</h2>
                    <form>
                        <div style={{ marginBottom: '1em' }}>
                            <input type="text" placeholder="Enter Event Name" value={eventname} onChange={(e) => setEventname(e.target.value)} style={{ padding: '10px' }} autoFocus />
                        </div>
                        <div style={{ marginBottom: '1em' }}>
                            <input type="text" placeholder="Enter Event Description" value={eventdescription} onChange={(e) => setEventdescription(e.target.value)} style={{ padding: '10px' }} />
                        </div>
                        <div style={{ marginBottom: '1.6em' }}>
                            <input type="datetime-local" placeholder="Enter Event Date" value={eventdate} min={minDate} onChange={(e) => setEventdate(e.target.value)} style={{ padding: '10px' }} />
                        </div>
                        <div>
                            <input type="submit" value="Create Event" onClick={handleSubmit} style={{ width: '60%', padding: '0.9em', marginLeft: "20%", borderRadius: "0.9em", cursor: "pointer" }} />
                        </div>
                    </form>
                </div>
            </nav>
        </>
    )
}

export default Page
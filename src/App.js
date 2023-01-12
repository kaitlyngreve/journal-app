import Login from "./Login"
import Signout from "./Signout";
import EntryCard from "./EntryCard";
import NewEntry from "./NewEntry";
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Switch, Redirect, BrowserRouter } from "react-router-dom";
import { db, auth } from './firebase-config'
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore'
import { useAuthState } from "react-firebase-hooks/auth";

function App() {
  const [entries, setEntries] = useState([]);
  const [user] = useAuthState(auth);

  const entriesRef = user ? collection(db, user.uid) : <Login />;

  // current date variable
  let current = new Date();
  let currentHour = current.getHours() > 12 ? current.getHours() - 12 : current.getHours();
  let am_pm = current.getHours >= 12 ? "PM" : "AM";
  currentHour = currentHour < 10 ? "0" + currentHour : currentHour;
  let currentMin = current.getMinutes() < 10 ? "0" + current.getMinutes() : current.getMinutes();
  let currentTime = currentHour + ":" + currentMin + "" + am_pm;

  const date = `${current.getMonth() + 1}/${current.getDate()}/${current.getFullYear()} ${currentTime}`;

  useEffect(() => {
    // this function is to get our entry data, 
    const getEntries = async () => {
      const data = await getDocs(entriesRef);
      // and set what we see on the frontend to be our entry data in the firestore
      setEntries(data.docs.map((doc) => ({ ...doc.data(), id: doc.id, key: doc.id })));
    }
    getEntries();
  }, [user]);


  const deleteEntry = (id) => {
    // these two lines of code are for firebase firestore - deleting from our database
    const entryDoc = doc(db, user.uid, id);
    deleteDoc(entryDoc);
    // these lines of code are for updating the frontend without a huge window reload - which is ugly Kaitie, don't do it. 
    const updatedEntries = [...entries].filter((entry) => entry.id !== id);
    setEntries(updatedEntries);
  }


  return (
    <div className="App">
      {user ? (
        <div className="whole-app-container">
          <div className="side-entries-container">
            <div className="side-header-top-content">
              <h3 className="side-header">{user.displayName}'s Entries👇</h3>
            </div>
            {entries.map((entry) => {
              return <EntryCard
                key={entry.id}
                entry={entry}
                deleteEntry={deleteEntry} />
            })}
            <div className="side-header-bottom-content" >
              <Signout />
            </div>
          </div>
          <div className='new-entry-section-container'>
            <div className="header-container">
              <h1 className='header'>👋 Hello, {user.displayName}.</h1>
              <h3 className='currentDate'>🗓 Todays date is {date}</h3>
            </div>
            <NewEntry
              entries={entries}
              setEntries={setEntries}
              entriesRef={entriesRef}
              date={date}
            />
          </div>
        </div>) : (
        <Login />
      )}
    </div >
  );
}

export default App;
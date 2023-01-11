import Login from "./Login"
import Signout from "./Signout";
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Switch, Redirect, BrowserRouter } from "react-router-dom";
import { db, auth } from './firebase-config'
import { collection, getDocs, addDoc, doc, deleteDoc } from 'firebase/firestore'
import { useAuthState } from "react-firebase-hooks/auth";

function App() {
  const [entries, setEntries] = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [errorMessage, setErrorMessage] = useState({ error: false, msg: "" });
  const [user] = useAuthState(auth);

  const entriesRef = user ? collection(db, user.uid) : <Login />;

  // current date variable
  const current = new Date();
  const date = `${current.getMonth() + 1}/${current.getDate()}/${current.getFullYear()}`;

  const handleResetErrors = () => {
    setErrorMessage(null);
  }

  const addEntry = async (e) => {
    e.preventDefault();
    if (newTitle === "" || newContent === "") {
      setErrorMessage({
        error: true,
        msg: "🛑 Hey there! Make sure all form fields have been filled out before submitting."
      });
      console.log(errorMessage);
    } else {
      let newEntryRef = await addDoc(entriesRef, { postTitle: newTitle, postContent: newContent, date: date });
      setEntries([...entries, { postTitle: newTitle, postContent: newContent, date: date, id: newEntryRef.id }]);
    }
    setNewTitle('');
    setNewContent('');
  }

  // Helper Function for auto-height Textarea
  function text_area_auto_grow(element) {
    element.style.height = "5px";
    element.style.height = (element.scrollHeight) + "px";
  }

  const deleteEntry = (id) => {
    // these two lines of code are for firebase firestore - deleting from our database
    const entryDoc = doc(db, user.uid, id);
    deleteDoc(entryDoc);
    // these lines of code are for updating the frontend without a huge window reload - which is ugly Kaitie, don't do it. 
    const updatedEntries = [...entries].filter((entry) => entry.id !== id);
    setEntries(updatedEntries);
  }

  useEffect(() => {
    // this function is to get our entry data, 
    const getEntries = async () => {
      const data = await getDocs(entriesRef);
      // and set what we see on the frontend to be our entry data in the firestore
      setEntries(data.docs.map((doc) => ({ ...doc.data(), id: doc.id, key: doc.id })));
    }
    getEntries();
    // [user] goes in the dependancy array so that as each user logs in,
    // they see their journal entries
  }, [user]);

  return (
    <div className="App">
      {user ? (
        <div className="whole-app-container">
          <div className="side-entries-container">
            <div className="side-header-top-content">
              <h3 className="side-header">{user.displayName}'s Entries👇</h3>
            </div>
            {
              entries.map((entry) => {
                return <div className='side-entry' key={entry.id}>
                  <h4 className='side-entry-title'>Title: {entry.postTitle}</h4>
                  <h4 className='side-entry-date'>Date of Entry: {entry.date}</h4>
                  <button className='button' onClick={() => { deleteEntry(entry.id) }}>Delete Entry</button>
                </div>
              })
            }
            <div className="side-header-bottom-content">
              <Signout />
            </div>
          </div>
          <div className='new-entry-section-container'>
            <div className="header-container">
              <h1 className='header'>👋 Hello, {user.displayName}.</h1>
              <h3 className='currentDate'>🗓 Todays date is {date}</h3>
            </div>
            <form onSubmit={addEntry}>
              <div className='new-entry-container'>
                <input
                  placeholder='Entry Title...'
                  value={newTitle}
                  onChange={(e) => { setNewTitle(e.target.value) }} />
                {entries.length === 0 ? (
                  <textarea
                    placeholder=
                    'Hello, welcome to Journal-It ✏️ To start your first journal entry, type here! Once you have finished your entry, hit the + Add Entry button. To revisit previous entries select an entry from the side navigation bar. Happy Journaling!'
                    value={newContent}
                    onChange={(e) => {
                      setNewContent(e.target.value);
                      text_area_auto_grow(e.target);
                    }} />
                ) : (<textarea
                  placeholder='Entry... ✏️'
                  value={newContent}
                  onChange={(e) => {
                    setNewContent(e.target.value);
                    text_area_auto_grow(e.target);
                  }} />)}

              </div>
              <button onClick={handleResetErrors} className='button' type='submit'>➕ Add Entry</button>
              {errorMessage?.msg && (<div className='error-container'>{errorMessage.msg}</div>)}
            </form>
          </div>
        </div>) : (
        <Login />
      )}
    </div >
  );
}

export default App;
import Login from "./Login"
import { useState, useEffect } from 'react';
import { db, auth } from './firebase-config'
import { collection, getDocs, addDoc, doc, deleteDoc } from 'firebase/firestore'
import { useAuthState } from "react-firebase-hooks/auth";

function App() {
  const [entries, setEntries] = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [user] = useAuthState(auth);

  const current = new Date();
  const date = `${current.getMonth() + 1}/${current.getDate()}/${current.getFullYear()}`;

  const entriesRef = user ? collection(db, user.uid) : <Login />;

  // console.log(user.uid);

  const addEntry = async (e) => {
    e.preventDefault();

    let newEntryRef = await addDoc(entriesRef, { postTitle: newTitle, postContent: newContent, date: date });

    setEntries([...entries, { postTitle: newTitle, postContent: newContent, date: date, id: newEntryRef.id }]);

    setNewTitle('');
    setNewContent('');
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
    // and set what we see on the frontend to be our entry data in the firestore
    const getEntries = async () => {
      const data = await getDocs(entriesRef);
      setEntries(data.docs.map((doc) => ({ ...doc.data(), id: doc.id, key: doc.id })));
    }

    getEntries();
  }, []);

  const signOut = () => {
    auth.signOut();
  }

  return (
    <div className="App">
      {user ? (<div className="whole-app-container">
        <div>
          {
            entries.map((entry) => {
              return <div className='entry-card' key={entry.id}>
                <h1 className='entry-title'>Title: {entry.postTitle}</h1>
                <h4 className='entry-date'>Date of Entry: {entry.date}</h4>
                <p>Entry: {entry.postContent}</p>
                <button className='button' onClick={() => { deleteEntry(entry.id) }}>Delete Entry</button>
              </div>
            })
          }
        </div>
        <div className='top-section-container'>
          <div className="header-container">
            <h1 className='header'>My Journal</h1>
            <h3 className='currentDate'>{date}</h3>
          </div>
          <form onSubmit={addEntry}>
            <div className='entry-container'>
              <input
                placeholder='Entry Title...'
                value={newTitle}
                onChange={(e) => { setNewTitle(e.target.value) }} />
              <textarea
                placeholder='Entry...'
                value={newContent}
                onChange={(e) => { setNewContent(e.target.value) }} />
            </div>
            <button className='button' type='submit'>Add Entry</button>
          </form>
          <button onClick={signOut}>Sign Out</button>
        </div>
      </div>) : (
        <Login />
      )}
    </div >
  );
}

export default App;

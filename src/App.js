import { useState, useEffect } from 'react';
import './App.css';
import { db } from './firebase-config'
import { collection, getDocs, addDoc, doc, deleteDoc } from 'firebase/firestore'

function App() {
  const [entries, setEntries] = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');

  const current = new Date();
  const date = `${current.getMonth() + 1}/${current.getDate()}/${current.getFullYear()}`;

  const entriesRef = collection(db, "entries");


  const addEntry = (e) => {
    e.preventDefault();

    addDoc(entriesRef, { postTitle: newTitle, postContent: newContent, date: date });

    setEntries([...entries, { postTitle: newTitle, postContent: newContent, date: date }]);

    setNewTitle('');
    setNewContent('');
  }

  const deleteEntry = (id) => {
    const entryDoc = doc(db, "entries", id);
    // showing deleted on frontend without page reload
    const updatedEntries = [...entries].filter((entry) => entry.id !== id);

    setEntries(updatedEntries);
    deleteDoc(entryDoc);

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

  return (
    <div className="App">
      <div className='top-section-container'>
        <h1 className='header'>My Journal</h1>
        <form onSubmit={addEntry}>
          <h3 className='currentDate'>{date}</h3>
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
          <button className='entry-button' type='submit'>Add Entry</button>
        </form>
      </div>

      {
        entries.map((entry) => {
          return <div key={entry.id}>
            <h1>Title: {entry.postTitle}</h1>
            <h4>Date of Entry: {entry.date}</h4>
            <p>Entry: {entry.postContent}</p>
            <button onClick={() => { deleteEntry(entry.id) }}>Delete Entry</button>
          </div>
        })
      }
    </div >
  );
}

export default App;

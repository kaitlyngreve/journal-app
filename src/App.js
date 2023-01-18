import Login from "./Login";
import MainContent from "./MainContent";
import DetailContent from "./DetailContent";

import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";

import { db, auth } from './firebase-config'
import { collection, getDocs } from 'firebase/firestore'
import { useAuthState } from "react-firebase-hooks/auth";

function App() {
  const [entries, setEntries] = useState([]);
  const [user] = useAuthState(auth);

  const entriesRef = user ? collection(db, user.uid) : <Login />;

  const timestamp = Date.now(); // Unix timestamp in milliseconds
  const sortedEntries = entries.slice().sort((a, b) => b.timestamp - a.timestamp);

  let current = new Date(timestamp); // Get a Date object with our current timestamp
  const todayDate = `${current.getMonth() + 1}/${current.getDate()}/${current.getFullYear()}`;
  console.log(todayDate)

  useEffect(() => {
    const getEntries = async () => {
      const data = await getDocs(entriesRef);

      setEntries(data.docs.map((doc) => ({ ...doc.data(), id: doc.id, key: doc.id })));
    }
    getEntries();
  }, [user]);

  const handleDeleteEntry = (id) => {
    const updatedEntries = [...entries].filter((entry) => entry.id !== id);
    setEntries(updatedEntries);
  }

  return (
    <Router>
      <div className="App">
        <Routes>
          {user ? (
            <>
              <Route path='/' element={
                <MainContent
                  timestamp={timestamp}
                  user={user}
                  entries={entries}
                  setEntries={setEntries}
                  entriesRef={entriesRef}
                  todayDate={todayDate}
                  sortedEntries={sortedEntries}
                />
              }
              />
              <Route path='/:id' element={
                <DetailContent
                  user={user}
                  todayDate={todayDate}
                  entries={entries}
                  sortedEntries={sortedEntries}
                  handleDeleteEntry={handleDeleteEntry}
                  setEntries={setEntries}
                />
              } />
            </>
          )
            : (
              <Route path='/' element={<Login />} />
            )
          }
          <Route path='*' element={<Navigate to={'/'} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
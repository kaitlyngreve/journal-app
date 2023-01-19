import { useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { db } from './firebase-config';
import { doc, deleteDoc } from 'firebase/firestore';
import { updateDoc } from 'firebase/firestore';

function EntryDetail({ entries, entry, handleDeleteEntry, user, setEntries }) {
    const [updateTitle, setUpdateTitle] = useState(entry.postTitle);

    const { id } = useParams();
    const navigate = useNavigate();

    const entryDetails = entries.filter(entry => entry.id == id);

    const deleteEntry = () => {
        const entryDoc = doc(db, user.uid, id);
        deleteDoc(entryDoc);

        handleDeleteEntry(entry);
        navigate('/');

        const remainingEntries = [...entries].filter((entry) => entry.id !== id);
        setEntries(remainingEntries);
    }

    const updateEntry = () => {
        const updatedEntry = doc(db, user.uid, id)
        const newTitle = { postTitle: 'starting of update' }
        updateDoc(updatedEntry, newTitle);

        setUpdateTitle(newTitle);
    }

    return (
        <div>
            <h4>{entryDetails[0].postTitle}</h4>
            <p>{entryDetails[0].postContent}</p>
            <button onClick={deleteEntry} className='button delete-button'>Delete Note</button>
            <button onClick={updateEntry} className='button'>Update Note</button>
        </div>
    )
}

export default EntryDetail;
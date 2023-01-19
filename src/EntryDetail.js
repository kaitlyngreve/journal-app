import { useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { db } from './firebase-config';
import { doc, deleteDoc } from 'firebase/firestore';
import { updateDoc } from 'firebase/firestore';

function EntryDetail({ entries, entry, handleDeleteEntry, user, setEntries }) {

    const { id } = useParams();
    const navigate = useNavigate();

    const entryDetails = entries.filter(entry => entry.id == id);

    const deleteEntry = () => {
        const entryDoc = doc(db, user.uid, id);
        deleteDoc(entryDoc);

        handleDeleteEntry(entry);
        navigate('/');

        const updatedEntries = [...entries].filter((entry) => entry.id !== id);
        setEntries(updatedEntries);
    }

    return (
        <div>
            <h1>{entryDetails[0].postTitle}</h1>
            <button onClick={deleteEntry}>delete</button>
        </div>
    )
}

export default EntryDetail;
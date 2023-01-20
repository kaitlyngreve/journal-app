import UpdateEntry from './UpdateEntry'

import { useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { db } from './firebase-config';
import { doc, deleteDoc } from 'firebase/firestore';
import { updateDoc } from 'firebase/firestore';

function EntryDetail({ entries, entry, handleDeleteEntry, user, setEntries }) {
    const [isBeingEdited, setIsBeingEdited] = useState(false);

    const [updateTitle, setUpdateTitle] = useState(entry.postTitle);

    const { id } = useParams();
    const navigate = useNavigate();

    const entryDetails = entries.filter(entry => entry.id == id);

    const handleIsBeingEdited = () => {
        setIsBeingEdited(isBeingEdited => !isBeingEdited)
    }

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
            {!isBeingEdited ? (
                <>
                    <h4>{entryDetails[0].postTitle}</h4>
                    <p>{entryDetails[0].postContent}</p>
                    <button onClick={deleteEntry} className='button delete-button'>Delete Note</button>
                    <button onClick={handleIsBeingEdited} className='button'>Update Entry</button>
                </>)
                :
                (<UpdateEntry handleIsBeingEdited={handleIsBeingEdited} entry={entryDetails[0]} />)}
        </div>
    )
}

export default EntryDetail;
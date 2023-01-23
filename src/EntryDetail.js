import UpdateEntry from './UpdateEntry'

import { useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { db } from './firebase-config';
import { doc, deleteDoc } from 'firebase/firestore';

function EntryDetail({ entries, entry, handleDeleteEntry, handleUpdateEntry, user, setEntries, entriesRef, timestamp }) {
    const [isBeingEdited, setIsBeingEdited] = useState(false);

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

    return (
        <div>
            {!isBeingEdited ? (
                <div>
                    <h4 className='entry-detail-title'>{entryDetails[0].postTitle}</h4>
                    <p className='entry-detail-content'>{entryDetails[0].postContent}</p>
                    <button onClick={deleteEntry} className='button form-button'>Delete Note</button>
                    <button onClick={handleIsBeingEdited} className='button'>Update Entry</button>
                </div>)
                :
                (<UpdateEntry timestamp={timestamp} entriesRef={entriesRef} setEntries={setEntries} handleUpdateEntry={handleUpdateEntry} handleIsBeingEdited={handleIsBeingEdited} entry={entryDetails[0]} user={user} id={id} />)}
        </div>
    )
}

export default EntryDetail;
import UpdateEntry from './UpdateEntry'

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { db } from './firebase-config';
import { doc, deleteDoc } from 'firebase/firestore';

function EntryDetail({ entries, entry, handleDeleteEntry, handleUpdateEntry, user, setEntries, entriesRef, timestamp }) {
    const [isBeingEdited, setIsBeingEdited] = useState(false);
    const [successMessage, setSuccessMessage] = useState({ active: false });

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

    useEffect(() => {
        // Remove success message after a time
        setTimeout(function () {
            setSuccessMessage({ active: false })
        }, 5000);

    }, [successMessage]);

    return (
        <div>
            {!isBeingEdited ? (
                <div>
                    <h4 className='entry-detail-title'>{entryDetails[0].postTitle}</h4>
                    <p className='entry-detail-content'>{entryDetails[0].postContent}</p>
                    <button onClick={deleteEntry} className='button form-button'>Delete Note</button>
                    <button onClick={handleIsBeingEdited} className='button'>Update Entry</button>
                    <div className={'success-container notification-container ' + (successMessage.active ? 'active' : 'notActive')}>Awesome! Your note has been updated.</div>
                </div>)
                :
                (<UpdateEntry
                    timestamp={timestamp}
                    entriesRef={entriesRef}
                    setEntries={setEntries}
                    handleUpdateEntry={handleUpdateEntry}
                    handleIsBeingEdited={handleIsBeingEdited}
                    entry={entryDetails[0]}
                    user={user}
                    id={id}
                    setSuccessMessage={setSuccessMessage}
                />)}
        </div>
    )
}

export default EntryDetail;
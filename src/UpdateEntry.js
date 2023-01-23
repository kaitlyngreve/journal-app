import { useState } from 'react'
import { db } from './firebase-config';
import { doc } from 'firebase/firestore';
import { updateDoc } from 'firebase/firestore';

function UpdateEntry({ handleIsBeingEdited, entriesRef, timestamp, entry, user, id, handleUpdateEntry, setSuccessMessage }) {
    const [updateTitle, setUpdateTitle] = useState(entry.postTitle);
    const [updateContent, setUpdateContent] = useState(entry.postContent);
    let entryContentTextarea = document.getElementById('entry-content-textarea');

    const submitUpdateEntry = (e) => {
        e.preventDefault();

        const updatedEntry = doc(db, user.uid, id)
        const newEntry = (entriesRef, { postTitle: updateTitle, postContent: updateContent, timestamp: timestamp, id: updatedEntry.id })
        updateDoc(updatedEntry, newEntry);


        handleUpdateEntry(newEntry);
        handleIsBeingEdited();

        setSuccessMessage({
            active: true
        })
    }

    function text_area_auto_grow(element) {
        element.style.height = "5px";
        element.style.height = (element.scrollHeight) + "px";
    }

    if (entryContentTextarea) {
        text_area_auto_grow(entryContentTextarea)
    }

    return (
        <div>
            <form onSubmit={submitUpdateEntry}>
                <div className='new-entry-container'>
                    <input
                        value={updateTitle}
                        onChange={(e) => setUpdateTitle(e.target.value)}
                    />
                    <textarea
                        id="entry-content-textarea"
                        value={updateContent}
                        onChange={(e) => {
                            setUpdateContent(e.target.value)
                            text_area_auto_grow(e.target)
                        }}
                    />
                </div>
                <button type='submit' className='button form-button'>Submit Update</button>
                <button onClick={handleIsBeingEdited} className="button">Abandon Update</button>
            </form>
        </div>
    )
}

export default UpdateEntry;
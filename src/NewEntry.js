import { useState, useEffect } from 'react'
import { addDoc } from 'firebase/firestore'

function NewEntry({ entries, setEntries, entriesRef, date }) {
    const [newTitle, setNewTitle] = useState('');
    const [newContent, setNewContent] = useState('');
    const [errorMessage, setErrorMessage] = useState({ error: false, msg: "" });
    const [successMessage, setSuccessMessage] = useState({ error: false, msg: "" })

    const addEntry = async (e) => {
        e.preventDefault();
        if (newTitle === "" || newContent === "") {
            setErrorMessage({
                error: true,
                msg: "Hey there! Make sure all form fields have been filled out before submitting."
            });
            setNewTitle(newTitle.e.target.value);
            setNewContent(newContent.e.target.value);
        } else {
            let newEntryRef = await addDoc(entriesRef, { postTitle: newTitle, postContent: newContent, date: date });
            setEntries([...entries, { postTitle: newTitle, postContent: newContent, date: date, id: newEntryRef.id }]);
            setSuccessMessage({
                error: true,
                msg: "Awesome! Your new entry was added to your journal."
            });
        }
        setNewTitle('');
        setNewContent('');
    }

    const handleResetErrors = () => {
        setErrorMessage(null);
    }

    // useEffect functions 
    useEffect(() => {
        const delay = (ms) => {
            return new Promise(resolve => setTimeout(resolve, ms));
        }

        delay(10000).then(setSuccessMessage).catch(successMessage);
    }, [entries]);

    // Helper Function for auto-height Textarea
    function text_area_auto_grow(element) {
        element.style.height = "5px";
        element.style.height = (element.scrollHeight) + "px";
    }

    return (
        <div>
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
                {successMessage?.msg && (<div className="success-container">{successMessage.msg}</div>)}
            </form>
        </div>
    )
}

export default NewEntry
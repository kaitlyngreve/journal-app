import { useState, useEffect } from 'react'
import { addDoc } from 'firebase/firestore'

function NewEntry({ entries, setEntries, entriesRef, timestamp }) {
    const [newTitle, setNewTitle] = useState('');
    const [newContent, setNewContent] = useState('');
    const [errorMessage, setErrorMessage] = useState({ error: false, msg: "" });
    const [successMessage, setSuccessMessage] = useState({ active: false })

    const addEntry = async (e) => {
        e.preventDefault();
        if (newTitle === "" || newContent === "") {
            setErrorMessage({
                error: true,
                msg: "Hey there! Make sure all form fields have been filled out before submitting."
            });
            setNewTitle(newTitle.e.target.value);
            setNewContent(newContent);
        } else {
            console.log('elsely')
            let newEntryRef = await addDoc(entriesRef, { postTitle: newTitle, postContent: newContent, timestamp: timestamp });
            setEntries([...entries, { postTitle: newTitle, postContent: newContent, timestamp: timestamp, id: newEntryRef.id }]);
            setSuccessMessage({
                active: true
            });
        }
        setNewTitle('');
        setNewContent('');
    }

    const handleResetErrors = () => {
        setErrorMessage(null);
    }

    useEffect(() => {

        // Remove success message after a time
        setTimeout(function () {
            setSuccessMessage({ active: false })
        }, 5000);

    }, [entries]);


    function text_area_auto_grow(element) {
        element.style.height = "5px";
        element.style.height = (element.scrollHeight) + "px";
    }

    return (

        <div className='new-entry-section-container'>
            <form onSubmit={addEntry}>
                <div className='new-entry-container'>
                    <input
                        placeholder='Entry Title...'
                        value={newTitle}
                        onChange={(e) => { setNewTitle(e.target.value) }} />
                    {entries.length === 0 ? (
                        <textarea
                            placeholder=
                            'Hello, welcome to Notable ✏️ To start your first journal entry, type here! Once you have finished your entry, hit the + Add Entry button. To revisit previous entries select an entry from the side navigation bar. Happy Journaling!'
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
                <div className={'success-container notification-container ' + (successMessage.active ? 'active' : 'notActive')}>Awesome! Your note has been added.</div>
            </form>
        </div>
    )
}

export default NewEntry
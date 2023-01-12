

function EntryCard({ entry, deleteEntry }) {
    return (
        <div>
            <div className='side-entry' >
                <h4 className='side-entry-title'>Title: {entry.postTitle}</h4>
                <h4 className='side-entry-date'>Date of Entry: {entry.date}</h4>
                <button className='button' onClick={() => { deleteEntry(entry.id) }}>Delete Entry</button>
            </div>
        </div>
    )
}

export default EntryCard;
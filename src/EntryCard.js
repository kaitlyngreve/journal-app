

function EntryCard({ entry, deleteEntry }) {
    console.log(entry);
    console.log(entry.timestamp);
    let timeOfEntry = new Date(entry.timestamp);
    const date = `${timeOfEntry.getMonth() + 1}/${timeOfEntry.getDate()}/${timeOfEntry.getFullYear()}`;

    return (
        <div className='side-entry'>
            <h4 className='side-entry-title'>Title: {entry.postTitle}</h4>
            <h4 className='side-entry-date'>Date of Entry: {date}</h4>
            <button className='button' onClick={() => { deleteEntry(entry.id) }}>Delete Entry</button>
        </div>
    )
}

export default EntryCard;
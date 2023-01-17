import { Link } from 'react-router-dom';

function EntryCard({ entry, deleteEntry }) {

    let entryTime = new Date(entry.timestamp);

    return (
        <div className='side-entry'>
            <Link to={`/${entry.id}`}>
                <div>
                    <h4 className='side-entry-title'>Title: {entry.postTitle}</h4>
                    <h4 className='side-entry-date'>Date of Entry: {entryTime.getMonth() + 1}/{entryTime.getDate()}/{entryTime.getFullYear()}</h4>
                </div>
            </Link>
            <button className='button' onClick={() => { deleteEntry(entry.id) }}>Delete Entry</button>
        </div>
    )
}

export default EntryCard;
import { Link } from 'react-router-dom';

function EntryCard({ entry }) {

    let entryTime = new Date(entry.timestamp);

    return (
        <div>
            <Link to={`/${entry.id}`} className='link'>
                <div className='side-entry'>
                    <h4 className='side-entry-title'>Title: {entry.postTitle}</h4>
                    <h4 className='side-entry-date'>Date of Entry: {entryTime.getMonth() + 1}/{entryTime.getDate()}/{entryTime.getFullYear()}</h4>
                </div>
            </Link>
        </div>
    )
}

export default EntryCard;
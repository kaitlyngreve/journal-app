import EntryCard from "./EntryCard";
import Signout from "./Signout";
import { useNavigate } from 'react-router-dom'

function Entries({ entries, user }) {
    const navigate = useNavigate();

    const toNewEntry = () => {
        navigate('/');
    }

    return (

        <div className="side-entries-container">
            <div className="side-header-top-content">
                <h3 className="side-header">{user.displayName}'s Notes👇</h3>
                <button className="new-entry-button" onClick={toNewEntry} >New Note</button>
            </div>
            <div>
                {entries.map((entry) => {
                    return <EntryCard
                        key={entry.id}
                        entry={entry}
                    />
                })}
            </div>
            <div className="side-header-bottom-content" >
                <Signout />
            </div>
        </div>
    )
}

export default Entries;
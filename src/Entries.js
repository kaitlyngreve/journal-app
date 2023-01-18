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
                <h3 className="side-header">{user.displayName}'s Entries👇</h3>
                <button className="button " onClick={toNewEntry} >New Entry</button>
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
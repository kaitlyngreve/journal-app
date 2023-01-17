import EntryCard from "./EntryCard";
import Signout from "./Signout";

function Entries({ entries, deleteEntry, user }) {
    return (

        <div className="side-entries-container">
            <div className="side-header-top-content">
                <h3 className="side-header">{user.displayName}'s Entries👇</h3>
            </div>
            <div>
                {entries.map((entry) => {
                    return <EntryCard
                        key={entry.id}
                        entry={entry}
                        deleteEntry={deleteEntry} />
                })}
            </div>
            <div className="side-header-bottom-content" >
                <Signout />
            </div>
        </div>
    )
}

export default Entries;
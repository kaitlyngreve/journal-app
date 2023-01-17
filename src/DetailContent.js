import Header from "./Header";
import Entries from "./Entries";
import EntryDetail from "./EntryDetail"

function DetailContent({ user, sortedEntries, entries, deleteEntry, todayDate }) {
    return (
        <div className="whole-app-container">
            <Entries entries={sortedEntries} deleteEntry={deleteEntry} user={user} />
            <div className="new-entry-section-container">
                <Header user={user} date={todayDate} />
                <EntryDetail entries={entries} />
            </div>
        </div>
    )
}

export default DetailContent;
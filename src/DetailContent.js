import Header from "./Header";
import Entries from "./Entries";
import EntryDetail from "./EntryDetail"

function DetailContent({ user, sortedEntries, entries, todayDate, handleDeleteEntry, setEntries }) {

    const entry = entries.map((entry) => entry);

    return (
        <div className="whole-app-container">
            <Entries entries={sortedEntries} user={user} />
            <div className="new-entry-section-container">
                <Header user={user} date={todayDate} />
                <EntryDetail entries={entries} entry={entry} handleDeleteEntry={handleDeleteEntry} user={user} setEntries={setEntries} />
            </div>
        </div>
    )
}

export default DetailContent;
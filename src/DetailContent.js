import Header from "./Header";
import Entries from "./Entries";
import EntryDetail from "./EntryDetail"

function DetailContent({ user, entriesRef, sortedEntries, entries, todayDate, timestamp, handleDeleteEntry, setEntries, handleUpdateEntry }) {

    const entry = entries.map((entry) => entry);

    return (
        <div className="whole-app-container">
            <Entries entries={sortedEntries} user={user} />
            <div className="new-entry-section-container">
                <Header user={user} todayDate={todayDate} />
                <EntryDetail
                    handleUpdateEntry={handleUpdateEntry}
                    timestamp={timestamp}
                    entriesRef={entriesRef}
                    entries={entries}
                    entry={entry}
                    handleDeleteEntry={handleDeleteEntry}
                    user={user}
                    setEntries={setEntries} />
            </div>
        </div>
    )
}

export default DetailContent;
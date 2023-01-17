import NewEntry from "./NewEntry";
import Header from "./Header";
import Entries from "./Entries";


function MainContent({ entries, user, todayDate, timestamp, sortedEntries, deleteEntry, entriesRef, setEntries }) {
    return (
        <div className="whole-app-container">
            <Entries entries={sortedEntries} deleteEntry={deleteEntry} user={user} />
            <div className="new-entry-section-container">
                <Header user={user} date={todayDate} />
                <NewEntry
                    timestamp={timestamp}
                    entries={entries}
                    setEntries={setEntries}
                    entriesRef={entriesRef}
                />
            </div>
        </div>
    )
}

export default MainContent;
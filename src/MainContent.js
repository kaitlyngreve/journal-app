import NewEntry from "./NewEntry";
import Header from "./Header";
import Entries from "./Entries";


function MainContent({ entries, user, todayDate, timestamp, sortedEntries, entriesRef, setEntries }) {
    return (
        <div className="whole-app-container">
            <Entries entries={sortedEntries} user={user} />
            <div className="new-entry-section-container">
                <Header user={user} todayDate={todayDate} />
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
import EntryCard from "./EntryCard";

function Entries({ entries, deleteEntry }) {
    return (
        <div>
            {entries.map((entry) => {
                return <EntryCard
                    key={entry.id}
                    entry={entry}
                    deleteEntry={deleteEntry} />
            })}
        </div>
    )
}

export default Entries;
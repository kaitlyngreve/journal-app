

function UpdateEntry({ handleIsBeingEdited, entry }) {

    console.log(entry)

    return (
        <button onClick={handleIsBeingEdited} className="button">Go Back</button>
    )
}

export default UpdateEntry;
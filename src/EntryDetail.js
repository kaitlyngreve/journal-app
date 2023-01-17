import { useParams, useNavigate } from "react-router-dom";

function EntryDetail({ entries }) {
    const navigate = useNavigate();
    const { id } = useParams();

    const backButton = () => {
        navigate('/')
    }

    const entryDetails = entries.filter(entry => entry.id == id);

    return (
        <div>
            <h1>{entryDetails[0].postTitle}</h1>
            <button onClick={backButton}>x</button>
        </div>
    )
}

export default EntryDetail;
import { useParams, useNavigate } from "react-router-dom";

function EntryDetail({ entries }) {
    const navigate = useNavigate();
    const { id } = useParams();

    const backButton = () => {
        navigate('/')
    }

    const entryDetails = entries.filter(entry => entry.id == id);

    return (
        <div className='whole-app-container'>
            <div className="new-entry-section-container">
                <div className='new-entry-container'>
                    <h1>{entryDetails[0].postTitle}</h1>
                </div>
            </div>
            <button onClick={backButton}>x</button>
        </div>
    )
}

export default EntryDetail;
import { auth } from "./firebase-config"

function Signout() {

    const signOut = () => {
        auth.signOut();
    }

    return (
        <div>
            <button className="button sign-out-button" onClick={signOut}>Sign Out</button>
        </div>
    )
}

export default Signout;
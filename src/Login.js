import { auth } from "./firebase-config"
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

function Login() {

    const signInWithGoogle = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider);
    };

    return (
        <div className="login-page-container">
            <div className="login-container">
                <h1>🗒✏️ Welcome to Journal-It</h1>
                <h3>To login, sign in with Google</h3>
                <button className="button sign-in-button" onClick={signInWithGoogle}>Sign In</button>
            </div>
        </div>
    )
}

export default Login;
import { auth } from "./firebase-config"
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

function Login() {

    const signInWithGoogle = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider);
    };

    return (
        <div>
            <button onClick={signInWithGoogle}>Sign In</button>
        </div>
    )
}

export default Login;
import { auth, provider } from "../config/firebase";
import { signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

export const Profile = () =>{
    const [user] = useAuthState(auth);
    const signUserOut = async () =>{
        await signOut(auth);
    }
    return(
        <div>
            <button onClick={signUserOut}>Log Out</button>
        </div>
    )
}
import { Link } from "react-router-dom";
import { auth, provider } from "../config/firebase";
import { signInWithPopup } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";

export const Navbar = () =>{

  const signInWithGoogle = async () =>{
   const result = await signInWithPopup(auth,provider);
   console.log(result);
 }
   const [user] = useAuthState(auth);
    return(
        <div className="navbar bg-base-100">
  <div className="flex-1">
    <a className="btn btn-ghost text-xl">Shopee</a>
  </div>
  <div className="flex-none">
    <ul className="menu menu-horizontal px-1">
      <li><Link to="/">Home</Link></li>
      <li><Link to="/shop">Shop</Link></li>
      <li><Link to="/about">About</Link></li>
      <li><Link to="/contact">Contact</Link></li>
      {user && (
        <><li><Link to ="/profile"> <img src = {auth.currentUser?.photoURL || ""} width="20" height="20"/>{auth.currentUser?.displayName}</Link></li></>
      )}
     {!user && <li> <button className="btn btn-outline btn-warning header-button btn-sm" onClick={signInWithGoogle}>Login with Google</button></li>}

    </ul>
  </div>
</div>
    )
}

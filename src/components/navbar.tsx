import { Link } from "react-router-dom";
import { auth, provider } from "../config/firebase";
import { signInWithPopup } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";

export const Navbar = () => {
  const signInWithGoogle = async () => {
    const result = await signInWithPopup(auth, provider);
    console.log(result);
  };
  
  const [user] = useAuthState(auth);
  const signUserOut = async () =>{
    await signOut(auth);
}
  
  return (
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
            <li>
              <div className="drawer drawer-end">
                <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                  {/* Page content here */}
                  <label htmlFor="my-drawer-4" className="flex items-center space-x-2">
                    <img src={auth.currentUser?.photoURL || ""} alt="User Avatar" className="w-6 h-6 rounded-full" />
                    <span>{auth.currentUser?.displayName}</span>
                  </label>
                </div> 
                <div className="drawer-side" style={{ zIndex: 1000 }}>
                  <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                  <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                    {/* Sidebar content here */}
                    <br/>
                    <br/>
                    <div className="flex flex-col items-center">
                      <img 
                        src={auth.currentUser?.photoURL || ""} 
                        alt="User Avatar" 
                        className="w-20 h-20  mb-4"
                      />
                    </div>
                    <p>Name:- {auth.currentUser?.displayName}</p>
                    <p>Email:- {auth.currentUser?.email}</p>
                    <p>Phone Number:- {auth.currentUser?.phoneNumber || <>Unavailable</>}</p>
                    <button onClick={signUserOut} className="btn btn-outline btn-error">Log Out</button>
                  </ul>
                  
                </div>
              </div>
            </li>
          )}
          {!user && (
            <li>
              <button className="btn btn-outline btn-warning header-button btn-sm" onClick={signInWithGoogle}>
                Login with Google
              </button>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

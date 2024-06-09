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

  const signUserOut = async () => {
    await signOut(auth);
  };

  const [user] = useAuthState(auth);

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
                  <div className="flex flex-col h-full">
                    <div className="menu p-4 w-80 bg-base-200 text-base-content flex-grow">
                      {/* Sidebar content here */}
                      <div className="flex flex-col items-center mb-4">
                        <img 
                          src={auth.currentUser?.photoURL || ""} 
                          alt="User Avatar" 
                          className="w-20 h-20 mb-4"
                        />
                      </div>
                      <div className="text-left w-full space-y-2">
                        <p className="text-lg font-semibold">Name: <span className="font-normal">{auth.currentUser?.displayName}</span></p>
                        <p className="text-lg font-semibold">Email: <span className="font-normal truncate">{auth.currentUser?.email}</span></p>
                        <p className="text-lg font-semibold">Phone Number: <span className="font-normal">{auth.currentUser?.phoneNumber || "Unavailable"}</span></p>
                      </div>
                    </div>
                    <div className="p-4 bg-base-200">
                      <button onClick={signUserOut} className="btn btn-outline btn-error w-full">Log Out</button>
                    </div>
                  </div>
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

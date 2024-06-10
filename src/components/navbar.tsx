import { Link } from "react-router-dom";
import { auth, provider } from "../config/firebase";
import { signInWithPopup } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../config/firebase";

interface AddUserData {
  userAddress: string;
}

export const Navbar = () => {
  const [isAddress, setAddress] = useState(false);
  const signInWithGoogle = async () => {
    const result = await signInWithPopup(auth, provider);
  };

  const signUserOut = async () => {
    await signOut(auth);
  };

  const [user] = useAuthState(auth);
  const editAddress = () => {
    setAddress(!isAddress);
  };
  const postsRef = collection(db, "users");
  const schema = yup.object().shape({
    userAddress: yup.string().required("*Address Cannot Be Empty"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddUserData>({
    resolver: yupResolver(schema),
  });

  const onCreatePost = async (data: AddUserData) => {
    await addDoc(postsRef, {
      userAddress: data.userAddress,
      userEmail: user?.email,
      userId: user?.uid,
      userName: user?.displayName,
    });
  };

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
                        <p className="text-lg font-semibold">Name <br/> <span className="font-normal">{auth.currentUser?.displayName}</span></p>
                        <p className="text-lg font-semibold">Email <br/> <span className="font-normal truncate">{auth.currentUser?.email}</span></p>
                        <p className="text-lg font-semibold">Phone Number <br/> <span className="font-normal">{auth.currentUser?.phoneNumber || "Unavailable"}</span></p>
                        <p className="text-lg font-semibold">Address <button  className="text-sm text-blue-600 underline focus:outline-none" onClick={editAddress}>{!isAddress? <>Edit</> : <>Cancel</>}</button> <br/>
                        <form onSubmit={handleSubmit(onCreatePost)}>
                        <span className="font-normal">{ isAddress ?<> 
                          <input 
                            type="text" 
                            placeholder="Type here" 
                            className="input input-bordered input-accent w-full max-w-xs"
                            {...register("userAddress")}
                          /> 
                          <input type="submit" className="btn btn-primary ml-2" value="Submit"/> 
                          <p style={{ color: "red" }}>{errors.userAddress?.message}</p> 
                        </> :<>Unavailable</> }</span>
                        </form>
                        </p>
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

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


export const Admin = () =>{
    useEffect(() => {
        // Clear authentication status on component mount
        localStorage.setItem('auth', 'false');
      }, []);
    return(
        <div>
        </div>
    )
}
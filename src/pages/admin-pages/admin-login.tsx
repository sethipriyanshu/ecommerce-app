import { useState } from "react";
import { useNavigate } from 'react-router-dom';


const fixedUsername = 'admin';
const fixedPassword = 'abc123';

export const AdminLogin = () =>{
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const handleLogin = () => {
        if (username === fixedUsername && password === fixedPassword) {
          localStorage.setItem('auth', 'true');
          navigate('/admin');
        } else {
          alert('Invalid credentials');
        }
      };


    return(
        <div>
            <div className="hero min-h-screen bg-base-200">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
      <form className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Username</span>
          </label>
          <input
        type="text"
        placeholder="Username"
        value={username} className="input input-bordered" required
        onChange={(e) => setUsername(e.target.value)}
      />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input
        type="password"
        placeholder="Password" className="input input-bordered" required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
        </div>  
        <div className="form-control mt-6">
          <button className="btn btn-primary" onClick={handleLogin}>Login</button>
        </div>
      </form>
    </div>
  </div>
</div>
        </div>
    )
}
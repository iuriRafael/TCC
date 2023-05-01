import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';

function Login(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
  
    const handleSubmit = (event) => {
      event.preventDefault();
      console.log(`Username: ${username}, Password: ${password}`);
    }
    return(
        <div className="App">
            <form onSubmit={handleSubmit}>
                <label>
                    Username:
                    <input type="text" value={username} onChange={event => setUsername(event.target.value)} />
                </label>
                <label>
                    Password:
                    <input type="password" value={password} onChange={event => setPassword(event.target.value)} />
                 </label>
                 <button type="submit">Login</button>
            </form>
        </div>
    )

}

export default Login
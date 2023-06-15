import React from 'react';
import {useState} from 'react';
import {useParams, useHistory} from 'react-router-dom';
import { Link } from 'react-router-dom';
import { callAPI } from '../api';


const Login = ({setToken,setGuest}) => {
    const history = useHistory();
    const params = useParams();
    const{actionType} = params;


    const [username,setUsername] = useState("");
    const [password,setPassword] = useState ("");



const handleSubmit = async (event) => {
    event.preventDefault();

    const requestBody = {
        user :{ username, password }  
    }
    const data = await callAPI({
        path: `/users/${actionType}`,
        method: "post",
        body: requestBody,    
    })
    const {token} = data;
    setToken(token);
    history.push('/profile');
    
    
        const guest = data?.guest;
        if (guest){
            setUsername('');setPassword('');setToken(token); setGuest(guest);
            history.push('/posts');
        }
 }

    return(
    <>     

    <h1>{actionType === "register" ? "Sign Up Below!" : "Log In"}</h1>
       
        <form onSubmit={handleSubmit} className="loginForm">
            <div>
                <label htmlFor="username">Username</label>
                <input 
                    required
                    className="loginuser"
                    name = "username"
                    type = "text"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                ></input>
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input
                    required
                    className="loginuser"
                    name = "password"
                    type = "password" 
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                ></input> 
            </div>
            <button className="buttonlo" type="submit">{actionType === "register" ? "Register" : "Log In" }</button>
            {actionType === "register"
                ? <Link to="/profile/login">Already a Member? Log in here</Link>
                : <Link to="/profile/register">First Time Here? Register here.</Link>
            
            }

        </form>
        
    </>
    )
 
}

export default Login;
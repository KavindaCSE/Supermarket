import { useState } from "react";
import './signIn.css'; // Import the CSS file
import image from './assets/loginBackground.jpg'
import axios from "axios";


function Login() {
    let [account, setAccount] = useState({ username: "", password: "" });


    let handle_submit = async (e) => {
        e.preventDefault();
        let token = await axios.post('http://127.0.0.1:8000/login',new URLSearchParams(account))
        console.log(token)

        if (token.data === "Incorrect password" || token.data === "No such user") {
            alert(token.data);
        } else {
            let user = await axios.get('http://127.0.0.1:8000/getuser'+'/'+account.username)
            localStorage.setItem("id",user.data.id);
            localStorage.setItem("name", user.data.name);
            localStorage.setItem("email", user.data.email);
            localStorage.setItem("post", user.data.post);
            window.location = '/';
        }
        return token.data;
    }

    let handle_event = (e) => {
        let updatedAccount = { ...account };
        updatedAccount[e.currentTarget.name] = e.currentTarget.value;
        setAccount(updatedAccount);
    }

    return (
        <div className="login-container">
            <div className="login-form">
                <h2>Grocery Store Login</h2>
                <form onSubmit={handle_submit}>
                    <div className="form-group mb-3">
                        <label htmlFor="Username" className="form-label">Username</label>
                        <input
                            value={account.username}
                            onChange={handle_event}
                            type="text"
                            className="form-control"
                            id="Username"
                            name="username"
                        />
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="Password" className="form-label">Password</label>
                        <input
                            value={account.password}
                            onChange={handle_event}
                            type="password"
                            className="form-control"
                            id="Password"
                            name="password"
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Login</button>
                </form>
            </div>
            <div className="login-image">
                <img src={image} alt="Grocery Store Sale" />
            </div>
        </div>
    );
}

export default Login;

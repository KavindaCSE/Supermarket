import React, { Component } from "react";
import './signIn.css'; // Import the CSS file
import image from "./assets/loginBackground.jpg"
import axios from "axios";

class SingIn extends Component {
    state = {
        account: {"name":"", "email": "", "password": "" ,"post":"Customer"}
    }

    handle_submit = async (e) => {
        e.preventDefault();
        await axios.post('http://127.0.0.1:8000/SignIn',this.state.account)
        localStorage.setItem("name",this.state.account.name)
        localStorage.setItem("email",this.state.account.email)
        localStorage.setItem("post",this.state.account.post)
        window.location = '/'

    }

    handle_event = (e) => {
        let account = {...this.state.account}
        account[e.currentTarget.name] = e.currentTarget.value
        this.setState({account})
    }

    handle_reset= () =>{
        let account = {"name":"", "email": "", "password": "" ,"post":"Customer"}
        this.setState({account})
    }

    render() {
        return (
            <div className="login-container">
                <div className="login-form">
                    <h2>Grocery Store SignIn</h2>
                    <form onSubmit={this.handle_submit}>
                        <div className="form-group">
                            <label htmlFor="Name" className="form-label">Name</label>
                            <input  
                                value={this.state.account.name}
                                onChange={this.handle_event}
                                type="text" 
                                className="form-control" 
                                id="Name"
                                name="name" 
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="Email" className="form-label">Email address</label>
                            <input  
                                value={this.state.account.email}
                                onChange={this.handle_event}
                                type="text" 
                                className="form-control" 
                                id="Email"
                                name="email" 
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="Password" className="form-label">Password</label>
                            <input 
                                value={this.state.account.password}
                                onChange={this.handle_event}
                                type="password" 
                                className="form-control" 
                                id="Password" 
                                name="password"
                            />
                        </div>
                        <div className="buttons">
                            <button type="submit" className="btn btn-primary">SignIn</button>
                            <button type="reset" className="btn btn-secondary" onClick={this.handle_reset}>Reset</button>
                        </div>
                    </form>
                </div>
                <div className="login-image">
                    <img src={image} alt="Grocery Store Sale" />
                </div>
            </div>
        )
    }
}

export default SingIn;

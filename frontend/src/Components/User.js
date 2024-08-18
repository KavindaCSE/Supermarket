import React, { Component } from "react";
import './User.css'
import axios from "axios";

class User extends Component {

    state = {
        user: {id:this.props.user.id,name: this.props.user.username,email:this.props.user.email,post:this.props.user.post},
        clicked: false,
        changePw :false,
        currentpw: "",
        newpw:false,
        account:{username:this.props.user.email,password:""}
    }

    handleClick = () => {
        this.setState({ clicked: true })
    }

    confirmPW = async (e) =>{
        e.preventDefault();
        let token = await axios.post('/login',new URLSearchParams(this.state.account))
        if (token.data === "Incorrect password" || token.data === "No such user"){
            alert(token.data)
        }else{
            let newpw = true
            let changePw = false
            let account = {...this.state.account}
            account["password"] = ""
            this.setState({newpw,changePw,account})
        }
    }

    handleChange = (e) => {
        if(this.state.changePw || this.state.newpw){
            const account = {...this.state.account}
            account[e.currentTarget.name] = e.currentTarget.value
            this.setState({account})
        }else{
            const user = {...this.state.user}
            user[e.currentTarget.name] = e.currentTarget.value
            this.setState({user})
        }
    }

    handleSubmit = async(e) => {
        e.preventDefault();

        if (this.state.newpw){
            await axios.post('/newpw',this.state.account)
            alert("Password is successfully changed")

        }else{

            await axios.put(`/updateUser/${this.state.user.id}`,this.state.user)
            localStorage.setItem("id", this.state.user.id);      
            localStorage.setItem("name", this.state.user.name);  
            localStorage.setItem("email", this.state.user.email);
            localStorage.setItem("post", this.state.user.post); 
        } 

        window.location = '/profile'
        // Handle form submission
    }

    handlepw = () => {
        if (this.state.changePw){
            let changePw = false
            this.setState({changePw})
        }else{
            let changePw = true
            this.setState({changePw})
        }
    }

    goback = () => {
        window.location = '/profile'
    }

    render() {
        return (
            <>
                <section className="bg-light">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12 mb-4 mb-sm-5">
                                <div className="card card-style1 border-0">
                                    <div className="card-body p-1-9 p-sm-2-3 p-md-6 p-lg-7">
                                        <div className="row align-items-center">
                                            <div className="col-lg-6 mb-4 mb-lg-0">
                                                <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="..." />
                                            </div>
                                            <div className="col-lg-6 px-xl-10">
                                                <div className="new-style">
                                                    <h3 className="h2 text-white mb-0">{this.props.user.post}</h3>
                                                </div>
                                                <ul className="list-unstyled mb-1-9">
                                                    <li className="mb-2 mb-xl-3 display-28"><span className="display-26 text-secondary me-2 font-weight-600">Name:</span> {this.state.user.name}</li>
                                                    <li className="mb-2 mb-xl-3 display-28"><span className="display-26 text-secondary me-2 font-weight-600">Position:</span> {this.state.user.post}</li>
                                                    <li className="mb-2 mb-xl-3 display-28"><span className="display-26 text-secondary me-2 font-weight-600">Email:</span> {this.state.user.email}</li>
                                                    {!this.state.clicked && !this.state.changePw && !this.state.newpw &&
                                                        <button type="button" className="btn btn-secondary" onClick={this.handleClick}>Edit</button>}
                                                    {!this.state.clicked && !this.state.changePw && !this.state.newpw &&
                                                        <button onClick={this.handlepw} style={{marginLeft:20}} type="button" className="btn btn-warning">Change Password</button>}
                                                    {(this.state.clicked || this.state.changePw || this.state.newpw) ? 
                                                        <button onClick={this.goback} style={{marginLeft:20}} type="button" class="btn btn-secondary">Back</button> : ""}    
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {this.state.clicked && (
                    <form onSubmit={this.handleSubmit} style={{ maxWidth: '500px', margin: 'auto' }}>
                        <div className="mb-3">
                            <label htmlFor="Name" className="form-label">Name</label>
                            <input
                                value={this.state.user.name}
                                onChange={this.handleChange}
                                type="text"
                                className="form-control"
                                id="Name"
                                name="name"
                                style={{ borderColor: '#007bff', borderWidth: '2px' }}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="Email" className="form-label">Email</label>
                            <input
                                value={this.state.user.email}
                                onChange={this.handleChange}
                                type="text"
                                className="form-control"
                                id="Email"
                                name="email"
                                style={{ borderColor: '#007bff', borderWidth: '2px' }}
                            />
                        </div>                        
                        {this.state.user.email && this.state.user.name &&
                            <button type="submit" className="btn btn-primary">Submit</button>                        
                        }
                    </form>
                )}
                {this.state.changePw && (
                    <form onSubmit={this.confirmPW} style={{ maxWidth: '500px', margin: 'auto' }}>
                        <div className="mb-3">
                            <label htmlFor="Password" className="form-label">Current Password</label>
                            <input
                                value={this.state.account.password}
                                onChange={this.handleChange}
                                type="text"
                                className="form-control"
                                id="Password"
                                name="password"
                                style={{ borderColor: '#007bff', borderWidth: '2px' }}
                            />
                        </div>                        
                        {this.state.account.password &&
                            <button type="submit" className="btn btn-primary">Submit</button>                        
                        }
                    </form>
                )}   
                {this.state.newpw && (
                    <form onSubmit={this.handleSubmit} style={{ maxWidth: '500px', margin: 'auto' }}>
                        <div className="mb-3">
                            <label htmlFor="Password" className="form-label">New Password</label>
                            <input
                                value={this.state.account.password}
                                onChange={this.handleChange}
                                type="text"
                                className="form-control"
                                id="Password"
                                name="password"
                                style={{ borderColor: '#007bff', borderWidth: '2px' }}
                            />
                        </div>                        
                        {this.state.account.password &&
                            <button type="submit" className="btn btn-primary">Submit</button>                        
                        }
                    </form>
                )}                              
            </>
        )
    }

}

export default User;

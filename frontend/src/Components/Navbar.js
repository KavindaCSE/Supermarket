import React from "react";
import { NavLink } from "react-router-dom";
import "./nav_bar.css"

function Navbar(props) {
    return (
        <nav className="navbar navbar-expand-lg bg-green">
            <div className="container-fluid">
                <div className="collapse navbar-collapse" id="navbar">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink to='/' className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                                Home
                            </NavLink>
                        </li>                         
                        <li className="nav-item">
                            <NavLink to='/home' className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                                Products
                            </NavLink>
                        </li>                         
                        {!props.user.username && (
                            <>                          
                            <li className="nav-item">
                                <NavLink to='/signin' className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                                    SignIn
                                </NavLink>
                            </li>
                            <li className="nav-item" style={{marginRight:40}}>
                                <NavLink to='/login' className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                                    Login
                                </NavLink>
                            </li>
                            </>
                        )}
                        {props.user.post === "Admin" && (
                            <li className="nav-item">
                            <NavLink to='/suppliers' className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                                Suppliers
                            </NavLink>
                            </li>  
                        )
                        }
                        {(props.user.post === "User" || props.user.post === "Admin")  && (
                            <>
                            <li className="nav-item">
                                <NavLink to='/addproduct' className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                                    Add Product
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to='/addsupplier' className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                                    Add Supplier
                                </NavLink>
                            </li>
                            </>
                        )}
                        {props.user.username &&
                            <>
                                <li className="nav-item" >
                                    <NavLink to='/profile' className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                                        {props.user.username}
                                    </NavLink>
                                </li>                        
                                <li className="nav-item" >
                                    <NavLink to='/orders' className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                                        Orders
                                    </NavLink>
                                </li>
                                <li className="nav-item" >
                                <NavLink to='/logout' className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                                    Log out
                                </NavLink>
                                </li>                                
                            </>    
                        }
                        <li className="nav-item">
                            <NavLink to='/feedback/-1' className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                                Your Feedback
                            </NavLink>
                        </li> 
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;

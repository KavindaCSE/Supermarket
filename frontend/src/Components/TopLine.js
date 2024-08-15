import React from 'react';
import image from './assets/Logo.jpg';
import './topLine.css'

function TopLine() {
    return (
        <nav className="navbar bg-green">
            <div className="container">
                <a className="navbar-brand">
                    <img src={image} alt="KV Mart Logo" className="rounded-logo" width="50" height="50" />
                    <span className="brand-name">KV Mart</span>
                </a>
            </div>
        </nav>
    );
}

export default TopLine;

import axios from "axios";
import React, { Component } from "react";
import './AddSupplier.css'; // Import the CSS file

class AddSupplier extends Component {
    state = {
        product: {
            name: "",
            company: "",
            email: "",
            phone: 0
        }
    };

    submit = async (e) => {
        
        e.preventDefault();
        await axios.post('/supplier', this.state.product);
        window.location = '/addsupplier';
    };

    handleChange = (e) => {
        let product = { ...this.state.product };
        product[e.currentTarget.name] = e.currentTarget.value;
        this.setState({ product });
    };

    render() {
        return (
            <div className="form-container">
                <form onSubmit={this.submit} className="form">
                    <div className="form-group">
                        <label htmlFor="Name" className="form-label">Supplier Name</label>
                        <input
                            value={this.state.product.name}
                            onChange={this.handleChange}
                            type="text"
                            className="form-control"
                            id="Name"
                            name="name"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="Company" className="form-label">Company</label>
                        <input
                            value={this.state.product.company}
                            onChange={this.handleChange}
                            type="text"
                            className="form-control"
                            id="Company"
                            name="company"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="Email" className="form-label">Email</label>
                        <input
                            value={this.state.product.email}
                            onChange={this.handleChange}
                            type="email"
                            className="form-control"
                            id="Email"
                            name="email"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="Phone" className="form-label">Phone no</label>
                        <input
                            value={this.state.product.phone}
                            onChange={this.handleChange}
                            type="number"
                            className="form-control"
                            id="Phone"
                            name="phone"
                        />
                    </div>
                    {this.state.product.name && this.state.product.email && this.state.product.company && this.state.product.phone 
                    &&
                        <button type="submit" className="btn btn-primary">Submit</button>
                    }
                </form>
            </div>
        );
    }
}

export default AddSupplier;

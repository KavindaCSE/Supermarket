import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";

class Suppliers extends Component {

    state = {
        suppliers: []
    };

    async componentDidMount() {
        const { data: suppliers } = await axios.get("http://127.0.0.1:8000/getsuppliers");
        this.setState({ suppliers });
    }

    render() {
        return (
            <div className="white-content">
                <div className="goods-container">
                    {this.state.suppliers.map(supplier =>
                        <div key={supplier.id} className="goods-box">
                            <Link to={`/updatesupplier/${supplier.id}`}><img src={`https://bootdey.com/img/Content/avatar/avatar7.png`} alt="Products" /></Link>
                            <h2>{supplier.name}</h2>
                            <h4>ID : {supplier.id}</h4>
                            <p>Company: {supplier.company}</p>
                            <p>Email: {supplier.email}</p>
                            <p>Phone no: {supplier.phone}</p>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

export default Suppliers;

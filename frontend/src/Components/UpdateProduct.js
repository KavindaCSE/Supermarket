import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import backGround from './assets/update_product_background.jpg'

class Updateproduct extends Component {
    state = {
        product: {
            id: 0,
            name: "",
            brand: "",
            quantity_in_stock: 0,
            quantity_sold: 0,
            unit_price: 0,
            revenue: 0,
            supplier_id: 0
        },
        supplier : {},
        showDetails : false
    };

    async componentDidMount() {
        let get_product = await axios.get('/product/' + this.props.id);
        let {data:supplier} = await axios.get(`/getsupplierbyproduct/${this.props.id}`)
        let product = {
            id: get_product.data.id,
            name: get_product.data.name,
            brand: get_product.data.brand,
            quantity_in_stock: get_product.data.quantity_in_stock,
            quantity_sold: get_product.data.quantity_sold,
            unit_price: get_product.data.unit_price,
            revenue: get_product.data.revenue,
            supplier_id: get_product.data.supplier_id
        };
        this.setState({ product , supplier});
    }

    submit = async (e) => {
        e.preventDefault();
        await axios.put('/product/' + this.props.id, this.state.product);
        window.location = `/update/${this.state.product.id}`;
    };

    handleChange = (e) => {
        let product = { ...this.state.product };
        product[e.currentTarget.name] = e.currentTarget.value;
        this.setState({ product });
    };

    handleClick = () => {
        let showDetails = this.state.showDetails ? false : true;
        this.setState({ showDetails });
    }

    render() {
        return (
            <div 
                className="container-fluid min-vh-100 d-flex align-items-center justify-content-center" 
                style={{ 
                    backgroundImage: `url(${backGround})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                }}
            >
                <div className="container mt-5">
                    <h2 className="text-center mb-4">Update Product</h2>
                    <div className="row justify-content-center">
                        <div className="col-md-6">
                            <form onSubmit={this.submit} className="shadow p-4 bg-light rounded">
                                <div className="mb-3">
                                    <label htmlFor="Name" className="form-label">Product Name</label>
                                    <input
                                        value={this.state.product.name}
                                        onChange={this.handleChange}
                                        type="text"
                                        className="form-control"
                                        id="Name"
                                        name="name"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="Brand" className="form-label">Product Brand</label>
                                    <input
                                        value={this.state.product.brand}
                                        onChange={this.handleChange}
                                        type="text"
                                        className="form-control"
                                        id="Brand"
                                        name="brand"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="Quantity_in_stock" className="form-label">Quantity in Stock</label>
                                    <input
                                        value={this.state.product.quantity_in_stock}
                                        onChange={this.handleChange}
                                        type="text"
                                        className="form-control"
                                        id="Quantity_in_stock"
                                        name="quantity_in_stock"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="Quantity_sold" className="form-label">Quantity Sold</label>
                                    <input
                                        value={this.state.product.quantity_sold}
                                        onChange={this.handleChange}
                                        type="number"
                                        className="form-control"
                                        id="Quantity_sold"
                                        name="quantity_sold"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="Unit_price" className="form-label">Unit Price</label>
                                    <input
                                        value={this.state.product.unit_price}
                                        onChange={this.handleChange}
                                        type="number"
                                        className="form-control"
                                        id="Unit_price"
                                        name="unit_price"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="Revenue" className="form-label">Revenue</label>
                                    <input
                                        value={this.state.product.revenue}
                                        onChange={this.handleChange}
                                        type="number"
                                        className="form-control"
                                        id="Revenue"
                                        name="revenue"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="Supplier_id" className="form-label">Supplier ID</label>
                                    <input
                                        value={this.state.product.supplier_id}
                                        onChange={this.handleChange}
                                        type="number"
                                        className="form-control"
                                        id="Supplier_id"
                                        name="supplier_id"
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary w-100">Submit</button>
                            </form>
                            <p></p>
                            {this.state.showDetails && 
                            <div className="card" style={{
                                width: "40rem", 
                                transition: "transform 0.3s", 
                                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", 
                                ':hover': {
                                    transform: "scale(1.05)", 
                                    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)"}
                                }}>
                                <div className="card-body">
                                    <h5 className="card-title">Supplier Details</h5>
                                    <p>Name : {this.state.supplier.name}</p>
                                    <p>ID : {this.state.supplier.id}</p>
                                    <p>Company : {this.state.supplier.company}</p>
                                    <p>Email : {this.state.supplier.email}</p>
                                    <p>Phone : {this.state.supplier.phone}</p>
                                </div>
                            </div>}
                            <div className="text-center mt-3">
                                <Link to={'/home'}>
                                    <button type="button" className="btn btn-secondary" style={{ marginRight: "10px" }}>Back</button>
                                </Link>
                                    <button onClick = {this.handleClick} type="button" className="btn btn-danger">
                                        {this.state.showDetails? "Hide Supplier Details":"Show Supplier Details"}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Updateproduct;

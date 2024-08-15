import axios from "axios";
import React, { Component } from "react";

class UpdateSupplier extends Component {
    state = {
        suppliers: {},
        products: [],
        showDetails: false
    }

    async componentDidMount() {
        let { data: suppliers } = await axios.get(`http://127.0.0.1:8000/getsupplier/${this.props.id}`);
        let { data: products } = await axios.get(`http://127.0.0.1:8000/getproductbysupplier/${this.props.id}`);
        this.setState({ suppliers, products });
    }

    handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission
        await axios.put(`http://127.0.0.1:8000/updatesupplier/${this.props.id}`, this.state.suppliers);
        window.location = '/suppliers';
    }

    handleChange = (e) => {
        let suppliers = { ...this.state.suppliers };
        suppliers[e.currentTarget.name] = e.currentTarget.value;
        this.setState({ suppliers });
    }

    handleClick = () => {
        if (this.state.showDetails){
            let showDetails = false
            this.setState({showDetails});
        }else{
            let showDetails = true
            this.setState({showDetails});
        }

    }

    render() {
        return (
            <div 
                style={{
                    minHeight: '100vh',
                    padding: '50px 0',
                }}
                className="container-fluid p-0"
            >
                <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                    <div className="col-md-8 col-lg-6">
                        <form onSubmit={this.handleSubmit} className="shadow-lg p-4 bg-white rounded">
                            <h2 className="mb-4 text-center">Update Supplier</h2>
                            <div className="mb-3">
                                <label htmlFor="Name" className="form-label">Name</label>
                                <input 
                                    value={this.state.suppliers.name || ''}
                                    onChange={this.handleChange}
                                    type="text"
                                    className="form-control" 
                                    id="Name" 
                                    name="name"
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="Company" className="form-label">Company</label>
                                <input 
                                    value={this.state.suppliers.company || ''}
                                    onChange={this.handleChange}
                                    type="text"
                                    className="form-control" 
                                    id="Company" 
                                    name="company"
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="Email" className="form-label">Email</label>
                                <input 
                                    value={this.state.suppliers.email || ''}
                                    onChange={this.handleChange}
                                    type="email"
                                    className="form-control" 
                                    id="Email" 
                                    name="email"
                                />
                            </div> 
                            <div className="mb-3">
                                <label htmlFor="Phone" className="form-label">Phone No</label>
                                <input 
                                    value={this.state.suppliers.phone || ''}
                                    onChange={this.handleChange}
                                    type="text"
                                    className="form-control" 
                                    id="Phone" 
                                    name="phone"
                                />
                            </div>                               
                            {this.state.suppliers.name && this.state.suppliers.company && this.state.suppliers.phone && this.state.suppliers.email &&
                                <button type="submit" className="btn btn-primary w-100 mt-3">Submit</button>
                            }
                        </form>
                        <div className="text-center mt-3">
                            <button onClick={this.handleClick} type="button" className="btn btn-danger">{this.state.showDetails ? "Hide Product Details" : "Show Product Details"}</button>
                        </div>
                        {this.state.showDetails && 
                            <div className="mt-4" style={{
                                maxWidth: "600px", 
                                transition: "transform 0.3s", 
                                margin: '0 auto'
                            }}>
                                <h5 className="mb-3">Product Details</h5>
                                {this.state.products.length ? (
                                    this.state.products.map((product, index) =>
                                        <div key={index} className="mb-3">
                                            <p><strong>Name:</strong> {product.name}</p>
                                            <p><strong>Brand:</strong> {product.brand}</p>
                                            <p><strong>Unit Price:</strong> Rs.{product.unit_price}</p>
                                            <p><strong>Revenue:</strong> {product.revenue}</p>
                                            <p><strong>Total Item:</strong>{product.quantity_in_stock + product.quantity_sold}</p>
                                            <hr />
                                        </div>
                                    )
                                ) : (
                                    <p>No products available.</p>
                                )}
                            </div>
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default UpdateSupplier;

import axios from "axios";
import React, { Component } from "react";
import './AddProduct.css';
import S3 from 'react-aws-s3-typescript'

class AddProduct extends Component {
    state = {
        product: {
            name: "",
            quantity_in_stock: 0,
            quantity_sold: 0,
            unit_price: 0,
            brand: "",
            revenue: 0,
            supplier_id: 0
        },
        image:null
    };

    submit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://127.0.0.1:8000/product', this.state.product);

            const reactS3 = new S3 ({
                accessKeyId: "AKIAW5BDQYBALMGCQ2OQ",
                secretAccessKey:"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",
                bucketName:"my-supermarket-items",
                region:"ap-south-1",
                s3Url:"https://my-supermarket-items.s3.ap-south-1.amazonaws.com"
            })
    
            reactS3.uploadFile(this.state.image,this.state.image.name.replace('.jpg', ''))
            .then(data => {
                console.log('Upload Response:', data);
            })
            .catch(error => {
                console.error('Error during upload:', error);
            });
            
            let product = {
                name: "",
                quantity_in_stock: 0,
                quantity_sold: 0,
                unit_price: 0,
                brand: "",
                revenue: 0,
                supplier_id: 0
            }

            let image = null

            this.setState({image,product})

        } catch (error) {
            console.error("There was an error!", error);
        }

    };

    handleChange = (e) => {
        let product = { ...this.state.product };
        const { name, value } = e.currentTarget;
        if (["quantity_in_stock", "quantity_sold", "unit_price", "revenue", "supplier_id"].includes(name)) {
            product[name] = parseFloat(value);
        } else {
            product[name] = value;
        }
        this.setState({ product });
    };

    handleImage = (e) => {
        let image = e.target.files[0]
        this.setState({image})
    }


    render() {
        return (
            <div className="form-container">
                <form onSubmit={this.submit} className="form">
                    <div className="form-group">
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
                    <div className="form-group">
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
                    <div className="form-group">
                        <label htmlFor="Quantity_in_stock" className="form-label">Quantity in Stock</label>
                        <input
                            value={this.state.product.quantity_in_stock}
                            onChange={this.handleChange}
                            type="number"
                            className="form-control"
                            id="Quantity_in_stock"
                            name="quantity_in_stock"
                        />
                    </div>
                    <div className="form-group">
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
                    <div className="form-group">
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
                    <div className="form-group">
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
                    <div className="form-group">
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
                    <div>
                        <input  style={{padding: "10px 15px",borderRadius: "5px",border: "1px solid #ccc",
                                backgroundColor: "#f9f9f9",cursor: "pointer",fontSize: "16px",color: "#333"}} type="file" onChange={this.handleImage}></input>
                    </div>
                    {this.state.product.brand !== "" && this.state.product.name !== "" && this.state.image && this.state.product.supplier_id > 0 &&
                        <button type="submit" className="btn btn-primary">Submit</button>                    
                    }
                </form>
            </div>
        );
    }
}

export default AddProduct;

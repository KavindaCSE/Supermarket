import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import Cart from './assets/Cart.jpg'
import './Table.css'; // Import CSS for table styling

class Table extends Component {
    state = {
        products: [],
        allProducts:[],
        supplier:[],
        activeIndex:0,
        order:{},
        no_of_item:0,
        items:["All","Youghurt","Butter","Cheese","Biscuit","Chocolate","Soft_drink","Oats","Noodles","Ice_cream","Face_wash"]
    }

    async componentDidMount() {
        try {
            const { data: products } = await axios.get('http://127.0.0.1:8000/products');
            this.setState({ products :products, allProducts:products });
        } catch (error) {
            alert("Error")
        }
    }

    handleDelete = async (id) => {
        try {
            let products = this.state.products.filter(product => product.id !== id);
            this.setState({ products });
            await axios.delete(`http://127.0.0.1:8000/product/${id}`);
        } catch (error) {
            alert("Error")
        }
    }
    
    handleClick = async(item,index) => {
        if (item === "All" && this.state.order.leg){
            this.setState({products : this.state.allProducts,activeIndex:0})
        }else{
            const { data:products} = await axios.get(`http://127.0.0.1:8000/productusingname/${item}`) 
            this.setState({products,activeIndex:index})
        }
    }

    handlecart = (id, index) => {
        let order = { ...this.state.order };
        let products = [...this.state.products]; 
        let product = { ...products[index] }; 
    
       
        product.quantity_in_stock -= 1;
        products[index] = product; 
    
        let no_of_item = this.state.no_of_item + 1;
    
        if (order[id]) {
            order[id] = order[id] + 1;
        } else {
            order[id] = 1;
        }
    
        this.setState({ order, products, no_of_item });
    }
    
    

    handleReset = () => {
        this.setState({products : this.state.allProducts,no_of_item : 0,order:{}})
    }

    render() {

        return (
            <>
                <div className="container">
                    <div className="row">
                        {/* Left side list group */}
                        <div className="list" style={{ width: "20%", position: "absolute", left: 0 }}>
                            <ul className="list-group">
                                {this.state.items.map((item, index) => (
                                    <li 
                                        key={index} 
                                        className={`list-group-item ${this.state.activeIndex === index ? "active" : ""}`} 
                                        aria-current="true" 
                                        onClick={() => this.handleClick(item, index)}
                                        style={{ cursor: "pointer" }} 
                                    >
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Right side product details */}
                        <div className="content"  style={{width: "80%",position: "absolute", right: 0 ,marginLeft:"10%"}}>
                        {this.props.user.post === "Customer" &&
                            <div className="card" style={{width: "15rem", marginLeft:"400px" , marginTop:"15px" ,marginBottom:"15px"}}>
                                <div className="card-body">
                                    <img src={Cart} className="card-img-top" alt= "cart image"/>
                                    <p className="card-text">No items : {this.state.no_of_item}</p>
                                    <button type="button" className="btn btn-warning">Order</button>
                                    <button style={{marginLeft:10}}onClick={this.handleReset} type="button" className="btn btn-danger">Reset</button>
                                </div>
                            </div>}
                        <div className="white-content">
                            <div className="goods-container">
                                {this.state.products.map((product,index) => {
                                    if (product.quantity_in_stock) {
                                        return (
                                            <div key={product.id} className="goods-box">
                                                <img src={`https://my-supermarket-items.s3.ap-south-1.amazonaws.com/${product.brand}_${product.name}.jpg`} alt="Products" />
                                                <h2>{product.name}</h2>
                                                <h4>ID : {product.id}</h4>
                                                <p>Price : Rs. {product.unit_price}.00</p>
                                                <p>Brand : {product.brand}</p>                                            
                                                <p>Quantity in Stock : {product.quantity_in_stock}</p>
                                                {this.props.user.post === "Admin" && (
                                                    <>
                                                        <p>Quantity Sold : {product.quantity_sold}</p>
                                                    </>
                                                )}
                                                <p>Revenue : {product.revenue}</p>
                                                {this.props.user.post === "Admin" && (
                                                    <div className="button-container">
                                                        <button type="button" className="btn btn-danger" style={{ marginRight: "10px" }} onClick={() => { this.handleDelete(product.id) }}>Delete</button>
                                                        <Link to={`/update/${product.id}`}><button type="button" className="btn btn-primary">Update</button></Link>
                                                    </div>
                                                )}
                                                {this.props.user.post === "Customer" && (
                                                    <div className="button-container">
                                                        <button onClick={() => this.handlecart(product.id,index)} type="button" className="btn btn-success">Add to Cart</button>
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    }
                                    return null;
                                })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>

        )
    }
}

export default Table;

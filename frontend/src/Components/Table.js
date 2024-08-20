import axios from "axios";
import React, { act, Component } from "react";
import { Link } from "react-router-dom";
import Cart from './assets/Cart.jpg'
import './Table.css'; // Import CSS for table styling

class Table extends Component {
    state = {
        products: [],
        allProducts:[],
        supplier:[],
        afterOrder:[],
        activeIndex:0,
        changes:{},
        order:{"no_of_items":0,"Total_price":0,"user_id":localStorage.getItem("id"),"status":"Pending"},
        no_of_item:0,
        items:["All"]
    }

    async componentDidMount() {
        try {
            
            const { data: products } = await axios.get('/products');
            const {data:item} = await axios.get('/getuniqueproduct')
            const items = [...this.state.items,...item]
            this.setState({ products :products, allProducts:products ,afterOrder:products,items});
        } catch (error) {
            alert("Error")
        }
    }

    handleDelete = async (id) => {
        try {
            let products = this.state.products.filter(product => product.id !== id);
            this.setState({ products });
            await axios.delete(`/product/${id}`);
        } catch (error) {
            alert("Error")
        }
    }
    
    handleClick = async(item,index) => {
        if (item === "All" && Object.keys(this.state.order).length === 0){
            this.setState({products : this.state.allProducts,activeIndex:0})
        }else if (item === "All" ) {

            this.setState({products:this.state.afterOrder,activeIndex:0})
        }
        else{
            const { data:products} = await axios.get(`/productusingname/${item}`) 
            if(Object.keys(this.state.order).length){
                this.setState({products,activeIndex:index})
                //this has to be change
            }else{
                this.setState({products,activeIndex:index})
            }
        }
    }

    handlecart = (id, index,unit_price) => {
        let order = { ...this.state.order };
        let changes = {...this.state.changes};
        let products = [...this.state.products]; 
        
        let product = { ...products[index] };     
        product.quantity_in_stock -= 1;
        products[index] = product;

        let afterOrder = this.state.afterOrder.map(product =>{
            if (product.id === id){
                product.quantity_in_stock -= 1
                return product
            }
            return product
        })


        if (changes[String(id)]){
            changes[String(id)] += 1
        }else{
            changes[String(id)] = 1
        }
        
        let no_of_item = this.state.no_of_item + 1;
    
        order["no_of_items"] += 1
        order["Total_price"] += unit_price
        this.setState({ order, products, no_of_item,afterOrder,changes});
    }
    
    handleOrder = async () => {
        let changes = {"changes":this.state.changes}
        await axios.post('/neworder',this.state.order)
        await axios.put('/updateChanges',changes) 
        window.location = '/home'       
    }
    

    handleReset = () => {
        
        this.setState({products : this.state.allProducts,no_of_item : 0,order:{"no_of_item":0,"Total_price":0,"user_id":localStorage.getItem("id")}})
        window.location = '/home'
        
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
                                    <button onClick={this.handleOrder} type="button" className="btn btn-warning">Order</button>
                                    <button style={{marginLeft:10}} onClick={this.handleReset} type="button" className="btn btn-danger">Reset</button>
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
                                                {(product.name === "Vegetables" || "Fruits") ?  
                                                    <p>{product.brand}</p>:
                                                    <p>Brand : {product.brand} </p>
                                                }                                          
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
                                                        <button onClick={() => this.handlecart(product.id,index,product.unit_price)} type="button" className="btn btn-success">Add to Cart</button>
                                                        <Link to={`/feedback/${product.id}`}><button style={{marginLeft:"10px"}} type="button" className="btn btn-warning">Review</button></Link>
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

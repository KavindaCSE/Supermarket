import React, { Component } from 'react';
import './Background.css'; // Ensure styles are defined in Background.css
import backgroundImage from './assets/dashboard_background.jpg'; // Replace with your image path
import axios from 'axios';


class Background extends Component {

    state = {
        products : []
    }

    async componentDidMount(){
        let {data:products} = await axios.get('http://127.0.0.1:8000/productcollection')
        this.setState({products})
        console.log()        
    }

    render(){
        // console.log(this.state.products)
        return (
            <div className="background">
                
                    <div className="image-overlay">
                        <img src={backgroundImage} alt="Background" className="centered-image" />
                        <div className="centered-text">
                            <h2>Welcome to Our Store</h2>
                            <p>Discover the finest selection of healthy delicacies.</p>
                        </div>
                    </div>
                <div className="white-content">
                    <div className="goods-container">
                        {this.state.products.map(product=>
                        <div key={product.id} className="goods-box">
                            <img src={`https://my-supermarket-items.s3.ap-south-1.amazonaws.com/${product.brand}_${product.name}.jpg`} alt="Products" />
                            <h2>{product.name}</h2>
                            <p>Brand : {product.brand}</p>
                            <p> Price : Rs. {product.unit_price}.00</p>
                            <p> Revenue : {product.revenue}</p>
                        </div>                            
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

export default Background;

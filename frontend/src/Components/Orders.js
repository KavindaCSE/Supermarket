import axios from "axios";
import React, { Component } from "react";
import "./Orders.css"; // Import the CSS file for styling

class Orders extends Component{

    state = {
        orders:[],
        id : localStorage.getItem("id"),
        post : localStorage.getItem("post")
    }

    async componentDidMount () {
        if(this.state.post === "Admin" || this.state.post === "User"){
            let {data : orders} = await axios.get('http://127.0.0.1:8000/getAllorders')
            this.setState({orders})
        }else{
            let {data : orders} = await axios.get(`http://127.0.0.1:8000/ordersOfuser/${this.state.id}`)
            this.setState({orders})
        }
    }

    render(){
        return(
            <div className="table-container">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col"></th>
                            <th scope="col">No of Items</th>
                            <th scope="col">Total Price</th>
                            <th scope="col">Status</th>
                            {(this.state.post === "Admin" || this.state.post === "User") &&
                                       <th>User ID</th>}                        
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.orders.map((order, index) =>
                            <tr key={index}>
                                <td>{index+1}</td>
                                <td>{order.no_of_items}</td>
                                <td>{order.Total_price}</td>
                                <td>{order.status}</td>
                                {(this.state.post === "Admin" || this.state.post === "User") &&
                                   <td>{order.user_id}</td>}
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Orders;

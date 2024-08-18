import { Route, Routes } from 'react-router-dom';
import { Component } from 'react';
import SingIn from './Components/SignIn';
import TopLine from './Components/TopLine'
import Login from './Components/Loging';
import Navbar from './Components/Navbar';
import Display from './Components/Display';
import Update from './Components/Update';
import AddProduct from './Components/AddProducts';
import AddSupplier from './Components/AddSuppliers';
import Background from './Components/Dashboard-background';
import Logout from './Components/Logout';
import User from './Components/User';
import Suppliers from './Components/Suppliers';
import UpdateSuppliers from './Components/UpdateSuppliers';
import Orders from './Components/Orders';
import Feedback from './Components/Coustomer_feedbacks';
import axios from 'axios'

axios.defaults.baseURL = `http://${window.location.hostname}:8000`;


class App extends Component {

  state = {
    user : {"id":localStorage.getItem("id"),"username":localStorage.getItem("name") , "email":localStorage.getItem("email"),"post":localStorage.getItem("post")}
  }

  render(){
    return (
      <>
        <TopLine/>
        <Navbar user={this.state.user} />
        <Routes>
          <Route path='/' element={<Background/>}/>
          <Route path='/signin' element={<SingIn/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/logout' element={<Logout/>}/>
          <Route path='/profile' element={<User user={this.state.user}/>}/>
          <Route path='/home' element={<Display user={this.state.user} />} />
          <Route path='/update/:id' element={<Update />} />
          <Route path='/suppliers' element={<Suppliers/>}/>
          <Route path='/addproduct' element={<AddProduct />} />
          <Route path='/updatesupplier/:id' element={<UpdateSuppliers/>}/>
          <Route path='/addsupplier' element={<AddSupplier />} />
          <Route path='/orders' element={<Orders/>}/>
          <Route path='/feedback/:id' element={<Feedback/>}/>
        </Routes>
      </>
    );
  }
}

export default App;
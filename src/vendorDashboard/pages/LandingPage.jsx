import React from 'react'
import NavBar from '../components/NavBar'
import SideBar from '../components/SideBar'
import Login from '../components/forms/Login'
import Register from '../components/forms/Register'
import AddFirm from '../components/forms/AddFirm'
import AddProduct from '../components/forms/AddProduct'
import Welcome from '../components/Welcome'
import {useState,useEffect} from 'react'
import AllProducts from '../components/AllProducts'
import VendorOrders from '../components/VendorOrders'

const LandingPage = () => {
  const [showLogin, setShowLogin]= useState(false)
  const [showRegister, setShowRegister]= useState(false)
  const [showfirm, setShowFirm ]=useState(false)
  const [showProduct, setShowProduct ]= useState(false)
  const [showWelcome,setShowWelcome]=useState(false)
  const [showAllProducts, setShowAllProducts]=useState(false)
  const [showLogOut, setShowLogOut]=useState(false)
  const [showFirmTitle, setShowFirmTitle]=useState(true)
  const [showAllOrder,setShowAllOrder]=useState(false);

  useEffect(()=>{
    const loginToken=localStorage.getItem('loginToken');
    if(loginToken){
      setShowLogOut(true)
    }
  },[])

  useEffect(()=>{
    const firmName=localStorage.getItem('firmName');
    if(firmName){
      setShowFirmTitle(false)
    }
  },[])



  const logOutHandler=()=>{
    const isConfirm=confirm("Are you sure want to Logout from the page");
    if(!isConfirm){
      return
    }
    localStorage.removeItem('loginToken');
    localStorage.removeItem('firmId');
    localStorage.removeItem('firmName');
    setShowLogOut(false)
    setShowFirmTitle(true)
  }

  const showLoginHandler =()=>{
    setShowLogin(true)
    setShowRegister(false)
    setShowFirm(false)
    setShowProduct(false)
    setShowWelcome(false)
    setShowAllProducts(false)
    setShowAllOrder(false)
  }

  const showRegisterHandler=()=>{
    setShowRegister(true)
    setShowLogin(false)
    setShowFirm(false)
    setShowProduct(false)
    setShowWelcome(false)
    setShowAllProducts(false)
    setShowAllOrder(false)
  }

  const showFirmHandler=()=>{
    if(showLogOut){
      setShowFirm(true)
      setShowLogin(false)
      setShowRegister(false)
      setShowProduct(false)
      setShowWelcome(false)
      setShowAllProducts(false)
      setShowAllOrder(false)
    }else{
      alert("Please Login")
      setShowLogin(true)
      setShowRegister(false)
    }
  }

  const showProductHandler=()=>{
    if(showLogOut){
    setShowProduct(true)
    setShowLogin(false)
    setShowFirm(false)
    setShowRegister(false)
    setShowWelcome(false)
    setShowAllProducts(false)
    setShowAllOrder(false)
    }else{
      alert("Please Login")
      setShowLogin(true)
      setShowRegister(false)
    }
  }
  const showWelcomeHandler=()=>{
      setShowWelcome(true)
      setShowLogin(false)
      setShowProduct(false)
      setShowFirm(false)
      setShowRegister(false)
      setShowAllProducts(false)
      setShowAllOrder(false)
  }

  const showAllProductHandler=()=>{
    if(showLogOut){
      setShowAllProducts(true)
      setShowWelcome(false)
      setShowLogin(false)
      setShowProduct(false)
      setShowFirm(false)
      setShowRegister(false)
      setShowAllOrder(false)
      }else{
      alert("Please Login")
      setShowLogin(true)
      setShowRegister(false)
    }
  }

  const showAllOrderHandler=()=>{
      setShowWelcome(false)
      setShowLogin(false)
      setShowProduct(false)
      setShowFirm(false)
      setShowRegister(false)
      setShowAllProducts(false)
      setShowAllOrder(true)
  }
  
  return (
    <>
    <section className='landingSection'>
        <NavBar showLoginHandler={showLoginHandler} showRegisterHandler={showRegisterHandler} showLogOut={showLogOut} logOutHandler={logOutHandler}/>
      <div className="collectionSection">
        <SideBar showFirmHandler={showFirmHandler} showProductHandler={showProductHandler} showAllProductHandler={showAllProductHandler}
        showFirmTitle={showFirmTitle} showAllOrderHandler={showAllOrderHandler}/>
        {showLogin && <Login showWelcomeHandler={showWelcomeHandler}/>}
        {showRegister && <Register showLoginHandler={showLoginHandler}/> }
        {showfirm && showLogOut && <AddFirm/>}
        {showProduct && showLogOut && <AddProduct/>}
        {showWelcome && <Welcome/>}
        {showAllProducts && showLogOut && <AllProducts/>}
        {showAllOrder && showLogOut && <VendorOrders/>}
        {/*<Register/>*/}
        {/*<AddFirm/>*/}
        {/*<AddProduct/>*/}
      </div>
    </section>
    </>
  )
}

export default LandingPage

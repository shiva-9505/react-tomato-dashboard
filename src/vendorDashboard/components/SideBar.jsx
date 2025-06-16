import React from 'react'

const SideBar = ({showFirmHandler, showProductHandler,showAllProductHandler, showFirmTitle}) => {
  return (
    <div className="sideBarSection">
       <ul>
        {showFirmTitle ? <li onClick={showFirmHandler}>Add Firm</li> : ""}
        
        <li onClick={showProductHandler}>Add Product</li>
        <li onClick={showAllProductHandler}>All Products</li>
        <li>User Details</li>
       </ul>
    </div>
  )
}

export default SideBar

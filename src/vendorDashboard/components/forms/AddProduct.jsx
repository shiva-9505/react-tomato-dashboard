import React from 'react'
import { useState } from 'react'
import { API_URL } from '../../data/apiPath';

const AddProduct = () => {

  const [productName,setProductName]=useState("");
  const [price, setPrice]=useState("");
  const [category, setCategory]=useState([]);
  const [bestSeller, setBestseller]=useState(false);
  const [description, setDescription]=useState("");
  const [image, setImage]=useState(null);

  const handleCategoryChange=(event)=>{
    const value=event.target.value;
    if(category.includes(value)){
      setCategory(category.filter((item)=>item!==value));
    }
    else{
      setCategory([...category,value])
    }
  }

 const handleBestsellerChange=(event)=>{
  const value=event.target.value ==='true';
  setBestseller(value)
 }
 const handleImageUpload=(event)=>{
  const selectedImage=event.target.files[0];
  setImage(selectedImage);
 }
  

  const handleProductSubmit=async (e)=>{
    e.preventDefault()
    try {
      const loginToken=localStorage.getItem('loginToken');
      const firmId=localStorage.getItem('firmId');

      if(!loginToken || !firmId){
        console.log("user not authenticated")
      }

      const formData=new FormData();
      formData.append('productName',productName);
      formData.append('price',price);
      formData.append('description',description);
      formData.append('image',image);
      formData.append('bestSeller', bestSeller);

      category.forEach((value)=>{
        formData.append('category',value)
      });
       
      const response = await fetch(`${API_URL}/product/add-product/${firmId}`,{
        method:'POST',
        
        body:formData
      })

      const data=await response.json();

      if(response.ok){
        alert("Product added successfully");
        setProductName("");
        setPrice("");
        setCategory([]);
        setBestseller();
        setDescription("");
        setImage(null)
      }


    } catch (error) {
      /*console.error(data.message);*/
      console.log("failed to add product");
      alert("failed to add product");
    }
  }


  return (
     <div className="productSection">
        <form className="tableForm" onSubmit={handleProductSubmit}>
            <h3>Add Product</h3>
            <label>Product Name</label>
            <input type="text" name='productName' value={productName} onChange={(e)=>setProductName(e.target.value)} placeholder='Enter your Firm name'/>
            <label>Price</label>
            <input type="text" name='price' value={price} onChange={(e)=>setPrice(e.target.value)} placeholder='Enter your Area'/>
             <div className="check-inp">
              <label>Category</label>
              <div className="inputsContainer">
                <div className="checkboxContainer">
                  <label>Veg</label>
                  <input type="checkbox" checked={category.includes('veg')} value="veg" onChange={handleCategoryChange} />
                </div>
                <div className="checkboxContainer">
                  <label>Non-Veg</label>
                  <input type="checkbox" value="non-veg" checked={category.includes('non-veg')} onChange={handleCategoryChange} />
                </div>
              </div>
            </div>
            <div className="check-inp">
              <label>BestSeller</label>
              <div className="inputsContainer">
                <div className="checkboxContainer">
                  <label>Yes</label>
                  <input type="radio" checked={bestSeller===true} value="true" onChange={handleBestsellerChange} />
                </div>
                <div className="checkboxContainer">
                  <label>No</label>
                  <input type="radio" checked={bestSeller===false} value="false"  onChange={handleBestsellerChange} />
                </div>
              </div>
            </div>
            <label>Description</label>
            <input type="text" name='description' value={description} onChange={(e)=>setDescription(e.target.value)} placeholder='Write description of your product here'/>
            <label>Product Image</label>
            <input type="file" onChange={handleImageUpload}/>
            <br />
             <div className="btnSubmit">
                <button type='submit'>Submit</button>
             </div>
        </form>
    </div>
  )
}

export default AddProduct

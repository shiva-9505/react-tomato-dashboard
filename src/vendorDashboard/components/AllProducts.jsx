import React,{useEffect,useState} from 'react'
import { API_URL } from '../data/apiPath';



const AllProducts = () => {

    const [products, setProducts]=useState([]);
    const productsHandler = async()=>{
        const firmId=localStorage.getItem('firmId');
        try {
            const response=await fetch(`${API_URL}/product/${firmId}/products`);
            const newProductsData=await response.json();
            setProducts(newProductsData.products);
            //console.log(newProductsData.products);

        } catch (error) {
            console.error("Failed to fetch product",error);
            alert("Failed to fetch products")
        }

    }

    useEffect(()=>{
        productsHandler()
        console.log("this is use effect")
    },[])

    const deleteProductById= async(productId, productName) => {
        try {
            const response=await fetch(`${API_URL}/product/${productId}`,{
                method:'DELETE'
            })

            if(response.ok){
                setProducts(products.filter(product=>product._id !== productId));
                confirm(`Are you sure you want delete "${productName}"?`)
                alert("Product deleted successfully")

            }
        } catch (error) {
            console.error("Failed to delete product")
        }
    }

  return (
    <div>
        {!products? (
                <p>No products Added</p>
        ) : (
            <table className="product-table">
                <thead>
                    <tr>
                        <th>Product Name</th>
                        <th>Price</th>
                        <th>Image</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((item)=>{
                        // console.log("image ",item.image);
                        return (
                        <>
                        <tr key={item._id}>
                            <td>{item.productName}</td>
                            <td>{item.price}</td>
                            <td>{item.image && (
                                <img src={item.image}/*{`${API_URL}/uploads/${item.image}`}*/ alt={item.productName}
                                style={{width:"50px", height:"50px"}} />
                            )}</td>
                            <td>
                                <button onClick={()=>deleteProductById(item._id,item.productName)}>Delete</button>
                            </td>
                        </tr>
                        </>
                        )
                    })}
                </tbody>
            </table>
        )}
    </div>
  )
}

export default AllProducts

import { useState, useEffect } from "react";
import { addProduct , getProductById, updateProduct} from "../../Apis/products-api";
import { useNavigate, useLocation } from "react-router-dom";
export default function ProductAddEdit() {

    const navigate = useNavigate();
    const location = useLocation();

    let productId = location.state?.productId;




    const [product, setProduct] = useState({
        name: "",
        description: "",
        price: 0,
        stock: 0,
    });

   useEffect(() => {
        if (productId) {
            async function fetchProductData() {
                try {
                    let productData = await getProductById(productId);
                    console.log("productData", productData);
                    setProduct({
                        name: productData.name,
                        description: productData.description,
                        price: productData.price,
                        stock: productData.stock,
                    });   
                } catch (error) {
                    console.error("Error fetching product:", error);
                }
            }
            fetchProductData();
        }
    }, [productId]);
  

    
    function handleChange(e : React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setProduct((prevProduct) => ({
            ...prevProduct,
            [name]: value
        }));
    }


    async function handleSubmit(e : React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault();

        console.log(product);

        if(productId) {
       await updateProduct(productId, product);
            alert("Product updated successfully");
            navigate("/ProductsList");
            return;
        }

       let res = await addProduct(product);

       if(res) {
        alert("Product added successfully");
        navigate("/ProductsList");
         } else {
        alert("Failed to add product");
         }

       }
    



    return (
        <div className="flex flex-col gap-4 p-4 max-w-md mx-auto">
            <h1>Product Add</h1>
            <button className=" border bg-gray-200 rounded p-2 text-black ml-50" onClick={() => navigate("/ProductsList")}>
                Back to Products List
            </button>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4">
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Enter product name"
                    value={product.name}
                    required
                    onChange={handleChange}
                    className="border p-2 rounded"
                />

                <label htmlFor="description">Description:</label>
                <input
                    type="text"
                    id="description"
                    name="description"
                    placeholder="Enter product description"
                    value={product.description}
                    onChange={handleChange}
                    required
                    className="border p-2 rounded"
                />

                <label htmlFor="price">Price:</label>
                <input
                    type="number"
                    id="price"
                    name="price"
                    placeholder="Enter product price"
                    value={product.price}
                    onChange={handleChange}
                    required
                    className="border p-2 rounded"
                />

                <label htmlFor="stock">Stock:</label>
                <input
                    type="number"
                    id="stock"
                    name="stock"
                    value={product.stock}
                    placeholder="Enter product stock"
                    onChange={handleChange}
                    required
                    className="border p-2 rounded"
                />



                <button type="submit" className="border bg-green-400 rounded p-2 text-white">
                    Save Product
                </button>
               
              </div>
            </form>
        </div>
    );

};

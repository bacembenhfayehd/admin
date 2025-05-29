import React, { useEffect, useState } from "react"
import remove from '../../assets/cross_icon.png'
import './Listproduct.css'

const Listproduct = () => {
    const [products, setProducts] = useState([]); // Fixed typo: produtcs -> products
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const response = await fetch('http://localhost:3000/api/products/get');
            
            if (!response.ok) {
                throw new Error('Failed to fetch products');
            }
            
            const data = await response.json();
            
            // Check if the response is an array or if products are nested in an object
            // Adjust this based on your API response structure
            const productsArray = Array.isArray(data) ? data : data.products || [];
            
            setProducts(productsArray);
            setError(false);
        } catch (err) {
            console.error('Error fetching products:', err);
            setError(true);
            setProducts([]); // Ensure products is always an array
        } finally {
            setLoading(false);
        }
    }

    const removeProduct = async (id) => {
        const confirmer  =window.confirm('veuillez supprimez ce produit ?')
        if (!confirmer) return;

        await fetch('http://localhost:3000/api/products/delete' , {
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({id}) // '{"id":"123"}'

        })
        setProducts(prev => prev.filter(product => product._id !== id))
    }

    

    useEffect(() => {
        fetchProducts();
    }, []);

    // Add loading and error states back
    if (loading) return <p>Chargement des produits...</p>;
    if (error) return <p>Erreur lors du chargement des produits</p>;

    return (
        <div className="list-product">
            <h1>All Products List</h1>
            <div className='listproduct-format-main'>
                <p>Product</p>
                <p>Title</p>
                <p>Old Price</p>
                <p>New Price</p>
                <p>Category</p>
                <p>Remove</p>
            </div>
 <div className='listproduct-allproducts'>
                <hr />
                {products.map((product) => (
                    <React.Fragment key={product._id}>
                        <div className='listproduct-format-main listproduct-format'>
                            <img src={product.image} alt="" width={150} className="listproduct-product-icon" />
                            <p>{product.name}</p>
                            <p>{product.old_price}</p>
                            <p>{product.new_price}</p>
                            <p>{product.category}</p>
                            <img onClick={() => removeProduct(product._id)}  src={remove} alt="Remove" className="listproduct-product-remove" />
                        </div>
                        <hr />
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
}
export default Listproduct;
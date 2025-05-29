import './Addproduct.css'
import upload_area from '../../assets/upload_area.svg'
import { useState } from 'react'

const Addproduct = () => {
    const [image, setImage] = useState(null);
    const [productDetails, setProductDetails] = useState({
        name: '',
        image: '',
        category: 'women',
        old_price: '',
        new_price: '',
        available: true
    })

    const changeHandler = (e) => {
        setImage(e.target.files[0])
    }

    const changeDeatils = (e) => {
        setProductDetails({...productDetails, [e.target.name]: e.target.value})
    }

    const addProduct = async () => {
        try {
            let responseData;
            let product = productDetails;
            let formData = new FormData();

            // Vérifier qu'une image est sélectionnée
            if (!image) {
                alert('Veuillez sélectionner une image');
                return;
            }

            product.old_price = Number(product.old_price);
            product.new_price = Number(product.new_price);

            // Corriger le nom du champ - utiliser 'product' au lieu de 'image'
            formData.append('product', image);

            // Upload de l'image
            const uploadResponse = await fetch('http://localhost:3000/upload', {
                method: 'POST',
                headers: {
                    Accept: 'application/json'
                },
                body: formData
            });

            responseData = await uploadResponse.json();
            console.log('Upload response:', responseData); // Debug

            if (responseData.success) {
                // Utiliser 'url' au lieu de 'image_url' selon l'erreur
                product.image = responseData.url;
                console.log('Product to add:', product);

                // Ajouter le produit à la base de données
                const addResponse = await fetch('http://localhost:3000/api/products/add', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(product)
                });

                const addData = await addResponse.json();
                
                if (addData.success) {
                    alert('Produit ajouté à la base de données');
                    // Réinitialiser le formulaire
                    setProductDetails({
                        title: '',
                        image: '',
                        category: 'women',
                        old_price: '',
                        new_price: '',
                        available: true
                    });
                    setImage(null);
                } else {
                    alert('Erreur lors de l\'ajout du produit: ' + (addData.message || 'Essayez une autre fois'));
                }
            } else {
                alert('Erreur lors de l\'upload de l\'image: ' + (responseData.message || 'Essayez une autre fois'));
            }
        } catch (error) {
            console.error('Erreur:', error);
            alert('Une erreur est survenue: ' + error.message);
        }
    }

    return (
        <div className='add-product'>
            <div className='addproduct-itemfiled'>
                <p>Product title</p>
                <input 
                    value={productDetails.name} 
                    onChange={changeDeatils} 
                    type="text" 
                    name='name' 
                    placeholder='type here' 
                />
            </div>

            <div className='product-price'>
                <div className='addproduct-itemfiled'>
                    <p>Old Price</p>
                    <input 
                        value={productDetails.old_price} 
                        onChange={changeDeatils} 
                        type="number" 
                        placeholder='type here' 
                        name='old_price' 
                    />
                </div>

                <div className='addproduct-itemfiled'>
                    <p>New Price</p>
                    <input 
                        value={productDetails.new_price} 
                        onChange={changeDeatils} 
                        type="number" 
                        placeholder='type here' 
                        name='new_price' 
                    />
                </div>
            </div>

            <div className='addproduct-itemfiled'>
                <select 
                    value={productDetails.category} 
                    onChange={changeDeatils} 
                    name='category' 
                    className='addproduct-selector'
                >
                    <option value="women">Women</option>
                    <option value="men">Men</option>
                    <option value="kids">Kids</option>
                </select>
            </div>

            <div className='addproduct-itemfiled'>
                <label htmlFor="file-input">
                    <img 
                        src={image ? URL.createObjectURL(image) : upload_area} 
                        alt="" 
                        className='addproduct-thumbnail' 
                    />
                </label>
                <input 
                    onChange={changeHandler} 
                    type="file" 
                    name='image' 
                    id='file-input' 
                    hidden 
                    accept="image/*"
                />
            </div>

            <button onClick={addProduct} className='addproduct-btn'>
                ADD
            </button>
        </div>
    )
}

export default Addproduct
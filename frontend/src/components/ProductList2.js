import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const ProductList2 = () => {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        const response = await axios.get("http://localhost:5000/products");
        setProducts(response.data);
    }

    const deleteProduct = async (productId) => {
        try {
            await axios.delete(`http://localhost:5000/products/${productId}`);
            getProducts();
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className='container mt-5'>
            <div className="columns is-multiline">
                {/* map untuk produk */}
                {products.map((product) => (
                    <div className="column is-one-quarter" key={product.id}>
                        <div className="card">
                            <div className="card-image">
                                <figure className="image is-4by3">
                                    <img src={product.url} alt="Image" />
                                </figure>
                            </div>
                            <div className="card-content">
                                <div className="media">
                                    <div className="media-content">
                                        <p className="title is-4">
                                            {product.name}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="card-footer">
                                <Link to={`edit/${product.id}`} className='card-footer-item'>Edit</Link>
                                <a onClick={() => deleteProduct(product.id)} className="card-footer-item">Delete</a>
                            </div>
                        </div>
                    </div>
                ))}

            </div>
        </div>
    )
}

export default ProductList2
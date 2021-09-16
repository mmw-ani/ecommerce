import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import Rating from './Rating'
function Product({ product }) {
    return (
        <Card className="my-3 p-3 rounded product_link">
           <Link to={`./product/${product._id}`}>
               <Card.Img src={product.image} />
               <Card.Body>
                <Link to={`./product/${product._id}`}>
                    <Card.Title as="div">
                        <strong>{product.name}</strong>
                    </Card.Title>
                </Link>
                <Card.Text as="div">
                    <div className="my-3">
                        <Rating value={product.rating} text={`${product.numReviews} reviews`} color={'#f8e825'} />
                    </div>
                </Card.Text>
                <Card.Text as="h3">
                    <i className="fas fa-rupee-sign"></i>{product.price}
                </Card.Text>
               </Card.Body>
            </Link>  
        </Card>
    )
}

export default Product

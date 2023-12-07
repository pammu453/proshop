import { useState } from "react";
import { useParams,useNavigate } from "react-router-dom"
import Rating from "../components/Rating";
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'
import { Link } from "react-router-dom";

import { useGetProductByIdQuery } from '../slices/productApiSlice'

import Loader from '../components/Loader'
import Error from "../components/Error";

import {addToCart} from '../slices/cartSlice'
import { useDispatch } from "react-redux";

const ProductScreen = () => {

    const [qty ,setQty]=useState(1)


    const { id: productId } = useParams();

    const dispatch=useDispatch()
    const naviget=useNavigate()

    const { data: product, isLoading, error } = useGetProductByIdQuery(productId);

    const addToCartHandler=()=>{
        dispatch(addToCart({...product,qty}))
        naviget("/cart")
    }

    return (
        <>
            {
                isLoading ? (
                    <Loader />
                ) : error ? (
                    <Error variant='danger'>
                        <h1>{error.status}: {error.data?.message || error.error}</h1>
                    </Error>
                ) :
                    (
                        <div>
                            <Link to="/" className="btn btn-light my-3">Go back</Link>
                            <Row>
                                <Col md={5}>
                                    <Image src={product.image} alt={product.name} fluid />
                                </Col>
                                <Col md={4}>
                                    <ListGroup variant="flush">
                                        <ListGroup.Item>
                                            <h1>{product.name}</h1>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <Rating value={product.rating} text={`${product.numReviews} Rating`} />
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            Price: ${product.price}
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            Description: {product.description}
                                        </ListGroup.Item>
                                    </ListGroup>

                                </Col>
                                <Col md={3}>
                                    <Card>
                                        <ListGroup variant="flush">
                                            <ListGroup.Item>
                                                <Row>
                                                    <Col>Price:</Col>
                                                    <Col>
                                                        <strong>${product.price}</strong>
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>

                                            <ListGroup.Item>
                                                <Row>
                                                    <Col>Status:</Col>
                                                    <Col>
                                                        <strong>{product.countInStock > 0 ? "In Stock" : "Out Of Stock"}</strong>
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>

                                            {
                                                product.countInStock > 0 && (
                                                    <ListGroup.Item>
                                                        <Row>
                                                            <Col>Qty</Col>
                                                            <Col>
                                                               <Form.Control
                                                               as="select"
                                                               value={qty}
                                                               onChange={(e)=>setQty(e.target.value)}
                                                               >
                                                                {[...Array(product.countInStock).keys()].map((x)=>(
                                                                    <option key={x+1} value={x+1}>
                                                                        {x+1}
                                                                    </option>
                                                                ))}
                                                               </Form.Control>
                                                            </Col>
                                                        </Row>
                                                    </ListGroup.Item>
                                                )
                                            }

                                            <ListGroup.Item>
                                                <Button 
                                                variant="outline-dark" 
                                                className="btn-block" 
                                                type="button" 
                                                disabled={product.countInStock === 0}
                                                onClick={addToCartHandler}
                                                >Add To Cart</Button>
                                            </ListGroup.Item>
                                        </ListGroup>
                                    </Card>
                                </Col>
                            </Row>
                        </div>
                    )
            }
        </>
    )
}

export default ProductScreen

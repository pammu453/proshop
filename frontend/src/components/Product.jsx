import { Card } from "react-bootstrap"
import { Link } from "react-router-dom"
import Rating from "./Rating"

const Product = ({ product }) => {
    return (
        <Card className="my-3 p-3 rounded">
            <Link to={`/product/${product._id}`}>
                <Card.Img variant="top" src={product.image} />
            </Link>
            <Card.Body>
                <Card.Title as="div" style={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{product.name}</Card.Title>
                <Card.Text as='h3'>
                    ${product.price}
                </Card.Text>
                <Card.Text as='div'>
                    <Rating value={product.rating} text={`${product.numReviews} Rating`} />
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default Product

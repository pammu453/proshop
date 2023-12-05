import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'

import { useGetProductsQuery } from '../slices/productApiSlice'

import Loader from '../components/Loader'
import Error from '../components/Error'

const HomeScreen = () => {

    const { data: products, isLoading, error } = useGetProductsQuery();

    return (
        <>
            <h1>Latest Products</h1>
            {isLoading ? (
                <Loader/>
            ) : error ? (
                <Error variant='danger'>
                    <h1>{error.status}: {error.data?.message || error.error}</h1>
                </Error>
            ) : (
                <Row>
                    {products.map((product) => (
                        <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
                            <Product product={product} />
                        </Col>
                    ))}
                </Row>
            )}
        </>
    )
}

export default HomeScreen
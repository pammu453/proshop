import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'

import { useGetProductsQuery } from '../slices/productApiSlice'

import { useParams } from 'react-router-dom'

import Loader from '../components/Loader'
import Error from '../components/Error'

import Paginate from '../components/Paginate'

const HomeScreen = () => {

    const { pageNumber } = useParams()

    const { data, isLoading, error } = useGetProductsQuery({ pageNumber });

    console.log(data)
    return (
        <>
            <h1>Latest Products</h1>
            {isLoading ? (
                <Loader />
            ) : error ? (
                <Error variant='danger'>
                    <h1>{error.status}: {error.data?.message || error.error}</h1>
                </Error>
            ) : (
                <>
                    <Row>
                        {data.products.map((product) => (
                            <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
                                <Product product={product} />
                            </Col>
                        ))}
                    </Row>
                    <Paginate page={data.page} pages={data.pages}/>
                </>
            )}
        </>
    )
}

export default HomeScreen
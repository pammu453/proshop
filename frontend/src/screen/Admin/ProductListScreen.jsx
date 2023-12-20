import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { FaTimes, FaTrash, FaPlus, FaEdit } from 'react-icons/fa'
import Error from '../../components/Error'
import Loader from '../../components/Loader'
import { useGetProductsQuery } from '../../slices/productApiSlice'

const ProductListScreen = () => {
    const { data: products, isLoading, error } = useGetProductsQuery()

    const deleteHandler = (id) => {
        console.log(id)
    }
    return (
        <>
            <Row className='align-items-center'>
                <Col>
                    <h2>Products</h2>
                    <Col className='text-end'>
                        <Button className='btn-sm m-3' variant='dark'>
                            <FaPlus /> Add Product
                        </Button>
                    </Col>
                </Col>
            </Row>
            {
                isLoading ? <Loader /> :
                    error ? <Error variant='danger'>{error}</Error> :
                        (
                            <Table striped bordered hover responsive className='table-sm' variant="dark">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>NAME</th>
                                        <th>PRICE</th>
                                        <th>CATEGORY</th>
                                        <th>BRAND</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        products.map((product) => (
                                            <tr key={product._id}>
                                                <td>
                                                    {product._id}
                                                </td>
                                                <td>
                                                    {product.name}
                                                </td>
                                                <td>
                                                    {product.price}
                                                </td>
                                                <td>
                                                    {product.category}
                                                </td>
                                                <td>
                                                    {product.brand}
                                                </td>
                                                <td>
                                                    <LinkContainer to={`/admin/product/${product._id}`} variant="dark" className='m-1'>
                                                        <Button className='btn-sm' variant='dark'>
                                                            <FaEdit />
                                                        </Button>
                                                    </LinkContainer>
                                                    <Button className='btn-sm ' variant='dark' onClick={() => deleteHandler(product._id)}>
                                                        <FaTrash />
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </Table>
                        )
            }
        </>
    )
}

export default ProductListScreen

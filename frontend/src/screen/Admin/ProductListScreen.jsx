import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { FaTrash, FaPlus, FaEdit } from 'react-icons/fa'
import Error from '../../components/Error'
import Loader from '../../components/Loader'
import { useGetProductsQuery, useCreateProductMutation, useDeleteProductMutation } from '../../slices/productApiSlice'
import { toast } from 'react-toastify'
import { useParams } from 'react-router-dom'
import Paginate from '../../components/Paginate'

const ProductListScreen = () => {
    const { pageNumber } = useParams()
    const { data, isLoading, error, refetch } = useGetProductsQuery({
        pageNumber
    })

    const [createProduct, { isLoading: loadingCreate }] = useCreateProductMutation()
    const [deleteProduct, { isLoading: loadingDelete }] = useDeleteProductMutation()

    const createProductHandler = async () => {
        if (window.confirm("Are you sure want to create a new product?")) {
            try {
                await createProduct()
                refetch()
            } catch (error) {
                toast.error(error?.data?.message || error.error)
            }
        }
    }

    const deleteHandler = async (id) => {
        if (window.confirm("Are you sure to delete the product?")) {
            try {
                const { data } = await deleteProduct(id)
                toast.success(data.message)
                refetch();
            } catch (error) {
                toast.error(error?.data?.message || error.error)
            }
        }
    }
    return (
        <>
            <Row className='align-items-center'>
                <Col>
                    <h2>Products</h2>
                    <Col className='text-end'>
                        <Button className='btn-sm m-3' variant='dark' onClick={createProductHandler}>
                            <FaPlus /> Add Product
                        </Button>
                    </Col>
                </Col>
            </Row>
            {
                isLoading ? <Loader /> :
                    error ? <Error variant='danger'>{error.message || 'An unexpected error occurred.'}</Error> :
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
                                        data.products.map((product) => (
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
            {loadingCreate && <Loader />}
            {loadingDelete && <Loader />}
            <Paginate pages={data?.pages} page={data?.page} isAdmin={true} />
        </>
    )
}

export default ProductListScreen

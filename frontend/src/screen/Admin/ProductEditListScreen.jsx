import { useState, useEffect } from "react"
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import Error from '../../components/Error'
import Loader from '../../components/Loader'
import { toast } from 'react-toastify'
import { useUpdateProductMutation, useGetProductByIdQuery } from "../../slices/productApiSlice"
import FormConatiner from '../../components/FormConatiner'

const ProductEditListScreen = () => {
  const { id: productId } = useParams()

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState('');
  const [description, setDescription] = useState('');

  const { data: product, isLoading, refetch, error } = useGetProductByIdQuery(productId)

  const [updateProduct, { isLoading: loadingUpdate }] = useUpdateProductMutation()

  const navigate = useNavigate()

  useEffect(() => {
    if (product) {
      setName(product.name)
      setPrice(product.price)
      setImage(product.image)
      setBrand(product.brand)
      setCategory(product.category)
      setCountInStock(product.countInStock)
      setDescription(product.description)
    }
  }, [product])

  const submitteHandler = async (e) => {
    e.preventDefault()
    const updatedDocument = {
      productId,
      name,
      price,
      image,
      brand,
      category,
      countInStock,
      description
    }
    const result = await updateProduct(updatedDocument)
    if (result.error) {
      toast.error(result.error)
    } else {
      toast.success("Product updated")
      navigate('/admin/productlist')
    }

  }

  return (
    <>
      <Link to='/admin/productlist' className="btn btn-light my-3">
        Go back
      </Link>
      <FormConatiner>
        <h3>Edit Product</h3>
        {loadingUpdate && <Loader />}
        {
          isLoading ? <Loader /> :
            error ? <Error variant='danger'>{error}</Error> :
              (
                <Form onSubmit={submitteHandler}>
                  <Form.Group controlId="name" className="my-2">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter name"
                      value={name}
                      onChange={(e) => setName(e.target.value)} />
                  </Form.Group>
                  <Form.Group controlId="price" className="my-2">
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Enter price"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)} />
                  </Form.Group>
                  {/* image placeholder */}
                  <Form.Group controlId="brand" className="my-2">
                    <Form.Label>Brand</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter brand"
                      value={brand}
                      onChange={(e) => setBrand(e.target.value)} />
                  </Form.Group>
                  <Form.Group controlId="countInStock" className="my-2">
                    <Form.Label>Count in stock</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Enter counter in stock"
                      value={countInStock}
                      onChange={(e) => setCountInStock(e.target.value)} />
                  </Form.Group>
                  <Form.Group controlId="category" className="my-2">
                    <Form.Label>Category</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter category"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)} />
                  </Form.Group>
                  <Form.Group controlId="description" className="my-2">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)} />
                  </Form.Group>
                  <Button type="submit" style={{ background: "black", border: "none" }} className="mt-2" disabled={isLoading}>
                    Update
                  </Button>
                </Form>
              )
        }
      </FormConatiner>
    </>
  )
}

export default ProductEditListScreen
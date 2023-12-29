import { Link } from 'react-router-dom'
import Error from '../components/Error'
import Loader from '../components/Loader'
import { useGetTopProductsQuery } from '../slices/productApiSlice'
import { Carousel,Image } from 'react-bootstrap'

const ProductCarasol = () => {
    const { data: products, isLoadnig, error } = useGetTopProductsQuery()
    console.log(products)
    return (
        <div>
            {
                isLoadnig ? <Loader /> : error ? <Error variant={'danger'}>{error}</Error> :
                    (
                        <Carousel pause='hover' className='bg-promary mb-4'>
                            {
                                products?.map((product) => (
                                    <Carousel.Item key={product._id} style={{backgroundColor:"#f0f0f5"}}>
                                        <Link to={`/products/${product._id}`}>
                                            <Image src={product.image} alt={product.name} fluid/>
                                            <Carousel.Caption style={{position:"absolute",width:"100%",left:"0",right:"0",bottom:"0",background:"	#666699"}}>
                                                <h2>
                                                    {product.name} (${product.price})
                                                </h2>
                                            </Carousel.Caption>
                                        </Link>
                                    </Carousel.Item>
                                ))
                            }
                        </Carousel>
                    )
            }
        </div>
    )
}

export default ProductCarasol

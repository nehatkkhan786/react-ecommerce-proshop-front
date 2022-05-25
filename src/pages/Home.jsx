import Product from '../components/Product'
import {Row, Col} from 'react-bootstrap'
import { useEffect, useContext} from 'react'
import ProductContext from '../ContextAndReducer/ProductContext'
import Loader from '../components/Loader'
const Home = () => {

    // const [products, setProducts] = useState([])
    const {fetchProducts,products, loading} = useContext(ProductContext)

    useEffect(()=>{
        // const fetchProducts = async() => {
        //     const {data} = await axios.get('http://localhost:8000/api/products/')
        //     setProducts(data)  
        // }
        fetchProducts()
    }, [])

    return (
        <div>
            <h1>Latest Products</h1>

            {loading && <Loader/>}
            <Row>
                {products.map((product)=>{
                    return (
                        <Col key={product._id}  sm={12} md={4} lg={4} xl={3}>
                            <Product product ={product} />
                        </Col>
                    )
                })}
            </Row>
        </div>
    )
}

export default Home;
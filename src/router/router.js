import { useRoutes } from 'react-router'

import Layout from '../layouts/main'
import ProductList from '../pages/productList'
import ProductDetail from '../pages/productDetail'

const MyRouter = () => {
    let routes = useRoutes([
        {
            element: <Layout />,
            children: [
                {
                    element: <ProductList />,
                    path: '/',
                },
                {
                    element: <ProductDetail />,
                    path: '/product-detail/:id',
                },
            ],
        },
        
    ])
    return routes
}

export default MyRouter

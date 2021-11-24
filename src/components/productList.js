import { Link } from 'react-router-dom'

import labelNew from '../assets/images/label-new.svg'
import labelBestSeller from '../assets/images/label-best-seller.svg'
import labelHotItem from '../assets/images/label-hot-item.svg'
import PoinLogo from '../assets/images/poin-logo.png'
import LikeGray from '../assets/images/like-gray.png'
import LikeRed from '../assets/images/like-red.png'
import star from '../assets/images/star.png'
import starGray from '../assets/images/star-gray.png'

const ProductListData = props => {
    const { data } = props

    const label = (rating, review, isNew) => {
        const newRating = Math.round(rating)

        if (newRating >= 4 && review > 25) {
            if(isNew) return <img className='img-label' src={labelHotItem} alt='label' />
            return <img className='img-label' src={labelBestSeller} alt='label' />
        } else if(isNew) {
            return <img className='img-label' src={labelNew} alt='label' />
        }
    }

    const stars = rating => {
        let arr = []
        const initStar = 5
        const newRating = Math.round(rating)

        const goldStar = newRating
        const grayStar = initStar - newRating
        for (let i = 0; i < goldStar; i++) {
            arr.push(true)
        }

        for (let j = 0; j < grayStar; j++) {
            arr.push(false)
        }

        return arr
    }

    const imgStar = rating => {
        const data = stars(rating)
        const result = data.map((value, idx) => <img className='star' src={value ? star : starGray} alt='rating' key={idx} />)
        return result
    }

    const result = data.map(value => {
        return (
            <div className='col-md-4 col-sm-12 product' key={value.id}>
                <div className='product-card'>
                    {label(value.attributes?.rating, value.attributes?.numOfReviews, value.attributes?.isNew)}
                    <div className='row'>
                        {value.attributes?.stock > 5 ? (
                            <span className='in-stock'>In Stock</span>
                        ) : value.attributes?.stock < 5 && value.attributes?.stock !== 0 ? (
                            <span className='under-stock'>{`Stock < ${value.attributes?.stock}`}</span>
                        ) : (
                            <span className='under-stock'>Sold Out</span>
                        )}
                    </div>
                    <div className='row'>
                        <Link to={`/product-detail/${value.id}`}>
                            <img className='product-image' src={value.attributes?.images[0]} alt='product_image' />
                        </Link>
                    </div>

                    <div className='row'>
                        <Link to='/'>
                            <span className='product-name'>{value.attributes?.name}</span>
                        </Link>
                    </div>
                    <div className='row'>
                        <div className='col-1'>
                            <img className='poins-logo' src={PoinLogo} alt='' />
                        </div>
                        <div className='col-10'>
                            <span className='poins-value'>{value.attributes?.points} poins</span>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-4'>{imgStar(value.attributes?.rating)}</div>
                        <div className='col-4'>
                            <span className='review-count'>{value.attributes?.numOfReviews} reviews</span>
                        </div>
                        <div className='col-4'>
                            <img className='like' src={value.attributes?.isWishlist ? LikeRed : LikeGray} alt='wishlist' />
                        </div>
                    </div>
                </div>
            </div>
        )
    })
    return result
}

export default ProductListData

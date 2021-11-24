import { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import axiosInstance from '../middleware/axiosInstance'
import { PlusIcon, MinusIcon } from '@heroicons/react/solid'

// import Product2x from '../assets/images/product-2x.png'
import labelNew from '../assets/images/label-new.svg'
import labelBestSeller from '../assets/images/label-best-seller.svg'
import labelHotItem from '../assets/images/label-hot-item.svg'
import PointDetail from '../assets/images/point-detail.svg'
import LikeGray from '../assets/images/like-gray.png'
import LikeRed from '../assets/images/like-red.png'
import star from '../assets/images/star.png'
import starGray from '../assets/images/star-gray.png'

const ProductDetail = () => {
    const { id } = useParams()
    let navigate = useNavigate()

    const [data, setData] = useState()
    const [counter, setCounter] = useState(1)

    const fetchGiftbyId = async () => {
        try {
            const response = await axiosInstance.get(`/gifts/${id}`)
            const result = await response.data
            setData(result.data)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        fetchGiftbyId()
    }, [])

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

    const label = (rating, review, isNew) => {
        const newRating = Math.round(rating)

        if (newRating >= 4 && review > 25) {
            if (isNew) return <img className='img-label' src={labelHotItem} alt='label' />
            return <img className='img-label' src={labelBestSeller} alt='label' />
        } else if (isNew) {
            return <img className='img-label' src={labelNew} alt='label' />
        }
    }

    return (
        <div className='container'>
            <div className='product-detail'>
                <div className='row'>
                    <nav aria-label='breadcrumb'>
                        <ol className='breadcrumb'>
                            <li className='breadcrumb-item'>
                                <Link to='/'>List product</Link>
                            </li>
                            <li className='breadcrumb-item active' aria-current='page'>
                                {data && data.attributes?.name}
                            </li>
                        </ol>
                    </nav>
                </div>
                <div className='row justify-content-center gx-5'>
                    <div className='col-md-5 col-sm-12 product-detail-content'>
                        {data && label(data.attributes?.rating, data.attributes?.numOfReviews, data.attributes?.isNew)}
                        <div className='product-image text-center'>
                            {data && <img className='product-image' src={data.attributes?.images[0]} alt='product_image' />}
                        </div>
                    </div>
                    <div className='col-md-5 col-sm-12'>
                        <div className='row'>
                            <h1 className='product-name'>{data && data.attributes?.name}</h1>
                        </div>
                        <div className='row my-3'>
                            <div className='d-flex'>
                                <span className='me-2'>{data && imgStar(data.attributes?.rating)}</span>
                                <span className='review-count'>{data && data.attributes?.numOfReviews} reviews</span>
                            </div>
                        </div>
                        <div className='row my-3'>
                            <div className='d-flex'>
                                <img className='img-point-detail me-2' src={PointDetail} alt='' />
                                <span className='poins-value me-2'>{data && data.attributes?.points} poins</span>
                                {data && data.attributes?.stock > 5 ? (
                                    <span className='in-stock'>In Stock</span>
                                ) : data && data.attributes?.stock < 5 && data.attributes?.stock !== 0 ? (
                                    <span className='under-stock'>{`Stock < ${data.attributes?.stock}`}</span>
                                ) : (
                                    <span className='under-stock'>Sold Out</span>
                                )}
                            </div>
                        </div>
                        <div className='row my-3'>
                            {data && <div dangerouslySetInnerHTML={{ __html: `${data.attributes?.info}` }}></div>}
                            <p className='product-desc'></p>
                        </div>
                        <div className='row'>
                            <span>Jumlah</span>
                        </div>
                        <div className='row'>
                            <div className='col d-flex my-2'>
                                <button className='btn-counter' onClick={() => setCounter(counter - 1)} disabled={counter === 1 ? true : false}>
                                    <MinusIcon />
                                </button>
                                <input className='input-counter' type='text' disabled value={counter} />
                                <button className='btn-counter' onClick={() => setCounter(counter + 1)} disabled={data && counter === data.attributes?.stock ? true : false}>
                                    <PlusIcon />
                                </button>
                            </div>
                        </div>
                        <div className='d-flex justify-content-around my-3'>
                            <img className='like' src={data && data.attributes?.isWishlist ? LikeRed : LikeGray} alt='wishlist' />
                            <button className='btn-reedem'>Reedem</button>
                            <button className='btn-add-to-cart'>Add to cart</button>
                        </div>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-12 product-specification'>
                        <ul class='nav nav-tabs' id='myTab' role='tablist'>
                            <li class='nav-item' role='presentation'>
                                <button
                                    class='nav-link nav-button active'
                                    id='home-tab'
                                    data-bs-toggle='tab'
                                    data-bs-target={`#${id}`}
                                    role='tab'
                                    aria-controls='home'
                                    aria-selected='true'
                                >
                                    Home
                                </button>
                            </li>
                        </ul>
                        <div class='tab-content' id='myTabContent'>
                            <div class='tab-pane fade show active' id={id} role='tabpanel' aria-labelledby='home-tab'>
                                {data && (
                                    <div
                                        className='description m-3'
                                        dangerouslySetInnerHTML={{ __html: `${data.attributes?.description}` }}
                                    ></div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetail

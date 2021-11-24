import { useEffect, useState } from 'react'
import Select from 'react-select'
import axiosInstance from '../middleware/axiosInstance'
import ProductListData from '../components/productList'

const options = {
    isSearchable: false,
    menuIsOpen: true,
}

const filter = [
    { value: `01`, label: `Terbaru` },
    { value: `02`, label: `Terjual` },
    { value: `03`, label: `Rating` },
]

const ProductList = () => {
    const [productList, setProductList] = useState()
    const [paging, setPaging] = useState()

    const fetchGift = async pagingValue => {
        try {
            const response = await axiosInstance.get(`/gifts?page[number]=${pagingValue ? pagingValue : 1}&page[size]=6`)
            const result = await response.data
            setProductList(result.data)
            setPaging(result.meta)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        fetchGift()
    }, [])

    const numberPaging = totalPages => {
        let arr = []
        for (let i = 1; i <= totalPages; i++) {
            arr.push(i)
        }

        const result = arr.map((value, idx) => (
            <li className={`page-item ${value === paging.currentPage ? `disabled` : ``}`} key={idx}>
                <button className='page-link' onClick={() => fetchGift(value)}>
                    {value}
                </button>
            </li>
        ))
        return result
    }

    const pagination = () => {
        return (
            <nav aria-label='Page navigation pagination'>
                <ul className='pagination justify-content-center'>
                    <li className={`page-item ${paging.currentPage === 1 ? `disabled` : ``}`}>
                        <button className='page-link' onClick={() => fetchGift(paging.currentPage - 1)}>
                            Previous
                        </button>
                    </li>
                    {numberPaging(paging.totalPages)}
                    <li className={`page-item ${paging.currentPage === paging.totalPages ? `disabled` : ``}`}>
                        <button className='page-link' onClick={() => fetchGift(paging.currentPage + 1)}>Next</button>
                    </li>
                </ul>
            </nav>
        )
    }

    return (
        <div className='container'>
            <div className='row gy-3 content'>
                <div className='col-md-3 col-sm-12'>
                    <div className='product-list-filter'>
                        <div className='filter-title'>
                            <h2>Filter</h2>
                        </div>
                        <div className='filter-content'>
                            <div className='row'>
                                <div className='col-12'>
                                    <div className='row'>
                                        <div className='col-10'>
                                            <span className='filter-name'>Rating 4 ke atas</span>
                                        </div>
                                        <div className='col-2'>
                                            <input type='checkbox' name='rating' id='' />
                                        </div>
                                    </div>
                                </div>
                                <div className='col-12'>
                                    <div className='row'>
                                        <div className='col-10'>
                                            <span className='filter-name'>Stock Tersedia</span>
                                        </div>
                                        <div className='col-2'>
                                            <input type='checkbox' name='rating' id='' />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-md-9 col-sm-12'>
                    <div className='product-list'>
                        <div className='d-flex justify-content-between'>
                            <div className='list-title'>
                                <h2>Product List</h2>
                            </div>
                            <div className='list-filter'>
                                <span>Urutkan</span>
                                <Select
                                    className='basic-single'
                                    classNamePrefix='filter-select'
                                    // defaultValue={colourOptions[0]}
                                    // isDisabled={isDisabled}
                                    // isLoading={isLoading}
                                    // isClearable={isClearable}
                                    isSearchable={options.isSearchable}
                                    // menuIsOpen={options.menuIsOpen}
                                    options={filter}
                                    defaultValue={filter[0]}
                                    name='Terbaru'
                                />
                            </div>
                        </div>
                    </div>
                    <div className='products'>
                        <div className='row g-4'>
                            {productList ? (
                                <ProductListData data={productList} />
                            ) : (
                                <div className='d-flex align-items-center text-info'>
                                    <strong>Loading...</strong>
                                    <div className='spinner-border ms-auto' role='status' aria-hidden='true'></div>
                                </div>
                            )}
                        </div>
                    </div>
                    {productList && paging ? pagination() : null}
                </div>
            </div>
        </div>
    )
}

export default ProductList

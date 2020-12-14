import React, { useRef } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  getProductDetail,
  clearProductDetail,
} from '../redux/product/product-action'
import Loading from '../components/loading'
import DetailsThumb from '../components/detail-thumb'
import { useState } from 'react'
import { addItem } from '../redux/cart/cart-action'

const ProductPreview = (props) => {
  const dispatch = useDispatch()
  const myRef = useRef()
  const [state, setState] = useState({ index: 0 })
  const productState = useSelector(({ product }) => product)
  const { loading, error, productDetail } = productState

  useEffect(() => {
    const id = props.match.params.product
    dispatch(getProductDetail(id))
    return () => {
      dispatch(clearProductDetail())
    }
  }, [dispatch, props.match.params.product])

  const handleTab = (index) => {
    setState({ index: index })
    const images = myRef.current.children
    for (let i = 0; i < images.length; i++) {
      images[i].className = images[i].className.replace('active', '')
    }
    images[index].className = 'active'
  }

  const renderImage = (images) => {
    if (images.length > 0) {
      return images[state.index].url
    } else {
      return '/images/slide2.jpg'
    }
  }

  const handleAddItem = () => {
    dispatch(addItem(productDetail))
  }

  return (
    <div className='product_preview_wrapper'>
      {loading ? (
        <Loading />
      ) : error ? (
        <div className='error_message'>
          <h1>{error}</h1>
        </div>
      ) : (
        <div className='details'>
          {console.log(productState)}
          <div className='big_img'>
            {/* <img src={renderImage(productDetail.images)} alt='product images' /> */}
          </div>
          <div className='box'>
            <div className='row'>
              <h2>{productDetail.name}</h2>
              <span>Php {productDetail.price}.00</span>
            </div>
            <p>{productDetail.description}</p>
            <DetailsThumb
              images={productDetail.images}
              tab={handleTab}
              myRef={myRef}
            />

            <button className='cart' onClick={handleAddItem}>
              Add to cart
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductPreview

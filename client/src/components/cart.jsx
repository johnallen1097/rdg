import React from 'react'
import { selectCartItems, selectCartTotal } from '../redux/cart/cart-selectors'
import CartItem from './cart-item'
import addComma from '../utils/helper/add-comma'
import { useSelector } from 'react-redux'
import MyButton from '../components/button'
import { useHistory } from 'react-router-dom'

const Cart = () => {
  const history = useHistory()
  const total = useSelector((state) => selectCartTotal(state))
  const cartItems = useSelector((state) => selectCartItems(state))
  const cartItemList = () =>
    cartItems.map((i) => <CartItem key={i._id} item={i} />)

  const handleCloseC = () => {
    document.getElementById('toggleSideNav').click()
    history.push('/checkout')
  }

  return (
    <div className='cart'>
      {console.log(cartItems)}
      <h1 className='heading-secondary'>Cart</h1>
      <table className='cart__table'>
        <tbody>
          <tr>
            <th>Name</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Sub Total</th>
            <th></th>
          </tr>
          {cartItems.length > 0 && cartItemList()}
        </tbody>
      </table>
      <div className='cart__total'>
        <h2>
          <small>Total: </small>
          Php {addComma(total)}
        </h2>
      </div>

      <MyButton
        addStyle={{
          margin: '0 1rem',
          padding: '.5rem',
          fontSize: '1rem',
          letterSpacing: '4px',
          float: 'right',
        }}
        runAction={() => handleCloseC()}
        type={'primary'}
        title={'Checkout'}
      />
    </div>
  )
}

export default Cart

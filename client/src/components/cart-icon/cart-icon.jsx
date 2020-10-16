import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleCartHidden } from "../../redux/ui/ui-actions";
import { selectCartItemsCount } from "../../redux/cart/cart-selectors"
import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';
import './cart-icon.scss';

const CartIcon = () => {
  const dispatch = useDispatch();
  const handleToggleCartHidden = () => {
    dispatch(toggleCartHidden())
  }
  const itemCount = useSelector(state => selectCartItemsCount(state));
  return (
    <div className='cart-icon' onClick={handleToggleCartHidden}>
      <ShoppingIcon className='shopping-icon' />
      <span className='item-count'>{itemCount > 0 ? itemCount : null}</span>
    </div>
  )
}



export default CartIcon;
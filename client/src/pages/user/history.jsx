import React, { Fragment } from 'react'
import { useState } from 'react'
// import moment from 'moment';

// {moment(product.dateOfPurchase).format("MM-DD-YYYY")}

const UserHistory = () => {
  const [orderHistory, setOrderHistory] = useState([])

  const renderBlocks = () =>
    orderHistory
      ? Object.keys(orderHistory).map((key, index) => {
          return (
            <table key={index}>
              <thead>
                <tr>
                  <th>Order number</th>
                  <th>Product</th>
                  <th>Price paid</th>
                  <th>Quantity</th>
                  <th>Sub total</th>
                </tr>
              </thead>
              <tbody>
                {orderHistory[key]['product'].map((data, i) => (
                  <Fragment key={i}>
                    <tr>
                      <td>{index + 1}</td>
                      <td>{data.name}</td>
                      <td>{data.price}</td>
                      <td>{data.quantity}</td>
                      <td>{data.price * data.quantity}</td>
                    </tr>
                  </Fragment>
                ))}
                <tr>
                  <td>Date</td>
                  <td>{orderHistory[key]['createdAt']}</td>
                  <td></td>
                  <td>Total</td>
                  <td>{orderHistory[key]['total']}</td>
                </tr>
              </tbody>
            </table>
          )
        })
      : null

  return (
    <div className='history_blocks'>
      <h1 className='heading-secondary'>History</h1>
      {renderBlocks()}
    </div>
  )
}

export default UserHistory
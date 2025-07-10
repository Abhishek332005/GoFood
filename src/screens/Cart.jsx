


import React from 'react';
import { useCart, useDispatchCart } from '../components/ContextReducer';

export default function Cart() {
  let data = useCart();
  let dispatch = useDispatchCart();

  if (data.length === 0) {
    return (
      <div>
        <div className='m-5 w-100 text-center fs-3 text-white'>
          The Cart is Empty!
        </div>
      </div>
    );
  }

  const handleRemove = (index) => {
    dispatch({ type: "REMOVE", index: index });
  };

  const handleCheckOut = async () => {
    let userEmail = localStorage.getItem("userEmail");

    let response = await fetch("http://localhost:5000/api/orderData", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        order_data: data,
        email: userEmail,
        order_date: new Date().toDateString()
      })
    });

    if (response.status === 200) {
      dispatch({ type: "DROP" });
    }
  };

  let totalPrice = data.reduce((total, food) => total + food.price, 0);

  return (
    <div className='d-flex justify-content-center mt-5'>
      <div className='table-responsive' style={{ maxWidth: "1000px", width: "100%" }}>
        <table className='table table-hover table-bordered'>
          <thead className='text-success fs-5 text-center'>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Quantity</th>
              <th>Option</th>
              <th>Amount</th>
              <th></th>
            </tr>
          </thead>
          <tbody className='text-center'>
            {data.map((food, index) => (
              <tr key={index}>
                <th>{index + 1}</th>
                <td>{food.name}</td>
                <td>{food.qty}</td>
                <td>{food.size}</td>
                <td>₹{food.price}</td>
                <td>
                  <button
                    type="button"
                    className="btn text-danger"
                    onClick={() => handleRemove(index)}
                    title="Remove item"
                  >
                    <i className="fas fa-trash-alt"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className='text-center'>
          <h1 className='fs-3 text-white'>Total Price: ₹{totalPrice}/-</h1>
        </div>
        <div className='text-center'>
          <button className='btn bg-success mt-3 px-4 text-white' onClick={handleCheckOut}>
            Check Out
          </button>
        </div>
      </div>
    </div>
  );
}

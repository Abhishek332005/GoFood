
import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function MyOrder() {
  const [orderData, setOrderData] = useState(null);

  const fetchMyOrder = async () => {
    const response = await fetch("http://localhost:5000/api/myOrderData", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: localStorage.getItem('userEmail'),
      }),
    });

    const json = await response.json();
    console.log("📦 FULL ORDER RESPONSE:", JSON.stringify(json, null, 2));
    setOrderData(json);
  };

  useEffect(() => {
    fetchMyOrder();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="row">
          {orderData?.orderData?.order_data?.length > 0 ? (
            <>
              <div className="m-auto mt-5 fs-5 fw-bold">
                Order Date:{" "}
                {new Date(orderData.orderData.order_data[0].Order_date).toLocaleString()}
                <hr />
              </div>

              {orderData.orderData.order_data.slice(1).map((item, idx) => (
                <div className="col-12 col-md-6 col-lg-3" key={idx}>
                  <div className="card mt-3" style={{ width: '16rem', maxHeight: '360px' }}>
                    <img
                      src={item.img || "https://via.placeholder.com/150"}
                      className="card-img-top"
                      alt={item.name || "Food item"}
                      style={{ height: '120px', objectFit: 'fill' }}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{item.name}</h5>
                      <div className="container w-100 p-0" style={{ height: '38px' }}>
                        <span className="m-1">Qty: {item.qty}</span>
                        <span className="m-1">Size: {item.size}</span>
                        <div className="d-inline ms-2 h-100 w-20 fs-5">
                          ₹{item.price}/-
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <div className="text-center mt-5">Loading your orders...</div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
   

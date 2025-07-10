

import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../components/Card'

export default function Home() {

  const [search, setSearch] = useState('')
  const [foodCat, setFoodCat] = useState([])
  const [foodItem, setFoodItem] = useState([])

  const loadData = async () => {
    let response = await fetch("http://localhost:5000/api/foodData", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      }
    })
    response = await response.json()

    setFoodItem(response[0]);
    setFoodCat(response[1]);
  }

  useEffect(() => {
    loadData()
  }, [])

  return (
    <>
      <div><Navbar /></div>

      {/* 🔍 Search Box Over Image */}
      <div className="d-flex justify-content-center my-3 position-absolute w-100" style={{ zIndex: 1, top: '70%' }}>
        <div className="d-flex justify-content-center">
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search for food"
            aria-label="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* 🖼️ Bootstrap Carousel */}
      <div id="carouselExample" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active" data-bs-interval="3000">
            <img
              src="https://images.unsplash.com/photo-1668236543090-82eba5ee5976?q=80&w=1170&auto=format&fit=crop"
              style={{ width: '100vw', height: '89vh', objectFit: 'cover' }}
              className="d-block w-100"
              alt="slide1"
            />
          </div>
          <div className="carousel-item" data-bs-interval="3000">
            <img
              src="https://i.pinimg.com/736x/9a/c1/f9/9ac1f96f80efd57e2453649003d8ec1c.jpg"
              style={{ width: '100vw', height: '89vh', objectFit: 'cover' }}
              className="d-block w-100"
              alt="slide2"
            />
          </div>
          <div className="carousel-item" data-bs-interval="3000">
            <img
              src="https://images.unsplash.com/photo-1606850780554-b55ea4dd0b70?q=80&w=1170&auto=format&fit=crop"
              style={{ width: '100vw', height: '89vh', objectFit: 'cover' }}
              className="d-block w-100"
              alt="slide3"
            />
          </div>
        </div>

        {/* Carousel Controls */}
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      {/* 🧾 Food Category Cards */}
      <div className='container mt-5'>
        {
          Array.isArray(foodCat) && foodCat.length > 0
            ? foodCat.map((data) => (
              <div key={data._id} className='row mb-3'>
                <div className='fs-3 m-3'>{data.CategoryName}</div>
                <hr />
                {
                  foodItem
                    .filter(item =>
                      item.CategoryName === data.CategoryName &&
                      item.name.toLowerCase().includes(search.toLowerCase())
                    )
                    .map(filterItems => (
                      <div key={filterItems._id} className='col-12 col-md-6 col-lg-3'>
                        <Card
                          foodItem={filterItems}
                          options={filterItems.options[0]}
                          
                        />
                      </div>
                    ))
                }
              </div>
            ))
            : <div className='text-center'>Loading Categories...</div>
        }
      </div>

      <div><Footer /></div>
    </>
  )
}


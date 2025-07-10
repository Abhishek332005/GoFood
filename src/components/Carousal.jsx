import React from 'react'

export default function Carousal() {
  return (
    <>
      <div id="carouselExampleDark" className="carousel carousel-dark slide">
        
        {/* SEARCH BAR placed separately (outside indicators) */}
        <div className="d-flex justify-content-center my-3 position-absolute w-100" style={{ zIndex: 1, top: '70%' }}>
          <form className="d-flex w-50" role="search">
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
            <button className="btn btn-outline-success" type="submit">Search</button>
          </form>
        </div>

        {/* Image slides */}
        <div className="carousel-inner">
          <div className="carousel-item active" data-bs-interval="10000">
            <img
              src="https://images.unsplash.com/photo-1668236543090-82eba5ee5976?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              style={{ width: '100vw', height: '89vh', objectFit: 'cover' }}
              className="d-block"
              alt="..."
            />
          </div>
          <div className="carousel-item" data-bs-interval="2000">
            <img
              src="https://i.pinimg.com/736x/9a/c1/f9/9ac1f96f80efd57e2453649003d8ec1c.jpg"
              style={{ width: '100vw', height: '89vh', objectFit: 'cover' }}
              className="d-block"
              alt="..."
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://images.unsplash.com/photo-1606850780554-b55ea4dd0b70?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              style={{ width: '100vw', height: '89vh', objectFit: 'cover' }}
              className="d-block"
              alt="..."
            />
          </div>
        </div>

        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </>
  )
}

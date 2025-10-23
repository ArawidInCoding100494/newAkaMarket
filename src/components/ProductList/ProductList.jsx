import "./ProductList.scss"

import React, { useEffect, useState } from 'react'

const ProductList = ({allProducts, filterCards}) => {

  const [products, setproducts] = useState(allProducts || [])

  useEffect(() => {
    filterCards()
  }, [allProducts])

  useEffect(() => {
    const filterProducts = products.filter((product) => product.cAmount > 0)
    if(filterProducts.length !== products.length)
      setproducts(filterProducts)
    localStorage.setItem("allProducts", JSON.stringify(filterProducts))
  }, [products])

  return (
    <div className="ProductList">
        <h2 className="ProductList-title">barcha maxsulotlar</h2>
        {products && products.map((product) => {
            return(
                <div className="ProductList-card" key={product.id}>
                    <p className="ProductList-card-time"><span>{product.cName}: </span> {product.date}</p>
                    <div className="ProductList-card-notes">
                    <p className="ProductList-card-notes-nomi" >nomi: <br />{product.cName}:</p>
                    <p>soni: <br /> {product.cAmount}</p>
                    <p>narxi: <br /> {product.cPrice}</p>
                    <p>itogo: <br /> {product.itogo}</p>
                    </div>
                    
                </div>
            )
        })}
    </div>
  )
}

export default ProductList

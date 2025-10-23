import "./DailyTrade.scss"

import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from "uuid"

const DailyTrade = ({copiedProducts, soldProducts, filterCards}) => {


  const [itogoCounter, setitogoCounter] = useState(0)

  const [soldValue, setSoldValue] = useState(
    {
      id: uuidv4(),
      sName: "",
      sAmount: null,
      sPrice: null,
      sItogo: 0,
    }
  )

  
  useEffect(() => {
    setTimeout(() => {
      filterCards()
    }, 0)
  }, [copiedProducts])

  useEffect(() => {
    if(soldValue.sAmount && soldValue.sPrice){
      const calcItogo = soldValue.sAmount * soldValue.sPrice
      setitogoCounter(calcItogo)
    }

  }, [soldValue.sAmount && soldValue.sPrice])


  const handelSubmit = (e, product) => {
    e.preventDefault()

    const newSell = {
      id: product.id,
      sName: product.cName,
      sAmount: soldValue.sAmount,
      sPrice: soldValue.sPrice,
      sItogo: itogoCounter,
      sTime: new Date().toLocaleDateString("uz-UZ")
    }

    soldProducts(newSell);
    e.target.reset()
    
  }


  return (
    <div className="DailyTrade">
      <h1 className="DailyTrade-title">kunlik savdo</h1>

      <div className="DailyTrade-cards">
        {copiedProducts && copiedProducts.map((product) => {
          return(
            <div className="DailyTrade-cards-card"  key={product.id}  >

                <h3 className="DailyTrade-cards-card-title">{product.cName}</h3>
            <form onSubmit={(e) => handelSubmit(e, product)} >

              <label className="card-label nomi">
                <span className="card-label-span">nomi</span>
                <textarea onChange={(e) => setSoldValue((prev) => {
                  return {...prev, sName: e.target.value}
                })} defaultValue={product.cName} required type="text" className="" ></textarea>
              </label>

              <label className="card-label">
                <span className="card-label-span">soni</span>
                <input onChange={(e) => setSoldValue((prev) => {
                  return {...prev, sAmount: e.target.value}
                })} required type="number" className="card-label-inp" />
              </label>


              <label className="card-label">
                <span className="card-label-span">narxi</span>
                <input onChange={(e) => setSoldValue((prev) => {
                  return {...prev, sPrice: e.target.value}
                })} required type="number" className="card-label-inp" />
              </label>


              <p className="itogo">   itogo: 
                
                <span>{itogoCounter}</span></p>

              <button className="btn">sell</button>

            </form>


            </div>
          )
        })}
      </div>
    </div>
  )
}

export default DailyTrade

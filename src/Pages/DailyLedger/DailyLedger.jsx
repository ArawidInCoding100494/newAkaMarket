import { useEffect, useState } from "react"
import "./DailyLedger.scss"




const DailyLedger = ({selled}) => {

  const [allProfits, setAllProfits] = useState(0)
  const [allAmounts, setAllAmounts] = useState(0)
  const [allSales, setallSales] = useState(0)
  const [maxPrice, setmaxPrice] = useState(0)




  useEffect(() => {
    if(Array.isArray(selled) && selled.length > 0){
      const sum = selled.reduce((acc, item) => {
        return acc + Number(item.sItogo) || 0}, 0)
        setallSales(sum)
    }
  }, [selled])


  useEffect(() => {
    if(Array.isArray(selled) && selled.length > 0){
      const sum = selled.reduce((acc, item) => {
        return acc + Number(item.sAmount) || 0}, 0)
        setAllAmounts(sum)
    }
  }, [selled])



  useEffect(() => {
    if(allSales && allProfits){

      setmaxPrice(allSales - allProfits)
    }
  }, [allSales && allProfits])



  useEffect(()  => {
    if(Array.isArray(selled) && selled.length > 0){
      const sum = selled.reduce((acc, item) => {
        return acc + Number(item.profit) || 0 }, 0)
        setAllProfits(sum)
    }
  }, [selled])







  return (
    <div className="DailyLedger">
      <div className="DailyLedger-cards">
        <h1 className="DailyLedger-cards-title">kunlik xisobotlar</h1>
        <h3>jami sotilgan maxsulotlar: {allAmounts} ta</h3>
        <h3>jami savdo: {allSales}</h3>
        <h3>jami maxsulotlar tan narxi: {maxPrice}</h3>
        <h3>jami foyda: {allProfits}</h3>
        {selled && selled.map((product) => {
          return(
            <div key={product.id} className="DailyLedger-cards-card">

              <div className="card-time">
                <h3 className="card-time-title">{product.sName}</h3>
                <p>{product.sTime}</p>
              </div>

              <div className="card-values">
                <span className="card-values-span"> nomi
                  <p>{product.sName}</p>
                </span>

                <span className="card-values-span"> soni
                  <p>{product.sAmount}</p>
                </span>

                <span className="card-values-span"> narxi
                  <p>{product.sPrice}</p>
                </span>

                <span className="card-values-span"> itogosi
                  <p>{product.sItogo}</p>
                </span>

                  <span className="card-values-span"> foyda
                  <p>{product.profit}</p>
                </span>

              </div>

            </div>
          )
        })}
      </div>
    </div>
  )
}

export default DailyLedger

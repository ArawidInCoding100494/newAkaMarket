import { useEffect, useState } from 'react'
import './App.scss'

// rrd imports
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom'


// uuid
import {v4 as uuidv4} from "uuid"


// layouts
import RootLayOut from "./LayOuts/RootLayOut/RootLayOut"


// pages
import TotalBase from "./Pages/TotalBase/TotalBase"
import DailyTrade from "./Pages/DailyTrade/DailyTrade"
import DailyLedger from "./Pages/DailyLedger/DailyLedger"



// components
import CreatingProduct from "./components/CreatingProduct/CreatingProduct"
import ProductList from "./components/ProductList/ProductList"


function App() {

  const [allProducts, setAllProducts] = useState([])
  const [copiedProducts, setCopiedProducts] = useState([])
  const [selled, setSelled] = useState([])


  useEffect(() => {
    const getAllProducts = JSON.parse(localStorage.getItem("allProducts")) || []
      if(getAllProducts){
        setAllProducts(getAllProducts)
        setCopiedProducts(getAllProducts)
      }else{
        setAllProducts([])
        setCopiedProducts([])
      }
  }, [])



  const getProductValue = (getValue) => {
    const upDatingValue = [...allProducts, getValue]
    setAllProducts(upDatingValue)
    setCopiedProducts(upDatingValue)
    localStorage.setItem("allProducts", JSON.stringify(upDatingValue))
  }


  const soldProducts = (newSell) => {
    const finding = allProducts.find((product) => product.id === newSell.id)

    if(!finding){
      alert("Maxsulot topilmadi")
    }

    if(Number(newSell.sAmount) > Number(finding.cAmount) ){
      alert("siz ombordagi miqdordan kop miqdor kiritdingiz")
      return;
    }



    // changing values in baza (only Amounts)
    const upDateDailyTrade = allProducts.map((oldProduct) => {
      if(oldProduct.id === newSell.id){
       
        return{
          ...oldProduct, cAmount: oldProduct.cAmount - newSell.sAmount
        } 
      }
      return oldProduct
    })

    setAllProducts(upDateDailyTrade)
    localStorage.setItem("allProducts", JSON.stringify(upDateDailyTrade))
    // -----------------------------------------------------------------------


    // for daily profit calcing amounts and profits-----------------------------
    const getOldsold = JSON.parse(localStorage.getItem("selling")) || []


    const profit = newSell.sPrice && finding?.cPrice
    ? (newSell.sPrice - finding.cPrice) * newSell.sAmount
    : 0
    // ---------------------------------------------------------------------

    const newSellItem = {
      id: uuidv4(),
      sName: newSell.sName,
      sAmount: newSell.sAmount,
      sPrice: newSell.sPrice,
      sItogo: newSell.sItogo,
      profit: profit,
      sTime: new Date().toLocaleDateString("uz-UZ")
    }

    const upDatinggetOldsold = [...getOldsold, newSellItem]

    setSelled(upDatinggetOldsold)
    localStorage.setItem("selling", JSON.stringify(upDatinggetOldsold))
  }



  useEffect(() => {
    const getsoldProductsValues = JSON.parse(localStorage.getItem("selling")) || []
    if(getsoldProductsValues){
      setSelled(getsoldProductsValues)
    }else{
      setSelled([])
    }
  }, [])




  const filterCards = () => {
    const filterAllProducts = allProducts.filter((product) => product.cAmount > 0)
    if(filterAllProducts.length !== allProducts.length){
      setAllProducts(filterAllProducts)
      setCopiedProducts(filterAllProducts)
      localStorage.setItem("allProducts",  JSON.stringify(filterAllProducts))
    }
  }




  


  const routes = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<RootLayOut/>} >

        
        <Route path='/TotalBase' element={<TotalBase/>} >
          <Route path="CreatingProduct" element={<CreatingProduct getProductValue={getProductValue} />} />
        <Route index element={<ProductList allProducts={allProducts} filterCards={filterCards} />} />
        </Route>


        <Route index element={<DailyTrade copiedProducts={copiedProducts} filterCards={filterCards} soldProducts={soldProducts} />} />
        
        <Route path='DailyLedger' element={<DailyLedger selled={selled} />} />


      </Route>
    )
  )

  return (
    <div className='app'>
      <RouterProvider router={routes} />
    </div>
  )
}

export default App

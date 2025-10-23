import { Outlet, NavLink } from "react-router-dom"
import "./TotalBase.scss"



const TotalBase = () => {
  return (
    <div className="TotalBase">
       <div className="TotalBase-title">
        <h2>yangi maxsulot qo'shing</h2>
        <nav>
        <NavLink to="CreatingProduct" className="btn">qo'shish</NavLink>
        </nav>
      </div>
      <Outlet/>
    </div>
  )
}

export default TotalBase

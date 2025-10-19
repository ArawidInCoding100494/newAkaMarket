import "./RootLayOut.scss"

import { NavLink, Outlet } from "react-router-dom"
import { useState, useEffect } from "react";

const RootLayOut = () => {


      const [isFixed, setIsFixed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="RootLayOut">
        <header>
        <h1 className="RootLayOut-title">Aka market 2</h1>
        </header>
        <main>
            <div className="sides">

                <div className={`sides-right ${isFixed ? "fixed" : ""}`}>
                    <nav>
                        <NavLink className="btn" to="/TotalBase" >Baza</NavLink>
                        <NavLink className="btn" to="/" >kunlik savdo</NavLink>
                        <NavLink className="btn" to="/DailyLedger" >kunlik xisobot</NavLink>
                    </nav>
                </div>




                <div className="sides-left">
                    <Outlet/>
                </div>
            </div>
        </main>

    </div>
  )
}

export default RootLayOut

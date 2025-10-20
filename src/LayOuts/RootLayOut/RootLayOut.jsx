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




  const [theme, setTheme] = useState("light")

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme")
    if(savedTheme){
      setTheme(savedTheme)
      document.documentElement.className = savedTheme
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("theme", theme)
    document.documentElement.className = theme
  }, [theme])



  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light")
  }





  return (
    <div className="RootLayOut">
        <header>
        <h1 className="RootLayOut-title">Aka market </h1>
        <button className="btn" onClick={toggleTheme}>
          {theme === "light" ?  "dark Mode" : "light Mode"}
          </button>
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

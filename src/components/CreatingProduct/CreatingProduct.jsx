import { NavLink, useNavigate } from "react-router-dom";
import "./CreatingProduct.scss";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const CreatingProduct = ({ getProductValue }) => {
  const navigate = useNavigate();
  const [itogo, setItogo] = useState(0);

  const [getValue, setgetValue] = useState({
    id: uuidv4(),
    date: new Date().toLocaleDateString("uz-UZ"),
    cName: "",
    cAmount: "",
    cPrice: "",
    itogo: 0,
  });

  useEffect(() => {
    if (getValue.cAmount && getValue.cPrice) {
      const calcItogo = getValue.cAmount * getValue.cPrice;
      setItogo(calcItogo);
      setgetValue((prev) => ({ ...prev, itogo: calcItogo }));
    } else {
      setItogo(0);
      setgetValue((prev) => ({ ...prev, itogo: 0 }));
    }
  }, [getValue.cAmount && getValue.cPrice]);

  const handelSubmit = (e) => {
    e.preventDefault();
    getProductValue(getValue);
    navigate("/");
  };

  return (
    <div className="CreatingProduct">
      <div className="CreatingProduct-overlay">
        <form onSubmit={handelSubmit} className="CreatingProduct-forma">
          <label className="forma-label">
            <span className="forma-label-span">Nomi</span>
            <textarea
              onChange={(e) =>
                setgetValue((prev) => {
                  return { ...prev, cName: e.target.value };
                })
              }
              required
              type="text"
              placeholder="nomi"
              className="forma-label-inp"
            ></textarea>
          </label>

          <label className="forma-label">
            <span className="forma-label-span">soni</span>
            <input
              onChange={(e) =>
                setgetValue((prev) => {
                  return { ...prev, cAmount: e.target.value };
                })
              }
              required
              type="number"
              placeholder="soni"
              className="forma-label-inp"
            />
          </label>

          <label className="forma-label">
            <span className="forma-label-span">narxi</span>
            <input
              onChange={(e) =>
                setgetValue((prev) => {
                  return { ...prev, cPrice: e.target.value };
                })
              }
              required
              type="number"
              placeholder="narxi"
              className="forma-label-inp"
            />
          </label>

          <label className="forma-label itogo">
            <span className="forma-label-span">Itogo</span>
            <p className="forma-label-sum"> {itogo}</p>
          </label>

          <div className="CreatingProduct-forma-btns">
            <button onClick={() => navigate("/")} className="btn">
              bekor qilish
            </button>
            <button className="btn">qo'shish</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatingProduct;

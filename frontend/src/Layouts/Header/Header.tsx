import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useLocalStorage from "../../hooks/useLocalStorage";
import {
  fetchCategories,
  getCategories,
} from "../../features/categories-slice";
import { useCartItemCount } from "../../Providers/CartItemCount";
import { AppDispatch } from "../../app/store";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import "./Header.scss";

function Header() {
  const categories = useSelector(getCategories);
  const { decoded } = useLocalStorage();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const cartId = localStorage.getItem("cartId");
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const count = useCartItemCount();

 
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  function logOut() {
    localStorage.removeItem("user");
    navigate("/");
  }
  function cart() {
    if (decoded?.id) {
      navigate(`/cartItem/${decoded?.id}`);
    } else {
      navigate("/login");
    }
  }

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <header className="navbar">
      <div className="logo">
        <a href="">
          <img className="logo" src="" alt="" />
        </a>
      </div>

      <ul className="nav-links">
        <input type="checkbox" id="checkbox_toggle" />
        <label htmlFor="checkbox_toggle" className="hamburger">
          &#9776;
        </label>

        <div className="menu">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/products">Products</Link>
          </li>

          <li className="dropdown1">
            <p>Categories</p>
            <div className="dropdown-content">
              {categories?.map((category) => (
                <Link to={`/category/${category.id}`} key={category.id}>
                  {category.name}
                </Link>
              ))}
            </div>
          </li>

          <li>
            <Link to="/#about">About</Link>
          </li>
          <li>
            <Link to="">Contact</Link>
          </li>
          <li>
            <LocalMallIcon className="cart"
              id="myBtn"
              onClick={cart}  />
            {count ? <span className="cart-badge">{count}</span> : null}
          </li>
          <li onClick={toggleDropdown} className="avatar">
          <AccountCircleIcon sx={{fontSize:'30px', cursor:'pointer'}} />
            {isDropdownOpen && (
              <div className="dropdown">
                <div className="dropdown-item">Profile</div>
                <div className="dropdown-item" onClick={logOut}>
                  Logout
                </div>
                <div
                  className="dropdown-item"
                  onClick={() => navigate(`/ordered/${cartId}`)}
                >
                  {" "}
                  Ordered
                </div>
              </div>
            )}
          </li>
          <li>
            <Link to="/login">Sign In</Link>
          </li>
        </div>
      </ul>
    </header>
  );
}

export default Header;

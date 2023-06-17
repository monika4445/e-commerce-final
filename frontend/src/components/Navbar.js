import { Link, NavLink } from "react-router-dom";
import { FiHome, FiShoppingCart, FiPackage } from "react-icons/fi";
import { useSelector } from "react-redux";

const Navbar = () => {
  // Accessing state from cart slice
  const { cartItems } = useSelector((state) => state.cart);

  // Menu active style
  const isNavActiveStyles = ({ isActive }) => {
    return {
      color: isActive ? "#807ed3" : null,
    };
  };

  return (
    <div className="navbar-bg bg-#05f5c8 flex justify-center items-center h-16">
      <div className="navbar container mx-auto flex items-center justify-between">
        <div className="left">
          <Link to="/" className="group flex items-center">
            <img
              src={process.env.PUBLIC_URL + "/gigtech.png"}
              alt="GigTech"
              className="logo w-10 h-10 mr-2"
            />
            <span className="text-xl font-semibold group-hover:text-#534ffb duration-300">
              GigTech
            </span>
          </Link>
        </div>
        <div className="right flex items-center gap-5">
          <NavLink
            exact
            to="/"
            className="nav-link text-3xl hover:text-#534ffb"
            activeClassName="text-#534ffb"
            style={isNavActiveStyles}
          >
            <FiHome className="icon" />
          </NavLink>
          <NavLink
            to="/products"
            className="nav-link text-3xl hover:text-#534ffb"
            activeClassName="text-#534ffb"
            style={isNavActiveStyles}
          >
            <FiPackage className="icon" />
          </NavLink>
          <Link to="/cart" className="cart-icon text-3xl relative">
            <FiShoppingCart className="icon" />
            {cartItems.length > 0 && (
              <span className="cart-counter bg-red-500 text-white font-medium rounded-full w-5 h-5 flex justify-center items-center absolute -top-2 -right-2 text-xs">
                {cartItems.length}
              </span>
            )}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

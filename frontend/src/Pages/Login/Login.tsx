import { useState, FormEvent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, LoginPayload } from "../../features/users-slice";
import { AppDispatch, RootState } from "../../app/store";
import { Link, useNavigate } from "react-router-dom";
import useLocalStorage from "../../hooks/useLocalStorage";
import "./Login.scss";

function Login() {
  const [user, setUser] = useState<LoginPayload>({
    email: "",
    password: "",
  });
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const errorMessage = useSelector((state: RootState) => state.users.errorLogin);
  const navigate = useNavigate();
  const { userInStorage, decoded } = useLocalStorage();
  const dispatch: AppDispatch = useDispatch();
  function loginUser(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatch(login({ user })).then(() => {
      if (userInStorage && decoded) {
        setLoggedIn(true);
        navigate(`/cartItem/${decoded.id}`);
      }
    })
    .catch((error) => {
      console.log(error,'error'); 
    });
    setUser({email:'', password:''});
  }
  useEffect(()=>{
    if (loggedIn && decoded) {
        navigate(`/cartItem/${decoded.id}`);
    }
  },[loggedIn,decoded])
  return (
        <div className="form-bd">
          <div className="form-wrapper">
            <div className="form-container">
              <h1> Please Login</h1>
              <form onSubmit={loginUser}>
                <div className="form-control">
                  <input
                    type="text"
                    onChange={(e) =>
                      setUser((prev) => ({ ...prev, email: e.target.value }))
                    }
                    value={user.email}
                    required
                    placeholder="Email"
                  />
                </div>

                <div className="form-control">
                  <input
                    type="password"
                    onChange={(e) =>
                      setUser((prev) => ({ ...prev, password: e.target.value }))
                    }
                    value={user.password}
                    required
                    placeholder="Password"
                  />
                </div>
                {errorMessage && <p className="error-message">{errorMessage.slice(6)}</p>}
                <button className="login-btn">Login</button>
                <p className="text">
                  Don't have an account? <Link to='/register'> Register</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
  );
}

export default Login;

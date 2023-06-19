
import { useState, FormEvent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register, User } from "../../features/users-slice";
import { AppDispatch, RootState } from "../../app/store";
import { Link } from "react-router-dom";
import './Register.scss'


function Register() {
  const [user, setUser] = useState<User>({
    userName: "",
    email: "",
    password: ""
  });
  const [registered, setRegistered] = useState(false);
  const errorMessage = useSelector((state: RootState) => state.users.errorRegister);
  const dispatch: AppDispatch = useDispatch();

  function registerUser(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatch(register({ user })).then((res)=>{
      setRegistered(true);
    });
    setUser({ userName: "", email: "", password: "" });
  }
  useEffect(()=>{
    const timer = setTimeout(() => {
      setRegistered(false);
    }, 3000); 
    
    return () => clearTimeout(timer);
  })

  return (
    <div className="form-bd">
      <div className="form-wrapper">
        <div className="form-container">
          <h1>Please Register</h1>
          <form onSubmit={registerUser}>
            <div className="form-control">
              <input
                type="text"
                onChange={(e) =>
                  setUser((prev) => ({ ...prev, userName: e.target.value }))
                }
                value={user.userName}
                required
                placeholder="UserName"
              />
            </div>
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
            <button className="login-btn">Register</button>
            <p className="text">
              Have an account? <Link to="/login">Login</Link>
            </p>
          </form>
        </div>
      </div>
      {registered ? (
        <div className="registration-success">
          <p>You have successfully registered!</p>
        </div>
      ):null}
    </div>
  );
}

export default Register;

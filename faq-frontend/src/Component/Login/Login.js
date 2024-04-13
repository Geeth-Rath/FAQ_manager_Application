import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers } from "../Redux/Slice/userSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const users = useSelector((state) => state.user.data);

  const [formdata, setFormdata] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  const handlesubmit = () => {
    const existingUser = users.find(
      (user) =>
        user.username === formdata.username &&
        user.password === formdata.password
    );
    console.log("existingUser", existingUser);
    if (existingUser) {
      console.log("Login successful.");
      navigate("/content");
    } else {
      alert("Invalide Username or Password. Please try again.");
      console.log("Invalid username or password");
    }
  };

  const onChangeHandle = (e) => {
    setFormdata({
      ...formdata,
      [e.target.name]: e.target.value,
    });
    console.log(formdata);
  };

  return (
    <div className=" d-flex justify-content-center align-items-center pt-5 pb-5">
      <div className="">
        <form class=" g-3 rounded shadow p-4" onSubmit={handlesubmit}>
          <h1>Login</h1>
          <div class="form-row ">
            <div class="form-group mt-4">
              <input
                type="text"
                name="username"
                value={formdata.username}
                class="form-control"
                id="inputUserName"
                placeholder="userName"
                onChange={onChangeHandle}
              />
            </div>

            <div class="form-group mt-4 ">
              <input
                type="password"
                name="password"
                value={formdata.password}
                class="form-control"
                id="inputpassword"
                placeholder="Password"
                autocomplete="false"
                onChange={onChangeHandle}
              />
            </div>
          </div>

          <div class="d-grid mt-4">
            <button type="submit" class="btn btn-primary">
              Login
            </button>
          </div>
          <div
            className="login-link mt-4 mb-4"
            style={{ textAlign: "center", fontSize: "13px" }}
          >
            Don't have an account?{" "}
            <Link
              to="/registration"
              style={{
                textAlign: "center",
                fontSize: "13px",
                marginLeft: "12px",
              }}
            >
              Register now!
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

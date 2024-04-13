import React, { useEffect, useState } from "react";
import { Form, Input, Button,  } from "antd";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, fetchAllUsers } from "../Redux/Slice/userSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Registration = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  const handlesubmit = (e) => {
    e.preventDefault();
    const existingUsernames = users.data.map((user) => user.username);
  const existingEmails = users.data.map((user) => user.email);

  if (existingUsernames.includes(formdata.username)) {
    alert("Username already exists. Please choose a different username.");
    return;
  }

  if (existingEmails.includes(formdata.email)) {
    alert("Email already exists. Please use a different email.");
    return;
  }
  
    dispatch(registerUser(formdata)).then(() => {
      alert("Registration successful. You can now login.");
      navigate("/login");
    })
    .catch((error) => {
      alert(
        "Username already exists. Please choose a different username."
      );
    });
  };

  const [formdata, setFormdata] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

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
          <h1>Registration</h1>
          <div class="form-row ">
            <div class="form-group mt-4">
              <input
                type="text"
                name="name"
                value={formdata.name}
                class="form-control "
                id="inputName"
                placeholder="Name"
                onChange={onChangeHandle}
              />
            </div>
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
            <div class="form-group col mt-4">
              <input
                type="email"
                name="email"
                value={formdata.email}
                class="form-control"
                id="inputEmail4"
                placeholder="email"
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
              Register
            </button>
          </div>
          <div
            className="login-link mt-4 mb-4"
            style={{ textAlign: "center", fontSize: "13px" }}
          >
            Already have an account?
            <Link
              to="/login"
              style={{
                textAlign: "center",
                fontSize: "13px",
                marginLeft: "12px",
              }}
            >
              Login now!
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Registration;
{
  /* *********************************************************** */
}
{
  /* <Form
          name="basic"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            name="name"
            rules={[
              {
                required: true,
                message: "Please input your name!",
              },
            ]}
          >
            <Input placeholder="Name" />
          </Form.Item>

          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  const existingUsernames = users.data.map(
                    (user) => user.username
                  );
                  if (!value || existingUsernames.indexOf(value) === -1) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("This username is already taken!")
                  );
                },
              }),
            ]}
          >
            <Input placeholder="Username" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>

          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <Input type="email" placeholder="Email" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="registration-btn"
            >
              Register
            </Button>
          </Form.Item>
        </Form> */
}
{
  /* <div
          className="login-link"
          style={{ textAlign: "center", fontSize: "13px" }}
        >
          Already have an account?
          <Link
            to="/login"
            style={{
              textAlign: "center",
              fontSize: "13px",
              marginLeft: "12px",
            }}
          >
            Login now!
          </Link>
        </div> */
}

import React, { useEffect } from "react";
import { Form, Input, Button, message } from "antd";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, fetchAllUsers } from "../Redux/Slice/userSlice";
import { useNavigate } from "react-router-dom";

const Registration = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  const onFinish = (values) => {
    dispatch(registerUser(values))
      .then(() => {
        message.success("Registration successful. You can now login.");
        navigate("/login");
      })
      .catch((error) => {
        message.error(
          "Username already exists. Please choose a different username."
        );
        console.error("Error registering user:", error);
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  

  return (
    <div className="registration-container">
      <div className="registration-form">
        <h1>Registration</h1>
        <Form
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
        </Form>
        <div
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
        </div>
      </div>
    </div>
  );
};

export default Registration;

import React, { useEffect } from "react";
import { Form, Input, Button, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers } from "../Redux/Slice/userSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const users = useSelector((state) => state.user.data);

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  const onFinish = (values) => {
    const existingUser = users.find(
      (user) =>
        user.username === values.username && user.password === values.password
    );
    console.log("existingUser", existingUser);
    if (existingUser) {
      message.success("Login successful.");

      navigate("/content");
    } else {
      message.error("Invalide Username or Password. Please try again.");

      console.log("Invalid username or password");
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          width: "300px",
          border: "1px solid #e8e8e8",
          padding: "32px",
          borderRadius: "5px",
        }}
      >
        <h1 style={{ textAlign: "center" }}>Login</h1>
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
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
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

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
              Login
            </Button>
          </Form.Item>
        </Form>
        <div style={{ textAlign: "center", fontSize: "13px" }}>
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
      </div>
    </div>
  );
};

export default Login;

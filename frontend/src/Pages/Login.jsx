import React, { useState } from "react";
import { Form, Input, Button, Row, Col, Typography, message } from "antd";
import { Link, navigate } from "@reach/router";
import { connect } from "react-redux";
import { auth } from "../Store/Actions/Auth";

const { Title } = Typography;
const layout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

function Login({ onAuth, error }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      await onAuth(email, password);
    } catch (error) {
      message.error(error);
    }
  };
  error && message.error(error);

  const onFinishFailed = (errorInfo) => {};

  return (
    <div style={{ backgroundColor: "#001529" }}>
      <Row justify="center" align="middle" style={{ height: "100vh" }}>
        <Col
          style={{
            backgroundColor: "White",
            padding: "15px",
            borderRadius: 8,
          }}
          xs={20}
          md={20}
          lg={8}
        >
          <Title level={4} style={{ textAlign: "center" }}>
            Login
          </Title>
          <Form
            {...layout}
            name="basic"
            initialValues={{
              remember: true,
            }}
            // onFinish={handleLogin}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your Email!",
                },
              ]}
            >
              <Input onChange={(e) => setEmail(e.target.value)} />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password onChange={(e) => setPassword(e.target.value)} />
            </Form.Item>
            <Link to="/forgotpassword">Forgot Password? </Link>

            <Link style={{ float: "right" }} to="/signup">
              New User? Signup Here
            </Link>
            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit" onClick={handleLogin}>
                Login
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

const mapStateToProps = (state) => {
  return { error: state.auth.error };
};
const mapDispatchToProps = (dispatch) => {
  return { onAuth: (email, password) => dispatch(auth(email, password)) };
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);

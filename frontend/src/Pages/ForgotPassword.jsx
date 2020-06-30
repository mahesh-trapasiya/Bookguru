import React, { useState, useEffect } from "react";
import { Form, Input, Typography, Button, Row, Col, message } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { connect } from "react-redux";
import { forgotPassword } from "../Store/Actions/Auth";

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 24 },
};

function ForgotPassword(props) {
  const { forgot, msg } = props;
  const [email, setEmail] = useState("");

  const validateMessages = {
    required: "${label} is required!",
    types: {
      email: "${label} is not validate email!",
    },
  };

  const sendMail = async () => {
    await forgot(email);
  };
  useEffect(() => {
    msg && message.success(msg);
  }, [msg]);

  return (
    <div style={{ backgroundColor: "#001529" }}>
      <Row style={{ height: "100vh" }} justify="center" align="middle">
        <Col lg={8} sm={20}>
          <Typography.Title level={2} code style={{ color: "white" }}>
            Forgot Password
          </Typography.Title>

          <Form
            {...layout}
            style={{
              padding: 50,
              backgroundColor: "white",
            }}
            name="nest-messages"
            onFinish={sendMail}
            validateMessages={validateMessages}
          >
            <Form.Item
              name={["user", "email"]}
              label="Email"
              rules={[{ type: "email" }]}
            >
              <Input onChange={(e) => setEmail(e.target.value)} value={email} />
            </Form.Item>
          </Form>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="middle"
              block
              onClick={sendMail}
            >
              Forgot Password
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    msg: state.auth.message,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    forgot: (data) => dispatch(forgotPassword(data)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);

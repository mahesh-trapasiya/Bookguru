import React, { useState } from "react";
import { Form, Input, Row, Col, Button, Typography } from "antd";
import md5 from "md5";
import { userResetPassword } from "../Store/Actions/Auth";
import { connect } from "react-redux";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 24 },
};
function ResetPassword(props) {
  const { reset, token } = props;
  const [password, setPassword] = useState("");

  const pass = md5(password);

  const onFinish = async (values) => {
    await reset({ pass, token });
    // console.log("Received values of form: ", values);
  };
  console.log(props);

  return (
    <div style={{ backgroundColor: "#001529" }}>
      <Row style={{ height: "100vh" }} justify="center" align="middle">
        <Col lg={10} sm={12}>
          <Typography.Title level={2} code style={{ color: "white" }}>
            Reset Password
          </Typography.Title>
          <Form
            name="register"
            onFinish={onFinish}
            {...layout}
            style={{
              padding: 50,
              paddingBottom: 25,
              backgroundColor: "white",
            }}
            scrollToFirstError
          >
            <Form.Item
              name="password"
              label="Password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
              hasFeedback
            >
              <Input.Password
                onChange={(e) => setPassword(md5(e.target.value))}
              />
            </Form.Item>

            <Form.Item
              name="confirm"
              label="Confirm Password"
              dependencies={["password"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Please confirm your password!",
                },
                ({ getFieldValue }) => ({
                  validator(rule, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }

                    return Promise.reject(
                      "The two passwords that you entered do not match!"
                    );
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Reset Password
              </Button>
            </Form.Item>
          </Form>
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
    reset: (data) => dispatch(userResetPassword(data)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);

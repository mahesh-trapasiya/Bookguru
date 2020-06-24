import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  Form,
  Input,
  Button,
  Row,
  Col,
  Typography,
  Radio,
  Select,
  message,
  Tabs,
} from "antd";
import { fetchCountries } from "../Store/Actions/Country";
import { fetchCategories } from "../Store/Actions/Book";
import { onSignup, verifyCode } from "../Store/Actions/Auth";
import md5 from "md5";
const { Option } = Select;
const { Title } = Typography;

const layout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 18,
  },
};
const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not validate email!",
    number: "${label} is not a validate number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};

function Signup({
  getCountrylist,
  countries,
  getCategoriesList,
  categories,
  handleSignup,
  msg,
  error,
  verification,
  handleVerfication,
}) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [country, setCountry] = useState("");
  const [plan, setPlan] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [intrests, setIntrests] = useState([]);
  const [code, setCode] = useState("");

  //Select box Functions
  const onBlur = () => {};
  const onFocus = () => {};
  const onSearch = (val) => {};

  const onFinish = async (values) => {
    const password = md5(password);
    try {
      verification
        ? await handleVerfication({ email, code })
        : await handleSignup({
            username,
            email,
            password,
            role,
            plan,
            country,
            fname,
            lname,
            intrests,
          });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCountrylist();
    getCategoriesList();
  }, []);

  return (
    <div style={{ backgroundColor: "#001529" }}>
      {msg ? message.success(msg) : null}
      {error ? message.error(error) : null}
      <Row justify="center" align="middle" style={{ height: "100vh" }}>
        <Col
          span={8}
          style={{
            backgroundColor: "White",
            padding: "15px",
            borderRadius: 8,
          }}
          xs={24}
          md={24}
          lg={10}
        >
          <Title level={2} style={{ textAlign: "center" }}>
            Create Account
          </Title>
          <Form
            {...layout}
            name="nest-messages"
            onFinish={onFinish}
            validateMessages={validateMessages}
          >
            <Form.Item
              name={["user", "name"]}
              label="Username"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input onChange={(e) => setUsername(e.target.value)} />
            </Form.Item>
            <Form.Item
              name={["user", "email"]}
              label="Email"
              rules={[
                {
                  type: "email",
                  required: true,
                },
              ]}
            >
              <Input onChange={(e) => setEmail(e.target.value)} />
            </Form.Item>
            <Form.Item
              name={["Password"]}
              label="Password"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input.Password onChange={(e) => setPassword(e.target.value)} />
            </Form.Item>

            <Form.Item
              name="confirm"
              label="Confirm Password"
              dependencies={["Password"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Please confirm your password!",
                },
                ({ getFieldValue }) => ({
                  validator(rule, value) {
                    if (!value || getFieldValue("Password") === value) {
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
            <Form.Item
              name={["user", "Role"]}
              label="Role"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Radio.Group
                initialValues="Reader"
                buttonStyle="solid"
                onChange={(e) => setRole(e.target.value)}
              >
                <Radio.Button value="Reader">Reader</Radio.Button>
                <Radio.Button value="Writer">Writer</Radio.Button>
              </Radio.Group>
            </Form.Item>
            {role === "Reader" ? (
              <Form.Item
                name={["user", "plan"]}
                label="Plan"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Radio.Group
                  defaultValue="free"
                  onChange={(e) => setPlan(e.target.value)}
                >
                  <Radio.Button value="free">Basic(free)</Radio.Button>
                  <Radio.Button value="standard">
                    Standard($5/month)
                  </Radio.Button>
                  <Radio.Button value="prime">Prime($10/month)</Radio.Button>
                </Radio.Group>
              </Form.Item>
            ) : null}
            <Form.Item
              name="country"
              label="Country"
              hasFeedback
              rules={[
                { required: true, message: "Please select your country!" },
              ]}
            >
              <Select
                showSearch
                style={{ width: 200 }}
                placeholder="Select Your Country"
                optionFilterProp="children"
                onChange={(value) => setCountry(value)}
                onFocus={onFocus}
                onBlur={onBlur}
                onSearch={onSearch}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                {countries &&
                  countries.map((country) => (
                    <Option value={country._id} key={country._id}>
                      {country.name}
                    </Option>
                  ))}
              </Select>
            </Form.Item>
            <Form.Item name="intrests" label="Intrests">
              <Select
                mode="multiple"
                size="middle"
                placeholder="Please Select Your Intrests"
                onChange={(value) => setIntrests(value)}
                style={{ width: "100%" }}
              >
                {categories &&
                  categories.map((category) => (
                    <Option value={category._id} key={category._id}>
                      {category.name}
                    </Option>
                  ))}
              </Select>
            </Form.Item>
            <Form.Item
              name={["user", "fname"]}
              label="First Name"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input onChange={(e) => setFname(e.target.value)} />
            </Form.Item>
            <Form.Item
              name={["user", "lname"]}
              label="Last Name"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input onChange={(e) => setLname(e.target.value)} />
            </Form.Item>
            {verification && (
              <Form.Item
                name={["user", "verificationcode"]}
                label="Verification Code"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input onChange={(e) => setCode(e.target.value)} />
              </Form.Item>
            )}

            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
              <Button type="primary" htmlType="submit">
                {!verification ? "Send Verification Code" : "Verify"}
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
    countries: state.country.country.countries,
    categories: state.book.categories,
    msg: state.auth.message,
    error: state.auth.error,
    verification: state.auth.verification,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getCountrylist: () => dispatch(fetchCountries()),
    getCategoriesList: () => dispatch(fetchCategories()),
    handleSignup: (data) => dispatch(onSignup(data)),
    handleVerfication: (data) => dispatch(verifyCode(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);

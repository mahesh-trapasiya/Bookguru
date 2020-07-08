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
} from "antd";
import { fetchCountries } from "../Store/Actions/Country";
import { fetchCategories } from "../Store/Actions/Book";
import { fetchUserById } from "../Store/Actions/User";
import { onSignup, verifyCode } from "../Store/Actions/Auth";
import md5 from "md5";
import { navigate } from "@reach/router";
import ValidateLogin from "../Hoc/hoc";

const { Option } = Select;

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 18,
  },
};
const validateMessages = {
  required: "${label} is required!",
};

function Signup(props) {
  const {
    getCountrylist,
    countries,
    getCategoriesList,
    categories,
    msg,
    error,
    getUserById,
    userData,
    userId,
  } = props;

  const [username, setUsername] = useState("");
  const [country, setCountry] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [intrests, setIntrests] = useState([]);
  const [photo, setPhoto] = useState();

  //Select box Functions
  const onBlur = () => {};
  const onFocus = () => {};
  const onSearch = (val) => {};

  const onFinish = async (values) => {};

  useEffect(() => {
    getCountrylist();
    getCategoriesList();
    getUserById(userId);
    msg && message.success(msg);

    error && message.error(error);
  }, [getCountrylist, getCategoriesList, error, msg]);

  return (
    <div
      style={{
        backgroundColor: "rgb(114, 120, 125)",
        height: "100vh",
        backgroundColor: "#fff",
      }}
    >
      {userData && console.log(userData)}
      <Form
        {...layout}
        style={{ padding: "15px" }}
        name="nest-messages"
        onFinish={onFinish}
        validateMessages={validateMessages}
      >
        <Row justify="center" style={{ marginTop: "10px" }}>
          <Col xs={24} md={12} lg={12}>
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
            <Form.Item name={["user", "photo"]} label="Profile Picture">
              <input type="file" name="photo" id="photo" />
            </Form.Item>
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
          </Col>
        </Row>
        <Row justify="center" align="middle" xs={24} md={24} lg={24}>
          <Button type="primary" htmlType="submit">
            Update
          </Button>
        </Row>
      </Form>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    countries: state.country.country.countries,
    categories: state.book.categories,
    msg: state.auth.message,
    error: state.auth.error,
    userData: state.user.user,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getCountrylist: () => dispatch(fetchCountries()),
    getCategoriesList: () => dispatch(fetchCategories()),
    getUserById: (userId) => dispatch(fetchUserById(userId)),
  };
};

export default ValidateLogin(
  connect(mapStateToProps, mapDispatchToProps)(Signup)
);

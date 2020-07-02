import React, { useState, useEffect } from "react";
import { Typography, Row, Col, Tabs } from "antd";
import { BookFilled, UserOutlined } from "@ant-design/icons";
import ValidateLogin from "../Hoc/hoc";
// import Table from "../Components/Table";
import { connect } from "react-redux";
import { fetchUserById } from "../Store/Actions/User";
import { Link } from "@reach/router";
import { isLoggedin } from "../Services/auth";
const { Title, Text } = Typography;
const { TabPane } = Tabs;

function UserProfile(props) {
  const { getUserById, userData, userId } = props;

  const desc = ["terrible", "bad", "normal", "good", "wonderful"];
  const [value, setValue] = useState("");
  const [size, setSize] = useState("small");
  const [user, setUser] = useState();

  useEffect(() => {
    getUserById(userId);
  }, []);

  const callback = (key) => {
    console.log(key);
  };
  return (
    <div style={{ height: "100vh" }}>
      <Row>
        <Col sm={24} md={6} lg={6}>
          <img
            src="https://fakeimg.pl/200x200/"
            style={{
              width: "100%",
              height: "auto",
              maxWidth: "200px",
              borderRadius: "50%",
            }}
            alt="sasf"
          />
        </Col>

        <Col sm={6} md={18} lg={18}>
          <Title level={3} style={{ display: "inline" }}>
            {userData && userData.username}
          </Title>
          <div style={{ marginTop: "10px" }}>
            {userData &&
              userData.favorites.map((favorite) => (
                <Text code>{favorite}</Text>
              ))}
          </div>
          <Link to={`/profile/update/${isLoggedin()._id}`}>Update Details</Link>
        </Col>
      </Row>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    userData: state.user.user,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getUserById: (userId) => dispatch(fetchUserById(userId)),
  };
};

export default ValidateLogin(
  connect(mapStateToProps, mapDispatchToProps)(UserProfile)
);

import React, { useEffect } from "react";
import {
  Row,
  Col,
  Card,
  Avatar,
  Skeleton,
  Space,
  PageHeader,
  Typography,
} from "antd";
import {
  MessageOutlined,
  StarFilled,
  DislikeOutlined,
  EyeFilled,
  LikeFilled,
} from "@ant-design/icons";
import ValidateLogin from "../Hoc/hoc";
import { connect } from "react-redux";
import { userReadLaterBook } from "../Store/Actions/User";

const style = { background: "#0092ff", padding: "8px 0" };
function DashBoard(props) {
  const { getReadLaterBooks, books } = props;

  const listData = [];
  for (let i = 0; i < 5; i++) {
    listData.push({
      href: "https://ant.design",
      title: `Book Name ${i}`,
      avatar:
        "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
      description: "Book Category",
    });
  }
  const IconText = ({ icon, text, color }) => (
    <Space>
      {<span style={{ color: color }}> {icon}</span>}
      {text}
    </Space>
  );
  useEffect(() => {
    getReadLaterBooks();
  }, []);
  return (
    <div>
      <Row justify="space-between" style={{ height: "100vh" }}>
        <Col xs={24} sm={24} md={24} lg={24}>
          <PageHeader
            className="site-page-header-responsive"
            title="Recently Added Read Later"
            subTitle="This is a subtitle"
          />

          <Card
            style={{ width: 240 }}
            cover={<img alt="example" src="https://fakeimg.pl/300x240/" />}
          >
            <Card.Meta
              title="Europe Street beat"
              description="www.instagram.com"
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    books: state.user.readLaterBook,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getReadLaterBooks: () => dispatch(userReadLaterBook()),
  };
};
export default ValidateLogin(
  connect(mapStateToProps, mapDispatchToProps)(DashBoard)
);

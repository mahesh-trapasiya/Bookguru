import React from "react";
import {
  Row,
  Col,
  Card,
  Avatar,
  Skeleton,
  Space,
  List,
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
import { fetchTopLikedBooks } from "../Store/Actions/Book";
import { useEffect } from "react";
import { connect } from "react-redux";
const style = { background: "#0092ff", padding: "8px 0" };
function WriterHome(props) {
  const { topLikedBooks, getTopLikedBoooks } = props;
  const listData = [];
  topLikedBooks &&
    topLikedBooks.forEach((book, i) => {
      console.log(book);

      listData.push({
        href: `/book/${book._id}`,
        title: book.name,
        avatar:
          "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
        description: book.category.name,
        likes: book.likes.length,
        deslikes: book.deslikes.length,
      });
    });

  const IconText = ({ icon, text, color }) => (
    <Space>
      {<span style={{ color: color }}> {icon}</span>}
      {text}
    </Space>
  );

  useEffect(() => {
    getTopLikedBoooks();
  }, []);
  return (
    <div>
      <Row justify="space-between">
        {props && console.log(topLikedBooks)}
        <Col xs={24} sm={24} md={24} lg={11}>
          <List
            itemLayout="horizontal"
            size="small"
            bordered
            header={
              <Typography.Title level={4}>
                Top 5 Most Liked Books
              </Typography.Title>
            }
            dataSource={listData}
          >
            {listData.map((item) => (
              <List.Item
                key={item.title}
                actions={[
                  <IconText
                    icon={<LikeFilled />}
                    key="list-vertical-like-o"
                    text={item.likes}
                    color="blue"
                  />,
                  <IconText
                    icon={<DislikeOutlined />}
                    text={item.deslikes}
                    key="list-vertical-like-o"
                    color="red"
                  />,
                  <IconText
                    icon={<MessageOutlined />}
                    text="2"
                    key="list-vertical-message"
                  />,
                ]}
              >
                <List.Item.Meta
                  avatar={<Avatar src={item.avatar} />}
                  title={<a href={item.href}>{item.title}</a>}
                  description={item.description}
                />
                {item.content}
              </List.Item>
            ))}
          </List>
        </Col>
        <Col xs={24} sm={24} md={24} lg={11}>
          <List
            itemLayout="horizontal"
            size="small"
            bordered
            header={
              <Typography.Title level={4}>
                Top 5 Most Readed Books
              </Typography.Title>
            }
            dataSource={listData}
          >
            {listData.map((item) => (
              <List.Item
                key={item.title}
                actions={[
                  <IconText
                    icon={<EyeFilled />}
                    text="2"
                    key="list-vertical-message"
                    color="lightgreen"
                  />,
                ]}
              >
                <List.Item.Meta
                  avatar={<Avatar src={item.avatar} />}
                  title={<a href={item.href}>{item.title}</a>}
                  description={item.description}
                />
                {item.content}
              </List.Item>
            ))}
          </List>
        </Col>
      </Row>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    topLikedBooks: state.book.likedBooks,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getTopLikedBoooks: () => dispatch(fetchTopLikedBooks()),
  };
};
export default ValidateLogin(
  connect(mapStateToProps, mapDispatchToProps)(WriterHome)
);

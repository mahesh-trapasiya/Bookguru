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

const style = { background: "#0092ff", padding: "8px 0" };
function DashBoard() {
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
  return (
    <div>
      <Row justify="space-between">
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
                    icon={<StarFilled />}
                    text="156"
                    key="list-vertical-star-o"
                    color="Yellow"
                  />,
                  <IconText
                    icon={<LikeFilled />}
                    key="list-vertical-like-o"
                    color="blue"
                  />,
                  <IconText
                    icon={<DislikeOutlined />}
                    text="156"
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
export default ValidateLogin(DashBoard);

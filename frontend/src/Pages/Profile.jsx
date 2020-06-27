import React, { useState } from "react";
import {
  Rate,
  Typography,
  Row,
  Col,
  Button,
  Tabs,
  Descriptions,
  Card,
  Tag,
} from "antd";
import { BookFilled, UserOutlined } from "@ant-design/icons";
import ValidateLogin from "../Hoc/hoc";
import Table from "../Components/Table";
const { Title, Text, Link } = Typography;
const { TabPane } = Tabs;

function UserProfile() {
  const desc = ["terrible", "bad", "normal", "good", "wonderful"];
  const [value, setValue] = useState("");
  const [size, setSize] = useState("small");

  const callback = (key) => {
    console.log(key);
  };
  return (
    <div>
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
            Mahesh
          </Title>

          <div style={{ marginTop: "10px" }}>
            <Text code>Intrests</Text>
          </div>
        </Col>
      </Row>
      <Row>
        <Col sm={24} md={24} lg={24}>
          <div>
            <Tabs defaultActiveKey="1" onChange={callback}>
              <TabPane
                tab={
                  <span>
                    <BookFilled />
                    Your Books
                  </span>
                }
                key="1"
              >
                <Table />
              </TabPane>
            </Tabs>
          </div>
        </Col>
      </Row>
    </div>
  );
}
export default ValidateLogin(UserProfile);

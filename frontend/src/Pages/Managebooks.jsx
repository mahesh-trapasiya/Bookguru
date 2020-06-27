import React from "react";
import { Tabs, Row, Col } from "antd";
import { BookFilled } from "@ant-design/icons";
import Table from "../Components/Table";
import ValidateLogin from "../Hoc/hoc";

function ManageBooks() {
  return (
    <div>
      <Row>
        <Col xs={24} sm={24} md={24} lg={24}>
          <Tabs defaultActiveKey="1" /* onChange={callback} */>
            <Tabs.TabPane
              tab={
                <span>
                  <BookFilled />
                  Your Books
                </span>
              }
              key="1"
            >
              <Table />
            </Tabs.TabPane>
          </Tabs>
        </Col>
      </Row>
    </div>
  );
}
export default ValidateLogin(ManageBooks);

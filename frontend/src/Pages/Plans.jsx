import React from "react";
import { Card, Row, Col } from "antd";

function Plans() {
  return (
    <div>
      <Row
        style={{ height: "100vh", backgroundColor: "#001529" }}
        justify="center"
        align="middle"
      >
        <Col span={4} style={{ margin: "50px" }}>
          <Card
            className="plan-card"
            title={<b>BASIC PLAN</b>}
            style={{ width: 250, height: 250 }}
            size="small"
          >
            <p style={{ textAlign: "center" }}>
              reader can read/access only one book per month, and can't read
              book multiple book at the same time
            </p>
          </Card>
        </Col>
        <Col span={4} style={{ margin: "50px" }}>
          <Card
            title={<b>STANDERD PLAN</b>}
            className="plan-card"
            style={{ width: 250, height: 250 }}
            size="small"
          >
            <p style={{ textAlign: "center" }}>
              reader can read/access till 5 book/month, and can read 3 book at
              the same time
            </p>
          </Card>
        </Col>
        <Col span={4} style={{ margin: "50px" }}>
          <Card
            title={<b>PRIME PLAN</b>}
            className="plan-card"
            style={{ width: 250, height: 250 }}
            size="small"
          >
            <p style={{ textAlign: "center" }}>
              reader can read/access till 15 book/month, and can read 7 book at
              same time
            </p>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
export default Plans;

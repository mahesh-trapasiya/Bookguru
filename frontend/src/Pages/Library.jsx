import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { EyeFilled } from "@ant-design/icons";
import ValidateLogin from "../Hoc/hoc";
import { Input, Row, Col, Card, Avatar, Spin, PageHeader } from "antd";
import "react-pdf/dist/Page/AnnotationLayer.css";
import Reader from "../Components/Reader";
function Library() {
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  const options = { httpHeaders: { "Access-Control-Allow-Origin": "*" } };
  return (
    <div>
      <div className="site-page-header-ghost-wrapper">
        <PageHeader
          ghost={false}
          title="Library"
          extra={[
            <Input.Search
              placeholder="Search Library"
              onSearch={(value) => console.log(value)}
              enterButton
              size="large"
            />,
          ]}
        />
      </div>
      <hr />
      <Row gutter={16}>
        <Col xs={24} sm={8} md={8} lg={4}>
          <Card
            style={{ width: 200, margin: 5 }}
            size="small"
            cover={
              <Document
                file="https://firebasestorage.googleapis.com/v0/b/library-ed12e.appspot.com/o/books%2F0975d8e2482aa230a0f8b98237e6a57eSQL%20Excercise.pdf?alt=media&token=eae809a7-b9e1-4e5c-8751-b36ca457d696"
                //  file=
                options={options}
                className="book-document"
                loading={<Spin spinning={true} size="large" />}
              >
                <Page
                  pageNumber={1}
                  width={110}
                  onClick={() => console.log("Redirected")}
                />
              </Document>
            }
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
export default ValidateLogin(Library);

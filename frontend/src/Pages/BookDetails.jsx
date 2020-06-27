import React, { createElement, useState } from "react";
import ValidateLogin from "../Hoc/hoc";
import { Document, Page, pdfjs } from "react-pdf";
import moment from "moment";
import {
  Button,
  Row,
  Col,
  Typography,
  Descriptions,
  Space,
  Comment,
  Avatar,
  Form,
  List,
  Input,
  Tooltip,
} from "antd";
import {
  LikeFilled,
  DislikeFilled,
  FileAddOutlined,
  StarOutlined,
  LikeOutlined,
  DislikeOutlined,
} from "@ant-design/icons";

function BookDetails() {
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

  const [pageNumber, setPageNumber] = useState(1);
  const [numPages, setNumPages] = useState();
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [action, setAction] = useState(null);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const like = () => {
    setLikes(1);
    setDislikes(0);
    setAction("liked");
  };
  const dislike = () => {
    setLikes(0);
    setDislikes(1);
    setAction("disliked");
  };

  const actions = [
    <span key="comment-basic-like">
      <Tooltip title="Like">
        {createElement(action === "liked" ? LikeFilled : LikeOutlined, {
          onClick: like,
        })}
      </Tooltip>
      <span className="comment-action">{likes}</span>
    </span>,
    <span key="comment-basic-dislike">
      <Tooltip title="Dislike">
        {React.createElement(
          action === "disliked" ? DislikeFilled : DislikeOutlined,
          {
            onClick: dislike,
          }
        )}
      </Tooltip>
      <span className="comment-action">{dislikes}</span>
    </span>,
    <span key="comment-basic-reply-to">Reply to</span>,
  ];
  const file = {
    url:
      "https://firebasestorage.googleapis.com/v0/b/library-ed12e.appspot.com/o/books%2F0975d8e2482aa230a0f8b98237e6a57eSQL%20Excercise.pdf?alt=media&token=bda22e56-2cb7-402e-a8d3-db4485d95536",
    data: Uint8Array,
    httpHeaders: { "Access-Control-Allow-Origin": "*" },
    range: "PDFDataRangeTransport",
  };
  return (
    <div>
      <Row gutter={24}>
        <Col xs={24} sm={18} md={12} lg={8}>
          <h5>Book Details</h5> <hr />
          <Document
            file="http://localhost:3000/js.pdf"
            onLoadSuccess={onDocumentLoadSuccess}
            className="book-page"
          >
            <Page pageNumber={pageNumber} height={400} />
            {/*  <div>
              <Button
                type="primary"
                style={{ float: "right" }}
                onClick={(e) => {
                  e.preventDefault();
                  setPageNumber(pageNumber + 1);
                }}
              >
                Next
              </Button>
              <Button
                type="primary"
                style={{ float: "left" }}
                onClick={(e) => {
                  e.preventDefault();
                  setPageNumber(pageNumber - 1);
                }}
              >
                Prev
              </Button>
              <p>
                Page {pageNumber} of {numPages}
              </p>
            </div> */}
          </Document>
          <br />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button type="ghost">Like</Button>
            <Button type="ghost">Deslike </Button>
            <Button type="ghost">Read Later </Button>
            <Button
              type="ghost"
              // shape="circle-outline"
              // style={{ float: "right" }}
            >
              Add To Favorites
            </Button>
          </div>
        </Col>

        <Col xs={24} sm={6} md={12} lg={16}>
          <Descriptions title="Book Name" column={1} bordered>
            <Descriptions.Item label="Author Name">Prepaid</Descriptions.Item>
            <Descriptions.Item label="Category Name">ABc </Descriptions.Item>
            <Descriptions.Item label="Pages">YES</Descriptions.Item>
          </Descriptions>
          <br />
        </Col>
      </Row>
      <br />{" "}
      <Row>
        <Col xs={24} sm={24} md={24} lg={24}>
          <Form.Item>
            <Input.TextArea
              rows={4}
              /* onChange={onChange} value={value} */ placeholder="Type Comment Here"
            />
          </Form.Item>
          <Form.Item>
            <Button
              htmlType="submit"
              // loading={submitting}
              // onClick={onSubmit}
              type="primary"
            >
              Add Comment
            </Button>
          </Form.Item>
          <br />
          <Comment
            actions={actions}
            author={<a>Han Solo</a>}
            avatar={
              <Avatar
                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                alt="Han Solo"
              />
            }
            content={
              <p>
                We supply a series of design principles, practical patterns and
                high quality design resources (Sketch and Axure), to help people
                create their product prototypes beautifully and efficiently.
              </p>
            }
            datetime={
              <Tooltip title={moment().format("YYYY-MM-DD HH:mm:ss")}>
                <span>{moment().fromNow()}</span>
              </Tooltip>
            }
          />
        </Col>
      </Row>
    </div>
  );
}
export default ValidateLogin(BookDetails);

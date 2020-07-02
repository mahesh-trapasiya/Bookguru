import React, { createElement, useState, useEffect } from "react";
import ValidateLogin from "../Hoc/hoc";
import { Document, Page, pdfjs } from "react-pdf";
import moment from "moment";
import {
  Button,
  Row,
  Col,
  Descriptions,
  Comment,
  Avatar,
  Form,
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
import {
  fetchBookById,
  addBookComment,
  addBookLike,
  removeBookLike,
  addBookDisLike,
  removeBookDisLike,
} from "../Store/Actions/Book";
import { addBookReaded } from "../Store/Actions/User";

import { connect } from "react-redux";
import { isLoggedin } from "../Services/auth";
import {
  addReadLater,
  deleteReadlater,
  fetchUserById,
} from "../Store/Actions/User";
import { navigate } from "@reach/router";

function BookDetails(props) {
  const {
    bookId,
    getBookById,
    book,
    user,
    insertComment,
    insertLike,
    removeLike,
    insertDisLike,
    removeDisLike,
    insertReadLater,
    removeReadLater,
    getUserById,
    insertBookReaded,
    error,
    readAllowed,
  } = props;

  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

  const [pageNumber, setPageNumber] = useState(1);
  const [numPages, setNumPages] = useState();
  const [liked, setLiked] = useState(false);
  const [comment, setComment] = useState();

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  useEffect(() => {
    getBookById(bookId);
    getUserById(isLoggedin()._id);
    insertBookReaded(bookId);
  }, []);

  const file = {
    url:
      "https://firebasestorage.googleapis.com/v0/b/library-ed12e.appspot.com/o/books%2F0975d8e2482aa230a0f8b98237e6a57eSQL%20Excercise.pdf?alt=media&token=bda22e56-2cb7-402e-a8d3-db4485d95536",
    data: Uint8Array,
    httpHeaders: { "Access-Control-Allow-Origin": "*" },
    range: "PDFDataRangeTransport",
  };

  const addComment = async () => {
    await insertComment({ bookId, comment });
    await getBookById(bookId);
  };
  const like = async () => {
    checkBookData(book.likes)
      ? await removeLike({ bookId })
      : await insertLike({ bookId });
    await getBookById(bookId);
  };

  const deslike = async () => {
    checkBookData(book.deslikes)
      ? await removeDisLike({ bookId })
      : await insertDisLike({ bookId });
    await getBookById(bookId);
  };

  const checkUserData = (data) => {
    const userId = isLoggedin()._id;
    let arr = [];

    book &&
      data.forEach((e) => {
        arr.push(e.book);
      });

    var match = arr.indexOf(bookId);
    console.log(match);

    if (match >= 0) {
      return true;
    }

    return false;
  };
  const checkBookData = (data) => {
    const userId = isLoggedin()._id;
    let arr = [];

    book &&
      data.forEach((e) => {
        arr.push(e.likedBy || e.deslikedBy || e.book);
      });

    var match = arr.indexOf(bookId);
    console.log(match);

    if (match >= 0) {
      // setLiked(true);
      return true;
    }

    return false;
  };

  const readLater = async () => {
    checkUserData(user.readlater)
      ? await removeReadLater(bookId)
      : await insertReadLater(bookId);
    await getUserById(isLoggedin()._id);
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
            <Page pageNumber={pageNumber} />
          </Document>
          <br />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button
              type="ghost"
              style={{ border: "none" }}
              shape="circle-outline"
              onClick={like}
            >
              {liked ? <LikeFilled /> : <LikeOutlined />}
            </Button>
            <Button
              type="ghost"
              style={{ border: "none" }}
              shape="circle-outline"
              onClick={deslike}
            >
              <DislikeOutlined />{" "}
            </Button>
            <Button
              type="ghost"
              style={{ border: "none" }}
              shape="circle-outline"
              onClick={readLater}
            >
              <FileAddOutlined />{" "}
            </Button>
            <Button
              type="ghost"
              style={{ border: "none" }}
              shape="circle-outline"
            >
              <StarOutlined />
            </Button>
          </div>
        </Col>

        <Col xs={24} sm={6} md={12} lg={16}>
          <Descriptions title={book && book.name} column={1} bordered>
            <Descriptions.Item label="Author Name">
              {book && book.author.fname}
            </Descriptions.Item>
            <Descriptions.Item label="Category Name">
              {book && book.category.name}{" "}
            </Descriptions.Item>
            <Descriptions.Item label="Pages">
              {book && book.pages}
            </Descriptions.Item>
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
              onChange={(e) => setComment(e.target.value)}
              value={comment}
              placeholder="Type Comment Here"
            />
          </Form.Item>
          <Form.Item>
            <Button
              htmlType="submit"
              // loading={submitting}
              onClick={addComment}
              type="primary"
            >
              Add Comment
            </Button>
          </Form.Item>
          <br />
          {error && console.log(error)}

          {book &&
            book.comments.map((comment, i) => (
              <Comment
                key={i}
                author={<a>{comment.postedBy.fname}</a>}
                /*  avatar={
                  <Avatar
                    src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                    alt="Han Solo"
                  />
                } */
                content={<p>{comment.text}</p>}
                datetime={
                  <Tooltip title={moment().format("YYYY-MM-DD HH:mm:ss")}>
                    <span>{moment(comment.created).fromNow()}</span>
                  </Tooltip>
                }
              />
            ))}
        </Col>
      </Row>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    book: state.book.book,
    user: state.user.user,
    error: state.user.error,
    readAllowed: state.user.readAllowed,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getBookById: (bookId) => dispatch(fetchBookById(bookId)),
    insertComment: (data) => dispatch(addBookComment(data)),
    insertLike: (data) => dispatch(addBookLike(data)),
    removeLike: (data) => dispatch(removeBookLike(data)),
    insertDisLike: (data) => dispatch(addBookDisLike(data)),
    removeDisLike: (data) => dispatch(removeBookDisLike(data)),
    insertReadLater: (bookId) => dispatch(addReadLater(bookId)),
    removeReadLater: (bookId) => dispatch(deleteReadlater(bookId)),
    getUserById: (userId) => dispatch(fetchUserById(userId)),
    insertBookReaded: (bookId) => dispatch(addBookReaded(bookId)),
  };
};
export default ValidateLogin(
  connect(mapStateToProps, mapDispatchToProps)(BookDetails)
);

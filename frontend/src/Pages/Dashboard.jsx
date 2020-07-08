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
  Spin,
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
import {
  userReadLaterBook,
  recentThreeBookReads,
  randomThreeBookReadLater,
  recentThreeFavoriteBooks,
} from "../Store/Actions/User";
import { Document, Page, pdfjs } from "react-pdf";

const style = { background: "#0092ff", padding: "8px 0" };
function DashBoard(props) {
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  let randomrBooks;
  const {
    getReadLaterBooks,
    books,
    getRecentReads,
    recentBooks,
    getRecentFavorites,
    getRandomThree,
    recentFavorites,
    randomBooks,
  } = props;

  useEffect(() => {
    getReadLaterBooks();
    getRecentReads();
    getRecentFavorites();
    getRandomThree();
  }, []);

  if (randomBooks && randomBooks.readlater.length > 0) {
    const shuffle = randomBooks.readlater.sort(() => 0.5 - Math.random());
    randomBooks.readlater = shuffle.slice(0, 3);
  }

  return (
    <div style={{ height: "100vh" }}>
      <Typography.Title level={2}>Recently Readed Books</Typography.Title>
      <Row justify="space-between">
        {recentBooks &&
          recentBooks.booksreaded.map((book, i) => (
            <Col xs={24} sm={12} md={8} lg={8} key={i}>
              <Card
                style={{ width: 240 }}
                cover={
                  <Document
                    file={process.env.REACT_APP_API_URL + book.book.upload}
                    className="book-document"
                    loading={<Spin spinning size="large" />}
                  >
                    <Page pageNumber={1} height={155} />
                  </Document>
                }
              >
                <Card.Meta title={book.book.name} description="" />
              </Card>
            </Col>
          ))}
      </Row>
      <br />
      <Typography.Title level={2}>Recently Favorite Books</Typography.Title>
      <Row justify="space-between">
        {recentFavorites &&
          recentFavorites.favorites.map((book, i) => (
            <Col xs={24} sm={12} md={8} lg={8} key={i}>
              <Card
                style={{ width: 240 }}
                cover={
                  <Document
                    file={process.env.REACT_APP_API_URL + book.book.upload}
                    className="book-document"
                    loading={<Spin spinning size="large" />}
                  >
                    <Page pageNumber={1} height={155} />
                  </Document>
                }
              >
                <Card.Meta
                  title={book.book.name}
                  // description={book.book.author}
                />
              </Card>
            </Col>
          ))}
      </Row>

      <br />
      <Typography.Title level={2}>Read Later Books</Typography.Title>
      <Row justify="space-between">
        {randomBooks && randomBooks.readlater > 1 ? (
          randomBooks.readlater.map((book, i) => (
            <Col xs={24} sm={12} md={8} lg={8} key={i}>
              <Card
                style={{ width: 240 }}
                cover={
                  <Document
                    file={process.env.REACT_APP_API_URL + book.book.upload}
                    className="book-document"
                    loading={<Spin spinning size="large" />}
                  >
                    <Page pageNumber={1} height={155} />
                  </Document>
                }
              >
                <Card.Meta
                  title={book.book.name}
                  description={book.book.author}
                />
              </Card>
            </Col>
          ))
        ) : (
          <p>No Books</p>
        )}
      </Row>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    books: state.user.readLaterBook,
    recentBooks: state.user.recentReadsBooks,
    recentFavorites: state.user.recentFavoriteBooks,
    randomBooks: state.user.randomBooks,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getReadLaterBooks: () => dispatch(userReadLaterBook()),
    getRecentReads: () => dispatch(recentThreeBookReads()),
    getRecentFavorites: () => dispatch(recentThreeFavoriteBooks()),
    getRandomThree: () => dispatch(randomThreeBookReadLater()),
  };
};
export default ValidateLogin(
  connect(mapStateToProps, mapDispatchToProps)(DashBoard)
);

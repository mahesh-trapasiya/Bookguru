import React, { useState, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { EyeFilled } from "@ant-design/icons";
import ValidateLogin from "../Hoc/hoc";
import { Input, Row, Col, Card, Spin, PageHeader } from "antd";
import "react-pdf/dist/Page/AnnotationLayer.css";
import { connect } from "react-redux";
import { getAllbooks } from "../Store/Actions/Book";
import { Link } from "@reach/router";

function Library(props) {
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  const { books, fetchAllBooks } = props;
  const [search, setSearch] = useState("");
  let searchString = search.toLowerCase();
  const filteredbooks =
    books &&
    books.filter((book) => {
      return (
        book.name.toLowerCase().indexOf(searchString) !== -1 ||
        book.author.fname.toLowerCase().indexOf(searchString) !== -1 ||
        book.category.name.toLowerCase().indexOf(searchString) !== -1
      );
    });

  useEffect(() => {
    fetchAllBooks();
  }, []);
  return (
    <div>
      <div className="site-page-header-ghost-wrapper">
        <PageHeader
          ghost={false}
          title="Library"
          extra={[
            <Input.Search
              placeholder="Search Library"
              onSearch={(value) => setSearch(value.substr(0, 20))}
              enterButton
              size="large"
              key="search"
            />,
          ]}
        />
      </div>
      <hr />
      <Row gutter={16}>
        {filteredbooks &&
          filteredbooks.map((book, i) => {
            return (
              <Col xs={24} sm={8} md={8} lg={4} key={i}>
                <Card
                  style={{ width: 200, margin: 5 }}
                  size="small"
                  cover={
                    <Document
                      // file="https://firebasestorage.googleapis.com/v0/b/library-ed12e.appspot.com/o/books%2F0975d8e2482aa230a0f8b98237e6a57eSQL%20Excercise.pdf"
                      file={process.env.REACT_APP_API_URL + book.upload}
                      className="book-document"
                      loading={<Spin spinning={true} size="large" />}
                    >
                      <Page pageNumber={1} width={110} />
                    </Document>
                  }
                >
                  <Card.Meta
                    title={<Link to={`/book/${book._id}`}>{book.name}</Link>}
                    description={book.author.fname}
                  />
                </Card>
              </Col>
            );
          })}
      </Row>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    books: state.book.books,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllBooks: () => dispatch(getAllbooks()),
  };
};
export default ValidateLogin(
  connect(mapStateToProps, mapDispatchToProps)(Library)
);

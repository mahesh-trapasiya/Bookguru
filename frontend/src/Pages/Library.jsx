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
                  className="lib-card"
                  style={{ width: 200, margin: 5 }}
                  size="small"
                  cover={
                    <Document
                      file={process.env.REACT_APP_API_URL + book.upload}
                      className="book-document"
                      loading={<Spin spinning size="large" />}
                    >
                      <Page pageNumber={1} height={155} />
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

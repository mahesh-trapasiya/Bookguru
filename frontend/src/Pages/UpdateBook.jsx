import React, { useState, useEffect } from "react";
import ValidateLogin from "../Hoc/hoc";
import { Form, Select, InputNumber, Button, Row, Col, Input } from "antd";
import { connect } from "react-redux";
import {
  fetchCategories,
  fetchBookById,
  updateBook as updateBookData,
} from "../Store/Actions/Book";
import axios from "../Services/axios";
const { Option } = Select;
const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 16,
  },
};

function UpdateBook(props) {
  const {
    categories,
    getCategoriesList,
    fetchBookData,
    bookId,
    update,
  } = props;
  const [bookData, setBookData] = useState();
  const [name, setName] = useState();
  const [category, setCategory] = useState();
  const [book, setBook] = useState();
  const [pages, setPages] = useState();
  const [references, setReferences] = useState();
  const [form] = Form.useForm();
  let formData = new FormData();

  const handleSubmit = async (values) => {
    formData.set("name", values.bookname);
    formData.set("category", values.bookcategory);
    formData.set("pages", values.pages);
    formData.set("references", values.references);
    await update(bookId, formData);
  };
  useEffect(() => {
    // fetchBookData(bookId); //Fetching Book Data
    axios.get(`book/${bookId}`).then((response) => {
      /*  setName(response.data.books[0].name);
      setCategory(response.data.books[0].category);
      setBook(response.data.books[0].upload);
      setPages(response.data.books[0].pages);
      setReferences(response.data.books[0].references); */

      form.setFieldsValue({
        bookname: response.data.books[0].name,
        pages: response.data.books[0].pages,
        references: response.data.books[0].references,
        bookcategory: response.data.books[0].category._id,
        // book: process.env.REACT_APP_API_URL + response.data.books[0].upload,
      });
    });
    getCategoriesList();
  }, [getCategoriesList]);

  return (
    <div>
      <Form
        name="add book"
        {...formItemLayout}
        onFinish={handleSubmit}
        form={form}
      >
        <Row>
          <Col md={12} lg={12} sm={24}>
            <Form.Item
              name="bookcategory"
              label="Book Category"
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Please select book Category!",
                },
              ]}
            >
              <Select
                placeholder="Select Book Category"
                onChange={(value) => setCategory(value)}
              >
                {categories &&
                  categories.map((c, i) => (
                    <Option value={c._id} key={i}>
                      {c.name}
                    </Option>
                  ))}
              </Select>
            </Form.Item>
            <Form.Item
              name={["bookname"]}
              label="Book Name"
              rules={[
                {
                  required: true,
                  message: "Please Enter book Name!",
                },
              ]}
            >
              <Input onChange={(e) => setName(e.target.value)} />
            </Form.Item>

            <Form.Item label="File">
              <Input
                type="file"
                name="book"
                id="book"
                onChange={(e) => {
                  setBook(e.target.files[0]);
                  formData.append("book", e.target.files[0]);
                }}
              />
            </Form.Item>

            <Form.Item label="Book Pages ">
              <Form.Item name="input-number" noStyle name={["pages"]}>
                <InputNumber
                  min={1}
                  max={10000}
                  onChange={(value) => setPages(value)}
                  value={pages}
                />
              </Form.Item>
              <span className="ant-form-text"> Pages</span>
            </Form.Item>
            <Form.Item label="References" name={["references"]}>
              <Input.TextArea
                placeholder="Add References"
                // allowClear
                onChange={(e) => setReferences(e.target.value)}
              />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                span: 12,
                offset: 6,
              }}
            >
              <Button
                type="primary"
                htmlType="submit"
                block
                onClick={handleSubmit}
              >
                Update
              </Button>
            </Form.Item>
          </Col>
          <Col md={12} lg={12} sm={24}></Col>
        </Row>
      </Form>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    categories: state.book.categories,
    error: state.book.error,
    bookData: state.book.book,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getCategoriesList: () => dispatch(fetchCategories()),
    fetchBookData: (bookId) => dispatch(fetchBookById(bookId)),
    update: (bookId, data) => dispatch(updateBookData(bookId, data)),
  };
};
export default ValidateLogin(
  connect(mapStateToProps, mapDispatchToProps)(UpdateBook)
);

import React, { useState, useEffect } from "react";
import ValidateLogin from "../Hoc/hoc";
import { Form, Select, InputNumber, Button, Row, Col, Input } from "antd";
import { connect } from "react-redux";
import { fetchCategories, addUserBook } from "../Store/Actions/Book";
const { Option } = Select;

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 16,
  },
};

function Addbook(props) {
  const { categories, getCategoriesList, insertBook } = props;
  const [name, setName] = useState();
  const [category, setCategory] = useState();
  const [book, setBook] = useState();
  const [pages, setPages] = useState();
  const [references, setReferences] = useState();
  let formData = new FormData();

  const handleSubmit = async (e) => {
    e.preventDefault();
    formData.append("book", book);
    formData.set("name", name);
    formData.set("category", category);
    formData.set("pages", pages);
    formData.set("references", references);
    await insertBook(formData);
  };
  useEffect(() => {
    getCategoriesList();
  }, [getCategoriesList]);

  return (
    <div>
      <Form
        name="add book"
        {...formItemLayout}
        // onFinish={onFinish}
        initialValues={{
          "input-number": 3,
          "checkbox-group": ["A", "B"],
          rate: 3.5,
        }}
      >
        <Row>
          <Col md={12} lg={12} sm={24}>
            <Form.Item
              name="book category"
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
                  categories.map((category) => (
                    <Option value={category._id}> {category.name}</Option>
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
              <Input value={name} onChange={(e) => setName(e.target.value)} />
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
              <Form.Item name="input-number" noStyle>
                <InputNumber
                  min={1}
                  max={10000}
                  onChange={(value) => setPages(value)}
                  value={pages}
                />
              </Form.Item>
              <span className="ant-form-text"> Pages</span>
            </Form.Item>
            <Form.Item label="References">
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
                ADD BOOK
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
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getCategoriesList: () => dispatch(fetchCategories()),
    insertBook: (data) => dispatch(addUserBook(data)),
  };
};
export default ValidateLogin(
  connect(mapStateToProps, mapDispatchToProps)(Addbook)
);

import React, { useState, useEffect } from "react";
import ValidateLogin from "../Hoc/hoc";
import { Form, Select, InputNumber, Button, Row, Col, Input } from "antd";
import { connect } from "react-redux";
import { fetchCategories } from "../Store/Actions/Book";

const { Option } = Select;

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 16,
  },
};

function Addbook({ categories, getCategoriesList }) {
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };
  const [image, setImage] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // let formData = new FormData();
  };
  useEffect(() => {
    getCategoriesList();
  }, [getCategoriesList]);
  return (
    <div>
      <Form
        name="add book"
        {...formItemLayout}
        onFinish={onFinish}
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
              <Select placeholder="Select Book Category">
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
              <Input />
            </Form.Item>

            <Form.Item label="File">
              <Input type="file" name="book" id="book" />
            </Form.Item>
            <Form.Item label="Book Pages ">
              <Form.Item name="input-number" noStyle>
                <InputNumber min={1} max={10000} />
              </Form.Item>
              <span className="ant-form-text"> Pages</span>
            </Form.Item>
            <Form.Item label="References">
              <Input.TextArea
                placeholder="Add References"
                // allowClear
                // onChange={onChange}
              />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                span: 12,
                offset: 6,
              }}
            >
              <Button type="primary" htmlType="submit">
                Submit
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
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getCategoriesList: () => dispatch(fetchCategories()),
  };
};
export default ValidateLogin(
  connect(mapStateToProps, mapDispatchToProps)(Addbook)
);

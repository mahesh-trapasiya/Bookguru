import React, { useEffect, useRef, createRef, useState } from "react";
import {
  Tabs,
  Row,
  Col,
  Table,
  Input,
  Button,
  Space,
  Popconfirm,
  Tag,
  Switch,
} from "antd";
import {
  BookFilled,
  SearchOutlined,
  CheckOutlined,
  CloseOutlined,
  CloseCircleOutlined,
  EditOutlined,
} from "@ant-design/icons";
import ValidateLogin from "../Hoc/hoc";
import { connect } from "react-redux";
import {
  fetchBooksByUserId,
  deleteBook,
  changeBookStatus,
} from "../Store/Actions/Book";
import Highlighter from "react-highlight-words";
import { Link } from "@reach/router";

function ManageBooks(props) {
  const {
    getUserBooks,
    userId,
    books,
    deleteUserBook,
    updateBookStatus,
  } = props;
  const [userBooks, setUserBooks] = useState([]);
  const [searchText, setSearchText] = useState();
  const [searchedColumn, setsearchedColumn] = useState();
  let data = [];

  let searchInput = createRef();
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => {
            searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.select());
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text.toString()}
        />
      ) : (
        text
      ),
  });

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();

    setSearchText(selectedKeys[0]);
    setsearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const columns = [
    {
      title: "Book Name",
      dataIndex: "name",
      key: "name",
      align: "center",
      width: "20%",
      ...getColumnSearchProps("name"),
    },
    {
      title: "Pages",
      dataIndex: "pages",
      key: "pages",
      align: "center",
      width: "5%",
    },
    {
      title: "References",
      dataIndex: "refrences",
      align: "center",
      key: "refrences",
      ...getColumnSearchProps("refrences"),
    },
    {
      title: "Likes",
      dataIndex: "likes",
      key: "likes",
      width: "5%",
      sorter: {
        compare: (a, b) => a.likes - b.likes,
        multiple: 2,
        align: "center",
      },
    },
    {
      title: "Deslikes",
      dataIndex: "deslikes",
      key: "deslikes",
      width: "5%",
    },
    {
      title: "Comments",
      dataIndex: "comments",
      key: "comments",
      align: "center",
      width: "5%",
    },

    {
      title: "Status ",
      dataIndex: "status",
      key: "status",
      align: "center",
      width: "5%",
    },
    {
      title: "Update",
      dataIndex: "update",
      key: "update",
      width: "2%",
      align: "center",
    },
    {
      title: "Delete ",
      dataIndex: "delete",
      key: "delete",
      align: "center",
      width: "2%",
    },
  ];

  useEffect(() => {
    getUserBooks(userId);
  }, []);
  books &&
    books.books.forEach((book, i) => {
      data.push({
        key: i,
        name: book.name,
        pages: book.pages,
        refrences: [
          <Tag color="blue" key={1}>
            {book.references}
          </Tag>,
        ],
        delete: [
          <Popconfirm
            title="Are you sure？"
            key={i}
            okText="Yes"
            cancelText="No"
            onConfirm={() => deleteUserBook(book._id)}
          >
            <a href="#">
              <CloseCircleOutlined style={{ color: "red" }} />
            </a>
          </Popconfirm>,
        ],
        update: [
          <Link to={`/book/update/${book._id}`}>
            <EditOutlined />
          </Link>,
        ],
        likes: book.likes.length,
        deslikes: book.deslikes.length,
        comments: book.comments.length,
        status: [
          <Switch
            checkedChildren={<CheckOutlined twoToneColor="#eb2f96" />}
            unCheckedChildren={<CloseOutlined />}
            key={i}
            defaultChecked={book.status}
            onChange={() => updateBookStatus(book._id)}
          />,
        ],
      });
    });

  return (
    <div>
      <Row>
        <Col xs={24} sm={24} md={24} lg={24}>
          <Tabs defaultActiveKey="1" /* onChange={callback} */>
            <Tabs.TabPane
              tab={
                <span>
                  <BookFilled />
                  Your Books
                </span>
              }
              key="1"
            >
              <Table columns={columns} dataSource={data} tableLayout="auto" />
            </Tabs.TabPane>
          </Tabs>
        </Col>
      </Row>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    books: state.book.userBooks,
    msg: state.book.message,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getUserBooks: (userId) => dispatch(fetchBooksByUserId(userId)),
    deleteUserBook: (bookId) => dispatch(deleteBook(bookId)),
    updateBookStatus: (bookId) => dispatch(changeBookStatus(bookId)),
  };
};
export default ValidateLogin(
  connect(mapStateToProps, mapDispatchToProps)(ManageBooks)
);

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
} from "antd";
import { BookFilled, SearchOutlined } from "@ant-design/icons";
import ValidateLogin from "../Hoc/hoc";
import { connect } from "react-redux";
import { fetchBooksByUserId } from "../Store/Actions/Book";
import Highlighter from "react-highlight-words";

function ManageBooks(props) {
  const { getUserBooks, userId, books } = props;

  const [userBooks, setUserBooks] = useState([]);

  const [searchText, setSearchText] = useState();
  const [searchedColumn, setsearchedColumn] = useState();
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
      width: "20%",
      ...getColumnSearchProps("name"),
    },
    {
      title: "Pages",
      dataIndex: "pages",
      key: "pages",
      width: "5%",
    },
    {
      title: "References",
      dataIndex: "refrences",
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
      width: "5%",
    },
    {
      title: "Favorites ",
      dataIndex: "favorites",
      key: "favorites",
      width: "5%",
    },
    {
      title: "Status ",
      dataIndex: "status",
      key: "status",
      width: "5%",
    },
    {
      title: "Update",
      dataIndex: "update",
      key: "update",
      width: "5%",
    },
    {
      title: "Delete ",
      dataIndex: "delete",
      key: "delete",
      width: "5%",
    },
  ];
  const tableData = () => {
    /*  let data = [];
    books &&
      books.map((book, i) => {
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
            <Popconfirm title="Are you sure？" okText="Yes" cancelText="No">
              <a href="#">Delete</a>
            </Popconfirm>,
          ],
          update: [<a href="/">Update</a>],
          likes: book.likes.length,
        });
      }); */
    // setUserBooks(data);
  };
  useEffect(() => {
    getUserBooks(userId);
  }, []);

  return (
    <div>
      <Row>
        {books && console.log(books)}
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
              <Table
                columns={columns}
                dataSource={userBooks}
                tableLayout="auto"
              />
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
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getUserBooks: (userId) => dispatch(fetchBooksByUserId(userId)),
  };
};
export default ValidateLogin(
  connect(mapStateToProps, mapDispatchToProps)(ManageBooks)
);

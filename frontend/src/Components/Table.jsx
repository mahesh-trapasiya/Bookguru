import React, { useState, createRef } from "react";
import { Table, Input, Button, Space } from "antd";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";

const data = [
  {
    key: "1",
    name: "John Brown",
    pages: 32,
    refrences: "New York No. 1 Lake Park",
  },
  {
    key: "2",
    name: "Joe Black",
    pages: 42,
    refrences: "London No. 1 Lake Park",
  },
  {
    key: "3",
    name: "Jim Green",
    pages: 32,
    refrences: "Sidney No. 1 Lake Park",
  },
  {
    key: "4",
    name: "Jim Red",
    pages: 32,
    refrences: "London No. 2 Lake Park",
  },
];

function TableUI() {
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
  ];
  return <Table columns={columns} dataSource={data} />;
}

export default TableUI;

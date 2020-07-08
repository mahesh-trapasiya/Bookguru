import React, { useState } from "react";

import { Layout, Menu, Dropdown, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Link, navigate } from "@reach/router";
import { isLoggedin } from "../../Services/auth";

const { Header, Content, Sider } = Layout;

function Topbar(props) {
  const auth = JSON.parse(localStorage.getItem("auth"));
  const userId = auth._id;

  const menu = (
    <Menu>
      <Menu.Item>
        <Link to={`/user/profile/${userId}`}>My Profile</Link>
      </Menu.Item>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer">
          Change Password
        </a>
      </Menu.Item>

      <Menu.Item
        danger
        onClick={() => {
          localStorage.clear();
          navigate("/");
        }}
      >
        Logout
      </Menu.Item>
    </Menu>
  );
  return (
    props.display && (
      <Layout>
        <Header className="header">
          {isLoggedin().role === "Writer" && (
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={["0"]}
              openKeys={[]}
            >
              <Menu.Item key="1">
                <Link to="/writer">Dashboard</Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Link to="/library">Library</Link>
              </Menu.Item>
              <Menu.Item key="3">
                <Link to={`/books/${userId}`}>Your Books</Link>
              </Menu.Item>
              <Menu.Item key="4">
                <Link to={`/book/add`}>Add Book</Link>
              </Menu.Item>

              <Menu.Item style={{ float: "right" }}>
                <Dropdown overlay={menu}>
                  <a
                    // className="ant-dropdown-link"
                    onClick={(e) => e.preventDefault()}
                  >
                    <Avatar icon={<UserOutlined />} size="large" />
                  </a>
                </Dropdown>
              </Menu.Item>
            </Menu>
          )}
          {isLoggedin().role === "Reader" && (
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["0"]}>
              <Menu.Item key="1">
                <Link to="/">Dashboard</Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Link to="/library">Library</Link>
              </Menu.Item>

              <Menu.Item style={{ float: "right" }}>
                <Dropdown overlay={menu}>
                  <a
                    // className="ant-dropdown-link"
                    onClick={(e) => e.preventDefault()}
                  >
                    <Avatar icon={<UserOutlined />} size="large" />
                  </a>
                </Dropdown>
              </Menu.Item>
            </Menu>
          )}
        </Header>

        <Layout style={{ padding: "0 24px 24px" }}>
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              marginTop: 15,
              minHeight: 280,
            }}
          >
            {props.children}
          </Content>
        </Layout>
      </Layout>
    )
  );
}

export default Topbar;

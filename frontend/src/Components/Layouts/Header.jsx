import React, { useState } from "react";

import { Layout, Menu, Dropdown, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Link } from "@reach/router";

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

function Topbar(props) {
  const menu = (
    <Menu>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer">
          My Profile
        </a>
      </Menu.Item>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer">
          Change Password
        </a>
      </Menu.Item>

      <Menu.Item danger>Logout</Menu.Item>
    </Menu>
  );
  return (
    props.display && (
      <Layout>
        <Header className="header">
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
            <Menu.Item key="1">
              <Link to="/">Dashboard</Link>
            </Menu.Item>
            <Menu.Item style={{ float: "right" }}>
              <Dropdown overlay={menu}>
                <a
                  className="ant-dropdown-link"
                  onClick={(e) => e.preventDefault()}
                >
                  <Avatar icon={<UserOutlined />} size="large" />
                </a>
              </Dropdown>
            </Menu.Item>
          </Menu>
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

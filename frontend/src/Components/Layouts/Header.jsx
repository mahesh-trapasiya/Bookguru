import React, { useState } from "react";

import { Layout, Menu } from "antd";
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
} from "@ant-design/icons";

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

function Topbar({ display }) {
  const [collapsed, setCollapsed] = useState(true);

  return (
    display && (
      <Layout>
        <Header className="header">
          <div className="logo" />
        </Header>
        <Layout>
          <Sider
            width={200}
            className="site-layout-background"
            collapsible
            collapsed={collapsed}
            onCollapse={() => setCollapsed(!collapsed)}
          >
            <Menu
              mode="inline"
              defaultSelectedKeys={["0"]}
              defaultOpenKeys={["0"]}
              style={{ height: "100%", borderRight: 0 }}
              theme="dark"
            >
              <SubMenu key="sub1" icon={<UserOutlined />} title="subnav 1">
                <Menu.Item key="1">View Profile</Menu.Item>
                <Menu.Item key="3">Change Password</Menu.Item>
                <Menu.Item
                  key="2"
                  onClick={() => {
                    localStorage.clear();
                  }}
                >
                  Logout
                </Menu.Item>
                <Menu.Item key="4">option4</Menu.Item>
              </SubMenu>
              <SubMenu key="sub2" icon={<LaptopOutlined />} title="subnav 2">
                <Menu.Item key="5">option5</Menu.Item>
                <Menu.Item key="6">option6</Menu.Item>
                <Menu.Item key="7">option7</Menu.Item>
                <Menu.Item key="8">option8</Menu.Item>
              </SubMenu>
              <SubMenu
                key="sub3"
                icon={<NotificationOutlined />}
                title="subnav 3"
              >
                <Menu.Item key="9">option9</Menu.Item>
                <Menu.Item key="10">option10</Menu.Item>
                <Menu.Item key="11">option11</Menu.Item>
                <Menu.Item key="12">option12</Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
          <Layout style={{ padding: "0 24px 24px" }}>
            <Content
              className="site-layout-background"
              style={{
                padding: 24,
                margin: 0,
                marginTop: 15,
                minHeight: 280,
                height: "100%",
              }}
            >
              Content
            </Content>
          </Layout>
        </Layout>
      </Layout>
    )
  );
}

export default Topbar;

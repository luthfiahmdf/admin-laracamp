import { Breadcrumb, Layout, Menu, theme } from "antd";
import { useState } from "react";

import CampList from "./camp/camp_list";
import CampBenefit from "./camp/camp_benefit";

const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, content) {
  return {
    key,
    icon,
    content,
    label,
  };
}

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState("1"); // Track the selected menu item key

  const items = [
    getItem(collapsed ? "" : "Camp List", "1", `📃`, <CampList />),
    getItem(collapsed ? "" : "Camp Benefit", "2", `🔥`, <CampBenefit />),
  ];
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const handleMenuItemClick = ({ key }) => {
    setSelectedKey(key); // Update the selected menu item key
  };

  const renderContent = () => {
    const selectedItem = items.find((item) => item.key === selectedKey);

    if (selectedItem) {
      if (Array.isArray(selectedItem.content)) {
        return selectedItem.content.map((subItem) => (
          <div key={subItem.key}>{subItem.content}</div>
        ));
      } else {
        return selectedItem.content;
      }
    }

    return null;
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
          onClick={handleMenuItemClick}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            {/* Render breadcrumbs based on the selected menu */}
          </Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
            }}
          >
            {renderContent()}
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>❤️</Footer>
      </Layout>
    </Layout>
  );
};

export default App;

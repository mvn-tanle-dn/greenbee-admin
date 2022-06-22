import React from "react";
import {
  DownOutlined,
  LogoutOutlined,
  InfoCircleFilled,
} from "@ant-design/icons";
import { Button, Dropdown, Space, Menu, message } from "antd";

import "./topbar.scss";
import { useNavigate } from "react-router-dom";
import { logout } from "../../api/auth";

export default function Topbar() {
  const navigate = useNavigate();

  const handleMenuClick = (e) => {
    if (e.key === 1) {
      navigate("/profile");
    } else if (e.key === "2") {
      localStorage.removeItem("access_token");
      navigate("/login");
      logout()
        .then((res) => {
          message.success("Logout successfully!");
        })
        .catch((err) => {
          // message.error(err.message);
        });
    }
  };
  const menu = (
    <Menu
      onClick={handleMenuClick}
      items={[
        {
          label: "Profile",
          key: "1",
          icon: <InfoCircleFilled />,
        },
        {
          label: "Logout",
          key: "2",
          icon: <LogoutOutlined />,
        },
      ]}
    />
  );
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">Greenbee-Admin</span>
        </div>
        <div className="topRight">
          <Dropdown overlay={menu}>
            <Button>
              {/* <img
                src="https://images.pexels.com/photos/1526814/pexels-photo-1526814.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                alt=""
                className="topAvatar"
              /> */}
              <Space>
                Admin
                <DownOutlined />
              </Space>
            </Button>
          </Dropdown>
        </div>
      </div>
    </div>
  );
}

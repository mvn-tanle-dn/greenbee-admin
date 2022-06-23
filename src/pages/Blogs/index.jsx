import React, { useEffect, useState } from "react";
import { getBlogs } from "../../api/blog";
import { Space, Table, Tag, Input, Button } from "antd";

// Style
import "./style.scss";

const { Search } = Input;

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);

  const columns = [
    {
      title: "First Name",
      dataIndex: "first_name",
      key: "first_name",
    },
    {
      title: "Last Name",
      dataIndex: "last_name",
      key: "last_name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (_, record) => (
        <Tag color="blue">{record.role === "1" ? "User" : "Admin"}</Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a>Reset Password</a>
          <a>Delete</a>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    getBlogs().then((res) => {
      console.log(res);
      setBlogs(res.data.data);
    });
  }, []);
  return (
    <div className="blogs">
      <Table
        title={() => (
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h5 style={{ fontSize: 22, fontWeight: "600" }}>Manager Blogs</h5>
            <div style={{ display: "flex" }}>
              {/* <Search
                style={{ width: 600, marginRight: 40 }}
                onChange={(e) => {
                  let value = e.target.value;
                  if (value === "") {
                    setData([...dataSource]);
                  } else {
                    let dataSearch = dataSource.filter(
                      (item) =>
                        item.first_name
                          .toLowerCase()
                          .includes(value.trim().toLowerCase()) ||
                        item.last_name
                          .toLowerCase()
                          .includes(value.trim().toLowerCase()) ||
                        item.email
                          .toLowerCase()
                          .includes(value.trim().toLowerCase())
                    );
                    setData([...dataSearch]);
                  }
                }}
              /> */}
              <Button
                type="primary"
                style={{ display: "flex", gap: 5, alignItems: "center" }}
                // onClick={() => setIsAddModalVisible(true)}
              >
                Add Blog
              </Button>
            </div>
          </div>
        )}
        columns={columns}
        dataSource={blogs}
        rowKey={(record) => record.id}
      />
    </div>
  );
}

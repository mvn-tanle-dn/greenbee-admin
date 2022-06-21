import { useState, useLayoutEffect } from "react";
import { Link } from "react-router-dom";
import { Space, Table, Tag, Input, Button } from "antd";

import { DataGrid } from "@material-ui/data-grid";
// Icons
import { DeleteOutline } from "@material-ui/icons";

// Styles
import "./userList.scss";
import { getUsers } from "../../api/user";

const { Search } = Input;

export default function UserList() {
  const [data, setData] = useState([]);

  const [dataSource, setDataSource] = useState([]);

  useLayoutEffect(() => {
    getUsers().then((res) => {
      setData(res.data.data);
      setDataSource(res.data.data);
    });
  }, []);

  // const columns = [
  //   { field: "id", headerName: "ID", width: 90 },
  //   {
  //     field: "user",
  //     headerName: "User",
  //     width: 200,
  //     renderCell: (params) => {
  //       return (
  //         <div className="userListUser">
  //           <img className="userListImg" src={params.row.avatar} alt="" />
  //           {params.row.username}
  //         </div>
  //       );
  //     },
  //   },
  //   { field: "email", headerName: "Email", width: 200 },
  //   // {
  //   //   field: "status",
  //   //   headerName: "Status",
  //   //   width: 120,
  //   // },
  //   // {
  //   //   field: "transaction",
  //   //   headerName: "Transaction Volume",
  //   //   width: 160,
  //   // },
  //   {
  //     field: "action",
  //     headerName: "Action",
  //     width: 150,
  //     renderCell: (params) => {
  //       return (
  //         <>
  //           <Link to={"/user/" + params.row.id}>
  //             <button className="userListEdit">Edit</button>
  //           </Link>
  //           <DeleteOutline
  //             className="userListDelete"
  //             onClick={() => handleDelete(params.row.id)}
  //           />
  //         </>
  //       );
  //     },
  //   },
  // ];

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
  return (
    <div className="userList">
      <Table
        title={() => (
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h5 style={{ fontSize: 22, fontWeight: "600" }}>Manager Users</h5>
            <div style={{ display: "flex" }}>
              <Search
                style={{ width: 600, marginRight: 40 }}
                onChange={(e) => {
                  let value = e.target.value;
                  console.log(value);
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
              />
              <Button
                type="primary"
                style={{ display: "flex", gap: 5, alignItems: "center" }}
                // onClick={() => setIsAddModalVisible(true)}
              >
                Add User
              </Button>
            </div>
          </div>
        )}
        columns={columns}
        dataSource={data}
      />
    </div>
  );
}

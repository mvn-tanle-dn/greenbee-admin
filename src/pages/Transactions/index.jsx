import React, { useEffect, useState } from "react";

import { getLatestTransactions } from "../../api/cart";
import { Tag, Space, Popconfirms, Table } from "antd";

// Style
import "./style.scss";

function Transactions() {
  const [latestTransaction, setLatestTransactions] = useState([]);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Product",
      dataIndex: "product_name",
      key: "product_name",
    },
    {
      title: "Category ID",
      dataIndex: "category_id",
      key: "category_id",
    },
    {
      title: "Category Name",
      dataIndex: "category_name",
      key: "category_name",
    },
    {
      title: "Origin Price",
      key: "origin_price",
      dataIndex: "origin_price",
      // sorter: (prev, next) => prev.origin_price - next.origin_price,
    },
    {
      title: "Sell Price",
      key: "sell_price",
      dataIndex: "sell_price",
      // sorter: (prev, next) => prev.sell_price - next.sell_price,s
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <span
            className="product-btn-view"
            // onClick={() => handleEditProduct(record)}
          >
            Edit
          </span>
          {/* <Popconfirm
            title="Are you sure?"
            // onConfirm={() => handleDeleteProduct(record.id)}
          >
            <span className="product-btn-delete">Delete</span>
          </Popconfirm> */}
        </Space>
      ),
    },
  ];

  useEffect(() => {
    getLatestTransactions().then((res) => {
      console.log(res.data.data);
      setLatestTransactions(res.data.data);
    });
  }, []);

  return (
    <div className="transactions">
      <Table columns={columns} dataSource={latestTransaction} />
    </div>
  );
}

export default Transactions;

import { DataGrid } from "@material-ui/data-grid";
import { productRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { useEffect, useLayoutEffect, useState } from "react";
import { Space, Table, Tag } from "antd";

// Icons
import { DeleteOutline } from "@material-ui/icons";

// Styles
import "./productList.scss";
import { getProducts } from "../../api/product";

export default function ProductList() {
  const [data, setData] = useState([]);

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  useEffect(() => {
    getProducts().then((res) => {
      console.log(res);
      setData(res.data.data);
    });
  }, []);

  // const columns = [
  //   { field: "id", headerName: "ID", width: 90 },
  //   {
  //     field: "product",
  //     headerName: "Product",
  //     width: 200,
  //     renderCell: (params) => {
  //       return (
  //         <div className="productListItem">
  //           <img className="productListImg" src={params.row.img} alt="" />
  //           {params.row.name}
  //         </div>
  //       );
  //     },
  //   },
  //   { field: "stock", headerName: "Stock", width: 200 },
  //   {
  //     field: "status",
  //     headerName: "Status",
  //     width: 120,
  //   },
  //   {
  //     field: "price",
  //     headerName: "Price",
  //     width: 160,
  //   },
  //   {
  //     field: "action",
  //     headerName: "Action",
  //     width: 150,
  //     renderCell: (params) => {
  //       return (
  //         <>
  //           <Link to={"/product/" + params.row.id}>
  //             <button className="productListEdit">Edit</button>
  //           </Link>
  //           <DeleteOutline
  //             className="productListDelete"
  //             onClick={() => handleDelete(params.row.id)}
  //           />
  //         </>
  //       );
  //     },
  //   },
  // ];

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
      // dataIndex: "category_name",
      key: "category_id",
      render: (_, record) => {
        console.log(record);
        return record.category.category_name;
      },
    },
    {
      title: "Origin Price",
      key: "origin_price",
      dataIndex: "origin_price",
    },
    {
      title: "Sell Price",
      key: "sell_price",
      dataIndex: "sell_price",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a>View</a>
          <a>Delete</a>
        </Space>
      ),
    },
  ];

  useLayoutEffect(() => {
    getProducts().then((res) => {
      console.log(res.data.data);
    });
  }, []);

  return (
    <div className="productList">
      {/* <DataGrid
        rows={data}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
      /> */}
      <Table columns={columns} dataSource={data} />
    </div>
  );
}

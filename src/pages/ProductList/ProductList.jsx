import { useEffect, useRef, useState, useLayoutEffect } from "react";
import {
  Space,
  Table,
  Tag,
  Modal,
  Popconfirm,
  Form,
  Select,
  Input,
  Button,
  Upload,
  message,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";

import ImgCrop from "antd-img-crop";

// Styles
import "./productList.scss";
import { getProducts, deleteProduct } from "../../api/product";
import { getCategories } from "../../api/category";
import TextArea from "antd/lib/input/TextArea";

const { Search } = Input;

export default function ProductList() {
  const [form] = Form.useForm();
  const refSearch = useRef();
  const [products, setProducts] = useState([]);
  const [productTemp, setProductTemp] = useState([]);
  // const [categories, setCategories] = useState([]);
  const [categoriesName, setCategoriesName] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({});

  const [fileList, setFileList] = useState([]);
  const [uploading, setUploading] = useState(false);

  const handleUpload = () => {
    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append("files[]", file);
    });
    setUploading(true); // You can use any AJAX library you like

    fetch("https://www.mocky.io/v2/5cc8019d300000980a055e76", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then(() => {
        setFileList([]);
        message.success("upload successfully.");
      })
      .catch(() => {
        message.error("upload failed.");
      })
      .finally(() => {
        setUploading(false);
      });
  };

  const props = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      setFileList([...fileList, file]);
      return false;
    },
    fileList,
  };

  const handleEditProduct = (product) => {
    setCurrentProduct(product);
    setIsModalVisible(true);
  };

  const handleDeleteProduct = (id) => {
    deleteProduct(id).then((res) => {
      setProducts(
        products.filter((product) => product.id !== res.data.data.id)
      );
    });
  };

  const handleUpdateProduct = () => {
    // setDisableInput(false);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

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
      filters: [...categoriesName],
      onFilter: (value, record) => record.category_id === value,
      render: (_, record) => {
        let colorByCategory;
        switch (record.category.category_name) {
          case "Vegetables":
            colorByCategory = "green";
            break;
          case "Fresh Meats":
            colorByCategory = "orange";
            break;
          default:
            colorByCategory = "geekblue";
            break;
        }
        return (
          <Tag color={colorByCategory}>{record.category.category_name}</Tag>
        );
      },
    },
    {
      title: "Origin Price",
      key: "origin_price",
      dataIndex: "origin_price",
      sorter: (prev, next) => prev.origin_price - next.origin_price,
    },
    {
      title: "Sell Price",
      key: "sell_price",
      dataIndex: "sell_price",
      sorter: (prev, next) => prev.sell_price - next.sell_price,
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <span
            className="product-btn-view"
            onClick={() => handleEditProduct(record)}
          >
            Edit
          </span>
          <Popconfirm
            title="Are you sure?"
            onConfirm={() => handleDeleteProduct(record.id)}
          >
            <span className="product-btn-delete">Delete</span>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  useLayoutEffect(() => {
    refSearch.current.focus();
  }, []);

  useEffect(() => {
    form.setFieldsValue({ ...currentProduct });
  }, [form, currentProduct]);

  useLayoutEffect(() => {
    getProducts().then((res) => {
      setProducts(res.data.data);
      setProductTemp(res.data.data);
    });
    getCategories().then((res) => {
      const result = res.data.data;
      if (result) {
        let categoriesName = result.map((category) => {
          let categoryFilter = {
            text: category.category_name,
            value: category.id,
          };
          return categoryFilter;
        });
        setCategoriesName(categoriesName);
      }
    });
  }, []);

  return (
    <div className="productList">
      <Table
        title={() => (
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h5 style={{ fontSize: 22, fontWeight: "600" }}>
              Manager Products
            </h5>
            <div style={{ display: "flex" }}>
              <Search
                ref={refSearch}
                style={{ width: 600, marginRight: 40 }}
                onChange={(e) => {
                  let value = e.target.value;
                  if (value === "") {
                    setProducts([...productTemp]);
                  } else {
                    let dataSearch = productTemp.filter(
                      (product) =>
                        product.product_name
                          .toLowerCase()
                          .includes(value.trim().toLowerCase()) ||
                        product.id.toString().includes(value.trim()) ||
                        product.category.id
                          .toString()
                          .includes(value.trim().toLowerCase()) ||
                        product.category.category_name
                          .toLowerCase()
                          .includes(value.trim().toLowerCase())
                    );
                    setProducts([...dataSearch]);
                  }
                }}
              />
              <Button
                type="primary"
                style={{ display: "flex", gap: 5, alignItems: "center" }}
                // onClick={() => setIsAddModalVisible(true)}
              >
                Add Product
              </Button>
            </div>
          </div>
        )}
        columns={columns}
        dataSource={products}
        rowKey={(record) => record.id}
      />
      <Modal
        title={`Product - ${currentProduct.product_name}`}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        className="detail-product-modal"
        footer={false}
      >
        <Form
          labelCol={{
            span: 5,
          }}
          wrapperCol={{
            span: 19,
          }}
          layout="horizontal"
          name="modal_detail_product"
          form={form}
        >
          <Form.Item label="ID" name="id">
            <Input disabled />
          </Form.Item>
          <Form.Item label="Product Name" name="product_name">
            <Input />
          </Form.Item>
          <Form.Item label="Category" name="category_id">
            <Select>
              {categoriesName.map((category) => (
                <Select.Option key={category.value} value={category.value}>
                  {category.text}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Origin Price" name="origin_price">
            <Input type="number" min="1" />
          </Form.Item>
          <Form.Item label="Sell Price" name="sell_price">
            <Input type="number" min="1" />
          </Form.Item>
          <Form.Item label="Description" name="description">
            <TextArea></TextArea>
          </Form.Item>
          <Form.Item label="Images">
            <Upload {...props}>
              <Button icon={<UploadOutlined />}>Select File</Button>
            </Upload>
            <Button
              type="primary"
              onClick={handleUpload}
              disabled={fileList.length === 0}
              loading={uploading}
              style={{
                marginTop: 16,
              }}
            >
              {uploading ? "Uploading" : "Start Upload"}
            </Button>
          </Form.Item>
          <Form.Item
            className="form-edit-product-action"
            wrapperCol={{
              offset: 5,
              span: 19,
            }}
          >
            <Button onClick={handleUpdateProduct}>Update</Button>
            <Button onClick={handleCancel}>Cancel</Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

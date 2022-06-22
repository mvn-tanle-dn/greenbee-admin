import { useEffect, useState } from "react";
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
} from "antd";

// Styles
import "./productList.scss";
import { getProducts, deleteProduct } from "../../api/product";
import { getCategories } from "../../api/category";
import TextArea from "antd/lib/input/TextArea";

const { Search } = Input;

export default function ProductList() {
  const [form] = Form.useForm();
  const [products, setProducts] = useState([]);
  const [productTemp, setProductTemp] = useState([]);
  // const [categories, setCategories] = useState([]);
  const [disabledInput, setDisableInput] = useState(true);
  const [categoriesName, setCategoriesName] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({});

  const handleViewProduct = (product) => {
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

  const handleUpdateProduct = () => {};

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
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <span
            className="product-btn-view"
            onClick={() => handleViewProduct(record)}
          >
            View
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

  useEffect(() => {
    form.setFieldsValue({ ...currentProduct });
  }, [form, currentProduct]);

  useEffect(() => {
    getProducts().then((res) => {
      setProducts(res.data.data);
      setProductTemp(res.data.data);
    });
    getCategories().then((res) => {
      const result = res.data.data;
      // setCategories(result);
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
            <h5 style={{ fontSize: 22, fontWeight: "600" }}>Manager Users</h5>
            <div style={{ display: "flex" }}>
              <Search
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
                Add Category
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
            <Input disabled={disabledInput} />
          </Form.Item>
          <Form.Item label="Category">
            <Select disabled={disabledInput}>
              {categoriesName.map((category) => (
                <Select.Option key={category.value} value={category.value}>
                  {category.text}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Origin Price" name="origin_price">
            <Input disabled={disabledInput} type="number" min="1" />
          </Form.Item>
          <Form.Item label="Sell Price" name="sell_price">
            <Input disabled={disabledInput} type="number" min="1" />
          </Form.Item>
          <Form.Item label="Description" name="description">
            <TextArea disabled={disabledInput}></TextArea>
          </Form.Item>
        </Form>
        <Button onClick={handleUpdateProduct}>Edit</Button>
        <Button onClick={handleCancel}>Cancel</Button>
      </Modal>
    </div>
  );
}

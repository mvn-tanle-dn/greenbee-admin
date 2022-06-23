import React, { useEffect, useState } from "react";
import { Avatar, List } from "antd";
import { getCategories } from "../../api/category";

// Styles
import "./style.scss";

export default function Categories() {
  const [categories, setCategories] = useState([]);

  const handleUpdate = () => {};

  const handleDelete = () => {};

  useEffect(() => {
    getCategories().then((res) => {
      setCategories(res.data.data);
    });
  }, []);
  return (
    <div className="categories-page">
      <List
        itemLayout="horizontal"
        dataSource={categories}
        pagination={{
          pageSize: 7,
        }}
        renderItem={(category) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={category.icon} />}
              title={category.category_name}
              description={category.description}
            />
            <p className="categories-page-action">
              <a style={{ color: "#40a9ff" }}>Edit</a>
              <a style={{ color: "#f5222d" }}>Delete</a>
            </p>
          </List.Item>
        )}
      />
    </div>
  );
}

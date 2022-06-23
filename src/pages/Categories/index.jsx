import React, { useEffect, useState } from "react";
import { Avatar, List } from "antd";
import { getCategories } from "../../api/category";

// Styles
import "./style.scss";

export default function Categories() {
  const [categories, setCategories] = useState([]);

  const data = [
    {
      title: "Ant Design Title 1",
    },
    {
      title: "Ant Design Title 2",
    },
    {
      title: "Ant Design Title 3",
    },
    {
      title: "Ant Design Title 4",
    },
  ];
  useEffect(() => {
    getCategories().then((res) => {
      console.log(res.data.data);
      setCategories(res.data.data);
    });
  }, []);
  return (
    <div className="categories-page">
      <List
        itemLayout="horizontal"
        size="small"
        dataSource={categories}
        renderItem={(category) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={category.icon} />}
              title={<a href="https://ant.design">{category.category_name}</a>}
              description={category.description}
            />
          </List.Item>
        )}
      />
    </div>
  );
}

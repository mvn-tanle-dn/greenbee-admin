import { Button, Checkbox, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";

// Styles
import "./style.scss";

// Api
import { login } from "../../api/auth";
import { KEY_LOCAL_STORAGE } from "../../utils/storage";

const App = () => {
  const navigate = useNavigate();

  const onFinish = (values) => {
    login({ ...values }).then((res) => {
      if (res.data.access_token) {
        localStorage.setItem(
          KEY_LOCAL_STORAGE.ACCESS_TOKEN,
          res.data.access_token
        );
        navigate("/");
      }
    });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="login-page">
      <Form
        name="login-form"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Please enter your email!",
            },
            {
              type: "email",
              message: "The input is not valid E-mail!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="Login">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default App;

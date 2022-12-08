import { Card, Form, Input, Button, Checkbox, message } from "antd";
import logo from "@/assets/logo.png";
import { useNavigate } from "react-router-dom";
import "./index.scss";
import { useStore } from "@/store";

function Login() {
  const { loginStore } = useStore();
  const navigate = useNavigate();
  const onFinish = async (values) => {
    // console.log(values);
    const { mobile, code } = values;
    await loginStore.getToken({
      mobile,
      code,
    });
    navigate("/", { replace: true });
    message.success("Login Scuuess!");
  };

  return (
    <div className="login">
      <Card className="login-container">
        <img className="login-logo" src={logo} alt="" />
        {/* Login Form */}
        <Form
          validateTrigger={["onBlur", "onChange"]}
          onFinish={onFinish}
          initialValues={{
            mobile: "13811111111",
            code: "246810",
            remember: true,
          }}
        >
          <Form.Item
            name="mobile"
            rules={[
              {
                pattern: /^[1][3-9]\d{9}$/,
                message: "Wrong account number format",
                validateTrigger: "onBlur",
              },
              { required: true, message: "Please enter your account number" },
            ]}
          >
            <Input
              size="large"
              placeholder="Please enter your account number"
            />
          </Form.Item>
          <Form.Item
            name="code"
            rules={[
              {
                len: 6,
                message: "Password should be 6 characters",
                validateTrigger: "onBlur",
              },
              { required: true, message: "Please enter the password" },
            ]}
          >
            <Input
              size="large"
              placeholder="Please enter the password"
              maxLength={6}
            />
          </Form.Item>
          <Form.Item name="remember" valuePropName="checked">
            <Checkbox className="login-checkbox-label">
              I have read and agreed to the Privacy Terms
            </Checkbox>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" size="large" block>
              Login
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

export default Login;

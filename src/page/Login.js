import {Button, Checkbox, Form, Input} from 'antd';
import {useForm} from "antd/es/form/Form";
import {useNavigate} from "react-router-dom";

export default function Login() {

    const [loginForm] = useForm()
    const navigate = useNavigate()

    const onFinish = (values) => {
    };

    const onFinishFailed = (errorInfo) => {
    };

    return <>
        <Form
            name="loginForm"
            form={loginForm}
            labelCol={{
                span: 8,
            }}
            wrapperCol={{
                span: 12,
            }}
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            // autoComplete="off"
            style={{
                width: '100%',
                height: '400px',
                padding: '14% 17% 0px 0px',
                fontWeight: 600,
                // fontSize:30,
            }}
            size={"large"}
        >
            <Form.Item
                label="用户名"
                name="username"
                rules={[
                    {
                        required: true,
                        message: '请输入用户名',
                    },
                ]}
            >
                <Input/>
            </Form.Item>

            <Form.Item
                label="密码"
                name="password"
                rules={[
                    {
                        required: true,
                        message: '请输入密码',
                    },
                ]}
            >
                <Input.Password/>
            </Form.Item>

            <Form.Item
                name="remember"
                valuePropName="checked"
                wrapperCol={{
                    offset: 8,
                    span: 16,
                }}
            >
                <Checkbox>记住我</Checkbox>
            </Form.Item>

            <Form.Item
                wrapperCol={{
                    offset: 8,
                    span: 16,
                }}
            >
                <Button type="primary"
                        htmlType="submit"
                        onClick={() => {
                            loginForm.validateFields().then(value => {
                                localStorage.setItem("userLogin", {
                                    ...value
                                })
                                navigate("/home")
                            })
                        }}
                >
                    登录
                </Button>
            </Form.Item>
        </Form>
    </>
}

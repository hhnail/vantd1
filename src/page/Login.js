import {Button, Checkbox, Form, Input} from 'antd';
import {useForm} from "antd/es/form/Form";
import {useNavigate} from "react-router-dom";

import styles from './Login.less'

export default function Login() {

    const [loginForm] = useForm()
    const navigate = useNavigate()

    return <>
        <div>
            <div className={styles.container}>
                我是背景图片
            </div>

            <div>
                <Form name="loginForm" form={loginForm} size={"large"}
                      labelCol={{span: 8,}}
                      wrapperCol={{span: 12,}}
                      initialValues={{remember: true,}}
                      className={styles.form}
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
                                        localStorage.setItem("userLogin", JSON.stringify(value))
                                        navigate("/staffDesktop")
                                    })
                                }}
                        >
                            登录
                        </Button>
                    </Form.Item>
                </Form>
            </div>

        </div>
    </>
}

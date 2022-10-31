import {Button, Checkbox, Form, Input, message} from 'antd';
import {useForm} from "antd/es/form/Form";
import {useNavigate} from "react-router-dom";

import styles from './Login.less'
import {login} from "../service/userService";
import {SYSTEM_MESSAGE} from "../enums/message";

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
                                        login(value).then(res => {
                                            // console.log("res::", res)
                                            // console.log("res.code:", res.data.code)
                                            // if (res.data.code != 0) {
                                            if (res.status != 200) {
                                                message.error(SYSTEM_MESSAGE.USERNAME_OR_PASSWORD_ERROR)
                                                return
                                            }
                                            message.success(SYSTEM_MESSAGE.LOGIN_SUCCESS)
                                            const {data} = res.data
                                            localStorage.setItem("userLogin", JSON.stringify(data))
                                            navigate("/staffDesktop")
                                        })
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

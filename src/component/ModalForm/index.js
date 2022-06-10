import React, {useState} from 'react';
import {Button, Checkbox, Form, Input, Modal} from 'antd';


/**
 * 模态框表单
 */
export default function ModalForm() {

    const [visible, setVisible] = useState(false);
    // const [confirmLoading, setConfirmLoading] = useState(false);


    const handleOk = () => {
        // setConfirmLoading(true);
        setTimeout(() => {
            setVisible(false);
            // setConfirmLoading(false);
        }, 2000);
    };

    const handleCancel = () => {
        console.log('Clicked cancel button');
        setVisible(false);
    };

    return (
        <>
            <Modal
                title="Title"
                visible={visible}
                onOk={handleOk}
                // confirmLoading={confirmLoading}
                onCancel={handleCancel}
            >
                <Form
                    name="ModalForm"
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                >
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input.Password/>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}



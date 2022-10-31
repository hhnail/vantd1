import {Button, Col, message, Modal, Row, Select, Steps, Upload} from 'antd';
import React, {useState} from 'react';
import './index.css'
import {UploadOutlined} from '@ant-design/icons';

const {Option} = Select;
const {Step} = Steps;

const props = {
    name: 'file',
    action: '/vapi/getExcelSheetList',
    multiple: false,
    headers: {
        authorization: 'authorization-text',
    },
    onChange(info) {
        if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
            message.success(`${info.file.name}文件上传成功`);
            console.log("info:", info)
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
};


/**
 * 组织管理
 */
export default function OrganizationManage() {

    const [modalVisible, setModalVisible] = useState(false)
    const [currentStep, setCurrentStep] = useState(0)

    /**
     * 渲染模态框底部按钮
     */
    const renderFooterBtns = () => {
        const footerBts = [
            currentStep > 0 && <Button type={"primary"} onClick={() => {
                setCurrentStep(currentStep - 1)
            }}>上一步</Button>,
            currentStep < 2 && <Button type={"primary"} onClick={() => {
                setCurrentStep(currentStep + 1)
            }}>下一步</Button>,
            currentStep == 2 && <Button type={"primary"}>保存</Button>,
        ]
        return footerBts
    }

    /**
     * 渲染sheet下拉选择框
     * @returns {JSX.Element}
     */
    const renderSelectSheet = () => {


        return <Select
            defaultValue="lucy"
            style={{
                width: 120,
            }}
        >
            <Option value="jack">Jack</Option>
            <Option value="lucy">Lucy</Option>
            <Option value="disabled" disabled>
                Disabled
            </Option>
            <Option value="Yiminghe">yiminghe</Option>
        </Select>
    }

    return <>
        <div style={{}}>
            <Button
                type={"primary"}
                onClick={() => {
                    setModalVisible(true)
                }}
            >
                导入
            </Button>
        </div>


        <Modal title="导入"
               footer={renderFooterBtns()}
               width={1100}
               visible={modalVisible}
               onOk={() => {
                   setModalVisible(false)
               }}
               onCancel={() => {
                   setModalVisible(false)
               }}
        >
            <div className="container">
                <div className="upPanel">
                    <Steps current={currentStep}>
                        <Step title="上传文件" description="This is a description."/>
                        <Step title="配置字段" subTitle="Left 00:00:08" description="This is a description."/>
                        <Step title="数据预览" description="This is a description."/>
                    </Steps>
                </div>
                <div className="downPanel">
                    <div style={{display: currentStep == 0 ? '' : 'none'}}>
                        <Row>
                            <Col span={2}>
                                文件：
                            </Col>
                            <Col span={8}>
                                <Upload {...props}>
                                    <Button icon={<UploadOutlined/>}>Click to Upload</Button>
                                </Upload>
                            </Col>
                            <Col span={2}>
                                选择sheet：
                            </Col>
                            <Col span={8}>
                                {renderSelectSheet()}
                            </Col>
                        </Row>
                    </div>
                    <div style={{display: currentStep == 1 ? '' : 'none'}}>
                        step2
                    </div>
                    <div style={{display: currentStep == 2 ? '' : 'none'}}>
                        step3
                    </div>
                </div>
            </div>
        </Modal>
    </>
}


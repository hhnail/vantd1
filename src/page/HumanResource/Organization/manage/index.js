import {Button, Col, Input, message, Modal, Row, Select, Steps, Upload} from 'antd';
import React, {useState} from 'react';
import './index.css'
import {UploadOutlined} from '@ant-design/icons';

const {Option} = Select;
const {Step} = Steps;

/**
 * 组织管理
 */
export default function OrganizationManage() {

    const [modalVisible, setModalVisible] = useState(false)
    const [currentStep, setCurrentStep] = useState(0)
    const [sheetList, setSheetList] = useState([])

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

        const options = []

        sheetList.forEach(item => {
            options.push(
                <Option value={item.sheetNo}>{item.sheetName}</Option>
            )
        })

        return <Select
            placeholder="请选择sheet"
            style={{
                width: 120,
            }}
        >
            {options}
        </Select>
    }


    const renderSelectTable = () => {

        // const options = []

        // sheetList.forEach(item => {
        //     options.push(
        //         <Option value={item.sheetNo}>{item.sheetName}</Option>
        //     )
        // })

        // return <Select
        //     placeholder="请选择目标表"
        //     style={{
        //         width: 120,
        //     }}
        // >
        //     {options}
        // </Select>

        return <Input/>
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
                                <Upload name={"file"}
                                        action={"/vapi/saveFile"}
                                        // action={"/vapi/getExcelSheetList"}
                                        multiple={false}
                                        headers={{
                                            authorization: 'authorization-text',
                                            token: localStorage.getItem("token"),
                                        }}
                                        onChange={info => {
                                            if (info.file.status !== 'uploading') {
                                                console.log(info.file, info.fileList);
                                            }
                                            if (info.file.status === 'done') {
                                                message.success(`${info.file.name} 文件上传成功`);
                                                const {data} = info.file.response
                                                console.log("info data:", data)
                                                setSheetList(data.sheetList)
                                            } else if (info.file.status === 'error') {
                                                message.error(`${info.file.name} 文件上传失败`);
                                            }
                                        }}
                                >
                                    <Button icon={<UploadOutlined/>}>点击上传</Button>
                                </Upload>
                            </Col>
                            <Col span={2}>
                                选择sheet：
                            </Col>
                            <Col span={8}>
                                {renderSelectSheet()}
                            </Col>
                        </Row>
                        <Row style={{
                            marginTop: 20
                        }}>
                            <Col span={2} push={10}>
                                目标表：
                            </Col>
                            <Col span={8} push={10}>
                                {/*{renderSelectTable()}*/}
                                <Input/>
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


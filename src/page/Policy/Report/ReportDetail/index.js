import {Button, PageHeader, Table} from "antd";
import {getFreeReport} from "../../../../service/freeReportService";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";

export default function ReportDetail() {

    useEffect(() => {
        setTableLoading(true)
        getFreeReport(id).then(res => {
            const {data} = res.data
            setReport(data)
        }).finally(() => {
            setTableLoading(false)
        })
    }, [])

    const [report, setReport] = useState({})
    const [tableLoading, setTableLoading] = useState(false)
    const navigate = useNavigate()
    const {id} = useParams()

    return <>
        <PageHeader
            ghost={false}
            onBack={() => {
                navigate(-1)
            }}
            title={report.reportName}
            subTitle={report.description}
            extra={[
                <Button key="1" type="primary">
                    Primary
                </Button>,
            ]}
        >
            <Table
                loading={tableLoading}
                size={"small"}
                columns={report.viewColumns}
                dataSource={report.viewData}
            />
        </PageHeader>

    </>
}

import { Table, Button, Space } from 'antd';
import {
    BulbOutlined,
    BulbTwoTone
} from '@ant-design/icons';

import { useState, useEffect } from 'react'
import { queryDeviceList, connectDevice } from '../../services/api'
import { objToUri } from '../../utils/utils'

function Device() {
    const [devices, setDevice] = useState([])

    function clickConnectHandle(item) {
        console.log("connect", item.uid)
        openDevice()
    }
    function clickDeleteHandle(item) {
        console.log("delete", item.uid)
    }
    function openDevice(uid) {
        let param = { uid: uid }
        const uri = objToUri(param)
        // const newWindow = window.open("/monitor", '_blank', 'location=0,status=0')
        const newWindow = window.open("/monitor" + uri, '_blank', 'location=0')
        if (newWindow) newWindow.opener = null
    }
    // load api data
    useEffect(() => {
        const devices = [
            {
                key: 12,
                uid: "123456",
                name: "name",
                online: true,
                createdAt: 1633953452 * 1000,
                lastOnlineAt: 1633953952 * 1000,
            }
        ]
        setDevice(devices)
    }, [])

    function generateHeader() {
        const header = [
            {
                title: 'name',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: 'uid',
                dataIndex: 'uid',
                key: 'uid',
            },
            {
                title: 'status',
                dataIndex: 'online',
                key: 'status',
                render: value => {
                    if (value) {
                        return (
                            <BulbTwoTone />
                        )
                    }
                    return <BulbOutlined />
                }
            },
            {
                title: 'created_time',
                dataIndex: 'createdAt',
                key: 'created_time',
                render: value => {
                    return new Date(value).toLocaleString()
                }
            },
            {
                title: 'last_online_time',
                dataIndex: 'lastOnlineAt',
                key: 'last_online_time',
                render: value => {
                    return new Date(value).toLocaleString()
                }
            },
            {
                title: 'Action',
                key: 'action',
                render: (item) => (
                    <Space size="middle">
                        <Button onClick={() => clickConnectHandle(item)}>Connect</Button>
                        <Button onClick={() => clickDeleteHandle(item)}>Delete</Button>
                    </Space >
                ),
            },
        ]
        return header
    }

    return (
        <Table columns={generateHeader()}
            dataSource={devices}
        />
    )
}
export default Device
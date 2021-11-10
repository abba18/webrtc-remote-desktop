
import { Table, Button, Space } from 'antd';
import {
    BulbOutlined,
    BulbTwoTone
} from '@ant-design/icons';

import { useState, useEffect } from 'react'
import { queryDeviceList } from '../../services/api'

function Device() {
    const [devices, setDevice] = useState([])

    function clickConnectHandle(item) {
        console.log("connect", item.uid)
        queryDeviceList().then((data) => {

            setDevice(data)
        }).catch(err => {
            console.log("handler error", err)
        })
    }
    function clickDeleteHandle(item) {
        console.log("delete", item.uid)
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
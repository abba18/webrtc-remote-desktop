import React from 'react';
import { Layout } from 'antd';
import './index.css';

import Nav from '../components/Nav/index.jsx'
import Device from '../components/Device/index.jsx'

function DashBoard() {
    return (
        <Layout>
            <Layout.Sider style={{
                overflow: 'auto',
                height: '100vh',
            }}
                trigger={null} collapsible collapsed={false}>
                <div className="site-layout-logo" />
                <Nav />
            </Layout.Sider>
            <Layout>
                <Layout.Content className="site-layout-content">
                    <div className="site-layout-background site-layout-content-container">
                        {/* content */}
                        <Device />
                    </div>
                </Layout.Content>
            </Layout>
        </Layout>
    );
}

export default DashBoard;
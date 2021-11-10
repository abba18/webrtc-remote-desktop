import { Menu } from 'antd';
import {
    ClusterOutlined,
    ToolOutlined,
} from '@ant-design/icons';

const navItems = [
    {
        icon: ClusterOutlined,
        title: "device",
        routes: "",
    },
    {
        icon: ToolOutlined,
        title: "config",
        routes: "",
    }
]

function Nav() {
    return (
        <div>
            <Menu
                mode="inline"
                defaultSelectedKeys={['1']}
            >
                {navItems.map((item, index) => {
                    return <Menu.Item key={item.title} icon={<item.icon />}>
                        {item.title}
                    </Menu.Item >
                })}
            </Menu>
        </div>
    );
}

export default Nav
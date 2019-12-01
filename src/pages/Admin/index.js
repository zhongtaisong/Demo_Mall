import React from 'react';
import { Form, Icon, Input, Button, Checkbox, Row, Col } from 'antd';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';
// 数据
// import state from './state';
// less样式
// import './index.less';

// Demo_Mall后台管理系统
@observer
class Admin extends React.Component {
    render() {
        return (
            <div className='dm_Admin'>
                dm_Admin
            </div>
        );
    }
}

export default Form.create()(Admin);
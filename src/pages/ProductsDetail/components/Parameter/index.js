import React from 'react';
import { Descriptions } from 'antd';
import { observer } from 'mobx-react';
// 规格参数
@observer
class Parameter extends React.Component {    
    render() {
        const { oneSpecs } = this.props;
        return (
            <div className='Parameter'>
                <Descriptions title="规格参数">
                    <Descriptions.Item label="商品名称">{ oneSpecs[0].lname }</Descriptions.Item>
                    <Descriptions.Item label="系统">{ oneSpecs[0].os }</Descriptions.Item>
                    <Descriptions.Item label="内存容量">{ oneSpecs[0].memory }</Descriptions.Item>
                    <Descriptions.Item label="分辨率">{ oneSpecs[0].resolution }</Descriptions.Item>
                    <Descriptions.Item label="显卡型号">{ oneSpecs[0].video_card }</Descriptions.Item>
                    <Descriptions.Item label="处理器">{ oneSpecs[0].cpu }</Descriptions.Item>
                    <Descriptions.Item label="显存容量">{ oneSpecs[0].video_memory }</Descriptions.Item>
                    <Descriptions.Item label="分类">{ oneSpecs[0].category }</Descriptions.Item>
                    <Descriptions.Item label="硬盘容量">{ oneSpecs[0].disk }</Descriptions.Item>
                </Descriptions>
            </div>
        );
    }
}

export default Parameter;
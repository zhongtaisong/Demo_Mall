import React from 'react';
import { observer } from 'mobx-react';
import { Descriptions } from 'antd';
import { toJS } from 'mobx';
// 设置
import { PUBLIC_URL } from '@config';
// 数据
import indexState from './state';

// 商品详情图片
@observer
class Pictures extends React.Component {

    componentDidMount() {
        this.props.lid && indexState.introimgsData( this.props.lid );
    }

    componentWillReceiveProps(nextProps) {
        if( this.props.lid != nextProps.lid ){
            this.props.lid && nextProps.lid && indexState.introimgsData( nextProps.lid );
        }
    }

    render() {
        let pics = toJS( indexState.pics );
        return (
            <div className='Pictures'>
                <Descriptions title="商品介绍">
                    {
                        pics.length && pics[0].img1 ? (
                            <Descriptions.Item label="">
                                <img src={ PUBLIC_URL + pics[0].img1 } alt={ pics[0].img1 } />
                            </Descriptions.Item>                            
                        ) : ''
                    }
                    {
                        pics.length && pics[0].img2 ? (
                            <Descriptions.Item label="">
                                <img src={ PUBLIC_URL + pics[0].img2 } alt={ pics[0].img2 } />
                            </Descriptions.Item>                            
                        ) : ''
                    }
                </Descriptions>
            </div>
        );
    }
}

export default Pictures;
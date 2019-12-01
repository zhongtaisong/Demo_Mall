import React, { Fragment } from 'react';
import { Comment, Avatar, Empty } from 'antd';
import { observer } from 'mobx-react';
// 全局设置
import { headPhotoState } from '@config';
// 数据
import state from './state';

// 商品评价
@observer
class CommodityEvaluation extends React.Component {

    componentDidMount() {
        this.props.lid && state.selcommentsData( this.props.lid );
    }

    componentWillReceiveProps(nextProps) {
        if( this.props.lid != nextProps.lid ){
            this.props.lid && nextProps.lid && state.selcommentsData( nextProps.lid );
        }
    }

    render() {
        const { commentList } = state;
        const { avatar } = headPhotoState;
        return (
            <div className='CommodityEvaluation'>
                {
                    commentList.length ? (
                        <Fragment>
                            {
                                commentList.map(item => {
                                    return (
                                        <Comment
                                            key={ item.id }
                                            author={ item.uname }
                                            avatar={
                                                <Avatar
                                                    src={ avatar }
                                                    alt="avatar"
                                                />
                                            }
                                            content={
                                                <p>{ item.commentContents }</p>
                                            }
                                            datetime={ item.comTime }
                                        />
                                    );
                                })
                            }
                        </Fragment>
                    ) : (
                        <Empty image={ Empty.PRESENTED_IMAGE_SIMPLE } description='暂无评价' />
                    )
                }
            </div>
        );
    }
}

export default CommodityEvaluation;
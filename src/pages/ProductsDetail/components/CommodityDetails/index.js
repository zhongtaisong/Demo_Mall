import React from 'react';
import { Card } from 'antd';
import { observer } from 'mobx-react';
// 规格参数
import Parameter from './../Parameter';
// 商品详情图片
import Pictures from './../Pictures';
// 商品评价
import CommodityEvaluation from './../CommodityEvaluation';
// tab标题
const tabListNoTitle = [
    {
      key: 'detail',
      tab: '商品详情',
    },
    {
      key: 'evaluate',
      tab: '商品评价',
    }
];
// tab内容
const contentListNoTitle = {
    detail(props) {
        return (<div>
            <Parameter {...props} />
            <Pictures {...props} />
        </div>);
    },
    evaluate(props) {
        return (<CommodityEvaluation {...props} />);
    }
};
// 商品详情区域
@observer
class CommodityDetails extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            noTitleKey: 'detail',
        }
    }

    // 监听tab
    onTabChange = (key, type) => {
        this.setState({ [type]: key });
    };

    render() {
        return (
            <div className='CommodityDetails'>
                <Card
                    style={{ width: '100%' }}
                    tabList={ tabListNoTitle }
                    activeTabKey={ this.state.noTitleKey }
                    onTabChange={ key => {
                        this.onTabChange(key, 'noTitleKey');
                    }}
                >
                    {
                        contentListNoTitle[ this.state.noTitleKey ](this.props)
                    }
                </Card>
            </div>
        );
    }
}

export default CommodityDetails;
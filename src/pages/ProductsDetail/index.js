import React from 'react';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
// 规格
import CommoditySpecification from './components/CommoditySpecification';
// 详情
import CommodityDetails from './components/CommodityDetails';
// 数据
import indexState from './state';
// 样式
import './index.less'

// 商品详情
@observer
class ProductsDetail extends React.Component {

    async componentDidMount() {
        try{
            const { state } = this.props.location;
            if( state && state.lid ){
                await indexState.setLid( state.lid );
                await indexState.specificationData();
            }
        }catch(err) {
            console.log(err);
        }
    }

    render() {
        const { pics, product, specs, oneSpecs, lid } = toJS( indexState );
        return (
            <div className='dm_ProductsDetail'>
                <div className='common_width'>
                    <CommoditySpecification 
                        {...this.props}
                        pics={ pics }
                        product={ product }
                        specs={ specs }
                    />
                    {
                        oneSpecs.length && lid ? (
                            <CommodityDetails 
                                {...this.props} 
                                oneSpecs={ oneSpecs }
                                lid={ lid }
                            />
                        ) : ''
                    }
                </div>
            </div>
        );
    }
}

export default ProductsDetail;
import { observable, action } from 'mobx';
// 接口服务
import service from './service';

class State {

    // 所有商品编号
    @observable lidList = [];
    @action setLidList = (data = []) => {
        this.lidList = data;
    }

    // 查询所有商品编号 - 发起请求
    selectLidData = async () => {
        const res = await service.selectLidData();
        try{
            if( res.data.code === 200 ){
                let { data } = res.data || {};
                if( data ){
                    let newData = data.map((item, index) => {
                        return ({
                            value: item.lid,
                            text: item.lid
                        });
                    });
                    this.setLidList( newData );
                }
            }
        }catch(err) {
            console.log(err);
        }
    }
}

export default new State();
import { observable, action, toJS } from "mobx";
import service from './service';
import { message } from "antd";

class State {

    @observable dataSource01 = [];
    @action setDataSource01 = (data = []) => {
        this.dataSource01 = data;
    }

    @observable dataSource02 = [];
    @action setDataSource02 = (data = []) => {
        this.dataSource02 = data;
    }

    @observable selectedRowKeys = [];
    @action setSelectedRowKeys = (data = []) => {
        this.selectedRowKeys = data;
    }

    @observable selectedRows = [];
    @action setSelectedRows = (data = []) => {
        this.selectedRows = data;
    }

    @observable consigneeInfo = {};
    @action setConsigneeInfo = (data = {}) => {
        if( data.phone ) {
            let phone = data.phone.slice(-8, -4);
            data.phone = data.phone.replace(new RegExp(phone), '****');
        }
        this.consigneeInfo = data;
    }

    selAddressData = async () => {
        const res = await service.selAddressData({
            uname: sessionStorage.getItem('uname')
        });
        try{
            if( res.data.code === 200 ){
                this.setDataSource01( res.data.data );
                let defaultId = res.data.data.filter(item => item.isDefault == 1);
                this.setSelectedRowKeys( [defaultId[0].id] );
                this.setConsigneeInfo( defaultId[0] );
                this.setSelectedRows( defaultId );
            }
        }catch(err) {
            console.log(err);
        }
    }

    addorderData = async ({productsList, consigneeInfo} = {}) => {
        const res = await service.addorderData({
            uname: sessionStorage.getItem('uname'),
            productsList,
            consigneeInfo
        });
        try{
            if( res.data.code === 200 ){
                message.success('提交订单成功')
            }
            return res.data.code;
        }catch(err) {
            console.log(err);
        }
    }

    delcartData = async (addorderData = {}, ids = []) => {
        const res = await service.delcartData({
            uname: sessionStorage.getItem('uname'),
            ids,
        });
        try{
            if( res.data.code === 200 ){
                return this.addorderData( addorderData );
            }
        }catch(err) {
            console.log(err);
        }
    }
}

export default new State();
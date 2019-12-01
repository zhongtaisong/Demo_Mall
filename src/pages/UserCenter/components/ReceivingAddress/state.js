import { message } from 'antd';
import { observable, action } from 'mobx';
// 接口服务
import service from './service';

class State {

    @observable dataSource = [];
    @action setDataSource = (data = []) => {
        this.dataSource = data;
    }

    @observable form = {};
    @action setForm = (data = {}) => {
        this.form = data;
    }
    @observable addressModalData = {};
    @action setAddressModalData01 = (data = {}) => {
        this.addressModalData = data;
    }

    // 添加收货地址 - 发起请求
    addAddressData = async (values = {}) => {
        const res = await service.addAddressData({
            uname: sessionStorage.getItem('uname'),
            ...values
        });
        try{
            if( res.data.code === 200 ){
                message.success('添加成功');
            }
            return res.data.code;
        }catch(err) {
            console.log(err);
        }
    }

    // 查询所有收货地址
    selAddressData = async () => {
        const res = await service.selAddressData({
            uname: sessionStorage.getItem('uname')
        });
        try{
            if( res.data.code === 200 ){
                this.setDataSource( res.data.data );
            }
        }catch(err) {
            console.log(err);
        }
    }

    // 删除收货地址
    delAddressData = async (id = '') => {
        const res = await service.delAddressData({
            uname: sessionStorage.getItem('uname'),
            id
        });
        try{
            if( res.data.code === 200 ){
                message.success('删除成功');
                this.selAddressData();
            }
        }catch(err) {
            console.log(err);
        }
    }

    // 设置默认地址
    setDefaultAddressData = async (id = '', isDefault = 0) => {
        const res = await service.setDefaultAddressData({
            uname: sessionStorage.getItem('uname'),
            id,
            isDefault
        });
        try{
            if( res.data.code === 200 ){
                message.success('默认地址设置成功');
                this.selAddressData();
            }
        }catch(err) {
            console.log(err);
        }
    }

    // 编辑收货地址
    updateAddressData = async (values = {}) => {
        if( !this.id ){
            message.error('id不能为空！');
            return;
        }
        const res = await service.updateAddressData({
            uname: sessionStorage.getItem('uname'),
            ...values, id: this.id
        });
        try{
            if( res.data.code === 200 ){
                message.success('更新收货地址成功');
                this.selAddressData();
            }
            return res.data.code;
        }catch(err) {
            console.log(err);
        }
    }

    // 添加收货地址弹出框 - 显示与隐藏
    @observable visible = false;
    @action setVisible = (data = false) => {
        this.visible = data;
    }

    // 当前数据id
    @observable id = null;
    @action setId = (data = null) => {
        this.id = data;
    }
}

export default new State();
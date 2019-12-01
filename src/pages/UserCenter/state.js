import { observable, action } from 'mobx';
import moment from 'moment';
// 接口服务
import service from './service';

class State {

    // 个人信息
    @observable personalInformation = {};
    @action setPersonalInformation01 = (data = {}) => {
        if( !data.nickName && data.uname ){
            data.nickName = data.uname;
        }
        this.personalInformation = data;
    }
    @action setPersonalInformation02 = (key, value) => {
        this.personalInformation[key] = value;
    }

    // 查询个人信息 - 发起请求
    pInfoData = async () => {
        const res = await service.pInfoData({
            uname: sessionStorage.getItem('uname')
        });
        try{
            if( res.data.code === 200 ){
                let { data } = res.data;
                if( data.birthday ){
                    data.birthday = moment( data.birthday );
                }
                this.setPersonalInformation01( data );
            }
        }catch(err) {
            console.log(err);
        }
    }

    // 登录密码
    @observable loginPassword = {};
    @action setLoginPassword01 = (data = {}) => {
        this.loginPassword = data;
    }
    @action setLoginPassword02 = (key, value) => {
        this.loginPassword[key] = value;
    }
}

export default new State();
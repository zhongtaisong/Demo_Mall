import service from './service';
import { message } from 'antd';
import { observable, action } from 'mobx';
import moment from 'moment';

class State {

    @observable history = {};
    @action setHistory = (data = {}) => {
        this.history = data;
    }

    logData = async (values = {}) => {
        const res = await service.logData({
            uname: sessionStorage.getItem('uname'),
            upwd: values.upwd,
            isUser: true
        });
        try{
            if( res.data.code === 200 ){
                this.cpwdData( values.newUpwd );
            }
        }catch(err) {
            console.log(err);
        }
    }

    cpwdData = async (newUpwd = '') => {
        const res = await service.cpwdData({
            uname: sessionStorage.getItem('uname'),
            newUpwd
        });
        try{
            if( res.data.code === 200 ){
                message.success('登录密码更新成功!');        
                sessionStorage.clear();
                this.history.push('/login');
            }
        }catch(err) {
            console.log(err);
        }
    }
}

export default new State();
import Taro from '@tarojs/taro'
import { observable, action } from 'mobx';
// 全局公共方法
import { session } from '@utils';
// 全局数据
import $state from '@store';
// 接口服务
import service from './service';

class State {

    // 提交新密码所需参数
    @observable upwdObj = {};
    @action setUpwdObj = (data = {}) => {
        this.upwdObj = data;
    }

    // 登录
    loginData = async ( values ) => {
        const res = await service.loginData(values);
        try{
            if( res.data.code === 200 ){
                Taro.login({
                  success(rs) {
                      if(rs.code) {
                          Taro.request({
                            url: 'https://api.weixin.qq.com/sns/jscode2session',
                            data: {
                              appid: 'wxe7c5ff9508e966bd',
                              secret: '4eeab4e514a3b1f486c2bb9da82c0b92',
                              js_code: rs.code,
                              grant_type: 'authorization_code'
                            }
                          }).then((info) => {
                              const { openid, session_key } = info.data || {};
                              session.setItem('openid', openid);
                              // session.setItem('session_key', session_key);

                              const { data } = res.data || {};
                              session.setItem('uname', data.uname);
                              session.setItem('token', data.token);
                              Taro.switchTab({ url: '/pages/home/index' });

                          })
                      }else {
                          Taro.showToast({
                            title: '登录失败！' + rs.errMsg,
                            icon: 'none'
                          })
                      }
                  }
                })
            }
        }catch(err) {
            console.log(err);
        }
    }

    // 忘记密码 - 信息验证 - 下一步
    forgetPwdData = async ( values ) => {
        const res = await service.forgetPwdData(values);
        try{
            if( res.data.code === 200 ){
                const { data={} } = res.data || {};
                if(data) {
                  this.setUpwdObj(data);
                }
            }
            return res.data.code;
        }catch(err) {
            console.log(err);
        }
    }

    // 提交新密码
    newPwdData = async ( values = {} ) => {
        const res = await service.newPwdData({
            ...values,
            isForgetPwd: true,
            ...this.upwdObj
        });
        try{
            if( res.data.code === 200 ){
                res.data.data && Taro.setStorage({
                  key: 'uname',
                  data: res.data.data
                });
            }
            return res.data.code;
        }catch(err) {
            console.log(err);
        }
    }

    // 清除mobx数据
    clearMobxData = () => {
        this.setUpwdObj();
    }
}

export default new State();
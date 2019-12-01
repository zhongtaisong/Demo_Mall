import { action, observable } from 'mobx';
// 接口服务
import service from './service';
// 全局数据
import $state from '@store';
// 全局设置
import { searchAreaState } from '@config';

class State {

    @observable history = {};
    @action setHistory = (data = {}) => {
        this.history = data;
    }

    // 发起账号认证
    oauthData = async () => {
        const res = await service.oauthData();
        try{
            if( res.data.code === 200 ){
                const { data } = res.data || {};
                data.uname && $state.setUname( data.uname );
                data.token && $state.setToken( data.token );
            }
            $state.setOauthCode( res.data.code );
            searchAreaState.setIsShowResultPage();
            searchAreaState.setIsShowSearchInput();
        }catch(err) {
            console.log(err);
        }
    }
}

export default new State();
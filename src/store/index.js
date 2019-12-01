import { action, observable } from 'mobx';

class State {

    // 用户名
    @observable uname = '';
    @action setUname = (data = '') => {
        this.uname = data;
    }

    // 认证code
    @observable oauthCode = null;
    @action setOauthCode = (data = null) => {
        this.oauthCode = data;
    }

    // token
    @observable token = null;
    @action setToken = (data = null) => {
        this.token = data;
    }

    // 是否显示loading
    @observable isLoading = false;
    @action setIsLoading = (data = false) => {
        this.isLoading = data;
    }

}

export default new State();
import service from './service';
import { message } from 'antd';

class State {
    // 更新用户信息 - 发起请求
    updateUserInfoData = async (values = {}) => {
        const res = await service.updateUserInfoData(values);
        try{
            if( res.data.code === 200 ){
                message.success('提交成功!')
            }
        }catch(err) {
            console.log(err);
        }
    }
}

export default new State();
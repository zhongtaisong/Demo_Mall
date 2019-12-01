import { observable, action } from 'mobx';
// 接口服务
import service from './service';
// 全局设置
import { headPhotoState } from '@config';

class State {

    // 评价列表
    @observable commentList = [];
    @action setCommentList = (data = []) => {
        this.commentList = data;
    }

    // 商品评价 - 发起请求
    selcommentsData = async (lid) => {
        const res = await service.selcommentsData({
            lid
        });
        try{
            if( res.data.code === 200 ){
                headPhotoState.selHeadPicData();
                res.data.data && this.setCommentList( res.data.data );
            }
        }catch(err) {
            console.log(err);
        }
    }
}

export default new State();
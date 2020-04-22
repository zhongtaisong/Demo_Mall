import { observable, action } from 'mobx';
// 全局设置
import { footerCopyrightState } from '@config';
// 接口服务
import service from './service';

class State {

    // 基本信息
    @observable basicInfo = {};
    @action setBasicInfo = (data = {}) => {
        this.basicInfo = data;
    }

    // 商品属性
    @observable params = {};
    @action setParams = (data = {}) => {
        this.params = data;
    }

    // 商品图片
    @observable imgList = [];
    @action setImgList = (data = []) => {
        this.imgList = data;
    }

    // 商品规格
    @observable specs = [];
    @action setSpecs = (data = []) => {
        this.specs = data;
    }

    // 商品详情图片
    @observable detailsPic = [];
    @action setDetailsPic = (data = []) => {
        this.detailsPic = data;
    }

    // 查询商品详情
    selectProductsDetailData = async (params = {}) => {
        const res = await service.selectProductsDetailData(params);
        try{
            if( res.data.code === 200 ){
                const { basicInfo, imgList, params: ps, specs, detailsPic } = res.data.data || {};
                basicInfo && this.setBasicInfo(basicInfo);
                ps && this.setParams(ps);
                imgList && this.setImgList(imgList);
                specs && this.setSpecs(specs);
                detailsPic && this.setDetailsPic(detailsPic);
            }
            return res.data.code;
        }catch(err) {
            console.log(err);
        }
    }

    // 加入购物车 - 发起请求
    addcartData = async (list = []) => {
        const res = await service.addcartData({ 
            uname: sessionStorage.getItem('uname'), 
            list
        });
        try{
            if( res.data.code === 200 ){
                window.Toast('success', res.data.msg);
                footerCopyrightState.productNumData();
            }
        }catch(err) {
            console.log(err);
        }
    }

    // 卸载mobx数据
    clearMobxData = () => {
      this.setBasicInfo();
      this.setParams();
      this.setImgList();
      this.setSpecs();
      this.setDetailsPic();
    }

}

export default new State();
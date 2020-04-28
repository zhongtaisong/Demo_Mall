import { observable, action } from 'mobx';
// 全局公共方法
import { session } from '@utils';
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
            uname: session.getItem('uname'), 
            list
        });
        try{
            if( res.data.code === 200 ){
                this.productNumData();
            }
        }catch(err) {
            console.log(err);
        }
    }

    // 商品数量
    @observable productNum = 0;
    @action setProductNum = (data = 0) => {
        this.productNum = data;
    }

    // 获取购物车列表数据 - 发起请求
    productNumData = async () => {
        const res = await service.productNumData({ 
          uname: session.getItem('uname') 
        });
        try{
            if( res.data.code === 200 ){
                this.setProductNum( res.data.data );
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
      this.setProductNum();
    }

}

export default new State();
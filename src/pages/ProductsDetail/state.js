import service from './service';
import { observable, action } from 'mobx';

class State {

    // 产品lid
    @observable lid = null
    @action setLid = (data = null) => {
        this.lid = data;
    }

    // 产品展示图片
    @observable pics = [];
    @action setPics = (data = []) => {
        this.pics = data;
    }

    // 当前产品信息
    @observable product = [];
    @action setProduct = (data = []) => {
        this.product = data;
    }

    // 规格
    @observable specs = [];
    @action setSpecs = (data = []) => {
        this.specs = data;
    }

    // 当前产品规格
    @observable oneSpecs = [];
    @action setOneSpecs = (data = []) => {
        this.oneSpecs = data;
    }

    // 查询商品规格
    specificationData = async () => {
        const res = await service.specificationData({
            lid: this.lid
        });
        try{
            if( res.data.code === 200 ){
                let { pics, product, specs } = res.data.data;
                this.setPics( pics );
                this.setProduct( product );
                this.setSpecs( specs );
                let oneSpecs = specs.filter(item => this.lid == item.lid);
                this.setOneSpecs( oneSpecs );
            }
        }catch(err) {
            console.log(err);
        }
    }
}

export default new State();
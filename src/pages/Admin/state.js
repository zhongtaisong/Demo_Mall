import { observable, action } from 'mobx';
// 接口服务
import service from './service';

class State {

    // 标题
    @observable title = '添加';
    @action setTitle = (data = '添加') => {
        this.title = data;
    }

    // 添加操作 - click
    @observable buttonClick = null;
    @action setButtonClick = (data = null) => {
        this.buttonClick = data;
    }

    // 查字典表
    selectDicData = async () => {
        const res = await service.selectDicData();
        try{
            if( res.data.code === 200 ){
                let { data } = res.data || {};
                if( data ){
                    data['GENDER'] = {
                        0: '男',
                        1: '女',
                        2: '保密'
                    };
                    sessionStorage.setItem('tableDic', JSON.stringify(data));
                    
                    let newData = data;
                    for(let k in newData){
                        let arr = [];
                        for(let [key, value] of Object.entries(newData[k])){
                            arr.push({
                                code: key,
                                name: value
                            });
                        }
                        newData[k] = arr;
                    }
                    sessionStorage.setItem('selectDic', JSON.stringify(newData));
                }
            }
        }catch(err) {
            console.log(err);
        }
    }
}

export default new State();
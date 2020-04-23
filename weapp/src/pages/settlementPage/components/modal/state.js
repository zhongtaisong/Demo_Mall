import { observable, action } from 'mobx';
// 全局公共方法
import { session } from '@utils';
// 接口服务
import service from './service';

class State {

  // 收货地址 - 表格 - 数据
  @observable dataSource = [];
  @action setDataSource = (data = []) => {
      this.dataSource = data;
  }

  // 查询收货地址
  selAddressData = async () => {
      const res = await service.selAddressData({
          uname: session.getItem('uname')
      });
      try{
          if( res.data.code === 200 ){
              res.data.data && this.setDataSource(res.data.data);
          }
      }catch(err) {
          console.log(err);
      }
  }

}

export default new State();
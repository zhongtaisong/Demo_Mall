import axios from '@axios';
// 查询收货地址
const selAddressUrl = 'address/select';

class Service {

  selAddressData = (req = {}) => {
      return new Promise((resolve, reject) => {
          axios.get(selAddressUrl, {
              params: req
          }).then(res => {
              resolve(res);
          }).catch(err => {
              console.log(err);
          });
      });
  }
  
}

export default new Service();
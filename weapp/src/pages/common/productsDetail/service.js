import axios from '@axios';
// 商品规格 - 查询
const selectProductsDetailUrl = 'details/select';
// 加入购物车
const addcartUrl = 'cart/add';
// 购物车商品数量
const productNumUrl = 'cart/select/num';

class Service {

  selectProductsDetailData = (req = {}) => {
      return new Promise((resolve, reject) => {
          axios.get(selectProductsDetailUrl, {
              params: req
          }).then(res => {
              resolve(res);
          }).catch(err => {
              reject(err);
          });
      });
  }

  addcartData = (req = {}) => {
      return new Promise((resolve, reject) => {
          axios.post(addcartUrl, req).then(res => {
              resolve(res);
          }).catch(err => {
              reject(err);
          });
      });
  }

  productNumData = (req = {}) => {
      return new Promise((resolve, reject) => {
          axios.get(productNumUrl, {
              params: req
          }).then(res => {
              resolve(res);
          }).catch(err => {
              reject(err);
          });
      });
  }

}

export default new Service();
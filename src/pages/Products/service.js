import axios from '@axios';
// 查询全部商品
const productsUrl = `products/product`;

class Service {
    productsData = (req = {}) => {
        return new Promise((resolve, reject) => {
            axios.get(productsUrl, {
                params: req
            }).then(res => {
                resolve(res);
            }).catch(err => {
                console.log(err);
            });
        })
    }
}

export default new Service();
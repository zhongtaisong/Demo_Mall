import axios from '@axios';
// 查询列表
const selectProductsImgUrl = 'pImg/select';
// 添加
const addProductsImgUrl = 'pImg/add';
// 删除
const deleteProductsImgUrl = 'pImg/delete';
// 修改
const updateProductsImgUrl = 'pImg/update';

class Service {
    selectProductsImgData = (req = {}) => {
        return new Promise((resolve, reject) => {
            axios.get(selectProductsImgUrl, {
                params: req
            }).then(res => {
                resolve(res);
            }).catch(err => {
                console.log(err);
            });
        });
    }

    addProductsImgData = (req = {}) => {
        return new Promise((resolve, reject) => {
            axios.post(addProductsImgUrl, req).then(res => {
                resolve(res);
            }).catch(err => {
                console.log(err);
            });
        });
    }

    deleteProductsImgData = (req = {}) => {
        return new Promise((resolve, reject) => {
            axios.get(deleteProductsImgUrl, {
                params: req
            }).then(res => {
                resolve(res);
            }).catch(err => {
                console.log(err);
            });
        });
    }

    updateProductsImgData = (req = {}) => {
        return new Promise((resolve, reject) => {
            axios.post(updateProductsImgUrl, req).then(res => {
                resolve(res);
            }).catch(err => {
                console.log(err);
            });
        });
    }
}

export default new Service();
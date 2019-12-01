import { observable, action } from 'mobx';
// 接口服务
import service from './service';
// 全局设置
import { PUBLIC_URL } from '@config';

class State {

    // 头像
    @observable avatar = null;
    @action setAvatar = (data = null) => {
        this.avatar = data;
    }

    // loading
    @observable loading = false;
    @action setLoading = (data = false) => {
        this.loading = data;
    }

    // 图片转为base64
    getBase64Image = (img) => {
        let canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        let ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, img.width, img.height);
        let ext = img.src.substring(img.src.lastIndexOf(".")+1).toLowerCase();
        let dataURL = canvas.toDataURL("image/"+ext);
        return dataURL; 
    }

    // 处理头像图片
    imgFormData = (src) => {
        let image = new Image();
        image.crossOrigin = 'Anonymous';
        image.src = src;
        image.onload = () => { 
            let base64 = this.getBase64Image(image); 
            this.setAvatar( base64 ); 
        };
    }

    // 查询头像
    selHeadPicData = async () => {
        const res = await service.selHeadPicData({
            uname: sessionStorage.getItem('uname')
        });
        try{
            if( res.data.code === 200 ){
                const { data } = res.data || {};
                data && this.imgFormData( PUBLIC_URL + data );
            }
        }catch(err) {
            console.log(err);
        }
    }
}

export default new State();
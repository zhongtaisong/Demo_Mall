import React from 'react';
import { Upload, Icon, message } from 'antd';
import { observer } from 'mobx-react';
// 全局设置
import { PUBLIC_URL } from '@config';
// 数据
import state from './state';

@observer
class HeadPhoto extends React.Component {

    componentDidMount() {
        state.selHeadPicData();
    }

    // 转为base64
    getBase64 = (img, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }
    
    // 上传前
    beforeUpload = (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('你只才能上传JPG/PNG格式图片!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('图片大小小于2MB!');
        }
        return isJpgOrPng && isLt2M;
    }

    // 上传完毕
    handleChange = (info) => {
        if ( info.file.status === 'uploading' ) {
            state.setLoading( true );
            return;
        }else if ( info.file.status === 'done' ) {
            // Get this url from response in real world.
            this.getBase64(info.file.originFileObj, imageUrl => {
                    state.setLoading( false );
                    state.selHeadPicData();
                }
            );
        }
    };

    render() {
        const { avatar, loading } = state;
        const uploadButton = (
            <div>
                <Icon type={ loading ? 'loading' : 'plus' } />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        console.log()
        return (
            <div className='HeadPhoto'>
               <Upload
                    name="avatar"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={ false }
                    action={`${ PUBLIC_URL }upload/addHeadPic`}
                    data={{
                        uname: sessionStorage.getItem('uname')
                    }}
                    beforeUpload={ this.beforeUpload }
                    onChange={ this.handleChange }
                >
                    {
                        avatar ? <img src={ avatar } alt="avatar" style={{ width: '100%' }} /> : uploadButton
                    }
                </Upload>
            </div>
        );
    }
}

export default HeadPhoto;
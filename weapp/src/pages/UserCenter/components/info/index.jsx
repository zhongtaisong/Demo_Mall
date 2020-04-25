import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { observer } from '@tarojs/mobx'
import { toJS } from 'mobx';
// 全局公共组件
import { NavBar, AtForm } from '@com';
// 全局公共方法
import { session } from '@utils';
// 数据
import state from './state';
// less样式
import './index.less';

// 个人资料
@observer
class Index extends Taro.Component {

    componentDidMount() {
        state.selectUserInfoData();
    }

    // 提交
    handleSubmit = async () => {
        // let { avatar, delList, updateUserInfoData, form } = state;
        // avatar = toJS(avatar);
        // let formData = new FormData();
        // let userInfo = {};
        
        // await new Promise((resolve, reject) => {
        //     form.validateFields(['phone', 'gender', 'birthday', 'nickName'], (err, values) => {
        //         if (!err) {
        //             values['birthday'] = moment(values['birthday']).format('YYYY-MM-DD');
        //             values['gender'] = !isNaN(Number(values.gender.toString())) ? Number(values.gender.toString()) : 2;
        //             userInfo = {...values};
        //             resolve();
        //         }else{
        //             let errTip = [];
        //             for(let [key, value] of Object.entries(err)) {
        //                 const { errors } = value || {};
        //                 if(errors) {
        //                     const { message } = (errors && errors[0]) || {};
        //                     errTip.push(message);
        //                 }
        //             }
        //             state.setErrTip(errTip);
        //         }
        //     });
        // });

        // await new Promise((resolve, reject) => {
        //     if( !avatar.length ){
        //         state.setErrTip(['上传头像，必传项！']);
        //     }else{
        //         state.setErrTip();
        //         avatar.forEach((item, index) => {
        //             if( item.file ){
        //                 formData.append('avatar', item.file);
        //             }else if( item.url ){
        //                 let url = item.url.slice(item.url.indexOf('api/') + 4);
        //                 formData.append('avatar', url);
        //             }
        //         });
        //         resolve();
        //     }
        // });

        // // 表单
        // formData.append('userInfo', JSON.stringify(userInfo));
        // // // 存储被删图片
        // formData.append('delList', JSON.stringify(delList));
        // formData.append('uname', session.getItem('uname'));
        // updateUserInfoData(formData);
    }

    // 上传图片
    onFilesChange = (files, type, index) => {
        // let { avatar, setDelList } = state;
        // avatar = toJS(avatar);
        // switch(type) {
        //     case 'add':
        //         state.setAvatar(files);
        //         break;
        //     case 'remove':
        //         if( avatar && avatar.length && avatar[0] && avatar[0].url && avatar[0].url.includes('api/') ){
        //             let url = avatar[0].url.slice(avatar[0].url.indexOf('api/') + 4);;
        //             setDelList([url]);
        //         }
        //         state.setAvatar();
        //         break;            
        // }
    }

    render() {
        const { setForm, personalInformation, setPersonalInformation, errTip, avatar } = state;
        return (
            <View className='dm_PersonalInformation'>
                <NavBar {...this.props} title='个人资料' leftIconType='chevron-left'
                  onClickLeftIcon={() => Taro.navigateBack()}
                />
                <View style={{
                    padding:`${Taro.topHeight}px 10Px 0`
                  }}
                >
                  <AtForm 
                    {...this.props}
                    atInputArr={[
                      { code: 'uname', name: '用户名', title: '用户名', required: false, type: 'text', placeholder: '-', editable: false },
                      { code: 'nickName', name: '昵称', title: '昵称', required: true, type: 'text', placeholder: '请输入', clear: true },
                      { code: 'phone', name: '手机号码', title: '手机号码', required: true, type: 'phone', placeholder: '请输入', clear: true },
                      { that: 'picker', mode: 'selector', range: ['男', '女', '保密'], label: '性别' },
                      { that: 'picker', mode: 'date', label: '生日' }
                    ]}
                    // btnArr={[
                    //   { text: '登录', type: 'primary', onClick: onLoginSubmit }
                    // ]}
                    // otherBtnArr={[
                    //   { text: '忘记密码？', onClick: () => {
                    //     onHandleTarget('forget')
                    //   } },
                    //   { text: '新用户注册', onClick: () => {
                    //     Taro.navigateTo({
                    //       url: '/pages/register/index'
                    //     })
                    //   } },
                    // ]}
                  />
                </View>
            </View>
        );
    }
}

export default Index;
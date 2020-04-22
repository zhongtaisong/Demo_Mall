import Taro from '@tarojs/taro'
// 设置
import { PUBLIC_URL } from '@config';

const interceptor = function (chain) {
    const requestParams = chain.requestParams
    const { method, data, url } = requestParams
    // console.log('1111111111111111http', method, data, url)
    Taro.showLoading({ title: '加载中' })
    return chain.proceed(requestParams)
      .then(res => {
        // console.log('22222222222http', res)
        Taro.hideLoading()
        try{
          const { code, msg } = res.data || {};
          switch(code) {
            case 200:
              msg && Taro.showToast({
                title: msg,
                icon: 'success',
                mask: true
              })
              break;
            default:
              msg && Taro.showToast({
                title: msg,
                icon: 'none'
              })
          }
        }catch(err) {
          console.log(err);
        }
        return res
      })
}
Taro.addInterceptor(interceptor)
// Taro.addInterceptor(Taro.interceptors.logInterceptor)
// Taro.addInterceptor(Taro.interceptors.timeoutInterceptor)

const $axios = {
    get(url='', data={}, header) {
        return new Promise((resolve, reject) => {
            Taro.request({
                url: `${PUBLIC_URL}${url}`,
                data: data.params,
                header: header || {
                  'content-type': 'application/json' // 默认值
                },
                method: 'GET',
                success(res) {
                    resolve(res);
                },
                fail(res) {
                    reject(res);
                }
            })
        })
    },
    post(url='', data={}, header) {
        return new Promise((resolve, reject) => {
            Taro.request({
                url: `${PUBLIC_URL}${url}`,
                data,
                header: header || {
                  'content-type': 'application/json' // 默认值
                },
                method: 'POST',
                success(res) {
                    resolve(res);
                },
                fail(res) {
                    reject(res);
                }
            })
        })
    }
}

export default $axios;
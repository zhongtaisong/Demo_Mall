import Taro from '@tarojs/taro'

class Index {

    setItem = (key, data) => {
      Taro.setStorage({ key, data })
    }

    getItem = (key) => {
      return Taro.getStorageSync(key);
    }

}

export default new Index();
import Taro from '@tarojs/taro'
import { observer } from '@tarojs/mobx'
import { View, Text, Picker } from '@tarojs/components'
import { AtForm, AtButton } from 'taro-ui';
// 全局公共组件
import { AtInput } from '@com';

@observer
class Index extends Taro.Component {

    constructor(props) {
      super(props)
      this.state = {
        inputObj: {},
        errTip: '',
        selectorChecked: ''
      }
    }

    componentDidMount() {
      const { atInputArr=[] } = this.props;
      let { inputObj } = this.state;
      atInputArr.map(item => {
        if(item.initValue) {
          inputObj[item.code] = item.initValue;
        }else{
          inputObj[item.code] = null;
        }
      })
      this.setState({ inputObj })
    }

    static options = {
      addGlobalClass: true
    }

    handleChange = (id, value) => {
      let { inputObj } = this.state;
      inputObj[id] = value.replace(/\s/g, '');
      this.setState({ inputObj })
      return value.replace(/\s/g, '');
    }

    // 操作按钮
    handleBtn = (func, e) => {
      let { inputObj } = this.state;
      const { atInputArr } = this.props;
      let err = [];
      if( Object.keys(inputObj).length ) {
        for(let i in inputObj) {
          atInputArr.map(item => {
            if(!inputObj[i] && i == item.code && item.required && item.name ) {
              err.push(item.name);
            }
          })
        }
      }else{
        atInputArr.map(item => {
          if(item.required && item.name) {
            err.push(item.name);
          }
        })
      }
      this.setState({ 
        errTip: err.length ? err.join('、')+'必填' : ''
      })
      if(typeof func === 'function' && !err.length ) {
        func(e, this.state.inputObj)
      }
    }

    onChange = (e) => {
      console.log('99999999999', e);
      this.setState({
        selectorChecked: e.detail.value
      })
    }

    render() {
        const { atInputArr=[], btnArr=[], otherErrTip, otherBtnArr=[] } = this.props;
        let { inputObj, errTip, selectorChecked } = this.state;
        return (
            <AtForm className='dm_AtForm'>
              {
                atInputArr.map((item, index) => {
                  if(item.that == 'picker') {
                    return (
                      <Picker key={index} mode={item.mode} range={item.range || []} onChange={this.onChange}>
                        <View className='picker'>
                          {item.label}{item.mode == 'selector' ? item.range[selectorChecked] || '保密' : item.mode == 'date' ? selectorChecked || '2020-04-25' : ''}
                        </View>
                      </Picker>
                    );
                  }
                  return (
                    <AtInput key={index}
                      title={item.title}
                      clear={item.clear}
                      name={item.code}
                      type={item.type}
                      placeholder={item.placeholder}
                      value={inputObj[item.code]}
                      onChange={this.handleChange.bind(this, item.code)}
                    />
                  );
                })
              }
              <View className='err_tip'>{errTip || otherErrTip}</View>
              <View className='handle_btn'>
                {
                  btnArr.map((item, index) => {
                    return (
                      <AtButton key={index} type={item.type} onClick={this.handleBtn.bind(this, item.onClick)}>{item.text}</AtButton>
                    );
                  })
                }
              </View>
              <View className='other_handle' style={otherBtnArr.length <= 1 ? { justifyContent: 'center' } : { justifyContent: 'space-between' }}>
                {
                  otherBtnArr.map((item, index) => {
                    return (
                      <Text key={index} onClick={item.onClick}>{item.text}</Text>
                    );
                  })
                }
              </View>
            </AtForm>
        );
    }
}

export default Index;
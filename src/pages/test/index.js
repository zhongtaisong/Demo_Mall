import React from 'react';
import { Button } from 'antd';

const zhong = (target, name, descriptor) => {
    target.prototype.isShow = false;
    target.prototype.toggle = () => {
        target.prototype.isShow = true;
        console.log(target.prototype.isShow);
    };
    target.prototype.html = (
        <h1>1111111111111111</h1>
    );
};

@zhong
class Test extends React.Component {
    render() {
        return (
            <div>
                <Button
                    onClick={ this.toggle }
                >点我</Button>
                {
                    this.isShow ? this.html : ''
                }
            </div>
        );
    }
}

export default Test;
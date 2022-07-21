import React, { Component } from "react";
import { is, fromJS } from "immutable"
import "./dialog.css"
const defaultState = {
    dialogState: false,
    dialogTip: null,
    dialogTitle: "自定义全局弹窗",
    colseDialog: () => { }
}
class MyDialog extends Component {
    constructor(props) {
        super(props)
        console.log(this)
        this.state = {
            ...defaultState
        }
    }
    //css动画组件设置为目标组件
    FirstChild = props => {
        const childrenArray = React.Children.toArray(props.Children);
        return childrenArray[0] || null
    }
    //关闭弹窗
    confirm = () => {
        const that = this;
        console.log(that);
        this.setState({ dialogState: false }, () => {
            that.state.colseDialog();
        })
    }

    open = data => {
        const option = data || {};
        option.dialogState = true;
        this.setState({
            ...defaultState,
            ...option
        })
    }

    close = () => {
        const that = this;
        that.state.colseDialog();
        this.setState({
            ...defaultState
        })
    }

    shouldComponentUpdate = (nextProps, nextState) => {
        return (
            !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state), fromJS(nextState))
        )
    }
    
    render() {
        const { dialogState, dialogTip, dialogTitle } = this.state;
        return (
            <div className="dialog" style={dialogState ? { display: 'block' } : { display: 'none' }}>
                <div className="dialog-body">
                    <div className="dialog-head">
                        <div>{dialogTitle}</div>
                        <div>{dialogTip}</div>
                        <span className="dialog-colse" onClick={() => {
                            this.confirm();
                        }}>x</span>
                    </div>
                    <div className="dialog-context">
                        {this.props.children}
                    </div>
                </div>
            </div>
        )
    }
}
export default MyDialog;
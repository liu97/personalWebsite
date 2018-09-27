import './index.less';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, NavLink, withRouter } from 'react-router-dom';
import { Spin, message, Tabs } from 'antd';
const TabPane = Tabs.TabPane;
import TableList from './TableList'
@connect(
	(state, props) => ({
		getMessageResult: state.getMessageResult
	})
)
class ArticleAdd extends Component{
	constructor(props){
		super(props);
		this.state={
			activeKey: "not"
		};
	}
	componentDidMount(){
	}
	componentWillReceiveProps(newProps){
		let { getMessageResult } = newProps;
		const props = this.props;
		if(getMessageResult !== this.props.getMessageResult && getMessageResult && getMessageResult.isLoading === false){
			
		}
	}
	// 设置markdown内容
	setMessage = () =>{
		// this.props.dispatch(fetchMessageList())
	}
	changeTabs = (key) => {
		this.setState({
			activeKey: key
		})
	}
	render(){
		return (
			<div className={'message-list'}>
				<Tabs defaultActiveKey="not" onChange={this.changeTabs}>
					<TabPane tab="未查看消息" key="not">
						{ this.state.activeKey == "not" ? <TableList type="not"></TableList> : null }
					</TabPane>
					<TabPane tab="全部消息" key="all">
						{ this.state.activeKey == "all" ? <TableList type="all"></TableList> : null }
					</TabPane>
					<TabPane tab="已查看消息" key="visited">
						{ this.state.activeKey == "visited" ? <TableList type="visited"></TableList> : null }
					</TabPane>
				</Tabs>
			</div>
		)
	}
}

export default withRouter(ArticleAdd)
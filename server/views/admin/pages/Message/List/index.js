import './index.less';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, NavLink, withRouter } from 'react-router-dom';
import { Spin, message } from 'antd';

import { fetchMessageList } from 'actions/message/';
import { getGivenSearch } from 'utils/location';
import { getProxyURL } from 'utils/config';
@connect(
	(state, props) => ({
		getMessageResult: state.getMessageResult
	})
)
class ArticleAdd extends Component{
	constructor(props){
		super(props);
	}
	componentDidMount(){
		this.setMessage();
	}
	componentWillReceiveProps(newProps){
		let { getMessageResult } = newProps;
		const props = this.props;
		if(getMessageResult !== this.props.getMessageResult && getMessageResult && getMessageResult.isLoading === false){
			
		}
	}
	// 设置markdown内容
	setMessage = () =>{
		this.props.dispatch(fetchMessageList())
	}

	render(){
		return (
			<div className={'add'}>
				
			</div>
		)
	}
}

export default withRouter(ArticleAdd)
import './index.less';
import React, { Component } from 'react';
import LoginForm from './LoginForm';
import { connect } from 'react-redux';
import { PostLoginMessage, Login } from 'actions/login';
import { message } from 'antd';

@connect(
	(state, props) => ({
		postLoginResult: state.postLoginResult
	})
)
class Home extends Component{
	componentWillMount(){
		const authed = window.sessionStorage.getItem("isLogin") == "true";
		if(authed){
			this.props.history.push('/admin');
		}
	}
	componentWillReceiveProps(newProps){
		let { postLoginResult } = newProps;
		const props = this.props;
		if(postLoginResult !== props.postLoginResult && postLoginResult && postLoginResult.isLoading === false){
			if(postLoginResult.code == 1){
				window.sessionStorage.setItem("isLogin", true);
				window.localStorage.setItem("access_token", postLoginResult.token);
				const bcakURL = props.location.state ? props.location.state.from.pathname : '/admin';
				props.history.push(bcakURL);
			}
			else{
				message.error(postLoginResult.message);
			}
		}
	}
	handleSubmit = (values) => {
		console.log('Received values of form: ', values);
		this.props.dispatch(PostLoginMessage(values));
	}
	render(){
		return (
			<div className={'login'}>
				<div className={'login-cover'}></div>
				<div className={'login-main'}>
					<div className={'main-header'}>博客管理系统</div>
					<LoginForm handleSubmit={this.handleSubmit}></LoginForm>
				</div>
			</div>
		)
	}
}

export default Home;
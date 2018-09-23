import 'whatwg-fetch';
import { createAction, handleActions } from 'redux-actions';
import { isObject, obj2String } from '../util/object';
import config from '../util/config'

const checkStatus = (response) => {
	if(response.status===401){
		window.location.replace(SSO_LOGIN)
	}
	if (response.status >= 200 && response.status < 300) {
		return response
	}
	const error = new Error(response.statusText)
	error.response = response
	throw error
}

const send = (url, options, cb, method = 'post') => {
	const searchStr = obj2String(options);
	let initObj = {}
	if (method == 'get') { // 如果是GET请求，拼接url
		url += '?' + searchStr
		initObj = {
		  	method: method,
		  	credentials: 'include'
		}
	} 
	else {
		initObj = {
		  	method,
		  	credentials: 'include',
		  	headers: new Headers({
		    	'Accept': 'application/json',
		    	// 'Authorization': 'sadsasdasdasd',
		    	'Content-Type': 'application/json',
		  	}),
		  	body: window.JSON.stringify(options),
		}
	}
	fetch(url, initObj)
	.then(checkStatus)
	.then((response) => {
		return response.json();
	})
	.then((response) => {
		return cb ? cb(response) : response
	})
	.catch(function(e) {
	  	console.error(e);
	});
}


const requestPosts = (postTitle) => createAction(postTitle+"Request");	
const receivePosts = (postTitle) => createAction(postTitle+"Receive");

export const createSimpleAjaxAction = (url, postTitle, hadInitial) => {
	return (postMessage) =>{
		if(!isObject(postMessage)){
			 postMessage = {};
		}
		if(hadInitial){
			postMessage = {...postMessage, ...config};
		}
		return (dispatch, getState) => {
			dispatch(requestPosts(postTitle)());
			send( url, postMessage, json => dispatch(receivePosts(postTitle)(json)) );
		}
	}
};

export const createSimpleAjaxReduce = (postTitle) => {
	return handleActions(
	{
		[postTitle+'Request']: (state, action) => ({
			info: {},
			...state,
		  	isLoading: true,
		  	status: 'posting',
		}),
		[postTitle+'Receive']: (state, action) => ({
			isLoading: false,
			status: 'success',
			...action.payload
		})
	},
	{
		isLoading: true,
		status: 'not start',
		info: {}
	});
}

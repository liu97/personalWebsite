export const getProxyURL = () => {  // 代理路径
	return 'localhost:3000/'
}
export const authPath = '/login' // 未登录时跳转路由路径

export const requestFront = '/api'

const pagingConfig = {
	currentPage: 1,
	pageSize: 20
}
export default pagingConfig
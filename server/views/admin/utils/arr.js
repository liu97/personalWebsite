import _ from 'lodash'

var arrayToTree = require('array-to-tree');

export const getArr = (length, cb) => {


	if(!length||!cb){
		throw new Error('length and callback is required')
	}

	let arr = [];
	arr.length = length;
	arr.fill('')


	return arr.map( (item, index) => {
		return cb(index)
	})
}

export const item2Obj = (arr) => {
	return arr.map((item, index)=>{
		return {
			key: index,
			title: item
		}
	})
}

export const addKeyTitle = (arr, keyName, titleName) => {
	// eslint-disable-next-line no-unused-vars
	arr.forEach((item, index)=>{
		item.key = item[keyName]
		item.title = item[titleName]
	})
}

export const arr2map = (arr, key) => {
	var obj = {}
	arr.forEach((item, index)=>{
		let objKey = key === undefined ? index : item[key];
		obj[ objKey  ] = item;
	})

	return obj;
}

export const arr2tree = (arr, rules) => {
	let newArr = arr.map((item)=>{
		const parent_id_key = rules && rules.parent_id ? rules.parent_id : 'parentId'
		let parentId = `${item[parent_id_key]}` === '-1' ? undefined : item[parent_id_key];

		let obj;
		if(!rules){
			obj = {
				id: item.id,
				key: item.id,
				value: item.id,
				parent_id: parentId,
				type: item.type,
				label: item.name
			}
		}else{
			obj = {};

			Object.keys(rules).forEach((key)=>{
				let itemKey = rules[key];
				obj[key] = item[itemKey]
			})
			obj.parent_id = parentId;
		}
		return obj

	})
	return arrayToTree(newArr);
}

export const getMaximin = (arr,maximin) => {
	if (maximin == 'max') {
		return Math.max.apply(Math, arr);
	} else if (maximin == 'min') {
		return Math.min.apply(Math, arr);
	}
}

export const notArray = (value) => {
	return !value||!value.length
}

export const findParentId = (value, arr, targetArr) => {
	arr.forEach(item => {
		if ((item.id == value) && item.parentId !== -1) {
			targetArr.push(item.parentId);
			let targetId = item.parentId;
			findParentId(targetId, arr, targetArr);
		}
	});

	return targetArr;
}

export const arrAddIdByKey = (arr) => {
	arr.forEach(item=>{
		if(item&&item.key){
			item.id = item.key
		}
	})
}

export const getValueByKey = (key, list)=>{
	let value = '';
	list.forEach((item)=>{
		if(item.key === key){
			value = item.value
		}
	})
	return +value
}

export const getKeyByValue = (val, list)=>{
	let key = '';
	list.forEach((item)=>{
		if(item.value === val){
			key = item.key
		}
	})
	return key
}

/**
 * 判断两个数组的每个值是否在两边都有，即不考虑数据项index时两个数组的内容是否相等，如果是则返回true，否则返回false
 * 例1：list1 = [1, 2，3], list2 = [3，1, 2]，则compareItems(list1, list2)返回true
 * 例2：
 *    list1 = [{id: 1, name: 'xxx'}, {id: 2, name: 'yyy'}],
 *    list2 = [{id: 1, name: 'yya'}, {id: 2, name: 'yyb'}],
 *    可得到结果 compareItems(list1, list2) 为false； compareItems(list1, list2, item => item.id) 为true
 * @param list1 数组1
 * @param list2 数组2
 * @param compareBy 对数组每项根据compareBy方法返回的值进行排序和等于的判断，不传该值则直接比较数组项
 * @return {boolean}
 */
export const compareItems = (list1, list2, compareBy) => {
  if (list1.length !== list2.length) {
    return false
  }
  const sortedList1 = _.sortBy(list1, compareBy)
  const sortedList2 = _.sortBy(list2, compareBy)
  return sortedList1.every((item1, index) => {
    const item2 = sortedList2[index]
    if (compareBy) {
      return _.isEqual(compareBy(item1), compareBy(item2))
    }
    return _.isEqual(item1, item2)
  })
}

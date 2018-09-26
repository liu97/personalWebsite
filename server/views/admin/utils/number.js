/*
* @Usage: 
* @Description: 
* @Author: 刘炳礼
* @Email: bingliliu@sohu-inc.com
* @Date:   2017-04-17 13:07:24
*/


'use strict';

import {getArr} from './arr'

const NUMS_CHINA = ['一', '二', '三', '死', '', '', '', '', '', '']

export const rabicArr = (length=50, prefix='', postfix='') => {
	
	return getArr(length, (item)=>{
		return prefix + (item+1) + postfix;
	})
}

export const chinaArr = (length=50, prefix='', postfix='') => {
	return getArr(length, (item)=>{
		return prefix + toZhDigit(item+1) + postfix;
	})
}

export const fractionArr = (start=2, end=10, postfix='') => {
		
	let arr = [];

	getArr( end - start + 1, (item)=>{

		let denominator = item + start;

		getArr(denominator, (numerator)=>{
			arr.push( (numerator+1) + '/' + denominator + postfix )
		})

	})


	return arr;
}


/**
 * 阿拉伯数字转中文数字,
 * 如果传入数字时则最多处理到21位，超过21位js会自动将数字表示成科学计数法，导致精度丢失和处理出错
 * 传入数字字符串则没有限制
 * @param {number|string} digit
 */
function toZhDigit(digit) {
  digit = typeof digit === 'number' ? String(digit) : digit;
  var zh = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
  var unit = ['千', '百', '十', ''];
  var quot = ['万', '亿', '兆', '京', '垓', '秭', '穰', '沟', '涧', '正', '载', '极', '恒河沙', '阿僧祗', '那由他', '不可思议', '无量', '大数'];

  var breakLen = Math.ceil(digit.length / 4);
  var notBreakSegment = digit.length % 4 || 4;
  var segment = void 0;
  var zeroFlag = [],
      allZeroFlag = [];
  var result = '';

  while (breakLen > 0) {
    if (!result) {
      // 第一次执行
      segment = digit.slice(0, notBreakSegment);
      var segmentLen = segment.length;
      for (var i = 0; i < segmentLen; i++) {
        if (segment[i] != 0) {
          if (zeroFlag.length > 0) {
            result += '零' + zh[segment[i]] + unit[4 - segmentLen + i];
            // 判断是否需要加上 quot 单位
            if (i === segmentLen - 1 && breakLen > 1) {
              result += quot[breakLen - 2];
            }
            zeroFlag.length = 0;
          } else {
            result += zh[segment[i]] + unit[4 - segmentLen + i];
            if (i === segmentLen - 1 && breakLen > 1) {
              result += quot[breakLen - 2];
            }
          }
        } else {
          // 处理为 0 的情形
          if (segmentLen == 1) {
            result += zh[segment[i]];
            break;
          }
          zeroFlag.push(segment[i]);
          continue;
        }
      }
    } else {
      segment = digit.slice(notBreakSegment, notBreakSegment + 4);
      notBreakSegment += 4;

      for (var j = 0; j < segment.length; j++) {
        if (segment[j] != 0) {
          if (zeroFlag.length > 0) {
            // 第一次执行zeroFlag长度不为0，说明上一个分区最后有0待处理
            if (j === 0) {
              result += quot[breakLen - 1] + zh[segment[j]] + unit[j];
            } else {
              result += '零' + zh[segment[j]] + unit[j];
            }
            zeroFlag.length = 0;
          } else {
            result += zh[segment[j]] + unit[j];
          }
          // 判断是否需要加上 quot 单位
          if (j === segment.length - 1 && breakLen > 1) {
            result += quot[breakLen - 2];
          }
        } else {
          // 第一次执行如果zeroFlag长度不为0, 且上一划分不全为0
          if (j === 0 && zeroFlag.length > 0 && allZeroFlag.length === 0) {
            result += quot[breakLen - 1];
            zeroFlag.length = 0;
            zeroFlag.push(segment[j]);
          } else if (allZeroFlag.length > 0) {
            // 执行到最后
            if (breakLen == 1) {
              result += '';
            } else {
              zeroFlag.length = 0;
            }
          } else {
            zeroFlag.push(segment[j]);
          }

          if (j === segment.length - 1 && zeroFlag.length === 4 && breakLen !== 1) {
            // 如果执行到末尾
            if (breakLen === 1) {
              allZeroFlag.length = 0;
              zeroFlag.length = 0;
              result += quot[breakLen - 1];
            } else {
              allZeroFlag.push(segment[j]);
            }
          }
          continue;
        }
      }

      --breakLen;
    }

    return result;
  }
}

function multiple(...values) {
  const formatValues = values.map(v => {
    const tokens = `${v}`.split('.')
    const asInt = { value: parseInt(tokens.join(''), 10), exp: tokens[1] ? -tokens[1].length : 0 }
    return { value: v, str: `${v}`, asInt }
  })
  const resultAsInt = formatValues.reduce((multi, value) => multi * value.asInt.value, 1)
  const resultExp = formatValues.reduce((sum, value) => sum + value.asInt.exp, 0)
  const strResultAsInt = `${resultAsInt}`
  let strResult = ''
  if (resultExp >= 0) {
    strResult = strResultAsInt + new Array(resultExp + 1).join('0')
  } else {
    const offset = strResultAsInt.length + resultExp
    if (offset < 0) {
      strResult = `0.${new Array(-offset + 1).join('0')}${strResultAsInt}`
    } else {
      strResult = `${strResultAsInt.substr(0, offset)}.${strResultAsInt.substring(offset)}`
    }
  }
  return Number(strResult)
}

export const toPercent = value=>{
	return  value ? (parseFloat(value)*100).toFixed(2) + '%' : ''
}

export const toYuan = value=>{
  if(value){
    value = parseFloat(value)/100000;
    let strValue = value + '';
    if(strValue.indexOf('.')>-1){
      value = value.toFixed(2)
    }
  }
	return  value
}

export const toMilliFen = (value=0)=>{
  if(value){
    value = parseInt(multiple(value, 100000), 10) // parseFloat(value) * 100000
  }
  return  value
}

export const validateBasicBudgetPrice = (value) => (
  value && !isNaN(value) && Number.isInteger(+value) && value >= 50 && value <= 999999999
)

export const validateBasicDecimalPrice = (value) => (
  value && !isNaN(value) && parseFloat(value) > 0 && !(/\.\d{3,}/.test(value))
)

export default { rabicArr, chinaArr, fractionArr }

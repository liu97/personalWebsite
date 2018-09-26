'use strict';

import _ from 'lodash'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Button, Spin, Switch } from 'antd'
import moment from 'moment'
import SearchTable from 'components/SearchTable'
import { modifySuccess } from 'utils/tip'
import { addQuery, getQuery } from 'utils/str'
import { toPercent, toYuan } from 'utils/number'

export default class TableAdd extends Component {


    constructor(props) {
        super(props)

        this.state = {
        }



        this.currentPage = 1
        this.query = {}
        this.pageSize = 20


        this.addCustomCloumns();

    }

    componentWillReceiveProps(nextProps) {

        // 修改表格内容后刷新表格示例
        let batchChangeCampaignOpStatusResult = nextProps.batchChangeCampaignOpStatusResult;
        if (batchChangeCampaignOpStatusResult !== this.props.batchChangeCampaignOpStatusResult &&
                batchChangeCampaignOpStatusResult && batchChangeCampaignOpStatusResult.loading === false && !batchChangeCampaignOpStatusResult.hasError) {

            this.triggerSubmit()

        }


    }


    componentDidMount() {}

    // 处理内容需要特殊处理的列
    addCustomCloumns() {
    }


    triggerSubmit() {
        this._handleSubmit(this.query, this.currentPage, this.pageSize)
    }


    _handleSubmit=(query, currentPage, pageSize) => {

        this.currentPage = currentPage;
        this.query = query;
        this.pageSize = pageSize;

        this.filterParams && this.filterParams(this.query);

        this.props.dispatch(this.fetchList({
            ...query,
            start: (currentPage-1)*pageSize,
            pageSize: pageSize
        }))
    }

    _clear = () => { 
        
    }

    _handleAdd = () => {
        let actions = this.props.actions;
        actions.push(this.addPagePath)
    }

    cacheSearch=(formCache) => {
      //this.formCache = formCache;
        if(!this.formCache){
            this.formCache = {};
        }
        _.extend(this.formCache,formCache)
    }

    getValueQuery() {
      let query = this.query;
      let result = Object.keys(query).map(key => {
          let obj = {}
          obj[key] = {
              value: query[key]
          }
          return obj
      })
      _.extend(result, this.formCache)
      return result
    }

    render() {
        const {listResult} = this.props
        return (
            <Spin spinning={listResult.isLoading}>
                <SearchTable
                    onSubmit={this._handleSubmit}
                    search={this.getValueQuery()}
                    cacheSearch={this.cacheSearch}
                    columns={this.columnsConfig}
                    searchList={this.queryConfig}
                    tableData={listResult.info.list}
                    currentPage={this.currentPage}
                    totalCount={listResult.info.count}
                    clear={this._clear}
                    scroll={{
                     y: 500
                    }}
                    loading={false}
                    hasResetBtn={true}
                    hasDownloadBtn={false}
                />
            </Spin>
        )
    }
}

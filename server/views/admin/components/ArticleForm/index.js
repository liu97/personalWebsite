import './index.less';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Icon, Input, Button, Checkbox, Upload } from 'antd';

const FormItem = Form.Item;

@Form.create()
export default class ArticleForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }
  normFile = (e) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  }
  beforeUpload = (file) => {
    
  }
  changeUpload = (obj) => {
    if(obj.file.status == "done" && obj.fileList.length>1){
      obj.fileList.shift();
    }
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 14 },
    };
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem
            {...formItemLayout}
            label="标题"
        >
          {getFieldDecorator('title', {
            rules: [{ required: true, message: '请输入标题!' }],
          })(
            <Input placeholder="标题" />
          )}
        </FormItem>
        <FormItem
            {...formItemLayout}
            label="标签"
        >
          {getFieldDecorator('tags', {
            rules: [{ required: true, message: '请输入标签!' }],
          })(
            <Input placeholder="标签，多个标签以，隔开" />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Upload"
        >
          {getFieldDecorator('upload', {
            valuePropName: 'fileList',
            getValueFromEvent: this.normFile,
          })(
            <Upload name="editormd-image-file" action="api/articles/uploadImg/" listType="picture"  beforeUpload={this.beforeUpload} onChange={this.changeUpload}>
              <Button>
                <Icon type="upload" /> Click to upload
              </Button>
            </Upload>
          )}
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
        </FormItem>
      </Form>
    );
  }
}

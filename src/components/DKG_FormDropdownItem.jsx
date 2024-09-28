import React from 'react'
import {Form, Select} from "antd"

const { Option } = Select;

const FormDropdownItem = ({label, placeholder, name, onChange, dropdownArray, valueField, visibleField, required}) => {
  return (
    <Form.Item label={label} name={name} rules={[{ required: required ? true : false, message: 'Required!' }]}>
      <Select placeholder={placeholder}  onChange={(value)=>onChange(name, value)}>
        {
            dropdownArray.map((item, key)=>(
                <Option key={key} value={item[valueField]}> {item[visibleField]} </Option>
            ))
        }
      </Select>
    </Form.Item>
  )
}

export default FormDropdownItem

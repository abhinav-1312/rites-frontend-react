import React from 'react';
import { Form, TimePicker } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

const DKG_CustomTimePicker = ({ label, name, value, onChange, required }) => {
    return (
        <Form.Item
            className='time-component'
            label={label}
            name={name}
            rules={[{ required: required ? true : false, message: 'Please input your value!' }]}
        >
            <TimePicker value={value} onChange={onChange} defaultOpenValue={dayjs('00:00:00', 'HH:mm:ss')} rules={[{ required: required ? true : false, message: 'Please input your value!' }]} />
        </Form.Item>
    )
};

export default DKG_CustomTimePicker;
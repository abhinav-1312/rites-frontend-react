import React from 'react';
import { DatePicker, Form } from 'antd';
import moment from 'moment';
import 'moment/locale/en-gb'; // To support locale formatting

const CustomDatePicker = ({ label, value, onChange, name, disabled }) => {
  const handleChange = (date, dateString) => {
    if (onChange) {
      onChange(name, date ? dateString : null);
    }
  };

//   Convert value to moment object or null
  const formattedValue = value ? moment(value, 'DD/MM/YYYY', true) : null;
  if(formattedValue !== null){
    console.log("NAME: ", name, formattedValue.isValid())
  }

  return (
    <Form.Item label={label} 
    className='date-component'
    // name={name}
    shouldUpdate={(prevValues, currentValues) => {
      console.log("PREV CURR: ", prevValues, currentValues)
      const update = moment(prevValues[name], 'DD/MM/YYYY', true) !== moment(currentValues[name], 'DD/MM/YYYY', true)
      console.log("UPATE OR NO: ",name, update)
      return update
    }}
    >

    <DatePicker
    // disabled={disabled}
    format="DD/MM/YYYY"
    value={formattedValue}
    onChange={handleChange}
    />
    </Form.Item>
  );
};

export default CustomDatePicker;
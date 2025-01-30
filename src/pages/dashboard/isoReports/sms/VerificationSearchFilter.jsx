import { Button, Form } from 'antd'
import React, { useEffect, useState } from 'react'
import CustomDatePicker from '../../../../components/DKG_CustomDatePicker'
import data from '../../../../utils/db.json'
import FormDropdownItem from '../../../../components/DKG_FormDropdownItem'
import Btn from '../../../../components/DKG_Btn'

const VerificationSearchFilter = ({showDate, showShift, showRailGrade, showRailSection, showSms, onFinish}) => {
    const [form] = Form.useForm()

    const [shiftList, setShiftList] = useState([])
    const [railGradeList, setRailGradeList] = useState([])
    const [smsList, setSmsList] = useState([]);
    const [formData, setFormData] = useState({
        date: null,
        shift: null,
        railGrade: null,
        railSection: null,
    })

    const handleChange = (fieldName, value) => {
        setFormData({
            ...formData,
            [fieldName]: value
        })
    }

    console.log("Shift lsit: ", shiftList)

    console.log("Formdata: ", formData)

    useEffect(() => {
        setShiftList([...data.shiftList])
        setRailGradeList([...data.railGradeList])
        setSmsList([...data.smsList]);
    }, [])
  return (
    <div>
      <Form form={form} layout="vertical" initialValues={formData} className='grid grid-cols-2 gap-x-2 p-4' onFinish={() => onFinish(formData)}> 
        {
            showDate && (
                <CustomDatePicker label='Start Date' defaultValue={formData.date} name='date' onChange={handleChange} required/>
            )
        }
        {
            showShift && (
                <FormDropdownItem name="shift" formField="shift" label="Shift" dropdownArray={shiftList} onChange={handleChange} visibleField="key"
                valueField="key" required />
            )
        }
        {
            showRailGrade && (
                <FormDropdownItem name="railGrade" formField="railGrade" label="Rail Grade" dropdownArray={railGradeList} onChange={handleChange} visibleField="key"
                valueField="key" required />
            )
        }
        {
            showSms && (
                <FormDropdownItem
                label="SMS"
                name="sms"
                formField="sms"
                dropdownArray={smsList}
                visibleField="value"
                valueField="key"
                onChange={handleChange}
                required
              />
            )
        }
        <div className="col-span-2 grid grid-cols-2 gap-2">
            <Button htmlType="submit" className='bg-darkBlue text-white'>Search</Button>
            <Button onClick={() => window.location.reload()} className='bg-darkBlue text-white'>Reset</Button>
        </div>

      </Form>

    </div>
  )
}

export default VerificationSearchFilter

import React, { useState, useEffect, useCallback } from 'react'
import FormContainer from '../../../../../components/DKG_FormContainer'
import SubHeader from '../../../../../components/DKG_SubHeader'
import data from "../../../../../utils/frontSharedData/calibration/calibration.json";
import FormBody from '../../../../../components/DKG_FormBody';
import FormDropdownItem from '../../../../../components/DKG_FormDropdownItem';
import CustomDatePicker from "../../../../../components/DKG_CustomDatePicker"
import Search from "../../../../../components/DKG_Search"
import { Divider, Table, Modal, Form, Input, Button, Dropdown, Menu, Checkbox, Space } from 'antd';
import Btn from "../../../../../components/DKG_Btn"
import { useNavigate } from 'react-router-dom';
import { FilterFilled, EditOutlined } from '@ant-design/icons';
import IconBtn from '../../../../../components/DKG_IconBtn';
import FormInputItem from '../../../../../components/DKG_FormInputItem';
import { useDispatch, useSelector } from 'react-redux';
import { endCalibrationDuty } from '../../../../../store/slice/calibrationDutySlice';
import { apiCall } from "../../../../../utils/CommonFunctions";
import GeneralInfo from '../../../../../components/DKG_GeneralInfo';
import TableComponent from '../../../../../components/DKG_Table';

const { instrumentMapping: sampleData, railSectionList, reportInfo } = data;

const CalibrationList = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [instrumentCategoryList, setInstrumentCategoryList] = useState([])
  const [instrumentList, setInstrumentList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false)
  const navigate = useNavigate();
  const datasource = [
    {

    }
  ]

  const [formData, setFormData] = useState({
    instrumentCategory: null, instrument: null,  instrumentDetail: null, railSection: null, serialNumber: null, calibrationDate: null, calibrationUptoDate: null, calibrationList: [],
  })

  const calibrationGeneralInfo = useSelector((state) => state.calibrationDuty);
  console.log(calibrationGeneralInfo);
  const { token } = useSelector((state) => state.auth);

  const populateData = useCallback(async () => {
    const instrumentCategoryList = Object.keys(sampleData).map(inst => {
      return {
        key: inst,
        value: inst
      }
    })

    setInstrumentCategoryList([...instrumentCategoryList]);

    try {
      const { data } = await apiCall(
        "GET",
        `/calibration/getAllLatestCalibrations`,
        token
      );
      const { responseData } = data;

      setFormData({
        instrumentCategory: responseData?.instrumentCategory,
        instrument: responseData?.instrument,
        instrumentDetail: responseData?.instrumentDetail,
        railSection: responseData?.railSection,
        serialNumber: responseData?.serialNumber,
        calibrationDate: responseData?.calibrationDate,
        calibrationUptoDate: responseData?.calibrationUptoDate,
        calibrationList: responseData?.calibrationList?.map(
          (record) => record
        ),
      });
    } catch (error) {}
  }, [token, calibrationGeneralInfo.dutyId]);

  useEffect(()=> {
    populateData()
  }, [populateData])

  useEffect(() => {
    form.setFieldsValue(formData);
  }, [form, formData]);

  useEffect(()=>{
    if(sampleData[formData.instrumentCategory]){
        const instrumentList = sampleData[formData.instrumentCategory].map(inst => {
        return {
            key: inst,
            value: inst
        }
        })
        setInstrumentList([...instrumentList])
    }
  }, [formData.instrumentCategory, instrumentCategoryList])

  const handleChange = (fieldName, value) => {
    setFormData(prev=>{
      return {
        ...prev,
        [fieldName]: value
      }
    })
  }

  const handleClick = () => {
    navigate('/calibration/bulkCalibration');
  }

  const handleClickSec = () => {
    navigate('/calibration/newModifyCalibration');
  }

  const handleClickTer = async () => {
    await dispatch(endCalibrationDuty(formData)).unwrap();
    navigate('/');
  }

  const columns = [
    {
        title: "S.No.",
        dataIndex: "serialNumber",
        key: "serialNumber",
        fixed: "left",
        align: "center",
        render: (_, __, index) => index+1
    },
    {
        title: "Instrument",
        dataIndex: "instrument",
        key: "instrument",
        fixed: "left",
        align: "center",
        filterable: true
    },
    {
        title: "Detail",
        dataIndex: "detail",
        key: "detail",
        align: "center",
        filterable: true
    },
    {
        title: "Rail Section",
        dataIndex: "railSection",
        key: "railSection",
        align: "center",
        filterable: true
    },
    {
        title: "Serial Number",
        dataIndex: "sNumber",
        key: "sNumber",
        align: "center",
        searchable: true
    },
    {
        title: "Gauge Status",
        dataIndex: "gaugeStatus",
        key: "gaugeStatus",
        align: "center",
        filterable: true
    },
    {
        title: "Calibration Due Date",
        dataIndex: "dueDate",
        key: "dueDate",
        align: "center",
        filterable: true
    },
    {
      title: "Modify",
      fixed: "right",
      render: (_, record) => (
        <IconBtn 
          icon={EditOutlined} 
          onClick={() => setIsModalOpen(true)}
        />
      ),
    },
  ]

  return (
    <FormContainer>
      <SubHeader title="Calibration - List" link="/" />
      <GeneralInfo data={calibrationGeneralInfo} />

      {/* <Table
        columns={columns}
        dataSource={formData.calibrationList}
        scroll={{ x: true }}
        bordered
        pagination={{
            pageSize: 5,
            showSizeChanger: true,
            pageSizeOptions: ['5', '10', '20'],
        }}
      /> */}

      <TableComponent dataSource={datasource} columns={columns} />

      {/* <FormBody initialValues={formData}>
        <div className='grid grid-cols-1 md:grid-cols-2 sm:grid-cols-2 gap-x-4'>
          <div className='flex items-center gap-x-2'>
            <FilterFilled />
            <FormDropdownItem label='Instrument Category' name='instrumentCategory' formField='instrumentCategory' dropdownArray={instrumentCategoryList} valueField='key' visibleField='value' onChange={handleChange} className='w-full' required />
          </div>

          <div className='flex items-center gap-x-2'>
            <FilterFilled />         
            <FormDropdownItem label ='Instrument' name='instrument' formField='instrument' dropdownArray={instrumentList} valueField='key' visibleField='value' onChange = {handleChange} className='w-full' required />
          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 sm:grid-cols-2 gap-x-4'>
          {
            (formData.instrumentCategory === 'Gauge (Working)' || formData.instrumentCategory === 'Gauge (Master)') && 
              <div className='flex items-center gap-x-2'>
                <FilterFilled />
                  <FormDropdownItem label='Rail Section' name='railSection' formField='railSection' dropdownArray={railSectionList} visibleField='value' valueField='key' onChange={handleChange} className='w-full' required />
              </div>
          }

          <CustomDatePicker label='Calibration Valid upto Date' name='calibrationUptoDate' formField='calibrationUptoDate' value={formData?.calibrationUptoDate} onChange={handleChange} required />
        </div>

        <div className='flex justify-center mt-2'>
          <Search placeholder='Search by S. No.' />
        </div>
      </FormBody> */}

      <Divider className='mt-0 mb-2' />

      <div className='grid grid-cols-1 md:grid-cols-2 sm:grid-cols-2'>
        <div className='flex justify-center'>
          <Btn onClick={handleClick} className='sm:mt-0 md:mt-0'>Bulk Calibration</Btn>
        </div>

        <div className='flex justify-center'>
          <Btn onClick={handleClickSec} className='mt-2 sm:mt-0 md:mt-0'>Add New Calibration</Btn>
        </div>
      </div>

      <Divider className='mt-0 mb-2' />

      
      
      <div className='flex justify-center'>
        <Btn onClick={handleClickTer}>End Duty</Btn>
      </div>

      <Modal title='Modify Calibration List' open={isModalOpen} onCancel={()=>setIsModalOpen(false)} footer={null}>
          <FormInputItem placeholder='Enter Heat Number' />
          <Btn>Add</Btn>
      </Modal>
    </FormContainer>
  )
}

export default CalibrationList
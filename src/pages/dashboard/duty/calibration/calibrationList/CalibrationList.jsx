import React, { useState, useEffect } from 'react'
import FormContainer from '../../../../../components/DKG_FormContainer'
import SubHeader from '../../../../../components/DKG_SubHeader'
import GeneralInfo from '../../../../../components/DKG_GeneralInfo'
import data from "../../../../../utils/frontSharedData/calibration/calibration.json";
import FormBody from '../../../../../components/DKG_FormBody';
import DisplayIcon from "../../../../../components/DKG_DisplayIcon"
import FormDropdownItem from '../../../../../components/DKG_FormDropdownItem';
import filter from "../../../../../assets/icons/filter.svg"
import CustomDatePicker from "../../../../../components/DKG_CustomDatePicker"
import Search from "../../../../../components/DKG_Search"
import { Divider, Table } from 'antd';
import Btn from "../../../../../components/DKG_Btn"
import { useNavigate } from 'react-router-dom';

const { instrumentMapping: sampleData, calibrationGeneralInfo, railSectionList, reportInfo, columns } = data;

const CalibrationList = () => {
  const [instrumentCategoryList, setInstrumentCategoryList] = useState([])
  const [instrumentList, setInstrumentList] = useState([]);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    instrumentCategory: null, instrument: null,  instrumentDetail: '', railSection: null, serialNumber: '', calibrationDate: new Date(), calibrationUptoDate: '',
  })

  const populateData = () => {
    const instrumentCategoryList = Object.keys(sampleData).map(inst => {
      return {
        key: inst,
        value: inst
      }
    })
    setInstrumentCategoryList([...instrumentCategoryList])
  }

  useEffect(()=> {
    populateData()
  }, [])

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

  const handleClickTer = () => {
    navigate('/');
  }

  return (
    <FormContainer>
      <SubHeader title="Calibration - List" link="/" />
      <GeneralInfo data={calibrationGeneralInfo} />

      <FormBody initialValues={formData}>
        <div className='grid grid-cols-1 md:grid-cols-2 sm:grid-cols-2 gap-x-4'>
          <div className='flex items-center gap-x-2'>
            <DisplayIcon src={filter} alt='Filter' width={24} height={24} />
            <FormDropdownItem label='Instrument Category' name='instrumentCategory' dropdownArray={instrumentCategoryList} valueField={'key'} visibleField={'value'} onChange={handleChange} className='w-full' required />
          </div>

          <div className='flex items-center gap-x-2'>
            <DisplayIcon src={filter} alt='Filter' width={24} height={24} />          
            <FormDropdownItem label ='Instrument' name='instrument' dropdownArray={instrumentList} valueField={'key'} visibleField={'value'} onChange = {handleChange} className='w-full' required />
          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 sm:grid-cols-2 gap-x-4'>
          {
            (formData.instrumentCategory === 'Gauge (Working)' || formData.instrumentCategory === 'Gauge (Master)') && 
              <div className='flex items-center gap-x-2'>
                  <DisplayIcon src={filter} alt='Filter' width={24} height={24} />
                  <FormDropdownItem label='Rail Section' name='railSection' dropdownArray={railSectionList} visibleField='value' valueField='key' onChange={handleChange} className='w-full' required />
              </div>
          }

          <CustomDatePicker label='Calibration Valid upto Date' name='calibrationUptoDate' value={formData?.calibrationUptoDate} onChange={handleChange} required />
        </div>

        <div className='flex justify-center mt-2'>
          <Search placeholder='Search by S. No.' />
        </div>
      </FormBody>

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

      <Table
        columns={columns}
        dataSource={reportInfo}
        scroll={{ x: true }}
        pagination={{
            pageSize: 5,
            showSizeChanger: true,
            pageSizeOptions: ['5', '10', '20'],
        }}
      />

      <div className='flex justify-center'>
        <Btn onClick={handleClickTer}>OK</Btn>
      </div>
    </FormContainer>
  )
}

export default CalibrationList
import React, { useState } from 'react'
import FormContainer from '../../../../../../components/DKG_FormContainer'
import SubHeader from '../../../../../../components/DKG_SubHeader'
import data from "../../../../../../utils/frontSharedData/testSampleDec/testSampleDec.json"
import GeneralInfo from '../../../../../../components/DKG_GeneralInfo';
import FormBody from '../../../../../../components/DKG_FormBody';
import { useNavigate } from 'react-router-dom'
import { message, Checkbox } from 'antd';
import FormInputItem from '../../../../../../components/DKG_FormInputItem';
import FormDropdownItem from '../../../../../../components/DKG_FormDropdownItem';
import Btn from '../../../../../../components/DKG_Btn';

const { testDropdownList, railGradeDropdownList, testSampleDecGeneralInfo, strandDropdownList, sampleLotDropdownList, sampleDropdownList, checkBoxItems, retestNameSecDropdownList, retestNameDropdownList } = data;

const NewTestSampleDeclaration = () => {
  const [checkedValues, setCheckedValues] = useState([])
  const navigate = useNavigate();
  const [formData, setFormData] = useState(
    {
      sampleDetails: '', test: '', railGrade: '', sampleType: '', heatNumber: '', strand: '', sampleLot: '', remarks: '', sampleID: '', retestName: '', retestOne: '', retestTwo: '', retestThree: '' 
    }
  );

  const handleChange = (fieldName, value) => {
    setFormData(prev => {
      return {
        ...prev,
        [fieldName]: value
      }
    })
  };

  const handleFormSubmit = () => {
    message.success("Duty End Called")
    // needs to be change later on
    navigate('/') 
  }

  return (
    <FormContainer>
      <SubHeader title='New Test Sample - Declaration' link='/stage/testSampleMarkingList' />
      <GeneralInfo data={testSampleDecGeneralInfo} />

      <FormBody initialValues={formData} onFinish={handleFormSubmit} >
        <FormInputItem label='Enter Sample Details' name='sampleDetails' value={formData.sampleDetails} onChange={handleChange} required/>

        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-x-4'>
          <FormDropdownItem label='Test' name='test' value={formData.test} dropdownArray={testDropdownList} onChange={handleChange} valueField='key' visibleField='value' required/>
          <FormDropdownItem label='Rail Grade' name='railGrade' value={formData.railGrade} dropdownArray={railGradeDropdownList} onChange={handleChange} valueField='key' visibleField='value' required/>
        </div>

        <section>
          {(formData.test === "Acceptance Test" && (formData.railGrade === "R260" || formData.railGrade === "880")) && (
              <FormBody
                  initialValues={formData}
                  onFinish={handleFormSubmit}
              >
                  <div className="!bg-offWhite opacity-80 flex flex-col border p-2 border-gray-100 rounded-md mt-4 mb-4 shadow-[4px_4px_4px_4px_rgba(0,0,0,0.1)]">
                      <div className='grid grid-cols-2'>
                          <FormDropdownItem label='Sample Type' name='sampleType' value={formData.sampleType} dropdownArray={sampleDropdownList} onChange={handleChange} valueField='key' visibleField='value' className='w-full' required/>
                          {/* hardcoded */}
                          <h3 className='ml-3'>Sample ID</h3> 
                      </div>

                      <div className='grid grid-cols-2'>
                          <FormInputItem label='Heat Number' name='heatNumber' value={formData.heatNumber} onChange={handleChange} required/>
                          <FormDropdownItem label='Strand' name='strand' value={formData.strand} dropdownArray={strandDropdownList} onChange={handleChange} valueField='key' visibleField='value' className='ml-2 w-[95%]' required/>
                      </div>

                      <div className='grid grid-cols-2'>
                          <FormDropdownItem label='Sample Lot' name='sampleLot' value={formData.sampleLot} dropdownArray={sampleLotDropdownList} onChange={handleChange} valueField='key' visibleField='value' required/>
                      </div>

                      <div>
                          <Checkbox.Group
                              options={checkBoxItems.map(item => ({key: item.key, label: item.value, value: item.key }))}
                              value={checkedValues}
                              onChange={(checkedValues) => setCheckedValues(checkedValues)}
                              className='checkbox-group mb-4'
                          />
                      </div>

                      <FormInputItem label='Remarks' name='remarks' value={formData.remarks} onChange={handleChange} required/>
                  </div>

                  <div className='flex justify-center'>
                    <Btn htmlType='submit' className='w-36' onClick={handleFormSubmit}>Save</Btn>
                  </div>
              </FormBody>
          )}

          {(formData.test === "Acceptance Test" && formData.railGrade === "R350HT") && (
              <FormBody
                  initialValues={formData}
                  onFinish={handleFormSubmit}
              >
                  <div className="!bg-offWhite opacity-80 flex flex-col border p-2 border-gray-100 rounded-md mt-4 mb-4 shadow-[4px_4px_4px_4px_rgba(0,0,0,0.1)]">
                      <div className='grid grid-cols-2 gap-2'>
                          <FormDropdownItem label='Sample Type' name='sampleType' value={formData.sampleType} dropdownArray={sampleDropdownList} onChange={handleChange} valueField='key' visibleField='value' className='w-full' required/>
                          <FormInputItem label='Sample ID' name='sampleID' value={formData.sampleID} onChange={handleChange} required/>
                      </div>

                      <div className='grid grid-cols-2'>
                          <FormInputItem label='Heat Number' name='heatNumber' value={formData.heatNumber} onChange={handleChange} required/>
                          <FormDropdownItem label='Strand' name='strand' value={formData.strand} dropdownArray={strandDropdownList} onChange={handleChange} valueField='key' visibleField='value' className='ml-2 w-[95%]' required/>
                      </div>

                      <div className='grid grid-cols-2'>
                          <FormDropdownItem label='Sample Lot' name='sampleLot' value={formData.sampleLot} dropdownArray={sampleLotDropdownList} onChange={handleChange} valueField='key' visibleField='value' required/>
                      </div>

                      <div>
                          <Checkbox.Group
                              options={checkBoxItems.map(item => ({key: item.key, label: item.value, value: item.key }))}
                              value={checkedValues}
                              onChange={(checkedValues) => setCheckedValues(checkedValues)}
                              className='checkbox-group mb-4'
                          />
                      </div>

                      <FormInputItem label='Remarks' name='remarks' value={formData.remarks} onChange={handleChange} required/>
                  </div>

                  <div className='flex justify-center'>
                    <Btn htmlType='submit' className='w-36' onClick={handleFormSubmit}>Save</Btn>
                  </div>
              </FormBody>
          )}

          {(formData.test === "Retest Samples" && (formData.railGrade === "R260" || formData.railGrade === "880")) && (
              <FormBody
                  initialValues={formData}
                  onFinish={handleFormSubmit}
              >
                  <div className="!bg-offWhite opacity-80 flex flex-col border p-2 border-gray-100 rounded-md mt-4 mb-4 shadow-[4px_4px_4px_4px_rgba(0,0,0,0.1)]">
                      <div className='grid grid-cols-2'>
                          <FormDropdownItem label='Retest Name' name='retestName' value={formData.retestName} dropdownArray={retestNameDropdownList} onChange={handleChange} valueField='key' visibleField='value' required/>
                          <FormDropdownItem label='Sample Lot' name='sampleLot' value={formData.sampleLot} dropdownArray={sampleLotDropdownList} onChange={handleChange} valueField='key' visibleField='value' className='ml-2' required/>
                      </div>

                      <div className='grid grid-cols-2'>
                          <FormInputItem label='Heat Number' name='heatNumber' value={formData.heatNumber} onChange={handleChange} required/>
                          <FormDropdownItem label='Retest 1' name='retestOne' value={formData.retestOne} dropdownArray={strandDropdownList} onChange={handleChange} valueField='key' visibleField='value' className='ml-2' required/>
                      </div>

                      <div className='grid grid-cols-2'>
                          <FormDropdownItem label='Retest 2' name='retestTwo' value={formData.retestTwo} dropdownArray={strandDropdownList} onChange={handleChange} valueField='key' visibleField='value' required/>
                          <FormDropdownItem label='Retest 3' name='retestThree' value={formData.retestThree} dropdownArray={strandDropdownList} onChange={handleChange} valueField='key' visibleField='value' className='ml-2' required/>
                      </div>

                      <FormInputItem label='Remarks' name='remarks' value={formData.remarks} onChange={handleChange} required/>
                  </div>

                  <div className='flex justify-center'>
                    <Btn htmlType='submit' className='w-36' onClick={handleFormSubmit}>Save</Btn>
                  </div>
              </FormBody>
          )}

          {(formData.test === "Retest Samples" && formData.railGrade === "R350HT") && (
              <FormBody
                  initialValues={formData}
                  onFinish={handleFormSubmit}
              >
                  <div className="!bg-offWhite opacity-80 flex flex-col border p-2 border-gray-100 rounded-md mt-4 mb-4 shadow-[4px_4px_4px_4px_rgba(0,0,0,0.1)]">
                      <div className='grid grid-cols-2'>
                          <FormDropdownItem label='Retest Name' name='retestName' value={formData.retestName} dropdownArray={retestNameSecDropdownList} onChange={handleChange} valueField='key' visibleField='value' required/>
                          <FormDropdownItem label='Sample Lot' name='sampleLot' value={formData.sampleLot} dropdownArray={sampleLotDropdownList} onChange={handleChange} valueField='key' visibleField='value' className='ml-2' required/>
                      </div>

                      <div className='grid grid-cols-2'>
                          <FormInputItem label='Sample ID' name='sampleID' value={formData.sampleID} onChange={handleChange} required/>
                          <FormInputItem label='Heat Number' name='heatNumber' value={formData.heatNumber} onChange={handleChange} className='ml-2' required/>
                      </div>

                      <div className='grid grid-cols-1'>
                          <FormDropdownItem label='Strand' name='strand' value={formData.strand} dropdownArray={strandDropdownList} onChange={handleChange} valueField='key' visibleField='value' required/>
                      </div>
                  </div>

                  <div className='flex justify-center'>
                    <Btn htmlType='submit' className='w-36' onClick={handleFormSubmit}>Save</Btn>
                  </div>
              </FormBody>
          )}
        </section>
      </FormBody>
    </FormContainer>
  )
}

export default NewTestSampleDeclaration
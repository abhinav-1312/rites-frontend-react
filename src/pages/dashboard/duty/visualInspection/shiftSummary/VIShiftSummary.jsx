import React, { useState } from "react";
import SubHeader from "../../../../../components/DKG_SubHeader";
import FormContainer from "../../../../../components/DKG_FormContainer";
import GeneralInfo from "../../../../../components/DKG_GeneralInfo";
import data from "../../../../../utils/frontSharedData/VisualInspection/VI.json";
import { Divider, Table, Select } from 'antd';
import FormBody from "../../../../../components/DKG_FormBody";
import Btn from "../../../../../components/DKG_Btn";
import { useNavigate } from 'react-router-dom'
import FilterTable from "../../../../../components/DKG_FilterTable";
import filter from "../../../../../assets/icons/filter.svg"
import DisplayIcon from "../../../../../components/DKG_DisplayIcon"
import FormDropdownItem from "../../../../../components/DKG_FormDropdownItem";

const { acceptanceData: sampleData, rejectionData: sampleDataSec, compiledData, defectAnalysisData, lineNumberList, acceptanceColumns, rejectionColumns, compiledColumns, defectColumns, visualInspectionGeneralInfo } = data;

const { Option } = Select;

const VIShiftSummary = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    lineNumber: '',
  })

  const handleSelectChange = (value) => {
    setSelectedOption(value);
  };

  const handleChange = (fieldName, value) => {
    setFormData(prev=>{
      return {
        ...prev,
        [fieldName]: value
      }
    })
  }

  const handleClick = () => {
    navigate('/visual/home')
  }

  return (
    <FormContainer>
        <SubHeader title="Visual Inspection - Shift Summary" link="/visual/home" />
        <GeneralInfo data={visualInspectionGeneralInfo} />

        <FormBody initialValues={formData}>
            <section className="flex justify-center mt-2">
                <div className='flex items-center'>
                    <DisplayIcon src={filter} alt='Filter' width={24} height={24} className='mr-2' />
                    
                    <FormDropdownItem label='Line Number' name='lineNumber' dropdownArray={lineNumberList} valueField={'key'} visibleField={'value'} onChange={handleChange} required />
                </div>
            </section>
        </FormBody>

        <Divider className="mt-0" />

        <div className='flex justify-center'>
            <Select 
                placeholder="Select a summary" 
                onChange={handleSelectChange}
                className='w-52'
            >
                <Option value="Acceptance Summary">Acceptance Summary</Option>
                <Option value="Defect Analysis">Defect Analysis</Option>
                <Option value="Inspected Railwise Summary">Inspected Railwise Summary</Option>
            </Select>
        </div>

        {selectedOption === 'Acceptance Summary' && (
            <>
                <Divider>Length Wise Acceptance Summary</Divider>

                <Table
                    dataSource={sampleData}
                    columns={acceptanceColumns}
                    scroll={{ x: true }}
                    pagination={{
                    pageSize: 5,
                    showSizeChanger: true,
                    pageSizeOptions: ["5", "10", "20"],
                    }}
                />

                <hr />

                <Divider>Rejection Summary</Divider>

                <Table
                    dataSource={sampleDataSec}
                    columns={rejectionColumns}
                    scroll={{ x: true }}
                    pagination={{
                    pageSize: 5,
                    showSizeChanger: true,
                    pageSizeOptions: ["5", "10", "20"],
                    }}
                />

                <hr />

                <Divider>Compiled Summary</Divider>

                <Table
                    dataSource={compiledData}
                    columns={compiledColumns}
                    scroll={{ x: true }}
                    pagination={{
                    pageSize: 5,
                    showSizeChanger: true,
                    pageSizeOptions: ["5", "10", "20"],
                    }}
                />

                <hr />

                <div className='flex justify-center mt-6'>
                    <Btn onClick={handleClick} className='w-[25%]'>Go VI Home</Btn>
                </div>
            </>
        )}

        {selectedOption === 'Defect Analysis' && (
            <>
                <Divider>Defect Analysis Summary</Divider>

                <Table 
                    dataSource={defectAnalysisData} 
                    columns={defectColumns} 
                    pagination={{
                    pageSize: 5,
                    showSizeChanger: true,
                    pageSizeOptions: ["5", "10", "20"],
                    }}
                />

                <hr />

                <div className='flex justify-center mt-6'>
                    <Btn htmlType='submit' onClick={handleClick} className='w-[25%]'>Go VI Home</Btn>
                </div>
            </>
        )}

        {selectedOption === 'Inspected Railwise Summary' && (
            <>
                <FilterTable />
                
                <hr />

                <div className='flex justify-center mt-6'>
                    <Btn htmlType='submit' onClick={handleClick} className='w-[25%]'>Go VI Home</Btn>
                </div>
            </>
        )}
    </FormContainer>
  )
}

export default VIShiftSummary
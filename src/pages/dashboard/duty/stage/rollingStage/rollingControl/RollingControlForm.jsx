import React, { useState } from 'react'
import SubHeader from '../../../../../../components/DKG_SubHeader'
import FormContainer from '../../../../../../components/DKG_FormContainer'
import GeneralInfo from '../../../../../../components/DKG_GeneralInfo'
import data from "../../../../../../utils/frontSharedData/rollingStage/Stage.json";
import FormBody from '../../../../../../components/DKG_FormBody';
import FormDropdownItem from '../../../../../../components/DKG_FormDropdownItem';
import FormInputItem from '../../../../../../components/DKG_FormInputItem';
import { Divider, Table, message } from 'antd';
import Btn from '../../../../../../components/DKG_Btn';
import { useNavigate } from 'react-router-dom'
import IconBtn from '../../../../../../components/DKG_IconBtn';
import { EditOutlined } from '@ant-design/icons';
import { PlusOutlined } from '@ant-design/icons';

const { rollingStageGeneralInfo, micrometerNumberList, vernierNumberList, weighingMachineList, rollingControlTableData } = data;

const RollingControlForm = () => {
  const [currentTablePage, setCurrentTablePage] = useState(1)
  const [tablePageSize, setTablePageSize] = useState(5)
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        micrometerNumber: '', vernierNumber: '', weighingMachine: '', numberGauges: '', branding: ''
    });

    const handleRowClick = () => {
        message.success('clicked')
    };

    const columns = [
        {
          title: "S.No.",
          dataIndex: "sNo",
          key: "sNo",
        },
        {
          title: "Sample Heat No.",
          dataIndex: "sampleHeatNo",
          key: "sampleHeatNo"
        },
        {
          title: "Timing",
          dataIndex: "timing",
          key: "timing",
        },
        {
          title: "Results",
          dataIndex: "results",
          key: "results",
        },
        {
          title: "Edit",
          fixed: "right",
          render: (_, record) => (
            <IconBtn
              icon={EditOutlined}
              onClick={() => handleRowClick(record.heatNo)}
            />
          ),
        },
    ];

    const handlePageSizeChange = (value) => {
        setTablePageSize(value);
        setCurrentTablePage(1); // Reset to first page when page size changes
    };

    const handleChange = (fieldName, value) => {
        setFormData((prev) => {
          return {
            ...prev,
            [fieldName]: value,
          };
        });
    };

    const handleFormSubmit = () => {
        message.success("Form submission triggered.");
        navigate('/stage/home');
    };

    const handleClick = () => {
        navigate('/stage/rollingControl/rollingControlSample60E1')
    }

    const handleClickSec = () => {
        navigate('/stage/rollingControl/rollingControlSampleIRS52')
    }

    const handleClickTer = () => {
        navigate('/stage/rollingControl/rollingControlSample60E1A1')
    }

  return (
    <FormContainer>
        <SubHeader title="Rail Rolling Control" link="/stage/home" />
        <GeneralInfo data={rollingStageGeneralInfo} />

        <FormBody initialValues={formData} onFinish={handleFormSubmit}>
            <div className="grid grid-cols-2 gap-x-2">
                <FormDropdownItem label="Micrometer No." name="micrometerNumber" dropdownArray={micrometerNumberList} visibleField="value" valueField="key" onChange={handleChange} required />
                <FormDropdownItem label="Vernier No." name="vernierNumber" dropdownArray={vernierNumberList} visibleField="value" valueField="key" onChange={handleChange} required />
            </div>

            <div className="grid grid-cols-2 gap-x-2">
                <FormDropdownItem label='Weighing M/c' name='weighingMachine' dropdownArray={weighingMachineList} valueField='key' visibleField='value' onChange={handleChange} required />
                <FormInputItem label='No. of Gauges' name='numberGauges' value={formData.numberGauges} onChange={handleChange} required/>
            </div>

            <div className="grid grid-cols-1 gap-x-2">
                <FormInputItem label='Branding' name='branding' value={formData.branding} onChange={handleChange} required/>
            </div>

            <Divider className='mt-0 mb-6' />

            <Table
                columns={columns}
                dataSource={rollingControlTableData}
                scroll={{ x: true }}
                pagination={{
                current: currentTablePage,
                pageSize: tablePageSize,
                showSizeChanger: true,
                pageSizeOptions: ["5", "10", "20"],
                onChange: (page) => setCurrentTablePage(page),
                onShowSizeChange: (current, size) => handlePageSizeChange(size),
                }}
            />
            <IconBtn 
                icon={PlusOutlined} 
                text='Add Sample for 60E1'
                onClick={handleClick}
            />

            <Divider className='mt-6 mb-6' />

            <Table
                columns={columns}
                dataSource={rollingControlTableData}
                scroll={{ x: true }}
                pagination={{
                current: currentTablePage,
                pageSize: tablePageSize,
                showSizeChanger: true,
                pageSizeOptions: ["5", "10", "20"],
                onChange: (page) => setCurrentTablePage(page),
                onShowSizeChange: (current, size) => handlePageSizeChange(size),
                }}
            />
            <IconBtn 
                icon={PlusOutlined} 
                text='Add Sample for IRS52'
                onClick={handleClickSec}
            />

            <Divider className='mt-6 mb-6' />

            <Table
                columns={columns}
                dataSource={rollingControlTableData}
                scroll={{ x: true }}
                pagination={{
                current: currentTablePage,
                pageSize: tablePageSize,
                showSizeChanger: true,
                pageSizeOptions: ["5", "10", "20"],
                onChange: (page) => setCurrentTablePage(page),
                onShowSizeChange: (current, size) => handlePageSizeChange(size),
                }}
            />
            <IconBtn 
                icon={PlusOutlined} 
                text='Add Sample for 60E1A1'
                onClick={handleClickTer}
            />

            <Btn htmlType="submit" className="flex justify-center mx-auto mt-6">
                Start Duty
            </Btn>
        </FormBody>
    </FormContainer>
  )
}

export default RollingControlForm
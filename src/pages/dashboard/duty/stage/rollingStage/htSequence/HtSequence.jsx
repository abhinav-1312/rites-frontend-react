import React, { useState, useCallback, useEffect } from 'react'
import FormContainer from '../../../../../../components/DKG_FormContainer'
import SubHeader from '../../../../../../components/DKG_SubHeader'
import GeneralInfo from '../../../../../../components/DKG_GeneralInfo'
import data from "../../../../../../utils/frontSharedData/rollingStage/Stage.json";
import { Checkbox, Divider, Modal, Table, message } from 'antd';
import { PlusOutlined, EditOutlined } from '@ant-design/icons';
import IconBtn from '../../../../../../components/DKG_IconBtn';
import FormInputItem from '../../../../../../components/DKG_FormInputItem';
import Btn from '../../../../../../components/DKG_Btn';
import FormDropdownItem from '../../../../../../components/DKG_FormDropdownItem';
import { useNavigate } from "react-router-dom";

const { rollingStageGeneralInfo, htSequenceTableData, bloomQualityList, htStatusList } = data;

const checkBoxItems = [
    { "key": 1, "value": "Is it New Heat treated Rail Campaign" }
  ]

const HtSequence = () => {
    const [tableData, setTableData] = useState([]);
    const [currentTablePage, setCurrentTablePage] = useState(1)
    const [tablePageSize, setTablePageSize] = useState(5)
    const [newRailID, setNewRailID] = useState('')
    const [newBloomQuality, setNewBloomQuality] = useState('')
    const [newHtStatus, setNewHtStatus] = useState('')
    const [newTestSampleMarked, setNewTestSampleMarked] = useState('')
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [checkedValues, setCheckedValues] = useState([])
    const navigate = useNavigate()

    const populateTableData = useCallback(() => {
        setTableData([...htSequenceTableData]);
    }, []);

    const handleRowClick = () => {
        message.success("clicked");
    };

    const columns = [
        {
          title: "S.No.",
          dataIndex: "sNo",
          key: "sNo",
        },
        {
          title: "Rail ID",
          dataIndex: "railID",
          key: "railID",
        },
        {
          title: "Bloom Quality",
          dataIndex: "bloomQuality",
          key: "bloomQuality",
        },
        {
          title: "HT Status",
          dataIndex: "htStatus",
          key: "htStatus",
        },
        {
          title: "Test Sample Marked",
          dataIndex: "testSampleMarked",
          key: "testSampleMarked",
        },
        {
          title: "Actions",
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

    const addNewHtSequence = () => {
        setTableData(prev => {
          return [
            ...prev,
            {
              sNo: prev.length+1,
              railID: newRailID,
              bloomQuality: newBloomQuality,
              htStatus: newHtStatus,
              testSampleMarked: newTestSampleMarked
            }
          ]
        })
    
        const lastPage = Math.ceil((tableData.length + 1)/tablePageSize)
        setCurrentTablePage(lastPage)
    
        setNewRailID('')
        setIsModalOpen(false)
    }

    useEffect(() => {
        populateTableData();
    }, [populateTableData]);

    const handleSave = () => {
        navigate("/stage/home")
    }

  return (
    <FormContainer>
        <SubHeader title="HT Sequence" link="/stage/home" />
        <GeneralInfo data={rollingStageGeneralInfo} />
        
        <Divider className='mt-0 mb-0'/>

        <Checkbox.Group
          options={checkBoxItems.map(item => ({key: item.key, label: item.value, value: item.key }))}
          value={checkedValues}
          onChange={(checkedValues) => setCheckedValues(checkedValues)}
          className='mb-4'
        />

        <div className='relative'>
          <Table
            columns={columns}
            dataSource={tableData}
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
            text='Add New HT Sequence' 
            className='absolute left-0 bottom-4'
            onClick={() => setIsModalOpen(true)}
          />
        </div>

        <Modal title='Add new HT Sequence' open={isModalOpen} onCancel={()=>setIsModalOpen(false)} footer={null}>
          <FormInputItem label="Rail ID" value={newRailID} onChange={(_fieldName, value) => setNewRailID(value)} required />
          <FormDropdownItem label='Bloom Quality' name='bloomQuality' dropdownArray={bloomQualityList} valueField='key' visibleField='value' onChange={(_fieldName, value) => setNewBloomQuality(value)} required />
          <FormDropdownItem label='HT Status' name='htStatus' dropdownArray={htStatusList} valueField='key' visibleField='value' onChange={(_fieldName, value) => setNewHtStatus(value)} required />
          <FormInputItem label="Test Sample Marked" value={newTestSampleMarked} onChange={(_fieldName, value) => setNewTestSampleMarked(value)} required/>
          <Btn onClick={addNewHtSequence}>Add</Btn>
        </Modal>

        <div className="flex justify-center">
          <Btn onClick={handleSave}>Save</Btn>
        </div>
    </FormContainer>
  )
}

export default HtSequence
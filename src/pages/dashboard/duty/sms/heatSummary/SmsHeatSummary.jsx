import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Checkbox, message, Modal, Table } from "antd";
import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import SubHeader from "../../../../../components/DKG_SubHeader";
import data from "../../../../../utils/db.json";
import GeneralInfo from "../../../../../components/DKG_GeneralInfo";
import IconBtn from "../../../../../components/DKG_IconBtn";
import FormInputItem from "../../../../../components/DKG_FormInputItem";
import Btn from "../../../../../components/DKG_Btn";
import FormContainer from "../../../../../components/DKG_FormContainer";

const {
  smsGeneralInfo,
  smsSummaryCalibrationDetails,
  smsShiftSummaryTableData,
} = data;

const checkBoxItems = [
  { "key": 1, "value": "Is EMS Functioning ?" },
  { "key": 2, "value": "Is Slag Detector cum Slag Arrester Functioning ?" },
  { "key": 3, "value": "Is AMLC Functioning ?" },
  { "key": 4, "value": "Is Hydrogen Measurement Automatic ?" },
  { "key": 5, "value": "Is Shroud (Ladle to Tundish) Used ?" },
  { "key": 6, "value": "Is Shroud (Tundish to Mould) Used ?" }
]

const SmsHeatSummary = () => {
  const [tableData, setTableData] = useState([]);
  const [newHeat, setNewHeat] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentTablePage, setCurrentTablePage] = useState(1)
  const [tablePageSize, setTablePageSize] = useState(5)
  const [checkedValues, setCheckedValues] = useState([])

  const navigate = useNavigate()

  const populateTableData = useCallback(() => {
    setTableData([...smsShiftSummaryTableData]);
  }, []);

  const handleRowClick = (heatNo) => {
    message.success(heatNo);
  };

  const columns = [
    {
      title: "S/No",
      dataIndex: "sNo",
      key: "sNo",
    },
    {
      title: "Heat No.",
      dataIndex: "heatNo",
      key: "heatNo",
      fixed: "left"
    },
    {
      title: "Sequence No.",
      dataIndex: "sequenceNo",
      key: "sequenceNo",
    },
    {
      title: "H2",
      dataIndex: "h2",
      key: "h2",
    },
    {
      title: "Stage",
      dataIndex: "stage",
      key: "stage",
    },
    {
      title: "Heat Remark",
      dataIndex: "heatRemark",
      key: "heatRemark",
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

  const addNewHeat = () => {
    setTableData(prev => {
      return [
        ...prev,
        {
          sNo: prev.length+1,
          heatNo: newHeat,
          sequenceNo: "newly added",
          h2: "newly added",
          stage: "newly added",
          heatRemark: "newly added"

        }
      ]
    })

    const lastPage = Math.ceil((tableData.length + 1)/tablePageSize)
    setCurrentTablePage(lastPage)

    setNewHeat('')
    setIsModalOpen(false)
  }

  const handleSave = () => {
    message.success('Save button triggered.')
    navigate(-1)
  }

  const handlePageSizeChange = (value) => {
    setTablePageSize(value);
    setCurrentTablePage(1); // Reset to first page when page size changes
  };

  useEffect(() => {
    populateTableData();
  }, [populateTableData]);

  return (
    <FormContainer className='flex flex-col gap-4 md:gap-8'>
      <SubHeader title="SMS - Shift Summary" link="/sms/dutyEnd" />
      <GeneralInfo data={smsGeneralInfo} />
      <section>
        <div className="grid grid-cols-1 gap-2 md:gap-4 border p-1 border-[#d9d9d9] shadow-md rounded-sm relative">
          <div>
            <h3 className="font-semibold">Hydris Calibration Details</h3>
            <div className="grid grid-cols-2">
              {Object.keys(
                smsSummaryCalibrationDetails["hydrisCalibrationDetails"]
              ).map((key) => {
                return (
                  <h3 key={key}>
                    {key}:{" "}
                    {
                      smsSummaryCalibrationDetails["hydrisCalibrationDetails"][
                        key
                      ]
                    }
                  </h3>
                );
              })}
            </div>
          </div>
          <div>
            <h3 className="font-semibold">Leco Calibration Details</h3>
            <div className="grid grid-cols-2">
              {Object.keys(
                smsSummaryCalibrationDetails["lecoCalibrationDetails"]
              ).map((key) => {
                return (
                  <h3 key={key}>
                    {key}:{" "}
                    {
                      smsSummaryCalibrationDetails["lecoCalibrationDetails"][
                        key
                      ]
                    }
                  </h3>
                );
              })}
            </div>
          </div>
        </div>
      </section>
      <section>
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
            text='add new heat' 
            className='absolute left-0 bottom-4'
            onClick={() => setIsModalOpen(true)}
          />
        </div>
      </section>

      <section>
        <Checkbox.Group
          options={checkBoxItems.map(item => ({key: item.key, label: item.value, value: item.key }))}
          value={checkedValues}
          onChange={(checkedValues) => setCheckedValues(checkedValues)}
          className='checkbox-group mb-4'
          />

          <FormInputItem label='Make of Casting Powder Used' />
          <FormInputItem label='Make of Hydris Probe' />
          <div className="text-center">
          <Btn onClick={handleSave}>Save</Btn>
          </div>
      </section>

      <Modal title='Add new heat' open={isModalOpen} onCancel={()=>setIsModalOpen(false)} footer={null}>
          <FormInputItem value={newHeat} placeholder='Enter Heat Number' onChange={(_fieldName, value) => setNewHeat(value)} />
          <Btn onClick={addNewHeat}>Add</Btn>
      </Modal>
    </FormContainer>
  );
};

export default SmsHeatSummary;

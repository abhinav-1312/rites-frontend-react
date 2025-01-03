import React, { useState, useCallback, useEffect } from 'react'
import FormContainer from '../../../../../components/DKG_FormContainer';
import SubHeader from '../../../../../components/DKG_SubHeader';
import GeneralInfo from '../../../../../components/DKG_GeneralInfo';
import { Divider, Table } from 'antd';
import TabList from "../../../../../components/DKG_TabList";
import SrInspectionHomeTabs from "../../../../../utils/frontSharedData/srInspection/srInspection"
import FormBody from '../../../../../components/DKG_FormBody';
import FormInputItem from '../../../../../components/DKG_FormInputItem';
import { useNavigate } from 'react-router-dom'
import Btn from '../../../../../components/DKG_Btn';
import { useSelector, useDispatch } from 'react-redux';
import { endSriDuty } from '../../../../../store/slice/sriDutySlice';
import { apiCall } from '../../../../../utils/CommonFunctions';

const SrInspectionHome = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const sriGeneralInfo = useSelector((state) => state.sriDuty);
  const { token } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    remarks: null
  });

  const [totalTonnes, setTotalTonnes] = useState([]);

  const populateTableData = useCallback(async () => {
    try {
      const { data } = await apiCall(
        "GET",
        `/shortrailinspection/shortRailSummary?dutyId=${sriGeneralInfo.dutyId}`,
        token
      );
      // const { responseData } = data;

      setTotalTonnes(data?.responseData || []);
    } catch (error) {}
  }, [sriGeneralInfo.dutyId, token]);

  const handleChange = (fieldName, value) => {
    setFormData(prev => {
      return {
        ...prev,
        [fieldName]: value
      }
    })
  };

  const handleFormSubmit = async () => {
    await dispatch(endSriDuty(formData)).unwrap();
    navigate('/')
  }

  useEffect(() => {
    populateTableData();
  }, [populateTableData]);

  const totalTonnesColumns = [
    {
      title: "S/No",
      dataIndex: "sNo",
      key: "sNo",
      render: (_, __, index) => index + 1, // Adding 1 to the index to start from 1
    },
    {
      title: "Inspected Tonnage",
      dataIndex: "totalTonnesInspected",
      key: "totalTonnesInspected"
    },
    {
      title: "Accepted Tonnage",
      dataIndex: "totalTonnesAccepted",
      key: "totalTonnesAccepted",
    },
    {
      title: "Rejected Tonnage",
      dataIndex: "totalTonnesRejected",
      key: "totalTonnesRejected",
    }
  ];

  return (
    <FormContainer>
      <SubHeader title='Short Rail Inspection - Home' link='/' />
      <GeneralInfo data={sriGeneralInfo} />

      <section className='mt-6'>
        <Table
          dataSource={totalTonnes}
          columns={totalTonnesColumns}
          scroll={{ x: true }}
          bordered
          pagination={{
            pageSize: 5,
            showSizeChanger: true,
            pageSizeOptions: ["5", "10", "20"],
          }}
        />
      </section>

      <Divider className='mt-0 mb-0' />

      <section className="mt-6">
        <TabList tabList={SrInspectionHomeTabs} />
      </section>

      <FormBody initialValues={formData} onFinish={handleFormSubmit} >
        <FormInputItem label='Shift Remarks by GL' name='remarks' value={formData.remarks} onChange={handleChange} required/>

        <div className='flex justify-center'>
          <Btn htmlType='submit' className='w-36'>End Duty</Btn>
        </div>
      </FormBody>
    </FormContainer>
  )
}

export default SrInspectionHome
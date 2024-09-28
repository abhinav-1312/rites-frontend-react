import React from "react";
import { useNavigate } from "react-router-dom";
import { Table } from "antd";
import SubHeader from "../../../../../components/SubHeader";
import GeneralInfo from "../../../../../components/GeneralInfo";
import Btn from "../../../../../components/Btn";
import data from "../../../../../utils/db.json";
import FormContainer from "../../../../../components/FormContainer";

const { smsVerificationReportData: sampleData, smsGeneralInfo } = data;

const columns = [
  {
    title: "Stage",
    dataIndex: "stage",
    key: "stage",
  },
  {
    title: "Cast No.",
    dataIndex: "castNumber",
    key: "castNumber",
  },
  {
    title: "Turn Down Temp.",
    dataIndex: "turnDownTemperature",
    key: "turnDownTemperature",
  },
  {
    title: "Witnessed / Verified",
    dataIndex: "witnessedVerified",
    key: "witnessedVerified",
  },
];

const SmsVerification = () => {
  const navigate = useNavigate()
  return (
    <FormContainer>
      <SubHeader title="SMS - Verification Report" link="/sms/shiftReports" />
      <GeneralInfo data={smsGeneralInfo} />
      <section>
        <Table
          dataSource={sampleData}
          columns={columns}
          scroll={{ x: true }}
          pagination={{
            pageSize: 5,
            showSizeChanger: true,
            pageSizeOptions: ["5", "10", "20"],
          }}
        />
      </section>
        <Btn onClick={() => navigate(-1)} className='mx-auto'> Go Back </Btn>
    </FormContainer>
  );
};

export default SmsVerification;

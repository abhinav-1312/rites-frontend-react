import React from "react";
import { useNavigate } from "react-router-dom";
import { Table } from "antd";
import SubHeader from "../../../../../components/SubHeader";
import GeneralInfo from "../../../../../components/GeneralInfo";
import Btn from "../../../../../components/Btn";
import data from "../../../../../utils/db.json";
import FormContainer from "../../../../../components/FormContainer";

const { smsGeneralInfo, smsHeatListData: sampleData } = data;

const columns = [
  {
    title: "S.No.",
    dataIndex: "serialNumber",
    key: "serialNumber",
  },
  {
    title: "Heat Number",
    dataIndex: "heatNumber",
    key: "heatNumber",
    fixed: "left",
  },
  {
    title: "Caster No.",
    dataIndex: "casterNumber",
    key: "casterNumber",
  },
  {
    title: "Seq. No.",
    dataIndex: "seqNumber",
    key: "seqNumber",
  },
  {
    title: "Ladle Chemical Analysis",
    dataIndex: "ladleChemicalAnalysis",
    key: "ladleChemicalAnalysis",
  },
  {
    title: "N",
    dataIndex: "n",
    key: "n",
  },
  {
    title: "O",
    dataIndex: "o",
    key: "o",
  },
  {
    title: "H",
    dataIndex: "h",
    key: "h",
  },
  {
    title: "Vac. Level",
    dataIndex: "vacuumLevel",
    key: "vacuumLevel",
  },
  {
    title: "Deg. Time",
    dataIndex: "degTime",
    key: "degTime",
  },
];

const SmsHeatList = () => {
  const navigate = useNavigate()
  return (
    <FormContainer>
      <SubHeader title="SMS - Report - Heat List" link="/sms/shiftReports" />
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

export default SmsHeatList;

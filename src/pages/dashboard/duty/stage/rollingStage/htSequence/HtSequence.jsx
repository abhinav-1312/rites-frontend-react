import React, { useState, useCallback, useEffect } from "react";
import FormContainer from "../../../../../../components/DKG_FormContainer";
import SubHeader from "../../../../../../components/DKG_SubHeader";
import GeneralInfo from "../../../../../../components/DKG_GeneralInfo";
import data from "../../../../../../utils/frontSharedData/rollingStage/Stage.json";
import { Checkbox, Divider, Form, message, Modal, Table } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import IconBtn from "../../../../../../components/DKG_IconBtn";
import FormInputItem from "../../../../../../components/DKG_FormInputItem";
import Btn from "../../../../../../components/DKG_Btn";
import FormDropdownItem from "../../../../../../components/DKG_FormDropdownItem";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { apiCall, handleChange } from "../../../../../../utils/CommonFunctions";
import FormSearchItem from "../../../../../../components/DKG_FormSearchItem";
import {
  DECARB,
  MICRO,
  PH,
  TENSILE,
  TENSILE_FOOT,
} from "../../../../../../utils/Constants";

const { bloomQualityList, htStatusList } = data;

const HtSequence = () => {
  const [edit, setEdit] = useState(false);

  const handleDelete = async (railId) => {
    try{
      await apiCall("POST", "/rolling/htSequence/deleteRailById", token, {railId})
      message.success("Rail ID deleted successfully.")
      populateData();
    }
    catch(error){}
  }
  const handleRowClick = (record) => {
    setFormData({
      railId: record.railId,
      htStatus: record.htStatus,
      htStatusDesc: record.htStatus ? "OK" : "NOT OK",
      bloomQuality: record.bloomQuality,
      testSampleMarked: record.testMarked,
    });
    setEdit(true)
    setIsModalOpen(true);
  };

  const [form] = Form.useForm();
  const columns = [
    {
      title: "S.No.",
      dataIndex: "sNo",
      key: "sNo",
      render: (_, __, index) => index + 1,
    },
    {
      title: "Rail ID",
      dataIndex: "railId",
      key: "railId",
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
      render: (htStatus) => (htStatus ? "OK" : "NOT OK"),
    },
    {
      title: "Test Sample Marked",
      dataIndex: "testMarked",
      key: "testMarked",
      render: (testMarked) => testMarked?.join(", "),
    },
    {
      title: "Actions",
      fixed: "right",
      render: (_, record) => (
        <>
        <IconBtn icon={EditOutlined} onClick={() => handleRowClick(record)} />
        <IconBtn icon={DeleteOutlined} onClick={() => handleDelete(record.railId)} />
        </>
      ),
    },
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const rollingGeneralInfo = useSelector((state) => state.rollingDuty);
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [checked, setChecked] = useState(false);
  const [formData, setFormData] = useState({
    railId: null,
    bloomQuality: null,
    htStatus: null,
    htStatusDesc: null,
    testSampleMarked: null,
  });

  const [tensileStatus, setTensileStatus] = useState(null);
  const [tensileFootStatus, setTensileFootStatus] = useState(null);
  const [phStatus, setPhStatus] = useState(null);
  const [microStatus, setMicroStatus] = useState(null);
  const [decarbStatus, setDecarbStatus] = useState(null);

  const [tableData, setTableData] = useState([]);

  const populateData = useCallback(async () => {
    try {
      const { data } = await apiCall(
        "GET",
        "/rolling/htSequence/getOpenBatchDtlsV2",
        token
      );
      setTableData(data.responseData || []);

      const batch = data.responseData || [];
      const tensileBatchCount = batch.length % 128;
      const phMicroBatchCount = batch.length % 12;
      const decarbBatchCount = batch.length % 64;

      let tensileStatus = false;
      let tensileFootStatus = false;
      let phStatus = false;
      let microStatus = false;
      let decarbStatus = false;

      for (let i = 0; i < tensileBatchCount; i++) {
        const record = batch[i];
        const { testMarked: testList = [] } = record;
        if(!record.htStatus) continue;
        tensileStatus =
          testList.some((test) => test === TENSILE) || tensileStatus;
        tensileFootStatus =
          testList.some((test) => test === TENSILE_FOOT) || tensileFootStatus;

        if (tensileStatus && tensileFootStatus) break;
      }
      for (let i = 0; i < phMicroBatchCount; i++) {
        const record = batch[i];
        const { testMarked: testList = [] } = record;

        if(!record.htStatus) continue;

        phStatus = testList.some((test) => test === PH) || phStatus;
        microStatus = testList.some((test) => test === MICRO) || microStatus;

        if (phStatus && microStatus) break;
      }
      for (let i = 0; i < decarbBatchCount; i++) {
        const record = batch[i];
        const { testMarked: testList = [] } = record;

        if(!record.htStatus) continue;

        decarbStatus = testList.some((test) => test === DECARB) || decarbStatus;

        if (decarbStatus) break;
      }

      setTensileStatus(tensileStatus);
      setTensileFootStatus(tensileFootStatus);
      setPhStatus(phStatus);
      setMicroStatus(microStatus);
      setDecarbStatus(decarbStatus);
    } catch (error) {}
  }, [token]);

  const handleHtStatusChange = (_, value) => {
    setFormData((prev) => ({
      ...prev,
      htStatus: value,
      htStatusDesc: value ? "OK" : "NOT OK",
    }));
  };

  const addData = async () => {
    const payload = {
      dutyId: rollingGeneralInfo.dutyId,
      railId: formData.railId,
      htStatus: formData.htStatus,
      bloomQuality: formData.bloomQuality,
    };
    try {
      if(edit){
        await apiCall("POST", "/rolling/htSequence/updateHtSequenceRail", token, payload);
        setIsModalOpen(false);
        populateData();
        setEdit(false)
      }
      else{
        await apiCall("POST", "/rolling/htSequence/saveHtSequenceRail", token, payload);
        setIsModalOpen(false);
        populateData();
      }
      setFormData({railId: null,
        bloomQuality: null,
        htStatus: null,
        htStatusDesc: null,
        testSampleMarked: null})
    } catch (error) {}
  };

  console.log("FPRMDTA: ", formData)

  const handleRailIdSearch = async () => {
    try {
      const { data } = await apiCall(
        "GET",
        `/rolling/htSequence/getRailIdMarkedTests?railId=${formData.railId}`,
        token
      );
      setFormData((prev) => ({
        ...prev,
        testSampleMarked: data?.responseData?.markedTests,
      }));
    } catch (error) {}
  };

  const saveHtSequence = async () => {
    if (checked) {
      try {
        await apiCall("POST", "rolling/htSequence/saveBatch", token, {
          dutyId: rollingGeneralInfo.dutyId,
        });
      } catch (error) {}
    }

    navigate("/stage/home");
  };

  const handleModalClose = () => {

    console.log("MODAL CLOSE CALLED")
    setIsModalOpen(false);
    setFormData({railId: null,
      bloomQuality: null,
      htStatus: null,
      htStatusDesc: null,
      testSampleMarked: null})

      setEdit(false)
  }

  useEffect(() => {
    populateData();
  }, [populateData]);

  useEffect(() => {
    console.log("GETTING CALLED")
    form.setFieldsValue(formData);
  }, [form, formData]);

  return (
    <FormContainer>
      <SubHeader title="HT Sequence" link="/stage/home" />
      <GeneralInfo data={rollingGeneralInfo} />

      <Divider className="my-0" />

      <div>
        <h3 className="font-semibold mb-2 !text-xl">
          Batch sampling verification:
        </h3>
        <div className="flex flex-col gap-y-2">
          <div className="ml-4">
            <strong>Tensile (One Sample per 128 Rails): </strong> {tensileStatus ? "OK" : "NOT OK"}
          </div>
          <div className="ml-4">
            <strong>Tensile Foot (One Sample per 128 Rails): </strong> {tensileFootStatus ? "OK" : "NOT OK"}
          </div>
          <div className="ml-4">
            <strong>PH (One sample per 12 Rails): </strong> {phStatus ? "OK" : "NOT OK"}
          </div>
          <div className="ml-4">
            <strong>Microstructure (One Sample per 12 Rails): </strong> {microStatus ? "OK" : "NOT OK"}
          </div>
          <div className="ml-4">
            <strong>Decarb (One Sample per 64 Rails): </strong> {decarbStatus ? "OK" : "NOT OK"}
          </div>
        </div>
      </div>

      <Divider className="my-0" />

      <Checkbox
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
      >
        New rail heat marked
      </Checkbox>

      <div className="relative">
        <Table dataSource={tableData} columns={columns} scroll={{x: "auto"}} />
        <IconBtn
          icon={PlusOutlined}
          text="add"
          className="absolute left-0 bottom-16"
          onClick={() => setIsModalOpen(true)}
        />
        <Btn onClick={saveHtSequence} className="flex mx-auto">
          {" "}
          Save{" "}
        </Btn>
      </div>
      <Modal
        open={isModalOpen}
        title="Add a new Rail"
        footer={null}
        onCancel={handleModalClose}
        onClose={handleModalClose}
      >
        <Form
          form={form}
          initialValues={formData}
          layout="vertical"
          onFinish={addData}
        >
          <FormInputItem
            label="Rail ID"
            name="railId"
            // onSearch={handleRailIdSearch}
            onChange={(fieldName, value) =>
              handleChange(fieldName, value, setFormData)
            }
            disabled={edit}
            required
          />

          {/* <FormInputItem
            label="Test Sample Marked"
            name="testSampleMarked"
            onChange={(name, value) => handleChange(name, value, setFormData)}
            required
            disabled
          /> */}

          <FormDropdownItem
            label="Bloom Quality"
            name="bloomQuality"
            formField="bloomQuality"
            dropdownArray={bloomQualityList}
            valueField="key"
            visibleField="value"
            onChange={(name, value) => handleChange(name, value, setFormData)}
            required
          />
          <FormDropdownItem
            label="HT Status"
            name="htStatusDesc"
            formField="htStatus"
            dropdownArray={htStatusList}
            valueField="key"
            visibleField="value"
            onChange={handleHtStatusChange}
            required
          />
          <Btn htmlType="submit" className="flex mx-auto">
            {
              edit ? "Update" : "Save"
            }
          </Btn>
        </Form>
      </Modal>
    </FormContainer>
  );
};

export default HtSequence;

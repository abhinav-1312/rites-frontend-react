// import React, { useState } from 'react'
// import FormContainer from '../../../../../components/DKG_FormContainer';
// import SubHeader from '../../../../../components/DKG_SubHeader';
// import GeneralInfo from '../../../../../components/DKG_GeneralInfo';
// import data from "../../../../../utils/frontSharedData/srInspection/srInspection.json";
// import FormBody from '../../../../../components/DKG_FormBody';
// import FormDropdownItem from '../../../../../components/DKG_FormDropdownItem';
// import { Form } from "antd";
// import { useSelector } from 'react-redux';

// const { srInspectionGeneralInfo, railSectionList, railGradeList } = data;

// // const SrNewInspectionForm = () => {
// //   const [formData, setFormData] = useState({
// //     railSection: '', railGrade: ''
// //   })

// // const { railSectionList, railGradeList } = data;

// const SrNewInspectionForm = () => {
//   const [form] = Form.useForm();
//   const { dutyId } = useSelector((state) => state.viDuty);
//   const [formData, setFormData] = useState({
//     railSection: "", railGrade: ""
//   })
//   const sriGeneralInfo = useSelector((state) => state.sriDuty);

//   const [info, setInfo] = useState([
//     {
//       key: "1",
//       serialNumber: "",
//     },
//   ]);

//   const handleChange = (fieldName, value) => {
//     setFormData(prev => {
//       return {
//         ...prev,
//         [fieldName]: value
//       }
//     })
//   }

//   const handleFormSubmit = async () => {
//     console.log("submit called");
//     try {
//       await apiCall("POST", "/shortrailinspection/save", token, {
//         ...formData,
//         dutyId: dutyId,
//       });
//       navigate("/srInspection/home");
//       message.success("Data saved successfully.");
//     } catch (error) {}
//   };

//   const bulkColumns = [
//     {
//       title: "",
//       dataIndex: "key",
//       key: "key",
//       render: (text, record, index) => index + 1,
//     },
//     {
//       title: 'Length',
//       dataIndex: 'length',
//       key: 'length',
//       align: 'center',
//     },
//     {
//       title: "Cl - A",
//       dataIndex: "clA",
//       key: "clA",
//       align: 'center',
//       render: (text, record) => (
//         <FormInputItem
//           placeholder="0"
//           label="Accepted nos."
//           name={["acptDataList", index, "acceptedNo"]}
//           formField="acceptedNo"
//           rules={acceptedDataRule[index]}
//           required
//           onChange={(fieldName, value) =>
//             handleAcceptanceDataChange(index, fieldName, value)
//           }
//         />
//       ),
//     },
//   ];

//   return (
//     <FormContainer>
//       <SubHeader title='Short Rail Inspection Form' link='/srInspection/home' />
//       <GeneralInfo data={sriGeneralInfo} />

//       <Form form={form} layout="vertical" initialValues={formData} onFinish={handleFormSubmit} >
//         <div className='grid grid-cols-1 md:grid-cols-2 sm:grid-cols-2 gap-x-4'>
//           <FormDropdownItem label='Rail Section Inspected' name='railSection' formField="railSection" dropdownArray={railSectionList} valueField='key' visibleField='value' onChange={handleChange} className='w-full' required />
//           <FormDropdownItem label ='Rail Grade Inspected' name='railGrade' formField="railGrade" dropdownArray={railGradeList} valueField='key' visibleField='value' onChange = {handleChange} className='w-full' required />
//         </div>
//       </Form>

//       <Table columns={bulkColumns} dataSource={info} bordered pagination={false} />
//     </FormContainer>
//   )
// }

// export default SrNewInspectionForm

import React, { useState } from 'react'
import FormContainer from '../../../../../components/DKG_FormContainer';
import SubHeader from '../../../../../components/DKG_SubHeader';
import GeneralInfo from '../../../../../components/DKG_GeneralInfo';
import data from "../../../../../utils/frontSharedData/srInspection/srInspection.json";
import FormDropdownItem from '../../../../../components/DKG_FormDropdownItem';
import { Form, Table } from "antd";
import { useSelector } from 'react-redux';
import { apiCall } from '../../../../../utils/CommonFunctions';

const { railSectionList, railGradeList } = data;

const SrNewInspectionForm = () => {
  const [form] = Form.useForm();
  const { dutyId } = useSelector((state) => state.viDuty);
  const { token } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    railSection: "", railGrade: ""
  })
  const sriGeneralInfo = useSelector((state) => state.sriDuty);

  const [info, setInfo] = useState([
    {
      key: "1",
      serialNumber: "",
    },
  ]);

  const handleChange = (fieldName, value) => {
    setFormData(prev => {
      return {
        ...prev,
        [fieldName]: value
      }
    })
  }

  const handleFormSubmit = async () => {
    console.log("submit called");
    try {
      await apiCall("POST", "/shortrailinspection/save", token, {
        ...formData,
        dutyId: dutyId,
      });
      // navigate("/srInspection/home");
      // message.success("Data saved successfully.");
    } catch (error) {}
  };

  const bulkColumns = [
    {
      title: "",
      dataIndex: "key",
      key: "key",
      render: (text, record, index) => index + 1,
    },
    {
      title: 'Length',
      dataIndex: 'length',
      key: 'length',
      align: 'center',
    },
    {
      title: "Cl - A",
      dataIndex: "clA",
      key: "clA",
      align: 'center',
      // render: (text, record) => (
        // // <FormInputItem
        //   placeholder="0"
        //   label="Accepted nos."
        //   // name={["acptDataList", index, "acceptedNo"]}
        //   formField="acceptedNo"
        //   // rules={acceptedDataRule[index]}
        //   required
        //   // onChange={(fieldName, value) =>
        //   //   handleAcceptanceDataChange(index, fieldName, value)
        //   // }
        // />
      // ),
    },
  ];

  return (
    <FormContainer>
      <SubHeader title='Short Rail Inspection Form' link='/srInspection/home' />
      <GeneralInfo data={sriGeneralInfo} />

      <Form form={form} layout="vertical" initialValues={formData} onFinish={handleFormSubmit} >
        <div className='grid grid-cols-1 md:grid-cols-2 sm:grid-cols-2 gap-x-4'>
          <FormDropdownItem label='Rail Section Inspected' name='railSection' formField="railSection" dropdownArray={railSectionList} valueField='key' visibleField='value' onChange={handleChange} className='w-full' required />
          <FormDropdownItem label ='Rail Grade Inspected' name='railGrade' formField="railGrade" dropdownArray={railGradeList} valueField='key' visibleField='value' onChange = {handleChange} className='w-full' required />
        </div>
      </Form>

      <Table columns={bulkColumns} dataSource={info} bordered pagination={false} />
    </FormContainer>
  )
}

export default SrNewInspectionForm
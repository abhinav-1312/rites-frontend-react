// import React, { useState } from "react";
// import SubHeader from "../../../../../components/DKG_SubHeader";
// import FormContainer from "../../../../../components/DKG_FormContainer";
// import GeneralInfo from "../../../../../components/DKG_GeneralInfo";
// import { message, Form, Checkbox, TimePicker } from 'antd';
// import FormInputItem from "../../../../../components/DKG_FormInputItem";
// import Btn from "../../../../../components/DKG_Btn";
// import { useNavigate } from 'react-router-dom';
// import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
// import IconBtn from '../../../../../components/DKG_IconBtn';
// import { useSelector } from 'react-redux';
// import { apiCall } from '../../../../../utils/CommonFunctions';

// const NCalibrationForm = () => {
//   const navigate = useNavigate();
//   const ndtGeneralInfo = useSelector((state) => state.ndtDuty);
//   const { token } = useSelector((state) => state.auth);
//   const [form] = Form.useForm();

//   const handleFormSubmit = async () => {
//     const payload = {
//       calibrationList: formData?.calibrationList,
//       calibrationRemarks: formData?.calibrationRemarks,
//       dutyId: ndtGeneralInfo.dutyId,
//     };

//     console.log(payload)

//     try {
//       await apiCall("POST", "/ndt/calibration/saveBulkCalibration", token, payload);
//       message.success("NDT Calibration Round(s) Data saved succesfully.");
//       navigate('/ndt/home');
//     } catch (error) {
//       console.log("error: ", error)
//     }
//   }

//   const handleCalDtlChange = (fieldName, value, index) => {
//     setFormData((prev) => {
//       const calListUpdated = prev.calibrationList.map((item, idx) => 
//         idx === index ? { ...item, [fieldName]: value } : item
//       );
//       return {
//         ...prev,
//         calibrationList: calListUpdated,
//       };
//     });
//   };
  

//   const addCalRound = () => {
//     setFormData((prev) => {
//       const calListUpdated = [
//         ...prev.calibrationList,
//         {
//           ut: false, ct: false, fmg: false, osiris: false, calibrationCompletionTimeDayjs: null, calibrationCompletionTime: null, calibrationSpeed: null, rclRepName: null, calibrationRoundRemarks: null
//         },
//       ];

//       return {
//         ...prev,
//         calibrationList: calListUpdated,
//       };
//     });
//   };

//   const deleteCalRound = (index) => {
//     setFormData((prev) => {
//       const calListUpdated = prev.calibrationList.filter((_, idx) => idx !== index);
//       return {
//         ...prev,
//         calibrationList: calListUpdated,
//       };
//     });
//   };

//   const handleTimingChange = (time, timeString, index) => {

//     if (time) {
//       // Directly use timeString because it's already in the correct format
//       setFormData((prev) => {
//         const tempObsvDtlsUpdated = prev.calibrationList;
//         tempObsvDtlsUpdated[index]["calibrationCompletionTime"] = timeString;
//         tempObsvDtlsUpdated[index]["calibrationCompletionTimeDayjs"] = time;
//         return {
//             ...prev,
//             calibrationList: tempObsvDtlsUpdated
//         }
//       })
//     } else {
//         setFormData((prev) => {
//             const tempObsvDtlsUpdated = prev.calibrationList;
//             tempObsvDtlsUpdated[index]["calibrationCompletionTime"] = null;
//             tempObsvDtlsUpdated[index]["calibrationCompletionTimeDayjs"] = null;
//             return {
//                 ...prev,
//                 calibrationList: tempObsvDtlsUpdated
//             }
//           })
//     }
//   };
  

//   return (
//     <FormContainer>
//         <SubHeader title="NDT - Calibration" link="/ndt/home" />
//         <GeneralInfo data={ndtGeneralInfo} />

//         <Form initialValues={formData} onFinish={handleFormSubmit} form={form} layout="vertical" >
//             {
//               formData.calibrationList?.map((record, index) => (
//                 <div className="relative grid gap-x-4 border p-4 pb-0">                    
//                   <section className='flex gap-2'>
//                     <Checkbox name={["dataList", index, "ut"]} onChange={(e) => handleCalDtlChange("ut", e.target.checked, index)}>UT</Checkbox>
//                     <Checkbox name={["dataList", index, "ct"]} onChange={(e) => handleCalDtlChange("ct", e.target.checked, index)}>CT</Checkbox>
//                     <Checkbox name={["dataList", index, "fmg"]} onChange={(e) => handleCalDtlChange("fmg", e.target.checked, index)}>FMG</Checkbox>
//                     <Checkbox name={["dataList", index, "osiris"]} onChange={(e) => handleCalDtlChange("osiris", e.target.checked, index)}>OSIRIS</Checkbox>
//                   </section>

//                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-2 mt-3">
//                     <Form.Item label="Calibration Time" name={["calibrationList", index, "calibrationCompletionTimeDayjs"]} rules={[{ required: true, message: "Please select a time!" }]}>
//                       <TimePicker onChange={(time, timeString) => handleTimingChange(time, timeString, index)} format="HH:mm:ss" placeholder="Select Time" className="w-full" />
//                     </Form.Item>

//                     <FormInputItem label='Calibration Speed (m/s)' placeholder="0.00" name={["calibrationList", index, "calibrationSpeed"]} onChange={(name, value) => handleCalDtlChange(name, value, index)} required />
//                   </div>

//                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-2">
//                     <FormInputItem label='RCL Rep.' name={["calibrationList", index, "rclRepName"]} placeholder='Enter RCL Rep. name' onChange={(name, value) => handleCalDtlChange(name, value, index)} required/>
//                     <FormInputItem label='Remarks for this round' name={["calibrationList", index, "calibrationRoundRemarks"]} placeholder='Enter Remarks' onChange={(name, value) => handleCalDtlChange(name, value, index)} required/>
//                   </div>

//                   <IconBtn
//                     icon={DeleteOutlined}
//                     className="shadow-none absolute right-0"
//                     onClick={() => deleteCalRound(index)}
//                   />
//                 </div>
//             ))
//             }
            
//             <IconBtn icon={PlusOutlined} text="Add Calibration Round" className="relative" onClick={addCalRound} />

//             <div className='mt-4'>
//               <FormInputItem label='Remarks' placeholder='Enter Remarks' onChange={handleChange} name='calibrationRemarks' required/>
//               <div className='flex justify-center mt-8'>
//                 <Btn htmlType='submit'>Save</Btn>
//               </div>
//             </div>
//         </Form>
//     </FormContainer>
//   )
// }

// export default NCalibrationForm


import React, { useState, useEffect } from "react";
import SubHeader from "../../../../../components/DKG_SubHeader";
import FormContainer from "../../../../../components/DKG_FormContainer";
import GeneralInfo from "../../../../../components/DKG_GeneralInfo";
import { message, Form, Checkbox, TimePicker } from 'antd';
import FormInputItem from "../../../../../components/DKG_FormInputItem";
import Btn from "../../../../../components/DKG_Btn";
import { useNavigate } from 'react-router-dom';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import IconBtn from '../../../../../components/DKG_IconBtn';
import { useSelector } from 'react-redux';
import { apiCall } from '../../../../../utils/CommonFunctions';

const NCalibrationForm = () => {
  const navigate = useNavigate();
  const ndtGeneralInfo = useSelector((state) => state.ndtDuty);
  const { token } = useSelector((state) => state.auth);
  const [form] = Form.useForm();

  const [formData, setFormData] = useState({
    calibrationList: [],
    calibrationRemarks: null,
  });

  useEffect(() => {
    const fetchCalibrationData = async () => {
      try {
        const response = await apiCall("GET", `/ndt/calibration/getCalibrationDtls/${ndtGeneralInfo.dutyId}`, token);  //need to change the API call
        if (response?.data) {
          setFormData({
            calibrationList: response.data.calibrationList || [],
            calibrationRemarks: response.data.calibrationRemarks || null,
          });
        }
      } catch (error) {
        console.error("Error fetching calibration data:", error);
      }
    };
    fetchCalibrationData();
  }, [ndtGeneralInfo.dutyId, token]);

  const handleChange = (fieldName, value) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  const handleCalDtlChange = (fieldName, value, index) => {
    setFormData((prev) => {
      const calListUpdated = prev.calibrationList.map((item, idx) =>
        idx === index ? { ...item, [fieldName]: value } : item
      );
      return {
        ...prev,
        calibrationList: calListUpdated,
      };
    });
  };

  const handleTimingChange = (time, timeString, index) => {
    setFormData((prev) => {
      const updatedList = [...prev.calibrationList];
      updatedList[index] = {
        ...updatedList[index],
        calibrationCompletionTime: timeString,
        calibrationCompletionTimeDayjs: time,
      };
      return { ...prev, calibrationList: updatedList };
    });
  };

  const addCalRound = () => {
    setFormData((prev) => ({
      ...prev,
      calibrationList: [
        ...prev.calibrationList,
        {
          ut: false,
          ct: false,
          fmg: false,
          osiris: false,
          calibrationCompletionTimeDayjs: null,
          calibrationCompletionTime: null,
          calibrationSpeed: null,
          rclRepName: null,
          calibrationRoundRemarks: null,
          isNew: true,
        },
      ],
    }));
  };

  const deleteCalRound = (index) => {
    setFormData((prev) => {
      const updatedList = prev.calibrationList.filter((_, idx) => idx !== index);
      return { ...prev, calibrationList: updatedList };
    });
  };

  const handleFormSubmit = async () => {
    const payload = {
      calibrationList: formData.calibrationList.filter(item => item.isNew),
      calibrationRemarks: formData.calibrationRemarks,
      dutyId: ndtGeneralInfo.dutyId,
    };

    try {
      await apiCall("POST", "/ndt/calibration/saveBulkCalibration", token, payload);
      message.success("NDT Calibration Round(s) Data saved successfully.");
      navigate('/ndt/home');
    } catch (error) {
      console.error("Error saving calibration data:", error);
    }
  };

  return (
    <FormContainer>
      <SubHeader title="NDT - Calibration" link="/ndt/home" />
      <GeneralInfo data={ndtGeneralInfo} />

      <Form initialValues={formData} onFinish={handleFormSubmit} form={form} layout="vertical">
        {formData.calibrationList?.map((record, index) => (
          <div key={index} className="relative grid gap-x-4 border p-4 pb-0">
            <section className="flex gap-2">
              <Checkbox checked={record.ut} disabled={!record.isNew} onChange={(e) => handleCalDtlChange("ut", e.target.checked, index)}>UT</Checkbox>
              <Checkbox checked={record.ct} disabled={!record.isNew} onChange={(e) => handleCalDtlChange("ct", e.target.checked, index)}>CT</Checkbox>
              <Checkbox checked={record.fmg} disabled={!record.isNew} onChange={(e) => handleCalDtlChange("fmg", e.target.checked, index)}>FMG</Checkbox>
              <Checkbox checked={record.osiris} disabled={!record.isNew} onChange={(e) => handleCalDtlChange("osiris", e.target.checked, index)}>OSIRIS</Checkbox>
            </section>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-2 mt-3">
              <Form.Item label="Calibration Time" name={["calibrationList", index, "calibrationCompletionTimeDayjs"]} rules={[{ required: true, message: "Please select a time!" }]}>
                <TimePicker
                  value={record.calibrationCompletionTimeDayjs}
                  disabled={!record.isNew}
                  onChange={(time, timeString) => handleTimingChange(time, timeString, index)}
                  format="HH:mm:ss"
                  placeholder="Select Time"
                  className="w-full"
                />
              </Form.Item>

              <FormInputItem
                label="Calibration Speed (m/s)"
                placeholder="0.00"
                name={["calibrationList", index, "calibrationSpeed"]}
                value={record.calibrationSpeed}
                disabled={!record.isNew}
                onChange={(name, value) => handleCalDtlChange(name, value, index)}
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-2">
              <FormInputItem
                label="RCL Rep."
                name={["calibrationList", index, "rclRepName"]}
                placeholder="Enter RCL Rep. name"
                value={record.rclRepName}
                disabled={!record.isNew}
                onChange={(name, value) => handleCalDtlChange(name, value, index)}
                required
              />
              <FormInputItem
                label="Remarks for this round"
                name={["calibrationList", index, "calibrationRoundRemarks"]}
                placeholder="Enter Remarks"
                value={record.calibrationRoundRemarks}
                disabled={!record.isNew}
                onChange={(name, value) => handleCalDtlChange(name, value, index)}
                required
              />
            </div>

            {record.isNew && (
              <IconBtn icon={DeleteOutlined} className="shadow-none absolute right-0" onClick={() => deleteCalRound(index)} />
            )}
          </div>
        ))}

        <IconBtn icon={PlusOutlined} text="Add Calibration Round" className="relative" onClick={addCalRound} />

        <div className="mt-4">
          <FormInputItem
            label="Remarks"
            placeholder="Enter Remarks"
            value={formData.calibrationRemarks}
            onChange={(name, value) => handleChange("calibrationRemarks", value)}
            required
          />
          <div className="flex justify-center mt-8">
            <Btn htmlType="submit">Save</Btn>
          </div>
        </div>
      </Form>
    </FormContainer>
  );
};

export default NCalibrationForm;

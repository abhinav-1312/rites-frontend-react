import React, { useCallback, useEffect, useState } from "react";
import SubHeader from "../../../../../components/DKG_SubHeader";
import data from "../../../../../utils/db.json";
import GeneralInfo from "../../../../../components/DKG_GeneralInfo";
import FormBody from "../../../../../components/DKG_FormBody";
import { Checkbox, Divider, Image, message, Table, Upload } from "antd";
import CustomDatePicker from "../../../../../components/DKG_CustomDatePicker";
import FormInputItem from "../../../../../components/DKG_FormInputItem";
import FormDropdownItem from "../../../../../components/DKG_FormDropdownItem";
import FormNumericInputItem from "../../../../../components/DKG_FormNumericInputItem"
import { Link } from "react-router-dom";
import IconBtn from "../../../../../components/DKG_IconBtn";
import { DeleteOutlined, PlusOutlined, UploadOutlined } from "@ant-design/icons";
import TextAreaComponent from "../../../../../components/DKG_TextAreaComponent";
import Btn from "../../../../../components/DKG_Btn";
import FormContainer from "../../../../../components/DKG_FormContainer";
import { useNavigate } from 'react-router-dom'
import { apiCall } from "../../../../../utils/CommonFunctions";
import { useSelector } from "react-redux";
import dayjs from "dayjs"

const currentDate = dayjs();
const dateFormat = "DD/MM/YYYY"

const {
  visualInspectionGeneralInfo,
  shiftList,
  visualInspectionAcceptanceData,
  visualInspectionDefectData,
} = data;
const { accLengthList, railClassList } = visualInspectionAcceptanceData;

const viRejectionDetailsColumns = [
  { title: "Length", dataIndex: "length", key: "length", align: 'center' },
  { title: "No. of Pieces", dataIndex: "numberPieces", key: "numberPieces", align: 'center' },
];

const viRejectionDetailsData = [
  {
    key: "1",
    length: "13m",
    numberPieces: "5",
  },
  {
    key: "2",
    length: "12m",
    numberPieces: "3",
  },
  {
    key: "3",
    length: "11m",
    numberPieces: "7",
  },
  {
    key: "4",
    length: "10m",
    numberPieces: "1",
  },
  {
    key: "5",
    length: "Comp. Length",
    numberPieces: "9",
  },
];

const VisualInspectionForm = () => {
  const {dutyId, mill, shift} = useSelector(state => state.viDuty);
  const [formData, setFormData] = useState({
    serialNo: null,
    actualOfferedLength: null,
    heatNo: null,
    railId: null,
    shift: shift,
    date: currentDate.format(dateFormat),
    heatStatus: "",
    rej13: null,
    rej12: null,
    rej11: null,
    rej10: null,
    rejCompLength: null,
    ut: "",
    dim: "",
    visual: "",
    gaugeEndStraightness: false,
    acptDataList: [
      {
        acceptedLength: "",
        acceptedNo: '',
        railClass: "",
      },
    ],
    defectDataList: [
      {
        defectCategory: "",
        defectType: "",
        location: "",
        position: "",
      },
    ],
    remarks: "",
    image: "",
  });
  const navigate = useNavigate();
  
  const {token} = useSelector(state => state.auth);
  const [previewUrl, setPreviewUrl] = useState(null);

  const [defectCategoryList, setDefectCategoryList] = useState([]);
  const [defectTypeList, setDefectTypeList] = useState([]);

  const handleFormSubmit = async () => {
    try {
      await apiCall("POST", "/vi/saveViDtls", token, {...formData, dutyId: dutyId});
      navigate('/visual/home')
    }
    catch(error){}
  };

  // const handleChange = (fieldName, value) => {
  //   setFormData((prev) => {
  //     return {
  //       ...prev,
  //       [fieldName]: value,
  //     };
  //   });
  // };

  const viGeneralInfo = useSelector(state => state.viDuty);

  const [heatRule, setHeatRule] = useState([])

  const handleChange = (fieldName, value) => {

    if (fieldName === "heatNo") {
      const isValid = /^0\d{5}$/.test(value);

      if (!isValid) {
        setHeatRule([
          {
            validator: (_, value) =>
              Promise.reject(
                new Error(
                  "Heat Number must start with 0, be 6 digits, and contain only numbers."
                )
              ),
          },
        ]);
      } else {
        setHeatRule([]); // Clear the rule on valid input
      }
    }

    if(fieldName === "serialNo" && value.length > 3){
      message.error("Serial number should be of length 3.")
      return;
    }
    setFormData((prev) => {
      const updatedForm = {
        ...prev,
        [fieldName]: value,
      };
  
      if (
        ["mill", "date", "shift", "serialNo"].includes(fieldName)
      ) {
        if (
          mill &&
          updatedForm.date &&
          updatedForm.shift &&
          updatedForm.serialNo
        ) {
          // Format date as DDMMYY
          console.log("SA HAI")
          const [day, month, year] = updatedForm.date.split("/");
        const formattedDate = `${day}${month}${year.slice(-2)}`;
  
          updatedForm.railId = `${mill[0]}${formattedDate}${updatedForm.shift}${updatedForm.serialNo}`;
        } else {
          updatedForm.railId = null;
        }
      }
  
      return updatedForm;
    });
  };
  

  const handleAcceptanceDataChange = (index, fieldName, value) => {
    setFormData((prev) => {
      const acptDtList = prev.acptDataList;
      acptDtList[index][fieldName] = value;
      return {
        ...prev,
        acptDataList: acptDtList,
      };
    });
  };

  const populateDefectDataList = useCallback(() => {
    const defCat = Object.keys(visualInspectionDefectData).map((item) => {
      return {
        key: item,
        value: item,
      };
    });
    setDefectCategoryList([...defCat]);
  }, []);

  const handleDefectCategoryChange = (index, fieldName, value) => {
    setFormData((prev) => {
      const defDatLst = prev.defectDataList;
      defDatLst[index][fieldName] = value;
      return {
        ...prev,
        defectDataList: defDatLst,
      };
    });

    setDefectTypeList((prev) => {
      const temp = prev;
      temp[index] = visualInspectionDefectData[value].map((item) => {
        return {
          key: item,
          value: item,
        };
      });
      return temp;
    });
  };

  const handleDefectDataChange = (index, fieldName, value) => {
    console.log(index, fieldName, value);

    setFormData((prev) => {
      const defDatList = prev.defectDataList;
      defDatList[index][fieldName] = value;
      return {
        ...prev,
        defectDataList: defDatList,
      };
    });
  };

  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      setFormData(prev => ({...prev, image: reader.result.split(',')[1]}));  // Base64 encoded image
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const addAcceptanceData = () => {
    setFormData((prev) => {
      const acptDtLst = prev.acptDataList;
      const updatedLst = [
        ...acptDtLst,
        { acceptedLength: "", acceptedNo: '', railClass: "" },
      ];

      return {
        ...prev,
        acptDataList: updatedLst,
      };
    });
  };

  const deleteAcptItem = (index) => {
    setFormData((prev) => {
      const acptDtLst = prev.acptDataList;
      acptDtLst.splice(index, 1);
      return {
        ...prev,
        acptDataList: acptDtLst,
      };
    });

    setDefectTypeList((prev) => {
      const defTypeLst = prev;
      defTypeLst.splice(index, 1);
      return defTypeLst;
    });
  };

  const deleteDefItem = (index) => {
    setFormData((prev) => {
      const defDtLst = prev.defectDataList;
      defDtLst.splice(index, 1);
      return {
        ...prev,
        acptDataList: defDtLst,
      };
    });
  };

  const addDefectData = () => {
    setFormData((prev) => {
      const defDataLst = prev.defectDataList;
      defDataLst.push({
        defectCategory: "",
        defectType: "",
        location: "",
        position: "",
      });
      return {
        ...prev,
        defectDataList: defDataLst,
      };
    });
  };

  const handleImgUploadChange = (info) => {
    console.log(info.file.originFileObj);
    if (info.file.status === "done") {
      // Get the image URL
      const url = URL.createObjectURL(info.file.originFileObj);
      setFormData((prev) => {
        return {
          ...prev,
          uploadedImage: info.file.originFileObj,
        };
      });
      setPreviewUrl(url);
    } else if (info.file.status === "removed") {
      // Reset state when image is removed
      setFormData((prev) => {
        return {
          ...prev,
          uploadedImage: null,
        };
      });
      setPreviewUrl("");
    }
  };

  console.log("Formdata: ", formData);

  useEffect(() => {
    populateDefectDataList();
  }, [populateDefectDataList]);

  return (
    <FormContainer>
      <SubHeader title="Visual Inspection" link="/visual/home" />
      <GeneralInfo data={viGeneralInfo} />
      <FormBody initialValues={formData} onFinish={handleFormSubmit}>
        <div className="mb-4">
          <span className="font-semibold">Rail ID: </span>
          {formData.railId}
        </div>

        <div>
          <div className="grid grid-cols-3 gap-x-2">

          <CustomDatePicker
            label="Date"
            name="date"
            defaultValue={formData.date}
            onChange={handleChange}
            required
            disabled
            />
            <FormDropdownItem
              label="Shift"
              dropdownArray={shiftList}
              visibleField="value"
              valueField="key"
              name="shift"
              formField="shift"
              onChange={handleChange}
              required
              disabled
              />
          <FormInputItem
            label='S.No.'
            maxLength={3}
            name="serialNo"
            onChange={handleChange}
            required
          />
            </div>

            <div className="grid grid-cols-2 gap-x-2">

          <FormInputItem
            label="Heat Number"
            rules={heatRule}
            name="heatNo"
            onChange={handleChange}
            required
          />
          <FormInputItem
            label="Heat Status"
            name="heatStatus"
            onChange={handleChange}
            required
            />
            </div>

          <FormInputItem
            label="Act. Offered Len. (in m.)"
            name="actualOfferedLength"
            onChange={handleChange}
            required
          />
        </div>

        <Divider className="mt-0 mb-4" />

        <section className="flex flex-col gap-4">
          <h3 className="font-semibold">
            Feedback from AI System for Dim and Visual
          </h3>
          <div className="text-justify">
            <span className="font-semibold">UT: </span>
            Text
          </div>
          <div className="text-justify">
            <span className="font-semibold">Dim: </span>
            Text
          </div>
          <div className="text-justify">
            <span className="font-semibold">Visual: </span>
            Text
          </div>

          <div className="grid grid-cols-2">
            <Link to="#" className="text-blue-600">
              {" "}
              Go to AI Photo
            </Link>
            <Link to="#" className="text-blue-600 text-right">
              {" "}
              Go to NDT Report
            </Link>
          </div>
        </section>

        <Divider className="my-4" />
        <Checkbox
          className="checkbox-group"
          onChange={(e) =>
            handleChange("gaugingEndStraightness", e.target.checked)
          }
        >
          Gauging and End Straightness present at both the ends.
        </Checkbox>

        <Divider className="my-4" />

        <section className="flex flex-col gap-4">
          <h3 className="font-semibold">Add Acceptance Data</h3>

          {formData.acptDataList?.map((record, index) => {
            return (
              <div
                className=" relative flex flex-col gap-2 border p-2 py-4 rounded-md vi-acpt-def"
                key={index}
              >
                <FormDropdownItem
                  dropdownArray={accLengthList}
                  name={["acptDataList", index, "acceptedLength"]}
                  formField="acceptedLength"
                  visibleField="value"
                  valueField="key"
                  placeholder="Acc. length"
                  required
                  onChange={(fieldName, value) =>
                    handleAcceptanceDataChange(index, fieldName, value)
                  }
                />
                <FormInputItem
                  placeholder="Number"
                  name={["acptDataList", index, "acceptedNo"]}
                  formField="acceptedNo"
                  required
                  onChange={(fieldName, value) =>
                    handleAcceptanceDataChange(index, fieldName, value)
                  }
                />


                <FormDropdownItem
                  dropdownArray={railClassList}
                  name={["acptDataList", index, "railClass"]}
                  formField="railClass"
                  visibleField="value"
                  valueField="key"
                  placeholder="Rail Class"
                  required
                  onChange={(fieldName, value) =>
                    handleAcceptanceDataChange(index, fieldName, value)
                  }
                />
                <IconBtn
                  icon={DeleteOutlined}
                  className="absolute -top-4 right-0"
                  onClick={() => deleteAcptItem(index)}
                />
              </div>
            );
          })}

          <IconBtn
            icon={PlusOutlined}
            text="Add More Acceptance Data"
            className="-mt-4 w-fit"
            onClick={addAcceptanceData}
          />
        </section>

        <Divider />

        <section className="flex flex-col gap-4">
          <h3 className="font-semibold">Add Defect Data</h3>

          {formData.defectDataList?.map((record, index) => {
            return (
              <div
                className="relative flex flex-col gap-2 border p-2 py-4 rounded-md vi-acpt-def"
                key={index}
              >

                <FormDropdownItem
                  dropdownArray={defectCategoryList}
                  name={["defectDataList", index, "defectCategory"]}
                  formField="defectCategory"
                  visibleField="value"
                  valueField="key"
                  placeholder="Defect Cat.."
                  onChange={(fieldName, value) =>
                    handleDefectCategoryChange(index, fieldName, value)
                  }
                />

                <FormDropdownItem
                  dropdownArray={defectTypeList[index] || []}
                  name={["defectDataList", index, "defectType"]}
                  formField="defectType"
                  visibleField="value"
                  valueField="key"
                  placeholder="Defect Type"
                  onChange={(fieldName, value) =>
                    handleDefectDataChange(index, fieldName, value)
                  }
                />
                  <FormInputItem
                    placeholder="Location"
                    name={["defectDataList", index, "location"]}
                    onChange={(fieldName, value) =>
                      handleDefectDataChange(index, fieldName, value)
                    }
                  />

                <FormInputItem
                  placeholder="Position"
                  name={["defectDataList", index, "position"]}
                  onChange={(fieldName, value) =>
                    handleDefectDataChange(index, fieldName, value)
                  }
                />
                <IconBtn
                  icon={DeleteOutlined}
                  className="absolute -top-4 right-0"
                  onClick={() => deleteDefItem(index)}
                />
              </div>
            );
          })}
          <IconBtn
            icon={PlusOutlined}
            text="Add More Defect Data"
            className="-mt-4 w-fit"
            onClick={addDefectData}
          />
        </section>

        <Divider  />

        <section>
          <h3 className="font-semibold mb-2">Rejection Details</h3>
          <div className="border grid grid-cols-2 divide-x divide-y divide-gray-300">
          <h3 className="p-2 text-center">Length</h3>
          <h3 className="p-2 text-center">No. of Pieces</h3>

          <h3 className="p-2 text-center">13m</h3>
          <FormInputItem name="rej13" className="no-border" onChange={handleChange} placeholder='0' />
          <h3 className="p-2 text-center">12m</h3>
          <FormInputItem name="rej12" className="no-border" onChange={handleChange} placeholder='0' />
          <h3 className="p-2 text-center">11m</h3>
          <FormInputItem name="rej11" className="no-border" onChange={handleChange} placeholder='0' />
          <h3 className="p-2 text-center">10m</h3>
          <FormInputItem name="rej10" className="no-border" onChange={handleChange} placeholder='0' />
          <h3 className="p-2 text-center">Comp. length</h3>
          <FormInputItem name="rejCompLength" className="no-border" onChange={handleChange} placeholder='0' />

          </div>
          
          {/* <Table
            dataSource={viRejectionDetailsData}
            columns={viRejectionDetailsColumns}
            scroll={{ x: true }}
            bordered
            pagination={{
              pageSize: 5,
              showSizeChanger: true,
              pageSizeOptions: ["5", "10", "20"],
            }}
          /> */}
        </section>

        <section className="flex flex-col mt-6">
          <h3 className="font-semibold">Remarks</h3>
          <TextAreaComponent
            name="remarks"
            placeholder="Enter remarks"
            rows="5"
            onChange={handleChange}
          />
          <div className="flex mx-auto">
            {/* <Upload
              accept="image/*"
              showUploadList={false}
              onChange={handleFileChange}
            > */}
            <input type="file" onChange={handleFileChange} accept="image/*"/>
              {/* <IconBtn text="Upload Image" icon={UploadOutlined} /> */}
            {/* </Upload> */}
          </div>

          {previewUrl && (
            <Image
              src={previewUrl}
              alt="Preview"
              width={200}
              height={200}
              className="rounded shadow"
            />
          )}

          <Btn htmlType="submit" className="mx-auto mt-6">
            Save Inspection Data
          </Btn>
        </section>
      </FormBody>
    </FormContainer>
  );
};

export default VisualInspectionForm;
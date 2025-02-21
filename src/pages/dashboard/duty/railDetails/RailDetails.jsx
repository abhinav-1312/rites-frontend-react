import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import { Spin, Alert } from "antd";
import SubHeader from '../../../../components/DKG_SubHeader';
import { apiCall } from "../../../../utils/CommonFunctions";
import { useSelector } from "react-redux";
import TableComponent from '../../../../components/DKG_Table';
import Btn from '../../../../components/DKG_Btn';

const RailDetails = () => {
    const { railId } = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [dataSource, setDataSource] = useState([]);
    const [dataSourceSec, setDataSourceSec] = useState([]);
    const { token } = useSelector((state) => state.auth);

    const [showTable, setShowTable] = useState(false);
    const [tableData, setTableData] = useState([]);

    const handleShowTable = () => {
      const filteredData = dataSource.filter(item => item.resultStatus === "fail");
      const aggregatedData = {};
  
      filteredData.forEach(item => {
        const key = `${item.cameraId}-${item.cameraName}`;
        if (!aggregatedData[key]) {
          aggregatedData[key] = {
            railId: item.railId,
            cameraId: item.cameraId,
            cameraName: item.cameraName,
            defectType: [...new Set(item.defectType)],
            distanceFromHead: [item.distanceFromHead] 
          };
        } else {
          if (!aggregatedData[key].distanceFromHead.includes(item.distanceFromHead)) {
            aggregatedData[key].distanceFromHead.push(item.distanceFromHead);
          }
        }
      });
      
      setTableData(Object.values(aggregatedData));
      setShowTable(true);
    };
    
    useEffect(() => {
      const fetchRailDetails = async () => {
        try {
          setLoading(true);
          const { data } = await apiCall(
            "GET",
            `/dashboard/getDimensionalInspectionDtlByRailId?railId=${railId}`,
            token
          );
          const failedData = (data?.responseData || []).filter(item => item.resultStatus === 'fail');
          setDataSource(failedData); 
        } catch (error) {
          setError(error.message || "Failed to fetch rail details.");
        } finally {
          setLoading(false);
        }
      };

      const fetchRailDetailsSec = async () => {
        try {
          setLoading(true);
          const { data } = await apiCall(
            "GET",
            `/dashboard/getSurfaceInspectionDtlByRailId?railId=${railId}`,
            token
          );
          setDataSourceSec(data?.responseData || []); 
        } catch (error) {
          setError(error.message || "Failed to fetch rail details.");
        } finally {
          setLoading(false);
        }
      };
  
      fetchRailDetails();
      fetchRailDetailsSec();
    }, [railId, token]);

    if (loading) {
        return <Spin tip="Loading rail details..." />;
    }
    
    if (error) {
       return <Alert message="Error" description={error} type="error" showIcon />;
    }

    const columns = [
      {
        title: "Rail ID",
        dataIndex: "railId",
        key: "railId",
      },
      {
        title: "Camera",
        dataIndex: "cameraId",
        key: "cameraId",
        filterable: true, 
      },
      {
        title: "Camera Name",
        dataIndex: "cameraName",
        key: "cameraName",
        filterable: true, 
      },
      // {
      //   title: "Edge Diff",
      //   dataIndex: "edgeDiff",
      //   key: "edgeDiff", 
      // },
      // {
      //   title: "Image Diff",
      //   dataIndex: "imageDiff",
      //   key: "imageDiff", 
      // },
      // {
      //   title: "Dimension Deviation",
      //   dataIndex: "dimensionDeviation",
      //   key: "dimensionDeviation", 
      // },
      // {
      //   title: "Actual Status",
      //   dataIndex: "actualStatus",
      //   key: "actualStatus",
      //   filterable: true,
      // },
      {
        title: "Result Status",
        dataIndex: "resultStatus",
        key: "resultStatus",
        filterable: true,
      },
      {
        title: "Defect Type",
        dataIndex: "defectType",
        key: "defectType",
        filterable: true,
      },
      // {
      //   title: "No of Dimension Variation",
      //   dataIndex: "noOfDimensionVariation",
      //   key: "noOfDimensionVariation",
      // }
    ];

    const columnsSec = [
      {
        title: "Camera",
        dataIndex: "cameraId",
        key: "cameraId",
        filterable: true, 
      },
      {
        title: "Camera Name",
        dataIndex: "cameraName",
        key: "cameraName",
        filterable: true, 
      },
      {
        title: "Distance",
        dataIndex: "distance",
        key: "distance", 
      },
      {
        title: "Label Index",
        dataIndex: "labelIndex",
        key: "labelIndex", 
      },
      {
        title: "Label Name",
        dataIndex: "labelName",
        key: "labelName", 
        filterable: true,
      },
      {
        title: "Confidence",
        dataIndex: "confidence",
        key: "confidence"
      },
      {
        title: "AI Status",
        dataIndex: "aiStatus",
        key: "aiStatus",
        filterable: true,
      },
      {
        title: "Admin Status",
        dataIndex: "adminStatus",
        key: "adminStatus",
        filterable: true
      }
    ];

    const clubbedColumns = [
      {
        title: 'Rail ID',
        dataIndex: 'railId',
        key: 'railId',
      },
      {
        title: 'Camera ID',
        dataIndex: 'cameraId',
        key: 'cameraId',
      },
      {
        title: 'Camera Name',
        dataIndex: 'cameraName',
        key: 'cameraName',
      },
      {
        title: 'Defect Types',
        dataIndex: 'defectType',
        key: 'defectType',
        render: defectType => defectType.join(', '),
      },
      {
        title: 'Distance From Head',
        dataIndex: 'distanceFromHead',
        key: 'distanceFromHead',
        render: distanceFromHead => distanceFromHead.join(', '),
      },
    ];

  return (
    <div className="flex flex-col gap-4 md:gap-2 bg-white p-4 w-full md:w-4/5 mx-auto h-[100vh] md:h-fit">
      <SubHeader title="Dimension Defect Summary" link="/" />
      <TableComponent dataSource={dataSource} columns={columns} bordered/>

      <div className='flex justify-center'>
        <Btn type="primary" className='w-36' onClick={handleShowTable}>Summarized Data</Btn>
      </div>

      {showTable && (
        <TableComponent
          dataSource={tableData}
          columns={clubbedColumns}
          rowKey="cameraId"
          loading={loading}
          pagination={false}
          bordered
        />
      )}

      <SubHeader title="Surface Defect Summary" link="/" />
      <TableComponent dataSource={dataSourceSec} columns={columnsSec} bordered/>
    </div>
  )
}

export default RailDetails
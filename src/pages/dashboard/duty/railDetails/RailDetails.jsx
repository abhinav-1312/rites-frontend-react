import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import { Spin, Alert } from "antd";
import SubHeader from '../../../../components/DKG_SubHeader';
import { apiCall } from "../../../../utils/CommonFunctions";
import { useSelector } from "react-redux";
import TableComponent from '../../../../components/DKG_Table';

const RailDetails = () => {
    const { railId } = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [dataSource, setDataSource] = useState([]);
    const [dataSourceSec, setDataSourceSec] = useState([]);
    const { token } = useSelector((state) => state.auth);

    useEffect(() => {
      const fetchRailDetails = async () => {
        try {
          setLoading(true);
          const { data } = await apiCall(
            "GET",
            `/dashboard/getDimensionalInspectionDtlByRailId?railId=${railId}`,
            token
          );
          setDataSource(data?.responseData || []); 
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
        title: "Camera",
        dataIndex: "cameraId",
        key: "cameraId",
        filterable: true, 
      },
      {
        title: "Edge Diff",
        dataIndex: "edgeDiff",
        key: "edgeDiff", 
      },
      {
        title: "Image Diff",
        dataIndex: "imageDiff",
        key: "imageDiff", 
      },
      {
        title: "Dimension Deviation",
        dataIndex: "dimensionDeviation",
        key: "dimensionDeviation", 
      },
      {
        title: "Actual Status",
        dataIndex: "actualStatus",
        key: "actualStatus",
        filterable: true,
      },
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
      {
        title: "No of Dimension Variation",
        dataIndex: "noOfDimensionVariation",
        key: "noOfDimensionVariation",
      }
    ];

    const columnsSec = [
      {
        title: "Camera",
        dataIndex: "cameraId",
        key: "cameraId",
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

  return (
    <div className="flex flex-col gap-4 md:gap-2 bg-white p-4 w-full md:w-4/5 mx-auto h-[100vh] md:h-fit">
      <SubHeader title="Dimensional Summary" link="/" />
      <TableComponent dataSource={dataSource} columns={columns} bordered/>

      <SubHeader title="Surface Summary" link="/" />
      <TableComponent dataSource={dataSourceSec} columns={columnsSec} bordered/>
    </div>
  )
}

export default RailDetails
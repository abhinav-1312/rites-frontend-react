import React, { useState } from 'react'
import {LineChartOutlined, EyeOutlined, ExperimentOutlined, ToolOutlined, DatabaseOutlined, CompassOutlined, DeploymentUnitOutlined, RadarChartOutlined, AuditOutlined, MessageOutlined } from '@ant-design/icons';
import VerificationIso from './VerificationIso';
import FormContainer from '../../../../components/DKG_FormContainer';

const SmsIsoMain = () => {
    const smsIsoTabs = [
        {
            title: "Verification ISO Report",
            icon: <LineChartOutlined />,
            activeTab: 0
        },
        {
            title: "Chemical Analysis ISO Report",
            icon: <ExperimentOutlined />,
            activeTab: 1
        },
    ]

    const [activeTab, setActiveTab] = useState(0);
    
  return (
    <FormContainer>

        <div className="grid grid-cols-2 gap-x-2">

        {
            smsIsoTabs.map(item => (
                <div onClick={() => setActiveTab(item.activeTab)} className={`flex justify-between items-center  border border-darkBlueHover w-full p-2 px-4 gap-4 rounded-lg shadow-lg bg-gray-200 cursor-pointer hover:bg-gray-300 ${activeTab === item.activeTab ? 'border-b-2' : ''}`}>
                <span className="records-tab-icon">{item.icon}</span>
                <span className="font-medium">
                  {item.title}
                </span>
              </div>
            ))
        }
        </div>
        {
            activeTab === 0 && (
                <div>
                    <h1 className="text-2xl font-semibold text-center">Verification ISO</h1>
                <VerificationIso />
                </div>
            )
        }
        {
            activeTab === 1 && (
                <div>
                    <h1 className="text-2xl font-semibold text-center">Verification ISO</h1>
                <VerificationIso />
                </div>
            )
        }
      
    </FormContainer>
  )
}

export default SmsIsoMain

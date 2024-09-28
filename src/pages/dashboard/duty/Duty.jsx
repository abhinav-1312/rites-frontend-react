import React from 'react'
import {HomeOutlined} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import Tab from '../../../components/Tab';
const dutyItemTabs = [
  {
    id: 1,
    title: 'SMS',
    icon: <HomeOutlined />,
    link: '/sms/dutyStart'
  },
  {
    id: 2,
    title: 'Rolling Stage',
    icon: <HomeOutlined />
  },
  {
    id: 3,
    title: 'NDT',
    icon: <HomeOutlined />
  },
  {
    id: 4,
    title: 'Testing',
    icon: <HomeOutlined />
  },
  {
    id: 5,
    title: 'Visual Inspection',
    icon: <HomeOutlined />
    
  },
  {
    id: 6,
    title: 'Welding Inspection',
    icon: <HomeOutlined />
  },
  {
    id: 7,
    title: 'Short Rail Inspection',
    icon: <HomeOutlined />
  },
  {
    id: 8,
    title: 'QCT',
    icon: <HomeOutlined />
  },
  {
    id: 9,
    title: 'Calibration',
    icon: <HomeOutlined />
  },
  {
    id: 10,
    title: 'Info',
    icon: <HomeOutlined />
  },
]

const Duty = () => {
  const navigate = useNavigate()
  const renderDutyItemTabs = () =>
    dutyItemTabs.map(item => {
      return (
        <Tab  title={item.title} icon={item.icon} onClick={()=> navigate(item.link)} />
      )
    })
  return (
    <section>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {renderDutyItemTabs()}
      </div>
    </section>
  )
}

export default Duty

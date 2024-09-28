import React, { useContext } from 'react'
import { Input } from 'antd';
import {HomeOutlined, BellOutlined, FileTextOutlined, RobotOutlined, LineChartOutlined, ProfileOutlined, UserOutlined} from '@ant-design/icons';
import Home from './home/Home';
import Duty from './duty/Duty';
import Records from './records/Records';
import AiSystem from './aiSystem/AiSystem';
import DataAnalysis from './dataAnalysis/DataAnalysis';
import IsoReports from './isoReports/IsoReports';
import Admin from './admin/Admin';
import { ActiveTabContext } from '../../context/dashboardActiveTabContext';

const { Search } = Input;


const dashboardTabItems = [
  {
    id: 1,
    title: 'Home',
    icon: <HomeOutlined />
  },
  {
    id: 2,
    title: 'Duty',
    icon: <BellOutlined />
  },
  {
    id: 3,
    title: 'Records',
    icon: <FileTextOutlined />
  },
  {
    id: 4,
    title: 'AI System',
    icon: <RobotOutlined />
  },
  {
    id: 5,
    title: 'Data Analysis',
    icon: <LineChartOutlined />
  },
  {
    id: 6,
    title: 'ISO Reports',
    icon: <ProfileOutlined />
  },
  {
    id: 7,
    title: 'Admin',
    icon: <UserOutlined />
  },
]

const Dashboard = () => {
  // const [activeTab, setActiveTab] = useState(1)
  const {activeTab, setActiveTab} = useContext(ActiveTabContext)
  const renderDashboardTabItems = () => 
    dashboardTabItems.map(item=> {
      return (
        <div 
          key={item.id} 
          onClick={() => setActiveTab(item.id)}
          className={`cursor-pointer ${activeTab === item.id ? 'border-b-2 border-pink' : ''}`}
        >
          <span className='dashboard-tab-icon'>{item.icon}</span> <br />
          <div className='text-center w-full'>{item.title}</div>
          </div>
      )
    })

    const renderTab = () => {
      switch (activeTab){
        case 1:
          return <Home />
        case 2:
          return <Duty />
        case 3:
          return <Records />
        case 4:
          return <AiSystem />
        case 5:
          return <DataAnalysis />
        case 6:
          return <IsoReports />
        case 7:
          return <Admin />
        default:
          break
      }
    }

  return (
    <div className='flex flex-col gap-4 md:gap-8 bg-white p-4 w-full md:w-4/5 mx-auto min-h-[100] h-fit md:h-fit'>
    <section>
      <Search placeholder='Search' className='dashboard-search' />
    </section>
    <section>
    <div className="dashboard-tabs grid grid-cols-4 gap-4 bg-darkBlue rounded text-offWhite p-4">
      {renderDashboardTabItems()}
    </div>
    </section>
    <section>
      {renderTab()}
    </section>
    </div>
  )
}

export default Dashboard
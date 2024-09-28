import React from 'react'
import Tab from './Tab'
import { useNavigate } from 'react-router-dom'

const TabList = ({tabList}) => {
    const navigate = useNavigate()
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {
            tabList?.map((tab, key) => {
                return (
                    <Tab key={key} title={tab.title} icon={tab.icon} onClick={() => navigate(tab.link)} />
                )
            })
        }
    </div>
  )
}

export default TabList

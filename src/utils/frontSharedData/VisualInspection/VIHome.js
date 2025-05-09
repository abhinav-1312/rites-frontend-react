import { FileSearchOutlined, EyeOutlined, PieChartOutlined }from '@ant-design/icons';

const visualHomeTabs = [
    {
      title: 'Visual Inspection',
      icon: <EyeOutlined />,
      link: "/visual/inspection"
    },
    {
      title: 'Shift Inspection Summary',
      icon: <FileSearchOutlined />,
      link: "/visual/summary"
    },
    // {
    //   title: 'Test Sample Marking',
    //   icon: <PieChartOutlined />,
    //   link: "/stage/testSampleMarkingList"
    // },
]

export default visualHomeTabs;
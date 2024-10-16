import { FileSearchOutlined, HistoryOutlined, DashboardOutlined, ExperimentOutlined, ForkOutlined, ControlOutlined, EyeOutlined, PieChartOutlined }from '@ant-design/icons';

const stageHomeTabs = [
    {
      title: 'Rail Rolling Control',
      icon: <ControlOutlined />,
      link: "/stage/rollingControl"
    },
    {
      title: 'URM Rolling Verification',
      icon: <DashboardOutlined />,
      link: "/stage/urmVerification"
    },
    {
      title: 'Rail Finishing Verification',
      icon: <HistoryOutlined />,
      link: "/stage/finishingVerification"
    },
    {
        title: 'Testing Sample Marking',
        icon: <ExperimentOutlined />,
        link: "/stage/testSampleMarkingList"
    },
    {
        title: 'HT Sequence',
        icon: <ForkOutlined />,
        link: "/stage/htSequence"
    },
]

export default stageHomeTabs;
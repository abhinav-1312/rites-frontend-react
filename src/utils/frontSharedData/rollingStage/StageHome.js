import { FileSearchOutlined, EyeOutlined, PieChartOutlined }from '@ant-design/icons';

const stageHomeTabs = [
    {
      title: 'Rail Rolling Control',
      icon: <EyeOutlined />,
      link: "/stage/rollingControl"
    },
    {
      title: 'URM Rolling Verification',
      icon: <FileSearchOutlined />,
      link: "/stage/urmVerification"
    },
    {
      title: 'Rail Finishing Verification',
      icon: <PieChartOutlined />,
      link: "/stage/finishingVerification"
    },
    {
        title: 'Testing Sample Marking',
        icon: <EyeOutlined />,
        link: "/stage/testSample/list"
    },
    {
        title: 'HT Sequence',
        icon: <FileSearchOutlined />,
        link: "/stage/htSequence"
    },
]

export default stageHomeTabs;
import { Button, Input, Radio, Space, Table } from 'antd'
import React, { useRef, useState } from 'react'
import CustomDatePicker from '../../../components/DKG_CustomDatePicker'
import FormBody from '../../../components/DKG_FormBody'
import Btn from '../../../components/DKG_Btn'
import moment from 'moment'
import {SearchOutlined} from '@ant-design/icons';
import Highlighter from 'react-highlight-words';

// Sample data
const data = [
  {
      key: '1',
      railID: 'U110324B001',
      surfaceDefectDetection: { precision: 0.91, recall: 0.89 },
      dimensionalVariationDetection: { precision: 0.88, recall: 0.84 },
      ocr: 'True',
  },
  {
      key: '2',
      railID: 'U110324B002',
      surfaceDefectDetection: { precision: 0.93, recall: 0.92 },
      dimensionalVariationDetection: { precision: 0.86, recall: 0.83 },
      ocr: 'False',
  },
  {
      key: '3',
      railID: 'U110324B003',
      surfaceDefectDetection: { precision: 0.90, recall: 0.91 },
      dimensionalVariationDetection: { precision: 0.89, recall: 0.87 },
      ocr: 'True',
  },
  {
      key: '4',
      railID: 'U110324B004',
      surfaceDefectDetection: { precision: 0.85, recall: 0.88 },
      dimensionalVariationDetection: { precision: 0.87, recall: 0.86 },
      ocr: 'True',
  },
  {
      key: '5',
      railID: 'U110324B005',
      surfaceDefectDetection: { precision: 0.92, recall: 0.90 },
      dimensionalVariationDetection: { precision: 0.84, recall: 0.82 },
      ocr: 'True',
  },
  {
      key: '6',
      railID: 'U110324B006',
      surfaceDefectDetection: { precision: 0.94, recall: 0.93 },
      dimensionalVariationDetection: { precision: 0.90, recall: 0.88 },
      ocr: 'True',
  },
  {
      key: '7',
      railID: 'U110324B007',
      surfaceDefectDetection: { precision: 0.89, recall: 0.87 },
      dimensionalVariationDetection: { precision: 0.85, recall: 0.81 },
      ocr: 'False',
  },
  {
      key: '8',
      railID: 'U110324B008',
      surfaceDefectDetection: { precision: 0.86, recall: 0.84 },
      dimensionalVariationDetection: { precision: 0.88, recall: 0.90 },
      ocr: 'True',
  },
  {
      key: '9',
      railID: 'U110324B009',
      surfaceDefectDetection: { precision: 0.95, recall: 0.94 },
      dimensionalVariationDetection: { precision: 0.91, recall: 0.89 },
      ocr: 'True',
  },
  {
      key: '10',
      railID: 'U110324B010',
      surfaceDefectDetection: { precision: 0.87, recall: 0.86 },
      dimensionalVariationDetection: { precision: 0.82, recall: 0.80 },
      ocr: 'False',
  },
];



const AiSystem = () => {
  const [timePeriod, setTimePeriod] = useState('shift')
  const [shiftDate, setShiftDate] =useState('')
  const [weekStartDate, setWeekStartDate] = useState('')
  const [weekEndDate, setWeekEndDate] = useState('')
  const [monthStartDate, setMonthStartDate] = useState('')
  const [monthEndDate, setMonthEndDate] = useState('')
  const [yearStartDate, setYearStartDate] = useState('')
  const [yearEndDate, setYearEndDate] = useState('')

  const handleShiftChange = (_, value) => {
    setShiftDate(value)
  }

  const handleWeekEndChange = (_, value) => {
    const [day, month, year] = value.split('/').map(Number);
    const date = new Date(year, month - 1, day);
    date.setTime(date.getTime() - (7 * 24 * 60 * 60 * 1000));
    const newDay = String(date.getDate()).padStart(2, '0');
    const newMonth = String(date.getMonth() + 1).padStart(2, '0');
    const newYear = date.getFullYear();
    const weekStartDate = `${newDay}/${newMonth}/${newYear}`
    setWeekStartDate(weekStartDate)
    setWeekEndDate(value)
  }

  const handleMonthEndChange = (_, value) => {
  const date = moment(value, 'DD/MM/YYYY', true);
  if (!date.isValid()) {
    throw new Error('Invalid date format. Please use DD/MM/YYYY.');
  }
  const oneMonthBefore = date.subtract(1, 'months');
  const formattedValue = oneMonthBefore.format('DD/MM/YYYY');
  setMonthStartDate(formattedValue)
  setMonthEndDate(value)
  }

  const handleYearEndChange = (_, value) => {
  const date = moment(value, 'DD/MM/YYYY', true);
  if (!date.isValid()) {
    throw new Error('Invalid date format. Please use DD/MM/YYYY.');
  }
  const oneYearBefore = date.subtract(1, 'years');
    const formattedValue = oneYearBefore.format('DD/MM/YYYY');
    setYearStartDate(formattedValue)
    setYearEndDate(value)
  }

  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1677ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: 'Rail ID',
      dataIndex: 'railID',
      key: 'railID',
      ...getColumnSearchProps('railID')
    },
    {
      title: 'Surface Defect Detection',
      key: 'surfaceDefectDetection',
      children: [
        {
          title: 'Precision',
          dataIndex: ['surfaceDefectDetection', 'precision'],
          key: 'surfaceDefectDetectionPrecision',
        },
        {
          title: 'Recall',
          dataIndex: ['surfaceDefectDetection', 'recall'],
          key: 'surfaceDefectDetectionRecall',
        },
      ],
    },
    {
      title: 'Dimensional Variation Detection',
      key: 'dimensionalVariationDetection',
      children: [
        {
          title: 'Precision',
          dataIndex: ['dimensionalVariationDetection', 'precision'],
          key: 'dimensionalVariationDetectionPrecision',
        },
        {
          title: 'Recall',
          dataIndex: ['dimensionalVariationDetection', 'recall'],
          key: 'dimensionalVariationDetectionRecall',
        },
      ],
    },
    {
      title: 'OCR',
      dataIndex: 'ocr',
      key: 'ocr',
      filters: [
        {
          text: "True",
          value: "True"
        },
        {
          text: "False",
          value: "False"
        },
      ],
      onFilter: (value, record) => record?.ocr?.indexOf(value) === 0,
    },
  ];

  const tabColorList = [
    "#004B4D", // Deep Teal
    "#2E1A47", // Midnight Purple
    "#2B3A70", // Slate Blue
    "#3B3C36", // Dark Olive Green
    "#4A0C0C", // Crimson Red
    "#1E1A78", // Indigo Night
    "#003B5C", // Deep Sea Blue
    "#4A5A3D"  // Moss Green
  ];

  const tabs = [
    {
      title: ["Total", "Rail IDs"],
      value: "10",
    },
    {
      title: ["Avg. Precision", "Surface Defect"],
      value: "0.91",
    },
    {
      title: ["Avg. Recall", "Surface Defect"],
      value: "0.87",
    },
    {
      title: ["Avg. Precision", "Dim. Variation"],
      value: "0.54",
    },
    {
      title: ["Avg. Recall", "Dim. Variation"],
      value: "0.45",
    },
    {
      title: ["True", "OCR"],
      value: "93%",
    },
  ]

  const renderTabs = () => {
    return tabs.map((tab, index) => (
      <div key={index} className='p-4 border shadow-lg rounded-lg' 
        style={{ backgroundColor: tabColorList[index] }}
      >
        <div className='!text-4xl font-bold text-white text-center'>{tab.value}</div> <br />
        <div className='text-white text-center'>{tab.title[0]}</div>
        <div className='text-white text-center !text-2xl'>{tab.title[1]}</div>
      </div>
    ));
  };


  return (
    <>
    <FormBody
      initialValues={
        {
          timePeriod,
          weekStartDate,
          weekEndDate,
          monthStartDate,
          monthEndDate,
          yearStartDate,
          yearEndDate
        }
      }
    >

     <h1 className='font-semibold mb-4 md:!text-2xl -mt-2 text-center'>AI System Accuracy Dashboard</h1> 
     <div>
      <h2 className='font-medium md:!text-xl'>
      Time Period
      </h2>
      <Radio.Group value={timePeriod} onChange={(e) => setTimePeriod(e.target.value)} className='grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-8 mb-4'>
        <Radio value='shift'>Shift</Radio>
        <Radio value='weekly'>Weekly</Radio>
        <Radio value='monthly'>Monthly</Radio>
        <Radio value='yearly'>Annually</Radio>
      </Radio.Group>
    </div>
      <div className='flex gap-8 items-center'>
    {
      timePeriod === 'shift' &&
      <CustomDatePicker label='Shift Date' value={shiftDate} name='shiftDate' onChange={handleShiftChange} />
    }

    {
      timePeriod === 'weekly' && 
      <>
      <CustomDatePicker label='Week End Date' name='weekEndDate' value={weekEndDate} onChange={handleWeekEndChange}/>
      <CustomDatePicker label='Week Start Date' name='weekStartDate' value={weekStartDate} disabled />
      </>
    }
    {
      timePeriod === 'monthly' &&
      <>
      <CustomDatePicker label='Month End Date' name='monthEndDate' value={monthEndDate} onChange={handleMonthEndChange}/>
      <CustomDatePicker label='Month Start Date' name='monthStartDate' value={monthStartDate} disabled />
      </>
    }
    {
      timePeriod === 'yearly' &&
       <>
      <CustomDatePicker label='Year End Date' name='yearEndDate' value={yearEndDate} onChange={handleYearEndChange}/>
      <CustomDatePicker label='Year Start Date' name='weekStartDate' value={yearStartDate} disabled />
      </>
    }
    <Btn htmlType='submit'> Search </Btn>
     </div>
    </FormBody>

    <section className='grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 md:gap-x-8 mb-8'>
      {renderTabs()}
    </section>

    <Table
      columns={columns}
      scroll={{ x: true }}
      dataSource={data}
      pagination={{
        pageSize: 5,
        showSizeChanger: true, 
        pageSizeOptions: ['5', '10', '20'], // Options for page size
      }}
    />
    </>
  )
}

export default AiSystem
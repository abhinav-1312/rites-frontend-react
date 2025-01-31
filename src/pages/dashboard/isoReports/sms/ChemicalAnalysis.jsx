import React, { useRef } from 'react'
import SearchFilter from './SearchFilter'
import IsoHeader from '../../../../components/DKG_IsoHeader';

const ChemicalAnalysis = () => {
    const repRef = useRef();
    const onFinish = async (formData) => {

    }
  return (
    <div>
      <SearchFilter showDate showShift showRailGrade showRailSection showSms onFinish={onFinish} />
      <div className='a4-container' ref={repRef}>
        <IsoHeader 
            engTitle="RITES Ltd, Bhilai"
            hinTitle="राइट्स लिमिटेड, भिलाई"
        />
      </div>
    </div>
  )
}

export default ChemicalAnalysis

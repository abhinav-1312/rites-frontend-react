import React from 'react'

const FormContainer = ({children, className}) => {
  return (
    <div className={`md:w-1/2 min-h-full overflow-y-auto md:min-h-fit md:border bg-offWhite md:border-gray-400 p-4 md:px-8 md:py-4 rounded-md md:shadow-2xl md:mx-auto flex flex-col gap-4 md:gap-8 ${className}`}>
      {children}
    </div>
  )
}

export default FormContainer

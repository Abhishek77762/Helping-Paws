import React ,{useId}from 'react'

const Input = React.forwardRef(function input({
    label,
    type='text',
    className="",
    ...props
},ref) {
    const id = useId()
  return (
    <div className='w-full'>
        {label && <label htmlFor={id} className='block text-sm font-medium text-gray-700'>{label}</label>}
        <input type={type} 
        className={`px-3 py-2 rounded-lg bg-white text-black ouline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full mb-1 ${className}`}
        ref={ref}
        {...props}
        />
    </div>
  )
})

export default Input
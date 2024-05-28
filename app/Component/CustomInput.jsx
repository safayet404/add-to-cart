import React from 'react'

const CustomInput = (props) => {
    const {type,label,i_id,className,name,list,value,placeholder,onChange,onBlur} = props
  return (
    <div>
       <label htmlFor={label}>{label}</label>
      <input
        type={type}
        className={`form-control ${className}`}
        id={i_id}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        list={list}
      />
     
    </div>
  )
}

export default CustomInput
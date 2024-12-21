import React from 'react'

type InputProps = React.ComponentProps<'input'> & {
  label: string,
  id: string
}

const Input = ({label, id, ...props} : InputProps) => {
  return (
    <div style={{marginBottom: '1rem'}}>
      <label htmlFor={label}>{label}</label>
      <input {...props} name={label} id={label}/>
    </div>
  )
}

export default Input
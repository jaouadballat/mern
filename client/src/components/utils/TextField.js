import React from 'react'

export default ({
    error,
    placeholder,
    type,
    onChange,
    name,
    value,
    info,
    disabled
}) => {
  return (
    <div className="form-group">
        <input type={type} className={`form-control form-control-lg ${error ? "is-invalid" : ""}`} placeholder={placeholder} name={name} value={value} onChange={onChange} disabled={disabled}/>
      {info ? <small className="form-text text-muted">{info}</small> : ''}
        {error ? <div className="invalid-feedback">{error}</div> : ""}
    </div>
  )
}

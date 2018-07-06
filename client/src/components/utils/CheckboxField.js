import React from 'react'

export default ({
    name,
    value,
    onClick,
    label

}) => {
  return (
    <div className="form-check mb-4">
        <input className="form-check-input" type="checkbox" name={name} value={value} onClick={onClick} />
        <label className="form-check-label">
            { label }
    </label>
    </div>
  )
}

import React from 'react'

export default ({
    error,
    placeholder,
    onChange,
    name,
    value,
    info
}) => {
    return (
        <div className="form-group">
            <textarea name={name} placeholder={placeholder} className={`form-control form-control-lg ${error ? "is-invalid" : ""}`} onChange={onChange} value={value}></textarea>
            {info ? <small className="form-text text-muted">{info}</small> : ''}
            {error ? <div className="invalid-feedback">{error}</div> : ""}
        </div>
    )
}

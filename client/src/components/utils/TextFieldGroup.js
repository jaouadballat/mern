import React from 'react'

export default ({
    placeholder,
    onChange,
    name,
    value
}) => {
    return (
        <div className="input-group mb-3">
            <div className="input-group-prepend">
                <span className="input-group-text">
                    <i className={`fa fa-${name}`}></i>
                </span>
            </div>
            <input type="text" className="form-control form-control-lg" placeholder={placeholder} name={name} onChange={onChange} value={value} />
        </div>

    )
}

import React from 'react'

const options = [
    {
        name: '* Select Professional Status',
        value: 0
    },
    {
        name: 'Developer',
        value: 'Developer'
    },
    {
        name: 'Junior Developers',
        value: 'Junior Developer'
    },
    {
        name: 'Manager',
        value: 'Manager'
    },
    {
        name: 'Senior Developer',
        value: 'Senior Developer'
    },
    {
        name: 'Student or Learning',
        value: 'Student or Learning'
    },
    {
        name: 'Instructor or Teacher',
        value: 'Instructor or Teacher'
    },
    {
        name: 'Intern',
        value: 'Intern'
    },
    {
        name: 'Other',
        value: 'Other'
    }
]

const renderOption = options.map((option, index) => (
    <option value={option.value} key={index}>{option.name}</option>
));


export default ({
    error,
    placeholder,
    type,
    onChange,
    name,
    value,
    info
}) => {
    return (
        <div className="form-group">
            <select className={`form-control form-control-lg ${error ? "is-invalid" : ""}`} name={name} onChange={onChange} >

                {renderOption }

            </select>
            {info ? <small className="form-text text-muted">{info}</small> : ''}
            {error ? <div className="invalid-feedback">{error}</div> : ""}
        </div>
    )
}

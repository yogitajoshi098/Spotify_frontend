

import React from 'react'

export default function CalenderInputMonth({ name, label,
    onChange,
    onBlur,
    value,
    touched,
    errors }) {
    return (

        <div className='flex flex-col justify-between w-full mb-6 space-y-2 md:w-[30%]'>
            <label htmlForor={label} className="font-semibold">{label}</label>

            <select className='p-3 text-gray-500 border border-gray-500 hover:border-blue-500 focus:outline-none focus:ring focus:ring-blue-200' onChange={onChange} onBlur={onBlur} value={value} name={name} id="month" defaultValue="">
                <option disabled value="">Month</option>
                <option value="January">January</option>
                <option value="February">February</option>
                <option value="March">March</option>
                <option value="April">April</option>
                <option value="May">May</option>
                <option value="June">June</option>
                <option value="July">July</option>
                <option value="August">August</option>
                <option value="September">September</option>
                <option value="October">October</option>
                <option value="November">November</option>
                <option value="December">December</option>
            </select>
            {touched[name] && errors[name] && <div className="text-sm text-red-700">{errors[name]}</div>}


        </div >
    )
}


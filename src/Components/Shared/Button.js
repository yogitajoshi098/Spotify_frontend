import React from 'react'

function Button({ bText, className, onClick }) {
  return (
    <div>
      <button className={'flex justify-center items-center text-black rounded-3xl ' + className} onClick={onClick}  >{bText}</button>
    </div>
  )
}
export default Button
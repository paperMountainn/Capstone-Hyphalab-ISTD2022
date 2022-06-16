import React from 'react'
import './button.scss'
export const MyButton = ({label}) => {
  return (
    <div data-testid="button" className='button-style'>{label}</div>
  )
}

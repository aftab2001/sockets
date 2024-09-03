import React from 'react'

export const Events = ({events}) => {
  return (
    <div>
        <ul>
            {
                events.map((event,index)=>
                <li key={index}>{event}</li>
                )
            }
        </ul>
    </div>
  )
}


import React from 'react'
import {withRouter} from 'react-router-dom'
import {formatDate} from "../../utils/date";

export const ListItem = withRouter(({data, lastElement, history}) => {
  const {date, time} = formatDate(data.created_at)

  return (
    <div className='Article-list-item' style={lastElement ? {border: 'none'} : {}}>
      <p onClick={() => {history.push(`/article/${data.id}`)}}
         className='Article-list-item-left'>{data.heading}</p>
      <p className='Article-list-item-right'>
        <i>{date}</i>
        <i>{time}</i>
      </p>
    </div>
  )
})
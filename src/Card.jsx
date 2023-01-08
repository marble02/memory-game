import React from 'react'

function Card(props) {
  return (
    <div className={props.paired ? "paired": "card-item"} onClick={props.handleClick}>
        {props.reveal ? <span>{props.num}</span> : <span>{props.paired ? "" : "*"}</span>}
    </div>
  )
}

export default Card
import React from 'react'

const Food=(props)=> {
    const style={
        left:`${props.fooddot[0]}%`,
        top:`${props.fooddot[1]}%`
    }
    return (
        <div className="food" style={style}>
            
        </div>
    )
}

export default Food


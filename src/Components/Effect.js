import React, { useEffect, useState } from 'react'

function Effect() {
    const [count,setCount] = useState(0)
    useEffect(()=>{
        console.log("inital");
        // console.log(msg)
        console.log("The value updated",count);
    },[count])
  return (
    <div>
        <p>{count}</p>
        <button onClick={()=>setCount(count+1)}>+</button>
    </div>
  )
}

export default Effect;
import { Button } from '@heroui/react'
import React, { useMemo, useState } from 'react'

export default function TestHook() {

    const [counter1, setCounter1] = useState(0)
    const [counter2, setCounter2] = useState(0)
   const isEven =  useMemo(()=> {
    console.log('hi');
    
    return counter1 % 2 == 0
   } , [counter1])
return <>
      <div className="grid grid-cols-3">
        <div className="p-4">
          <h2>Counter is :{counter1}</h2>
          <Button onPress={()=> setCounter1(counter1 +1)}>Change</Button>
          <h2 className='py-4'>{isEven ? 'event' : 'odd'}</h2>
        </div>
        <div className="p-4">
          <h2>Counter is :{counter2}</h2>
          <Button onPress={()=> setCounter2(counter2 +1)}>Change</Button>
        </div>
      </div>
  </>
}

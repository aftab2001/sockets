import React, { useState } from 'react'
import { socket } from '../socket';

export const MyForm = () => {
    const [value,setValue] =useState('');
    const [isLoading,setIsLoading]=useState(false);

    const onSubmit = (e)=>{
        e.preventDefault();
        setIsLoading(true);

        socket.timeout(5000).emit('create-something',value,()=>{
            console.log('sent data')
            setIsLoading(false);
        })
    }
  return (
    <div>
        <form onSubmit={onSubmit}>
            <input 
            onChange={e => setValue(e.target.value)}
            />
            <button type='submit' disabled={isLoading}>Submit</button>
        </form>
    </div>
  )
}

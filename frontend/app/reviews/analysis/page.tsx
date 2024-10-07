'use client';

import React, { useState } from 'react';
import ReplyGenerator from '@/components/ui/ReplyGenerator';
import ReviewAnalyzer from '@/components/ui/ReviewAnalyzer';
  

export default function Page(){
    const [inputValue, setInputValue] = useState('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);

    }
    
    return (
        <div className='w-full flex flex-col gap-y-6'>
            <ReviewAnalyzer review={inputValue} handleChange={handleChange}/>
           
            <ReplyGenerator review={inputValue} />

        </div>
    )
}
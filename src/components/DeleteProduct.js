'use client';
import axios from 'axios'
import React from 'react'
import { useRouter } from 'next/navigation';

export default function DeleteProduct({ID}) {
    const router = useRouter();
    const removeProduct = async() => {
        const confirmed = confirm("ARE YOU SURE");
        if(!confirmed){
            return;
        }
        try{
        const response = await axios.get(`http://127.0.0.1:8000/api/deleteProduct?ID=${ID}`)
        if (response.data.success) {
            router.refresh();
            return response.data;
          } else {
            return [];
          }
        } catch (error) {
          console.error('Error fetching products:', error);
          return [];
        }
    }
  return (
    <>
      <button onClick={removeProduct} className='btn btn-error'>
          Delete
      </button>
    </>
  )
}

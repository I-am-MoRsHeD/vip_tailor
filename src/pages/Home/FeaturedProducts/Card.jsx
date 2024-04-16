import React from 'react'
import { Rating } from '@smastrom/react-rating';
import { FaDollarSign } from "react-icons/fa6";


const Card = ({img}) => {
    return (
        <div className='mb-5 mt-4 mx-0'>
            <div className="">
                <div className='lg:h-[450px] md:h-[380px] h-[300px] '>
                    <img alt="Product Image" className="w-full h-full object-cover " src={img} />
                </div>
                <div className='mt-3 flex flex-col gap-1'>
                    <h1 className="font-medium">Stylish Black Suit</h1>
                    <h3 className='font-bold'>BDT 5000</h3>
                </div>
            </div>
        </div>
    )
}

export default Card

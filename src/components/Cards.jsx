import { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from '@mui/material';

const Cards = () => {
    const [product, setProduct] = useState(null);
       

    useEffect(() => {

        axios.get(`https://dummyjson.com/products/${2}`)
            .then((response) => {
                setProduct(response.data);
            })
            .catch((error) => {
                console.error('Error in fetching the product');
            });
    }, []);

    return (
        <div>
        <div className='flex flex-col gap-3 p-2 mt-10 text-black rounded-xl bg-[#f5deb3] w-[400px] md:w-[300px] rounded-tr-none relative mb-10'>
            {product ? (
                <>
                    <div className='flex justify-between items-baseline'> 
                        <p className='text-xl font-bold'>{product.title}</p>
                        <div className='w-[60px] h-[60px] bg-black text-[#f5deb3] p-2 flex items-center justify-center rounded-full rounded-tr-none'>
                            <p className='text-sm'>${product.price}</p>
                        </div>
                    </div>
                    <div className='bg-red-600 h-[70px] w-[70px] text-white flex justify-center items-center rounded-full absolute top-[-10%] left-[-6%]'>
                        {product.discountPercentage}%off
                    </div>
                    <img 
                        src={product.images[0]} 
                        alt={product.title} 
                        className='w-full h-[200px] object-contain' 
                    />
                    <div className='flex gap-3 justify-center'>
                        <p className='font-bold border-r-2 px-2 border-black'>{product.brand}</p>
                        <p>{product.category}</p>
                    </div>
                    <p>{product.description}</p>
                    <div className='flex gap-10 justify-center'>
                        <Button 
                            variant='contained' 
                            sx={{backgroundColor: "black", color: "#f5deb3", fontWeight: "bold", borderRadius: '15px', width: '80px'}}
                        >
                            ADD
                        </Button>
                        <Button 
                            variant='outlined' 
                            sx={{borderColor: "black", color: "black", fontWeight: "bold", borderWidth: 2, borderRadius: '15px', width: '80px'}}
                        >
                            VIEW
                        </Button>
                    </div>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
        </div>
    );
}

export default Cards;

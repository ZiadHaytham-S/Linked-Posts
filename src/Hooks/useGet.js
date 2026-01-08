import axios from "axios";
import { useEffect, useState } from "react";

export default function useGet(api) {
    const [products, setProducts] = useState([]);
    async function getData(api) {
        try{
            const {data} = await axios.get(api)
            setProducts(data?.data)
        }catch(err){
        console.log(err);
        
    }
    }
    useEffect(()=> {
        getData(api)
    } , [])
    return products
}
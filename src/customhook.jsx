import { useState, useEffect } from "react";
import axios from "axios";
export default function useFetch(url) {
    const [isloading, setIsloading] = useState(true);
    const [iserror, setIserror] = useState(false);
    const [data, setData] = useState([]);
    useEffect(() => {
        axios.get(url)
            .then(res => {
                setData(res.data)
            })
            .catch(err => {
                console.log(err);
                setIserror(true)
            })
            .finally(
                () => setIsloading(false)
            )
    }, [url])

    return { isloading, iserror, data }
}
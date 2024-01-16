import { useEffect } from "react"
import Cookies from 'universal-cookie';

export default function Token() {
    useEffect(() => {
        const cookies = new Cookies();
        const token = window.location.pathname.split('/')[1]

        cookies.set('whoopPerformance', token, { path: '/' });
        window.location.href = '/';
    }, [])
    
    
    
    
    return(
        <div>
        </div>
    )
}
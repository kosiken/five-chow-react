import { useEffect, useState } from 'react';


  const useWidth = () => {
let [width, setWidth] = useState((window.innerWidth > 600 ? 4 : window.innerWidth > 400 ? 6 : 12))
 function resized() {
      let nw = window.innerWidth > 600 ? 4 : window.innerWidth > 400 ? 6 : 12;
      if ( width !== nw)
        setWidth(nw,
        );
    }
      window.addEventListener("resize", resized);
    
     useEffect(() => {
 
   
    return ()=> {
    window.removeEventListener("resize", resized)
    
    }
  }, [width]);
  
  return width
}


export default  useWidth;

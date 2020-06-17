import { useEffect, useState, useCallback } from "react";

const useWidth = () => {
  let [width, setWidth] = useState(
    window.innerWidth > 600 ? 4 : window.innerWidth > 400 ? 6 : 12
  );
  const resized = useCallback(() => {
    let nw = window.innerWidth > 600 ? 4 : window.innerWidth > 400 ? 6 : 12;
    if (width !== nw) setWidth(nw);
  },[width]);
 

  useEffect(() => {
  window.addEventListener("resize", resized);
    return () => {
      
      window.removeEventListener("resize", resized);
    };
  }, [resized, width]);

  return width;
};

export default useWidth;

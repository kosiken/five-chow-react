import { useEffect, useState, useCallback } from "react";

const useWidth = (small, large) => {
  let [widthValue, setWidth] = useState(
    window.innerWidth > 600 ? large : window.innerWidth > 400 ? large : small
  );
  const resized = useCallback(() => {
    let newWidthValue = window.innerWidth > 600 ? large : window.innerWidth > 400 ? large : small;
    if (widthValue !== newWidthValue ) setWidth(newWidthValue );
  },[widthValue, large, small]);
 

  useEffect(() => {
  window.addEventListener("resize", resized);
    return () => {
      
      window.removeEventListener("resize", resized);
    };
  });

  return widthValue;
};

export default useWidth;

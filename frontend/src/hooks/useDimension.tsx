import { useState, useEffect } from "react";
import ScreenDimensions from "@/types/ScreenDimensions";


const useDimensions = (): ScreenDimensions => {
  const getCurrentDimension = (): ScreenDimensions => {
    return {
      width: innerWidth,
      height: innerHeight
    }
  }
  const [screenSize, setScreenSize] = useState<ScreenDimensions>(getCurrentDimension());
  
  useEffect(() => {
    const updateDimension = (): void => {
      setScreenSize(getCurrentDimension());
    }
    window.addEventListener('resize', updateDimension);

    return(() => {
      window.removeEventListener('resize', updateDimension);
    })
  }, [])

  return screenSize;
}

export default useDimensions
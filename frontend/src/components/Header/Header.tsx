'use client';
import { Button } from "../ui/button";


const Header = () => {
  return (
    <header
      className="
        fixed
        top-0
        left-0
        right-0
        h-[60px]
        bg-slate-100
        z-[1000]
      "
    >
      <Button onClick={() => console.log('test')}>Test</Button>
    </header>
  )
}

export default Header;
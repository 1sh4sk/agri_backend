// components/ui/LogoWithContainer.tsx

import logo from "../../assets/logo.png";

interface LogoWithContainerProps {
  size?: 'default' | 'small';
}

export const LogoWithContainer = ({ size = 'default' }: LogoWithContainerProps) => {
  const isSmall = size === 'small';
  
  return (
    <div className={`flex justify-start items-center `}>
      <div className="w-[104px] h-[88px] rounded-lg bg-white flex items-center justify-center shadow-[0px_0px_8px_4px_rgba(0,0,0,0.04)]">
        <img 
          src={logo} 
          alt="AgriThread Logo"  
         className="h-12 w-auto"
        />
      </div>
    </div>
  );
};

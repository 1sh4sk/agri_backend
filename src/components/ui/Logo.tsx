// components/ui/LogoWithContainer.tsx

import logo from '../../assets/logo.png'

interface LogoWithContainerProps {
  size?: 'default' | 'small';
}

export const LogoWithContainer = ({ size = 'default' }: LogoWithContainerProps) => {
  const isSmall = size === 'small';
  
  return (
    <div className={`flex justify-start items-center`}>
      <div className={`
        ${isSmall 
          ? 'w-[104px] h-[88px] rounded-[8px] p-[8px]' 
          : 'w-[144px] h-[120px] rounded-[8px] p-[14px]'
        } 
        bg-white flex items-center justify-center shadow-[0px_0px_8px_4px_rgba(0,0,0,0.04)]
      `}>
        <img 
          src={logo} 
          alt="AgriThread Logo"  
          className={`
            ${isSmall ? 'w-[80px] h-[64px]' : 'w-[120px] h-[96px]'}
          `}
        />
      </div>
    </div>
  );
};
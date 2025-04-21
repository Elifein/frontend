import Image from 'next/image';
import React from 'react';

const Logo: React.FC = () => {
  return (
    <Image
      src="/images/elifein-logo.png"
      alt="Logo"
      width={100}
      height={100}
    />
  );
};

export default Logo;

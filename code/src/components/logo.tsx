import Image from 'next/image';
import React from 'react';

const Logo: React.FC = () => {
  return (
    <Image
      src="/images/elifein-logo.png"
      alt="Logo"
      width={50}
      height={50}
    />
  );
};

export default Logo;

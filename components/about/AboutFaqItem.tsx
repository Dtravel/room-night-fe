import ic_add_plus from '@dtravel/assets/icons/ic_add_plus.svg';
import ic_remove_minus from '@dtravel/assets/icons/ic_remove_minus.svg';
import Image from 'next/image';
import React, { useState } from 'react';

interface Props {
  title: string;
  content: string | React.ReactNode | React.ReactNode[];
  hasBorderBottom?: boolean;
}

const AboutFaqItem: React.FC<Props> = ({ title, content, hasBorderBottom }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleToggleContent = () => {
    setIsOpen(prevState => !prevState);
  };

  return (
    <div
      className={`py-[48px] ${hasBorderBottom ? 'border-b border-sand-4' : ''}`}
    >
      <div
        className={
          'font-editorial-new text-24-32 text-sand-8 flex justify-between items-center cursor-pointer'
        }
        onClick={handleToggleContent}
      >
        <span>{title}</span>
        <span>
          <Image src={isOpen ? ic_remove_minus : ic_add_plus} alt={'icon'} />
        </span>
      </div>
      <div
        className={
          // (isOpen ? 'max-h-auto scale-y-100' : 'max-h-0 scale-y-0') +
          (isOpen ? '' : 'hidden') +
          ' pt-[16px] font-maison-neue text-18-28 text-sand-8 pr-[72px] w-full overflow-hidden transition ease-in-out duration-300'
        }
      >
        {content}
      </div>
    </div>
  );
};

export default AboutFaqItem;

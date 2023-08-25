import { NextPage } from 'next';
import React from 'react';

interface Props {}

const SurveyGuest: NextPage<Props> = () => {
  return (
    <div
      className={'w-full h-screen'}
      style={{ maxHeight: '-webkit-fill-available' }}
    >
      <iframe
        height="100%"
        width="100%"
        src="https://d2bpe117hv9.typeform.com/guestsurvey"
        allow="fullscreen"
      />
    </div>
  );
};

export default SurveyGuest;

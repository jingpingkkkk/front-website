import React from 'react';
import Marquee from 'react-fast-marquee';
import { useSelector } from 'react-redux';

const News = () => {
  const { themeSettings } = useSelector((state) => state.themeSettings);
  return (
    <div className="w-50 marqueee-row custom-buttton ">
      <Marquee>
        <div className="left-text py-1">{themeSettings?.news || ''}</div>
      </Marquee>
    </div>
  );
};
export default News;

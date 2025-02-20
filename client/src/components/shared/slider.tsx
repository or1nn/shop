import React from 'react';
import SlickSlider from 'react-slick';
import { NextArrow, PrevArrow } from '../ui';
import { IDevice } from '@/models/IDevice';
import { DeviceCard } from './device-card';

interface Props {
  className?: string;
  items: IDevice[];
  title: string;
}

export const Slider: React.FC<Props> = ({ items, title }) => {
  return (
    <div className='my-2'>
      <h2 className="text-2xl font-medium mb-4">{title}</h2>
      <SlickSlider
        slidesToShow={5}
        infinite={true}
        nextArrow={<NextArrow />}
        prevArrow={<PrevArrow />}
      >
        {items.map((item) => (
          <DeviceCard
            isFavorite={item.isFavorite || false}
            key={item.id}
            device={item}
          />
        ))}
      </SlickSlider>
    </div>
  );
};

import React from 'react';
import { DeviceCard, DeviceCardSkeleton } from '..';
import { IDeviceList } from '@/services/device-api';

interface Props {
  className?: string;
  isLoading?: boolean;
  items: IDeviceList;
}

export const DevicesList: React.FC<Props> = ({
  isLoading,
  items,
}) => {
  return (
    <div className="grid grid-cols-5 gap-3 grid-rows-[365px_365px]">
      {isLoading &&
        [...new Array(10)].map((_, i) => <DeviceCardSkeleton key={i} />)}
      {items?.devices.map((device) => (
        <DeviceCard
          isFavorite={device.isFavorite || false}
          key={device.id}
          device={device}
        />
      ))}
    </div>
  );
};

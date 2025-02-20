import React from 'react';
import { IInfo } from '@/models/IInfo';

interface DeviceInfoProps {
  info: IInfo[] | undefined;
}

export const DeviceInfo: React.FC<DeviceInfoProps> = ({ info }) => {
  return (
    <ul>
      {info && info!.length > 0 ? (
        info.map((item) => (
          <li>
            <span className="text-gray-500">{item.title}:</span>{' '}
            {item.description}
          </li>
        ))
      ) : (
        <li className="text-gray-500">
          Информции об этом товаре еще не добавлено
        </li>
      )}
    </ul>
  );
};

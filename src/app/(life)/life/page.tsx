import Calendar from '@/components/life/calendar';
import React from 'react';

const LifePage = () => {
  return (
    <div className="flex flex-col gap-4">
      <div
        className="ml-auto mr-auto max-h-[700px] w-[90%] overflow-auto text-center"
        style={{ scrollbarWidth: 'none' }}
      >
        <Calendar />
      </div>
      <div>Solo Life List</div>
    </div>
  );
};

export default LifePage;

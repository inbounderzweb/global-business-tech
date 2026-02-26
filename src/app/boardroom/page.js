import Banner from '@/components/boardroom/Banner';
import BoardRoomContent from '@/components/boardroom/BoardRoomContent';
import React from 'react';

function page() {
  return (
    <div className="section-wrapper">
      <Banner />
      <BoardRoomContent />
    </div>
  );
}

export default page;

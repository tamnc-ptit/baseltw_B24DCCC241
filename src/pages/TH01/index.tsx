import React from 'react';

const TH01: React.FC<any> = (props) => {
  return (
    <div>
      <h2>Thực Hành 01</h2>
      {props.children}
    </div>
  );
};

export default TH01;
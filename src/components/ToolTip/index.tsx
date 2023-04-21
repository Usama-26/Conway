import React, {useState} from 'react';

const ToolTip = (props: any) => {
  const [show, setShow] = useState(false);
  const text = props.text;
  const children = props.children;
  const removToolTip: any = () => {
    setTimeout(() => setShow(false), 50);
  };

  return (
    <div className="relative">
      <div
        className="inline-block"
        onMouseLeave={removToolTip}
        onMouseEnter={() => setShow(true)}
      >
        {children}
      </div>
      {show && (
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 mt-0 px-2 py-1 bg-[#272727]  text-sm rounded-none z-10">
          <h1 className="text-sm text-[#ffffff]">{text}</h1>
          <span
            className="arrow-down-item"
            style={{
              left: 'calc(50% - 0.5px)',
              top: '28px',
            }}
          />
        </div>
      )}
    </div>
  );
};

export default ToolTip;

import React from 'react';
import { Statistic } from 'antd';
const { Countdown } = Statistic;
const deadline = Date.now() + 1000 * 80 * 80 * 24 * 1 + 1000 * 30;

export const CountDown = () => {
  const ref = React.useRef();

  React.useEffect(() => {
    const oldFormatter = ref.current.formatCountdown;
    ref.current.formatCountdown = (...params) => {
      const result = oldFormatter(...params);
      const [day, hour, minute, second] = result.split(':');
      return (
        <>
          <div>{day} days</div>
          <div>{hour} hrs</div>
          <div>{minute} min</div>
          <div>{second} s</div>
          
        </>
      );
    };
  }, []);

  return (
    
      <Countdown
        ref={ref}
        format="DD:HH:mm:ss"
        title="Countdown"
        value={deadline}
      />
  );
};



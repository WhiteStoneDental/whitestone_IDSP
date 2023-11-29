import React, { useState, useEffect } from 'react';
import Switch from 'react-switch';

const CustomSwitch = () => {
  const [isSwitchOn, setIsSwitchOn] = useState(false);

  useEffect(() => {
    const root = document.documentElement;

    if (isSwitchOn) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isSwitchOn]);

  const handleSwitchToggle = () => {
    setIsSwitchOn((prev) => !prev);
  };

  return (
    <Switch
      checked={isSwitchOn}
      onChange={handleSwitchToggle}
      offColor="#ccc"
      onColor="#8A2BE2"
      handleDiameter={25}
      uncheckedIcon={false}
      checkedIcon={false}
    />
  );
};

export default CustomSwitch;

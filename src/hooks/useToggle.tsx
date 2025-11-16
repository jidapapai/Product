import { useCallback, useState } from 'react';

const useToggle = (initialValue = false) => {
  const [value, setValue] = useState(initialValue);

  const setToTrue = useCallback(() => setValue(true), []);
  const setToFalse = useCallback(() => setValue(false), []);
  const toggleValue = useCallback(() => setValue((v) => !v), []);

  return {
    value,
    setValue,
    toggle: toggleValue,
    open: setToTrue,
    close: setToFalse,
  };
};

export default useToggle;

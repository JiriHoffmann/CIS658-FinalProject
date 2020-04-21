import React, { useLayoutEffect, useRef, useState } from "react";

const RequiredInput = ({
  containerClass,
  label,
  value,
  onChange,
  id,
  type,
  placeholder,
}) => {
  const [show, setShow] = useState(false);
  const firstUpdate = useRef(true);

  useLayoutEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    value ? setShow(false) : setShow(true);
  }, [value]);

  return (
    <div className={containerClass}>
      <label className="block text-grey-darker text-sm font-bold mb-2">
        {label}
      </label>
      <input
        value={value}
        onChange={onChange}
        className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker"
        id={id}
        type={type}
        placeholder={placeholder}
      />
      {show ? (
        <div className="absolute text-sm right-0 text-red-500">
          This field is required
        </div>
      ) : null}
    </div>
  );
};

export { RequiredInput };

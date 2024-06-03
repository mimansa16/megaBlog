import React, { useId } from "react";

function Select(
  {
    options, //options se usually ek array hi return hota hai
    label,
    className = "",
    ...props
  },
  ref
) {
  const id = useId();
  return (
    <div className="w-full">
      {label && <label htmlFor={id} className=""></label>}
      <select //<select> tag is used to create a drop-down list
        {...props}
        id={id}
        ref={ref}
        className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 
        border border-gray-200 w-full ${className}`}
      >
        {options?.map(
          (option) =>(//1. <option> tag is used to provide options in the drop-down list created by the <select> tag.
            // 2. this option?.map() says that if option exists i.e. if the array contains some elements then map
            <option key={option} value={option}>
              {option}
            </option>
          )
        )}
      </select>
    </div>
  );
}
export default React.forwardRef(Select); //a component can also be wrapped in forwardRef in this manner

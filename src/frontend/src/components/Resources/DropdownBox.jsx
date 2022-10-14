import React, { useRef } from "react";

const DropdownBox = () => {
  return (
    <div>
      {/* LEFT SECTION */}
      <div></div>
      {/* RIGHT SECTION */}
      <label htmlFor="options"> Label</label>

      <select id="options" name="options" className="appearance-none">
        <div>HELLO</div>
      </select>
    </div>
  );
};

export default DropdownBox;

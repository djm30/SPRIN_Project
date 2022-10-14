import React from "react";

const Radios = () => {
  return (
    <div className="flex  flex-col sm:flex-row  justify-center items-center gap-2 sm:gap-5 font-body text-darkblue-100 text-base md:text-lg">
      <label className="flex justify-between flex-row sm:flex-col cursor-pointer gap-2 text-center">
        <span>Youtube Video</span>
        <input
          type="radio"
          name="type"
          value={resourceTypes.YOUTUBE}
          checked={radialValue === resourceTypes.YOUTUBE}
          onChange={() => setRadialValue(resourceTypes.YOUTUBE)}
        />
      </label>

      <label className="flex justify-between flex-row sm:flex-col cursor-pointer gap-2 text-center">
        <span>Website Link</span>
        <input
          type="radio"
          name="type"
          value={resourceTypes.WEBSITE}
          checked={radialValue === resourceTypes.WEBSITE}
          onChange={() => setRadialValue(resourceTypes.WEBSITE)}
        />
      </label>

      <label className="flex  justify-between flex-row sm:flex-col cursor-pointer gap-2 text-center">
        <span>Research Paper</span>
        <input
          type="radio"
          name="type"
          value={resourceTypes.PAPER}
          checked={radialValue === resourceTypes.PAPER}
          onChange={() => setRadialValue(resourceTypes.PAPER)}
        />
      </label>
    </div>
  );
};

export default Radios;

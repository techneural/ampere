"use client";

import { useState } from "react";

interface LocationMapTabsProps {
  locations: string[];
  defaultLocation?: string;
  height?: string; // optional custom height
  containerStyle?: string;
  tabContainerStyle?: string;
}

const LocationMapTabs: React.FC<LocationMapTabsProps> = ({
  locations,
  defaultLocation,
  height = "h-155.75",
  containerStyle = "",
  tabContainerStyle = "",
}) => {
  const [active, setActive] = useState(defaultLocation || locations[0]);

  return (
    <div className={`h-full ${containerStyle}`}>
      {/* TABS */}
      <div className={`flex gap-3 flex-wrap ${tabContainerStyle}`}>
        {locations.map((loc) => (
          <button
            key={loc}
            onClick={() => setActive(loc)}
            className={`btn btn-sm rounded-md border transition ${
              active === loc
                ? "btn-outline border-primary text-white"
                : "border-gray-200 text-neutral-400"
            }`}
          >
            {loc}
          </button>
        ))}
      </div>

      {/* MAP */}
      <div
        className={`w-full ${height} rounded-xl overflow-hidden mt-4 max-sm:h-100`}
      >
        <iframe
          key={active}
          src={`https://maps.google.com/maps?q=${encodeURIComponent(
            active,
          )}&z=12&output=embed`}
          className="w-full h-full"
          loading="lazy"
        />
      </div>
    </div>
  );
};

export default LocationMapTabs;

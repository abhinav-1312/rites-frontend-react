import React from "react";
import { ReactComponent as Logo } from "../assets/images/logo.svg";

const IsoHeader = () => {
  return (
    <div className="border-b border-black grid grid-cols-3 divide-x divide-black -p-4">
      <div className="flex flex-col justify-center items-center">
        <Logo height={40} width={100} />
        <h2 className="font-semibold !text-sm">
        गुणवत्ता आश्वासन प्रभाग
        </h2>
        <h2 className="font-semibold !text-sm">
        QUALITY ASSURANCE DIVISION
        </h2>
      </div>
      <div className="flex flex-col justify-center items-center">
        <h1 className="font-semibold !text-sm">
          विटनेस / सत्यापन रिपोर्ट <br /> (कनवर्टर एवं कास्टिंग)
        </h1>

        <h1 className="font-semibold !text-xs text-center">
          WITNESSED / VERIFICATION REPORT 
          <br />
          (CONVERTER & CASTING)
        </h1>
      </div>

      <div className="flex flex-col justify-center items-center !text-xs font-semibold text-center">
        ISO 9001:2015 <br /> ISSUE NO. 02 <br /> <br /> APPROVED DIVISIONAL HEAD
      </div>

    </div>
  );
};

export default IsoHeader;

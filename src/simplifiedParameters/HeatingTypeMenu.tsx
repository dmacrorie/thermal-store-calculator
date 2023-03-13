import React, { useState } from "react";
import BasicContainerThing from "../util/basicContainer";
import DropDown from "./heatingTypeDropDown";

interface HeatingTypeMenu {
  selectHeatingType: any,
  setSelectHeatingType: any 
}

const HeatingTypeMenu: React.FC<HeatingTypeMenu> = ( {selectHeatingType, setSelectHeatingType}): JSX.Element => {
  const [showDropDown, setShowDropDown] = useState<boolean>(false);
  
  const heatingType = () => {
    return ["Central heating & hot water", "Hot water only", "Central heating only"];
  };

  const toggleDropDown = () => {
    setShowDropDown(!showDropDown);
  };

  const dismissHandler = (event: React.FocusEvent<HTMLButtonElement>): void => {
    if (event.currentTarget === event.target) {
      setShowDropDown(false);
    }
  };

  const heatingTypeSelection = (heatingType: string): void => {
    setSelectHeatingType(heatingType);
  };

  return (
    <>
      <BasicContainerThing title="Select your heating type:">
      <button
        className={showDropDown ? "active" : undefined}
        onClick={(): void => toggleDropDown()}
        onBlur={(e: React.FocusEvent<HTMLButtonElement>): void =>
          dismissHandler(e)
        }
      >
        <div>{selectHeatingType ? selectHeatingType : "Select ..."} </div>
        {showDropDown && (
          <DropDown
            heatingType={heatingType()}
            showDropDown={false}
            toggleDropDown={(): void => toggleDropDown()}
            heatingTypeSelection={heatingTypeSelection}
          />
        )}
      </button>
      </BasicContainerThing>
    </>
  );
};

export default HeatingTypeMenu;

import { Field } from "react-final-form";
import BasicContainerThing from "../util/basicContainer";
import { OnChange } from "react-final-form-listeners";
import { ISharedState } from "../App";
import { useEffect } from "react";

export interface ITestHouseFormProps {
  setSomeSharedState(field: keyof ISharedState, val: number): void;
  values: any;
}

interface IConditionProps {
  when: string;
  is: any;
  children: React.ReactNode;
}

const Condition: React.FC<IConditionProps> = ({ when, is, children }) => (
  <Field name={when} subscription={{ value: true }}>
    {({ input: { value } }) => (value === is ? children : null)}
  </Field>
);

const TestThermalStorageMenu: React.FC<ITestHouseFormProps> = ({
  setSomeSharedState,
  values,
}: ITestHouseFormProps) => {
    
    const handleThermalStorageChange = (value: string) => {
      if (value !== "3") {
        values.numberValue3 = "";
      }
      if (value !== "4") {
        values.numberValue4 = "";
      }
    };

    return (
    <>
      <BasicContainerThing title="Thermal store parameters:">
        <div>
          <label>
            <Field
              name="thermalStorage"
              component="input"
              type="radio"
              value="1"
            />
            Water cylinder based high temperature Thermal Storage (size
            calculated for you)
          </label>
          <br></br>

          <label>
            <Field
              name="thermalStorage"
              component="input"
              type="radio"
              value="2"
            />
            Water cylinder - standard maximum temperature limiter (size is
            calculated for you)
          </label>
          <br></br>

          {/* <label>
            <Field
              name="thermalStorage"
              component="input"
              type="radio"
              value="3"
            />
            Please enter the size of your water cylinder (litres):{" "}
          </label>
          <Condition when="thermalStorage" is="3">
            <Field
              name="numberValue3"
              component="input"
              type="text"
              placeholer="3"
            />
            <OnChange name="numberValue3">
              {(value: number, previous: string) => {
                setSomeSharedState("tankMassState", value);
              }}
            </OnChange>
          </Condition>
          <br></br> */}

          <label>
            <Field
              name="thermalStorage"
              component="input"
              type="radio"
              value="4"
            />
            Please enter your thermal storage capacity (kWh):{" "}
          </label>
          <Condition when="thermalStorage" is="4">
            <Field name="numberValue4" component="input" type="text" />
            <OnChange name="numberValue4">
              {(value: number, previous: string) => {
                setSomeSharedState("thermalStorageState", value);
              }}
            </OnChange>
          </Condition>
        </div>

        <OnChange name="thermalStorage">
          {(value: string, previous: string) => {
            if (value === "1") {
              setSomeSharedState("thermalStorageState", 90);
            }
            if (value === "2") {
              setSomeSharedState("thermalStorageState", 60);
            }
            handleThermalStorageChange(value);
          }}
        </OnChange>
      </BasicContainerThing>
    </>
  );
};

export default TestThermalStorageMenu;

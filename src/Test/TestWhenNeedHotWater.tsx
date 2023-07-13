import { Field } from "react-final-form";
import BasicContainerThing from "../util/basicContainer";
import SelectInput from "./SelectInput";
import { OnChange } from "react-final-form-listeners";
import { ISharedState } from "../App";

export interface ITestHouseFormProps {
  setSomeSharedState(field: keyof ISharedState, val: number): void;
  values: any;
}

const TestWhenNeedHotWater: React.FC<ITestHouseFormProps> = ({
  setSomeSharedState,
  values,
}: ITestHouseFormProps) => {
  return (
    <>
      <BasicContainerThing title="Select when you need hot water:">
        <Field<string> name="hotWaterTime" component={SelectInput}>
          <option />
          <option value="0">Morning</option>
          <option value="1">Early evening</option>
          <option value="2">Late evening</option>
          <option value="3">Random</option>
        </Field>
        <OnChange name="hotWaterTime">
          {(value: string, previous: string) => {
            setSomeSharedState("hotWaterTimeState", values.hotWaterTime);
          }}
        </OnChange>
      </BasicContainerThing>
    </>
  );
};

export default TestWhenNeedHotWater;

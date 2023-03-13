import { Field } from "react-final-form";
import BasicContainerThing from "../util/basicContainer";
import SelectInput from "./SelectInput";
import { OnChange } from "react-final-form-listeners";
import { ISharedState } from "../App";

export interface ITestHouseFormProps {
  setSomeSharedState(field: keyof ISharedState, val: number): void;
  values: any;
}

const TestSelectHeatingType: React.FC<ITestHouseFormProps> = ({
  setSomeSharedState,
  values,
}: ITestHouseFormProps) => {
  return (
    <>
      <BasicContainerThing title="Select your heating type:">
        <Field<string>
          name="heatingType"
          component={SelectInput}
          placeholder="Select heating"
          className="button"
        >
          <option value="0">Central heating only</option>
          <option value="1">Hot water only</option>
          <option value="2">Central heating & hot water</option>
        </Field>
        <OnChange name="heatingType">
          {(value: string, previous: string) => {
            setSomeSharedState("heatingTypeState", values.heatingType);
          }}
        </OnChange>
      </BasicContainerThing>
    </>
  );
};

export default TestSelectHeatingType;

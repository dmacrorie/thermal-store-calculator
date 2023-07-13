import { Field } from "react-final-form";
import BasicContainerThing from "../util/basicContainer";
import SelectInput from "./SelectInput";
import { ISharedState } from "../App";
import { OnChange } from "react-final-form-listeners";

export interface ITestHouseFormProps {
  setSomeSharedState(field: keyof ISharedState, val: number):void
  values: any
}

const TestAtHomeMenu: React.FC<ITestHouseFormProps> = ({setSomeSharedState, values }:ITestHouseFormProps)=> {

return (
    <>
      <BasicContainerThing title="Select when you are home:">
        <Field<string> name="selectWhenHome" component={SelectInput} placeholder="Select house">
          <option value="0"/>
          <option value="1">home in the evening only</option>
          <option value="2">home in the morning mostly</option>
          <option value="3">home all day</option>
        </Field>
        <OnChange name="selectWhenHome">
          {(value:string, previous:string) => {
          setSomeSharedState("selectWhenHomeState", values.selectWhenHome)
          }}
        </OnChange>
      </BasicContainerThing>
    </>
  );
}

export default TestAtHomeMenu;
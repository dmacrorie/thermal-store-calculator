import { Field } from "react-final-form";
import BasicContainerThing from "../util/basicContainer";
import SelectInput from "./SelectInput";
import { OnChange } from "react-final-form-listeners";
import { ISharedState } from "../App";

export interface ITestHouseFormProps {
  setSomeSharedState(field: keyof ISharedState, val: number):void
  values: any
}
 
const TestRegionMenu: React.FC<ITestHouseFormProps> = ({setSomeSharedState, values }:ITestHouseFormProps) => {

return (
    <>
        <BasicContainerThing title="Select your region:">
            <Field<string> name="regionMenu" component={SelectInput} >
              <option />
              <option value="0">South of England</option>
              <option value="1">Midlands</option>
              <option value="2">North England</option>
              <option value="3">Scotland</option>
            </Field>
            <OnChange name="regionMenu">
          {(value:string, previous:string) => {
          setSomeSharedState("regionMenuState", values.regionMenu)
          }}
          </OnChange>
        </BasicContainerThing>
        
    </>
  );
}

export default TestRegionMenu;
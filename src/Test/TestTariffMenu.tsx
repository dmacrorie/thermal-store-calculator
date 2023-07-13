import { Field } from "react-final-form";
import BasicContainerThing from "../util/basicContainer";
import SelectInput from "./SelectInput";
import { OnChange } from "react-final-form-listeners";
import { ISharedState } from "../App";

export interface ITestHouseFormProps {
  setSomeSharedState(field: keyof ISharedState, val: number):void
  values: any
}
 
const TestTariffMenu: React.FC<ITestHouseFormProps> = ({setSomeSharedState, values }:ITestHouseFormProps) => {

return (
    <>
        <BasicContainerThing title="Select your tariff:">
            <Field<string> name="tariffMenu" component={SelectInput} >
              <option />
              <option value="0">Flat rate</option>
              <option value="1">Average</option>
              <option value="2">Economy 7 average</option>
              <option value="3">Economy 10 average</option>
              <option value="4">Octopus Go</option>
              <option value="5">Octopus Agile</option>
            </Field>
            <OnChange name="tariffMenu">
              {(value:string, previous:string) => {
              setSomeSharedState("tariffMenuState", values.tariffMenu)
              }}
            </OnChange>
        </BasicContainerThing>
        
    </>
  );
}

export default TestTariffMenu;
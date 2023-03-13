import { Field, FormSpy } from "react-final-form";
import BasicContainerThing from "../util/basicContainer";
import SelectInput from "./SelectInput";
import { OnChange } from 'react-final-form-listeners'
import { ISharedState } from "../App";
import { IThermalForm } from "../interfaces/thermal";

export interface IHouseFormProps {
  setSomeSharedState(field: keyof ISharedState, val: number):void
}

const TestHouseMenu: React.FC<IHouseFormProps> = ({setSomeSharedState }:IHouseFormProps) => {

    return <FormSpy <IThermalForm>
    subscription={{
        values: true,
        dirtySinceLastSubmit: true,
        submitting: true,
    }}
>
    {({ values, form }) => (<BasicContainerThing title="Select your house type:">
        <Field<string> name="houseType" component={SelectInput} placeholder="Select house">
          <option />
          <option value="0">1 bedroom flat</option>
          <option value="1">2 bedroom flat</option>
          <option value="2">3 bedroom flat</option>
          <option value="3">4 bedroom flat</option>
          <option value="4">2 bedroom house (Terraced/Semi detached)</option>
          <option value="5">3 bedroom house (Terraced/Semi detached)</option>
          <option value="6">4 bedroom house (Terraced/Semi detached)</option>
          <option value="7">5 bedroom house (Terraced/Semi detached)</option>
        </Field>
        <OnChange name="houseType">
          {(value:string, previous:string) => {
          setSomeSharedState("annualEnergyState", values.houseType)
          }}
          </OnChange>
      </BasicContainerThing>)}
      </FormSpy>
}

export default TestHouseMenu;

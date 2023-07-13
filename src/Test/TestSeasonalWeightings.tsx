import { Field } from "react-final-form";
import { OnChange } from "react-final-form-listeners";
import { ISharedState } from "../App";
import BasicContainerThing from "../util/basicContainer";

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

const TestSeasonalWeightings: React.FC<ITestHouseFormProps> = ({
  setSomeSharedState,
  values,
}: ITestHouseFormProps) => {

  //clears the value entered in the input box when corresponding radio button is not selected
  const handleSeasonalWeightingChange = (value: string) => {
    if (value !== '4') {
      values.seasonalWeightingInput = '';
    }
  }

  const handleSeasonalWeightingInputChange = (value: number, previous: string) => {
    setSomeSharedState("seasonalWeightingState", value);
  };

  return (
    <BasicContainerThing title="Please select from the following seasonal weightings:">
      <div>
        <label>
          <Field
            name="seasonalWeighting"
            component="input"
            type="radio"
            value="200"
          />{" "}
          SCOP values (averaged over year of space heating - add an explainer
          that this weighted towards higher heating usage in winter)
        </label>
        <br></br>

        <label>
          <Field
            name="seasonalWeighting"
            component="input"
            type="radio"
            value="220"
          />{" "}
          COP-Winter (winter months December-February)
        </label>
        <br />

        <label>
          <Field<string>
            name="seasonalWeighting"
            component="input"
            type="radio"
            value="240"
          />{" "}
          COP-Average (Average of OEM quoted values)
        </label>
        <br />
        
        <label>
          <Field
            name="seasonalWeighting"
            component="input"
            type="radio"
            value="4"
          />
          Enter your own SCOP value:{" "}
        </label>
        <Condition when="seasonalWeighting" is="4">
          <Field 
            name="seasonalWeightingInput" 
            component="input" 
            type="text" 
            initialValue='' 
            onChange={handleSeasonalWeightingInputChange}/>
        </Condition>

      </div>
      <OnChange name="seasonalWeighting">
        {(value: string, previous: string) => {
          let seasonalWeightingValue = 0;
          if (values.seasonalWeighting < 3) {
            seasonalWeightingValue = values.seasonalWeighting;
          } 
          setSomeSharedState(
            "seasonalWeightingState",
            values.seasonalWeighting
          );
          handleSeasonalWeightingChange(value);
        }}
      </OnChange>
    </BasicContainerThing>
  );
};

export default TestSeasonalWeightings;

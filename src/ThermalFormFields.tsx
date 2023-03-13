import { FormSpy } from "react-final-form";
import { ISharedState } from "./App";
import { IThermalForm } from "./interfaces/thermal";
import ContainerThing from './util/container';
import InfoThing from "./util/infoThing";
import NumberField from "./util/numberField";

export interface ITestFormProps {
    sharedState:ISharedState
}

const ThermalFormFields: React.FC<ITestFormProps> = ({ sharedState }:ITestFormProps ) => {
    return <FormSpy <IThermalForm>
        subscription={{
            values: true,
            dirtySinceLastSubmit: true,
            submitting: true,
        }}
    >
        {({ values, form }) => (<ContainerThing title="Thermal Store Parameters">

            <NumberField xs={4} sm={4} md={4} name="tankSpecificHeatCapacity" label="Store specific heat capacity" longText="Water is 4181 J/kg/&#8451;, Aluminium is 897 J/kg/&#8451; more at www.engineeringtoolbox.com/specific-heat-capacity-d_391.html" helpText="(J/kg/&#8451;)" type="int" />

            <InfoThing xs={4} sm={4} md={4} textA={`Store Mass`} textB="kg" value={(sharedState.tankMassState ? sharedState.tankMassState : values.tankMass)} valueDecimalPlace={0} resetFunction={e => {
                form.change('tankMassOverride', undefined)
            }}>
                <NumberField name="tankMassOverride" xs={12} sm={12} md={12} label="Store Mass Override" longText="If you have a fixed storage size then enter it here." helpText="(J/kg/&#8451;)" type="int" />

            </InfoThing>
            <NumberField name="tankMaxTemperature" xs={4} sm={4} md={4} label="Maximum temp." longText="The temperature the store will be heated to during the low cost period." helpText="&#8451;" type="int" />
            <NumberField name="tankMinUsefulTemperature" xs={4} sm={4} md={4} label="Min. useful temp." longText="The lowest temperature of the store that provides useful heat to the" helpText="&#8451;" type="int" />
            <NumberField name="tankAmbientTemperature" xs={4} sm={4} md={4} label="Ambient temperature" longText="Temperature surrounding the storage." helpText="&#8451;" type="int" />
            <NumberField name="tankEnergyLossCoeficient" xs={4} sm={4} md={4} label="Storage Energy Loss Coefficient" longText=" e.g. (daily loss in kWh/24)/(operating temperature - ambient temperature) " helpText="W/&#8451;" type="int"/>
            <InfoThing textA="Useful Energy" textB="kWh" xs={4} sm={4} md={4} valueDecimalPlace={1} value={values.tankEnergy} description="Energy available at max temperature before the minimum useful temperature is reached." />
            <InfoThing textA="Energy Stored" textB="kWh" xs={4} sm={4} md={4} valueDecimalPlace={1} value={values.tankEnergyAfterNHoursCooling} description={`Energy remaining after ${values.timeShiftHoursN} hours cooling.`} />
            <InfoThing textA="Insulation loss" xs={4} sm={4} md={4} textB="Watts" valueDecimalPlace={0} value={values.tankEnergyLossWatts} description="Power loss at maximum store temperature." />
        </ContainerThing>)
        }
    </FormSpy >
}
/*
Fields not shown
<InfoThing textA="Tank Energy (Ambient)" xs={4} sm={4} md={4} textB="MJ" value={values.tankEnergyAmbient} />
<InfoThing textA="Tank Energy (Useful)" xs={4} sm={4} md={4} textB="MJ" value={values.tankEnergyJoules} />      
          
*/

export default ThermalFormFields;
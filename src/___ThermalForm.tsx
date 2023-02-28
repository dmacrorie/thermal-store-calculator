import { Card, CardContent, Grid } from "@mui/material";
import createDecorator from 'final-form-calculate';
import * as React from 'react';
import { Form } from "react-final-form";
import { ISharedState } from "./App";
import Chart from "./Chart";
import HeatDemandFields from "./HeatDemandFields";
import HeatPumpCostsFields from "./HeatPumpCostsFields";
import InstantaneousCostsFields from "./InstantaneousCostsFields";
import { IThermalForm } from "./interfaces/thermal";
import TariffFormFields from "./TarifFormFields";
import ThermalFormFields from "./ThermalFormFields";
import ThermalStorageFields from "./ThermalStorageFields";
import TimeFormFields from "./TimeFormFields";
import InitValues from "./util/initValues";

export interface IThermalFormProps {
    visible:boolean,
    sharedState:ISharedState
}
const ThermalForm:React.FC<IThermalFormProps> = (props) => {

    return <Card style={{backgroundColor: "#d3d3d3", display: props.visible ? 'block':'none'}}>
        <CardContent>
            
            <Form <any>
                onSubmit={values => {
                    console.log("onSubmit", values)
                    //   if (!response.data) return response;
                }}

                initialValues={{tankSpecificHeatCapacity:props.sharedState.someState}}
                decorators={[
                    createDecorator(
                        {
                            field: /(.*?)/, // when the value of foo changes...

                        updates: (value, name, allValues: any) => {

                                if (allValues) {
                                    const unbind = { ...allValues }
                                    //detect not entered fields and replace with 0
                                    unbind.timeShiftHoursN = (unbind.timeShiftHoursN !== '' && unbind.timeShiftHoursN !== undefined ? allValues.timeShiftHoursN : 0)
                                    unbind.heatEnergyDwellingYear = (unbind.heatEnergyDwellingYear !== '' ? unbind.heatEnergyDwellingYear : 100)
                                    unbind.heatUsedDaysPerYear = (unbind.heatUsedDaysPerYear !== '' ? unbind.heatUsedDaysPerYear : 1)
                                    unbind.standardRateEnergyCost = (unbind.standardRateEnergyCost !== '' ? unbind.standardRateEnergyCost : 0)
                                    unbind.lowRateEnergyCost = (unbind.lowRateEnergyCost !== '' ? unbind.lowRateEnergyCost : 0)
                                    unbind.highRateEnergyCost = (unbind.highRateEnergyCost !== '' ? unbind.highRateEnergyCost : 0)
                                    unbind.tankSpecificHeatCapacity = (unbind.tankSpecificHeatCapacity !== '' ? unbind.tankSpecificHeatCapacity : 0)
                                    unbind.tankMaxTemperature = (unbind.tankMaxTemperature !== '' ? unbind.tankMaxTemperature : 0)
                                    unbind.tankMinUsefulTemperature = (unbind.tankMinUsefulTemperature !== '' ? unbind.tankMinUsefulTemperature : 0)
                                    unbind.tankAmbientTemperature = (unbind.tankAmbientTemperature !== '' ? unbind.tankAmbientTemperature : 0)
                                    unbind.tankEnergyLossCoeficient = (unbind.tankEnergyLossCoeficient !== '' ? unbind.tankEnergyLossCoeficient : 0)
                                    unbind.heatPumpHeatEfficiency = (unbind.heatPumpHeatEfficiency !== '' ? unbind.heatPumpHeatEfficiency : 0)

                                    unbind.heatDailyEnergyRequiredOverride = (unbind.heatDailyEnergyRequiredOverride !== '' ? unbind.heatDailyEnergyRequiredOverride : 0)
                                    unbind.tankMassOverride = (unbind.tankMassOverride !== '' ? unbind.tankMassOverride : 0)

                                    //overrides
                                    unbind.heatPumpHeatEfficiency = (unbind.heatPumpHeatEfficiency !== '' ? unbind.heatPumpHeatEfficiency : 0)

                                    const values: IThermalForm = unbind;


                                    /* These values are conditional on overrides so must be calculated first */

                                    //heatEnergyDwellingYear
                                    if (values.heatDailyEnergyRequiredOverride !== undefined && values.heatDailyEnergyRequiredOverride !== null && values.heatDailyEnergyRequiredOverride !== 0) {
                                        values.heatDailyEnergyRequired = values.heatDailyEnergyRequiredOverride
                                    }
                                    else {
                                        //if (values.heatDailyEnergyRequired === undefined || values.heatDailyEnergyRequired === null) values.heatDailyEnergyRequired = -1// make it obvious something is broken
                                        if (values.heatUsedDaysPerYear < 1 ) values.heatUsedDaysPerYear = 1
                                        values.heatDailyEnergyRequired = values.heatEnergyDwellingYear / values.heatUsedDaysPerYear
                                        // overide with the override if one is set
                                        // values.heatDailyEnergyRequired = ((values.heatDailyEnergyRequiredOverride) ? values.heatDailyEnergyRequiredOverride : values.heatDailyEnergyRequired)
                                    }
                                    var iterations
                                    if (values.tankMassOverride !== undefined && values.tankMassOverride !== null && values.tankMassOverride !== 0) iterations = 1
                                    else {
                                        if ( values.heatDailyEnergyRequired < 2 ) {iterations = 100}
                                        else {iterations = 100}
                                    }
                            
                                    if (values.heatDailyEnergyRequired < 0.499) values.heatDailyEnergyRequired = 0.49 // avoids NaNs
                                    /* To get a better startig popint for the tank size */
                                    if (values.tankMassOverride !== undefined && values.tankMassOverride !== null && values.tankMassOverride !== 0) {
                                        values.tankMass = values.tankMassOverride
                                    }
                                    else {
                                        // use the default
                                        values.tankMass = values.heatDailyEnergyRequired *40000/values.tankSpecificHeatCapacity;
                                    }

                                    for (let i = 0; i < iterations; i++) {


                                        /* This will be caluclated iteratively if there is no override */
                                        if (values.tankMassOverride !== undefined && values.tankMassOverride !== null && values.tankMassOverride !== 0) {
                                            values.tankMass = values.tankMassOverride //todo: needlessly repeated
                                        }
                                        else {
                                            //if ( values.heatDailyEnergyRequired < 2 ) { // don't try to account for temperature drop as it will likely be random
                                            //if (i < 1) {
                                            //    values.tankMass = values.heatDailyEnergyRequired * 3600*1000 /(values.tankSpecificHeatCapacity*(values.tankMaxTemperature-values.tankMinUsefulTemperature))
                                            //}
                                            //else {
                                                values.tankMass = (values.tankMass + 0.0003) / (values.heatProportionOfCentralHeating + 0.0001)
                                            //}

                                           // if (values.tankMass < -200 ) values.tankMass = -200 // avoids instability for low power requirement
                                        }

                                        /* The energy loss calculation based on tank paramters and shift */
                                        /* =B8+(B6-B8)*EXP(-1*B9/(B4*B5)*3600*B18) */
                                        /*
                                        B8 : Ambient temperature
                                        B6: Store max temperature
                                        B9: Store loss coefficient
                                        B4: Specific heat capacity
                                        B5: Store Mass
                                        B18: Time shift (hours)
                                        */
                                        values.timeTemperatureAfterNCoolingNoHeatAndDraw = values.tankAmbientTemperature + (values.tankMaxTemperature - values.tankAmbientTemperature) *
                                            Math.exp(-1 * values.tankEnergyLossCoeficient / (values.tankSpecificHeatCapacity * values.tankMass) * 3600 * values.timeShiftHoursN)

                                        values.timeTempDropOverHours = values.tankMaxTemperature - values.timeTemperatureAfterNCoolingNoHeatAndDraw
                                        

                                        values.timeEnergyLostFinalfterN = (values.timeTempDropOverHours * values.tankSpecificHeatCapacity * values.tankMass / 1000) / 3600

                                        //values.tankMass = tankMass;
                                        values.tankEnergyJoules = values.tankMass * values.tankSpecificHeatCapacity * (values.tankMaxTemperature - values.tankMinUsefulTemperature) / 1000000
                                        values.tankEnergyAmbient = values.tankMass * values.tankSpecificHeatCapacity * (values.tankMaxTemperature - values.tankEnergyLossCoeficient) / 1000000

                                        //Energy lost over N hours cooling during time-shift=(B22*B4*B5/1000)/3600
                                        values.tankEnergyAfterNHoursCooling = values.tankEnergyJoules * 1000 / 3600 - values.timeEnergyLostFinalfterN


                                        values.heatProportionOfCentralHeating = values.tankEnergyAfterNHoursCooling / (values.heatDailyEnergyRequired + 0.00001)
                                        ///=if(D5>0,D5,(B5+0.001)/(B17+0.001))            

                                        // tank energy in kwh assuming minimum useful enrgy temperature temperature difference
                                        values.tankEnergy = (values.tankEnergyJoules * 1000) / 3600 // MJ -> kWh
                                        if (values.tankEnergy < 0) values.tankEnergy = 0
                                        // Temperature Drop after N hours=B6-B21 =  Tank max. temperature - Temperature after N hours of no heat and no draw
                                        // Energy lost over N hours cooling during time-shift =(B22*B4*B5/1000)/3600  = (Temperature_Drop_after_N_hours * Store_specific_heat_capacity * Tank_Store_Mass/1000)/3600
                                        values.timeShiftEnergyLost = (values.timeTempDropOverHours * values.tankSpecificHeatCapacity * values.tankMass / 1000) / 3600
                
                                        values.timeEnergyLossMaxTemp = values.tankEnergyLossCoeficient * (values.tankMaxTemperature - values.tankAmbientTemperature) * values.timeShiftHoursN / 1000
                                        if (values.timeEnergyLossMaxTemp < 0 ) values.timeEnergyLossMaxTemp = 0
                                        values.timeEnergyLostNMaxTempFraction = values.timeEnergyLossMaxTemp / values.tankEnergy

                                        values.instantaneousHeatingCostFlatRate = (values.heatDailyEnergyRequired * values.standardRateEnergyCost) / 100
                                        values.instantaneousHeatingCostPeakRate = (values.heatDailyEnergyRequired * values.highRateEnergyCost) / 100
                                        values.heatPumpCostFlatRate = (values.instantaneousHeatingCostFlatRate / (values.heatPumpHeatEfficiency / 100));
                                        values.heatPumpCostPeakRate = (values.instantaneousHeatingCostPeakRate / (values.heatPumpHeatEfficiency / 100));
                                        /* =B12*B2/100 */

                                        //COST COMPARISONS values

                                        values.thermalStorageDailyCost = Math.round(values.tankEnergy * values.lowRateEnergyCost) / 100; // convert to £
                                        values.thermalStorageVsGridPercent = (values.thermalStorageDailyCost / values.instantaneousHeatingCostFlatRate);
                                        values.thermalStorageVsHeatPumpFlatRate = (values.thermalStorageDailyCost / values.heatPumpCostFlatRate);
                                        values.thermalStorageVsHeatPumpPeakRate = (values.thermalStorageDailyCost / values.heatPumpCostPeakRate);
                                        values.thermalStoragePotentialWastedExpense = (values.timeShiftEnergyLost / values.lowRateEnergyCost);
                                        values.thermalStorageHighTempRateCost = Math.round(values.lowRateEnergyCost * values.tankEnergyAfterNHoursCooling / 100 + values.thermalStoragePotentialWastedExpense) / values.heatPumpHeatEfficiency
                                        /* =B9*(B6-B8) 
                                         B8 : Ambient temperature
                                        B6: Store max temperature
                                        B9: Store loss coefficient
                                        */
                                        values.tankEnergyLossWatts = values.tankEnergyLossCoeficient * (values.tankMaxTemperature - values.tankAmbientTemperature)
                                        //}
                                    }
                                    return {

                                        "tankEnergyJoules": values.tankEnergyJoules,
                                        "tankEnergyAmbient": values.tankEnergyAmbient,
                                        "tankEnergy": values.tankEnergy,
                                        "tankEnergyAfterNHoursCooling": values.tankEnergyAfterNHoursCooling,
                                        "heatProportionOfCentralHeating": values.heatProportionOfCentralHeating * 100,
                                        "timeTemperatureAfterNCoolingNoHeatAndDraw": values.timeTemperatureAfterNCoolingNoHeatAndDraw,
                                        "timeTempDropOverHours": values.timeTempDropOverHours,
                                        "timeShiftEnergyLost": values.timeShiftEnergyLost,
                                        "tankEnergyLossWatts": values.tankEnergyLossWatts,
                                        "timeEnergyLostFinalfterN": values.timeEnergyLostFinalfterN,
                                        "timeEnergyLossMaxTemp": values.timeEnergyLossMaxTemp,
                                        "timeEnergyLostInNMaxTemp": values.timeEnergyLossMaxTemp,
                                        "instantaneousHeatingCostFlatRate": values.instantaneousHeatingCostFlatRate,
                                        "instantaneousHeatingCostPeakRate": values.instantaneousHeatingCostPeakRate,
                                        "heatPumpCostFlatRate": values.heatPumpCostFlatRate,
                                        "heatPumpCostPeakRate": values.heatPumpCostPeakRate,
                                        "heatPumpHeatEfficiency": values.heatPumpHeatEfficiency,
                                        "thermalStorageDailyCost": values.thermalStorageDailyCost,
                                        "thermalStorageVsGridPercent": values.thermalStorageVsGridPercent * 100,
                                        "thermalStorageVsHeatPumpFlatRate": values.thermalStorageVsHeatPumpFlatRate * 100,
                                        "thermalStorageVsHeatPumpPeakRate": values.thermalStorageVsHeatPumpPeakRate * 100,
                                        "thermalStoragePotentialWastedExpense": values.thermalStoragePotentialWastedExpense * 100,
                                        "thermalStorageHighTempRateCost": values.thermalStorageHighTempRateCost,
                                        "tankMass": values.tankMass,
                                        "heatDailyEnergyRequired": values.heatDailyEnergyRequired
                                    };
                                } else {
                                    return {}
                                }
                            }
                        })
                ]}
                render={({
                    handleSubmit,
                    pristine,
                    invalid,
                    dirtySinceLastSubmit,
                    values,
                }) => (
                    <form onSubmit={handleSubmit} autoComplete="off" noValidate>
                        {/* <DebugButton data={values} /> */}
                        <Grid container spacing={2}>
                            <Grid item xs={8} sm={9} md={9}>
                                {props.sharedState.someState}
                                <TimeFormFields />
                                <HeatDemandFields />
                                <ThermalFormFields />
                                <TariffFormFields />
                                <InstantaneousCostsFields />
                                <HeatPumpCostsFields />
                            </Grid>
                            <Grid item xs={6} sm={3} md={3}>
                                {values.timeEnergyLostFinalfterN !== undefined && <Chart labels={[`Stored kWh Available`, `kWh lost over ${values.timeShiftHoursN} hours`]} data={[values.tankEnergyAfterNHoursCooling.toFixed(1), values.timeEnergyLostFinalfterN.toFixed(1)]} />}
                                {values.thermalStorageVsHeatPumpFlatRate !== undefined && values.heatPumpCostFlatRate && <Chart labels={['Heat pump £/day@flat rate)', 'Time-shifted direct £/day@low Rate']} data={[values.heatPumpCostFlatRate.toFixed(2), values.thermalStorageDailyCost.toFixed(2)]} />}
                                <ThermalStorageFields />
                            </Grid>
                        </Grid>
                    </form>
                )}
            />
        </CardContent>
    </Card>
}


export default ThermalForm;

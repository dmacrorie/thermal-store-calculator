import { Card, CardContent, Grid } from "@mui/material";
import createDecorator from 'final-form-calculate';
import * as React from 'react';
import { Form } from "react-final-form";
import Chart from "./Chart";
import HeatDemandFields from "./HeatDemandFields";
import HeatPumpCostsFields from "./HeatPumpCostsFields";
import InstantaneousCostsFields from "./InstantaneousCostsFields";
import { IThermalForm } from "./interfaces/thermal";
import TariffFormFields from "./TarifFormFields";
import ThermalFormFields from "./ThermalFormFields";
import ThermalStorageFields from "./ThermalStorageFields";
import TimeFormFields from "./TimeFormFields";







const ThermalForm = () => {

    const initValues: IThermalForm = {
        standardRateEnergyCost: 15,
        lowRateEnergyCost: 8,
        highRateEnergyCost: 20,

        tankSpecificHeatCapacity: 4200, // asssume water 
        tankMass: 400, // this is one of the larger tanks
        tankMassOverride: null,
        tankMaxTemperature: 90,
        tankMinUsefulTemperature: 35,
        tankAmbientTemperature: 20,
        tankEnergyLossCoeficient: 3,
        tankEnergyJoules: 0,
        tankEnergy: 0,
        tankEnergyAfterNHoursCooling: 0,
        tankEnergyAmbient: 0,

        heatEnergyDwellingYear: 8000,
        heatUsedDaysPerYear: 230,
        heatDailyEnergyRequired: 0,
        heatDailyEnergyRequiredOverride: null,
        heatProportionOfCentralHeating: 0,

        timeShiftHoursN: 12,
        timeShiftEnergyLost: 0,
        timeEnergyLossMaxTemp: 0,
        timeTemperatureAfterNCoolingNoHeatAndDraw: 0.0,
        timeTempDropOverHours: 0.0,
        timeEnergyLostFinalfterN: 0,
        timeEnergyLostNMaxTempFraction: 0,


        instantaneousHeatingCostFlatRate: 0.0,
        instantaneousHeatingCostPeakRate: 0.0,

        heatPumpHeatEfficiency: 200,
        heatPumpCostFlatRate: 0.0,
        heatPumpCostPeakRate: 0.0,

        thermalStorageDailyCost: undefined,
        thermalStorageVsGridPercent: 0,
        thermalStorageVsHeatPumpFlatRate: 0,
        thermalStorageVsHeatPumpPeakRate: 0,
        thermalStoragePotentialWastedExpense: 0,
        thermalStorageHighTempRateCost: 0,
    }

    return <Card>
        <CardContent>

            <Form <any>
                onSubmit={values => {
                    console.log("onSubmit", values)
                    //   if (!response.data) return response;
                }}

                initialValues={initValues}
                decorators={[
                    createDecorator(
                        {
                            field: /(.*?)/, // when the value of foo changes...

                            updates: (value, name, allValues: any) => {




                                if (allValues) {
                                    const unbind = { ...allValues }
                                    //detect not entered fields and replace with 0
                                    unbind.timeShiftHoursN = (unbind.timeShiftHoursN !== '' && unbind.timeShiftHoursN !== undefined ? allValues.timeShiftHoursN : 0)
                                    unbind.heatEnergyDwellingYear = (unbind.heatEnergyDwellingYear !== '' ? unbind.heatEnergyDwellingYear : 0)
                                    unbind.heatUsedDaysPerYear = (unbind.heatUsedDaysPerYear !== '' ? unbind.heatUsedDaysPerYear : 0)
                                    unbind.standardRateEnergyCost = (unbind.standardRateEnergyCost !== '' ? unbind.standardRateEnergyCost : 0)
                                    unbind.lowRateEnergyCost = (unbind.lowRateEnergyCost !== '' ? unbind.lowRateEnergyCost : 0)
                                    unbind.highRateEnergyCost = (unbind.highRateEnergyCost !== '' ? unbind.highRateEnergyCost : 0)
                                    unbind.tankSpecificHeatCapacity = (unbind.tankSpecificHeatCapacity !== '' ? unbind.tankSpecificHeatCapacity : 0)
                                    unbind.tankMaxTemperature = (unbind.tankMaxTemperature !== '' ? unbind.tankMaxTemperature : 0)
                                    unbind.tankMinUsefulTemperature = (unbind.tankMinUsefulTemperature !== '' ? unbind.tankMinUsefulTemperature : 0)
                                    unbind.tankAmbientTemperature = (unbind.tankAmbientTemperature !== '' ? unbind.tankAmbientTemperature : 0)
                                    unbind.tankEnergyLossCoeficient = (unbind.tankEnergyLossCoeficient !== '' ? unbind.tankEnergyLossCoeficient : 0)
                                    unbind.heatPumpHeatEfficiency = (unbind.heatPumpHeatEfficiency !== '' ? unbind.heatPumpHeatEfficiency : 0)

                                    const values: IThermalForm = unbind;


                                    /* These values are conditional on overrides so must be calculated first */

                                    //heatEnergyDwellingYear
                                    if (values.heatDailyEnergyRequiredOverride !== undefined && values.heatDailyEnergyRequiredOverride !== null) {
                                        values.heatDailyEnergyRequired = values.heatDailyEnergyRequiredOverride
                                    }
                                    else {
                                        //if (values.heatDailyEnergyRequired === undefined || values.heatDailyEnergyRequired === null) values.heatDailyEnergyRequired = -1// make it obvious something is broken

                                        values.heatDailyEnergyRequired = values.heatEnergyDwellingYear / values.heatUsedDaysPerYear
                                        // overide with the override if one is set
                                        // values.heatDailyEnergyRequired = ((values.heatDailyEnergyRequiredOverride) ? values.heatDailyEnergyRequiredOverride : values.heatDailyEnergyRequired)
                                    }

                                    var iterations
                                    if (values.tankMassOverride !== undefined && values.tankMassOverride !== null) iterations = 1
                                    else iterations = 100

                                    for (let i = 0; i < iterations; i++) {


                                        /* This will be caluclated iteratively if there is no override */
                                        if (values.tankMassOverride !== undefined && values.tankMassOverride !== null) {
                                            values.tankMass = values.tankMassOverride
                                        }
                                        else {
                                            // use the default
                                            values.tankMass = (values.tankMass + 0.001) / (values.heatProportionOfCentralHeating + 0.001)
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


                                        values.heatProportionOfCentralHeating = values.tankEnergyAfterNHoursCooling / (values.heatDailyEnergyRequired + 0.0001)
                                        ///=if(D5>0,D5,(B5+0.001)/(B17+0.001))            

                                        // tank energy in kwh assuming minimum useful enrgy temperature temperature difference
                                        values.tankEnergy = (values.tankEnergyJoules * 1000) / 3600 // MJ -> kWh
                                        // Temperature Drop after N hours=B6-B21 =  Tank max. temperature - Temperature after N hours of no heat and no draw
                                        // Energy lost over N hours cooling during time-shift =(B22*B4*B5/1000)/3600  = (Temperature_Drop_after_N_hours * Store_specific_heat_capacity * Tank_Store_Mass/1000)/3600
                                        values.timeShiftEnergyLost = (values.timeTempDropOverHours * values.tankSpecificHeatCapacity * values.tankMass / 1000) / 3600

                                        values.timeEnergyLossMaxTemp = values.tankEnergyLossCoeficient * (values.tankMaxTemperature - values.tankAmbientTemperature) * values.timeShiftHoursN / 1000
                                        values.timeEnergyLostNMaxTempFraction = values.timeEnergyLossMaxTemp / values.tankEnergy

                                        values.instantaneousHeatingCostFlatRate = (values.heatDailyEnergyRequired * values.standardRateEnergyCost) / 100
                                        values.instantaneousHeatingCostPeakRate = (values.heatDailyEnergyRequired * values.highRateEnergyCost) / 100
                                        values.heatPumpCostFlatRate = (values.instantaneousHeatingCostFlatRate / (values.heatPumpHeatEfficiency / 100));
                                        values.heatPumpCostPeakRate = (values.instantaneousHeatingCostPeakRate / (values.heatPumpHeatEfficiency / 100));
                                        /* =B12*B2/100 */
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
                                        "thermalStorageHighTempRateCost": values.thermalStorageHighTempRateCost * 100,
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
                            <Grid item xs={8} sm={8} md={8}>

                                <TimeFormFields />
                                <HeatDemandFields />
                                <TariffFormFields />
                                <ThermalFormFields />
                                <InstantaneousCostsFields />
                                <HeatPumpCostsFields />
                            </Grid>
                            <Grid item xs={6} sm={3} md={3}>
                                {values.timeEnergyLostFinalfterN !== undefined && <Chart labels={[`Stored Energy Available`, `Energy lost over ${values.timeShiftHoursN} hours cooling`]} data={[values.tankEnergyAfterNHoursCooling, values.timeEnergyLostFinalfterN]} />}

                                {values.thermalStorageVsHeatPumpFlatRate !== undefined && values.heatPumpCostFlatRate && <Chart labels={['Heat Pump cost/day @ flat rate)', 'Time-shifted direct @ Low Rate']} data={[values.heatPumpCostFlatRate, values.thermalStorageDailyCost]} />}
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
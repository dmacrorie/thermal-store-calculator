import createDecorator from "final-form-calculate"
import { ISharedState } from "../App"
import { IThermalForm } from "../interfaces/thermal"

export interface IThermalFormProps {
    sharedState:ISharedState,
    setSomeSharedState: any,
    allValues: any}


    
const TestPieCharts = createDecorator( 
    {
        field:  /(.*?)/,

        updates: ({ allValues, sharedState, setSomeSharedState }: IThermalFormProps) => {

            if (allValues) {
                const unbind = { ...allValues }
                console.log("-----------------------------------")
                                    //detect not entered fields and replace with 0
                                    unbind.timeShiftHoursN = (unbind.timeShiftHoursN !== '' && unbind.timeShiftHoursN !== undefined ? allValues.timeShiftHoursN : 0)
                                    unbind.timeEnergyLostFinalfterN = (unbind.timeEnergyLostFinalfterN ? unbind.timeEnergyLostFinalfterN : 0)
                                    unbind.tankEnergyAfterNHoursCooling = (unbind.tankEnergyAfterNHoursCooling ? unbind.tankEnergyAfterNHoursCooling : 0)
                                    unbind.thermalStorageVsHeatPumpFlatRate = (unbind.thermalStorageVsHeatPumpFlatRate ? unbind.thermalStorageVsHeatPumpFlatRate : 0)
                                    unbind.heatPumpCostFlatRate = (unbind.heatPumpCostFlatRate ? unbind.heatPumpCostFlatRate : 0)
                                    unbind.thermalStorageDailyCost = (unbind.thermalStorageDailyCost ? unbind.thermalStorageDailyCost : 0)
                                    unbind.thermalStorageVsGridPercent = (unbind.thermalStorageVsGridPercent ? unbind.thermalStorageVsGridPercent : 0)
                                    unbind.thermalStorageVsHeatPumpPeakRate = (unbind.thermalStorageVsHeatPumpPeakRate ? unbind.thermalStorageVsHeatPumpPeakRate : 0)
                                    unbind.thermalStoragePotentialWastedExpense = (unbind.thermalStoragePotentialWastedExpense ? unbind.thermalStoragePotentialWastedExpense : 0)
                                    unbind.thermalStorageHighTempRateCost = (unbind.thermalStorageHighTempRateCost ? unbind.thermalStorageHighTempRateCost : 0)
                                    
                                    
                                    unbind.timeEnergyLostFinalfterNState = (sharedState.timeEnergyLostFinalfterNState ? sharedState.timeEnergyLostFinalfterNState : 0)
                                    unbind.timeShiftHoursNState = (sharedState.timeShiftHoursNState ? sharedState.timeShiftHoursNState : 0)
                                    unbind.tankEnergyAfterNHoursCoolingState = (sharedState.tankEnergyAfterNHoursCoolingState ? sharedState.tankEnergyAfterNHoursCoolingState : 0)
                                    unbind.thermalStorageVsHeatPumpFlatRateState = (sharedState.thermalStorageVsHeatPumpFlatRateState ? sharedState.thermalStorageVsHeatPumpFlatRateState : 0)
                                    unbind.heatPumpCostFlatRateState = (sharedState.heatPumpCostFlatRateState ? sharedState.heatPumpCostFlatRateState : 0)
                                    unbind.thermalStorageDailyCostState = (sharedState.thermalStorageDailyCostState ? sharedState.thermalStorageDailyCostState : 0)
                                    unbind.thermalStorageVsGridPercentState = (sharedState.thermalStorageVsGridPercentState ? sharedState.thermalStorageVsGridPercentState : 0)
                                    unbind.thermalStorageVsHeatPumpPeakRateState = (sharedState.thermalStorageVsHeatPumpPeakRateState ? sharedState.thermalStorageVsHeatPumpPeakRateState : 0)
                                    unbind.thermalStoragePotentialWastedExpenseState = (sharedState.thermalStoragePotentialWastedExpenseState ? sharedState.thermalStoragePotentialWastedExpenseState : 0)
                                    unbind.thermalStorageHighTempRateCostState = (sharedState.thermalStorageHighTempRateCostState ? sharedState.thermalStorageHighTempRateCostState : 0)


                const values: IThermalForm = unbind;

        if (values.timeEnergyLostFinalfterN !== sharedState.timeEnergyLostFinalfterNState) {
                setSomeSharedState('timeEnergyLostFinalfterNState', values.timeEnergyLostFinalfterN)
            }
        if (values.timeShiftHoursN !== sharedState.timeShiftHoursNState) {
                setSomeSharedState('timeShiftHoursNState', values.timeShiftHoursN)
            }
        if (values.tankEnergyAfterNHoursCooling !== sharedState.tankEnergyAfterNHoursCoolingState) {
                setSomeSharedState('tankEnergyAfterNHoursCoolingState', values.tankEnergyAfterNHoursCooling)
            }
        if (values.thermalStorageVsHeatPumpFlatRate !== sharedState.thermalStorageVsHeatPumpFlatRateState) {
                setSomeSharedState('thermalStorageVsHeatPumpFlatRateState', values.thermalStorageVsHeatPumpFlatRate)
            }
        if (values.heatPumpCostFlatRate !== sharedState.heatPumpCostFlatRateState) {
                setSomeSharedState('heatPumpCostFlatRateState', values.heatPumpCostFlatRate)
            }
        if (values.thermalStorageDailyCost !== sharedState.thermalStorageDailyCostState) {
                setSomeSharedState('thermalStorageDailyCostState', values.thermalStorageDailyCost)
            }
        if (values.thermalStorageVsGridPercent !== sharedState.thermalStorageVsGridPercentState) {
                setSomeSharedState('thermalStorageVsGridPercentState', values.thermalStorageVsGridPercent)
            }
        if (values.thermalStorageVsHeatPumpPeakRate !== sharedState.thermalStorageVsHeatPumpPeakRateState) {
                setSomeSharedState('thermalStorageVsHeatPumpPeakRateState', values.thermalStorageVsHeatPumpPeakRate)
            }
        if (values.thermalStoragePotentialWastedExpense !== sharedState.thermalStoragePotentialWastedExpenseState) {
                setSomeSharedState('thermalStoragePotentialWastedExpenseState', values.thermalStoragePotentialWastedExpense)
            }
        if (values.thermalStorageHighTempRateCost !== sharedState.thermalStorageHighTempRateCostState) {
                setSomeSharedState('thermalStorageHighTempRateCostState', values.thermalStorageHighTempRateCost)
            }  
            return {

                "timeEnergyLostFinalfterNState":  values.timeEnergyLostFinalfterN,
                "timeShiftHoursNState": sharedState.timeShiftHoursNState,
                "tankEnergyAfterNHoursCoolingState": sharedState.tankEnergyAfterNHoursCoolingState,
                "thermalStorageVsHeatPumpFlatRateState": sharedState.thermalStorageVsHeatPumpFlatRateState,
                "heatPumpCostFlatRateState": sharedState.heatPumpCostFlatRateState,
                "thermalStorageDailyCostState": sharedState.thermalStorageDailyCostState,
                "thermalStorageVsGridPercentState": sharedState.thermalStorageVsGridPercentState,
                "thermalStorageVsHeatPumpPeakRateState": sharedState.thermalStorageVsHeatPumpPeakRateState,
                "thermalStoragePotentialWastedExpenseState": sharedState.thermalStoragePotentialWastedExpenseState,
                "thermalStorageHighTempRateCostState": sharedState.thermalStorageHighTempRateCostState
            }

    } else {
        return {}
    }}, 
    },)

   export default TestPieCharts;
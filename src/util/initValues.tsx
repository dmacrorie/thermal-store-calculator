import { IThermalForm } from "../interfaces/thermal";

const InitValues: IThermalForm = {
    standardRateEnergyCost: 25,
    lowRateEnergyCost: 8,
    highRateEnergyCost: 34,

    tankSpecificHeatCapacity: 4181, // asssume water 
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
    heatDailyEnergyRequired: 1,
    heatDailyEnergyRequiredOverride: null,
    heatProportionOfCentralHeating: 0,

    timeShiftHoursN: 10,
    timeShiftEnergyLost: 0,
    timeEnergyLossMaxTemp: 0,
    timeTemperatureAfterNCoolingNoHeatAndDraw: 0.0,
    timeTempDropOverHours: 0.0,
    timeEnergyLostFinalfterN: 20,
    timeEnergyLostNMaxTempFraction: 0,


    instantaneousHeatingCostFlatRate: 0.0,
    instantaneousHeatingCostPeakRate: 0.0,

    heatPumpHeatEfficiency: 250,
    heatPumpCostFlatRate: 3.0,
    heatPumpCostPeakRate: 0.0,

    thermalStorageDailyCost: 3,
    thermalStorageVsGridPercent: 0,
    thermalStorageVsHeatPumpFlatRate: 5,
    thermalStorageVsHeatPumpPeakRate: 0,
    thermalStoragePotentialWastedExpense: 0,
    thermalStorageHighTempRateCost: 0,

    heatingType: "0",
}

export default InitValues;
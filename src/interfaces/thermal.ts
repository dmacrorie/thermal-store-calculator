
export interface IThermalForm {
    standardRateEnergyCost: number;
    lowRateEnergyCost: number;
    highRateEnergyCost: number;

    tankSpecificHeatCapacity: number;
    tankMass: number;
    tankMassOverride?: number | null;
    tankMaxTemperature: number;
    tankMinUsefulTemperature: number;
    tankAmbientTemperature: number;
    tankEnergyLossCoeficient: number;
    tankEnergyAmbient?: number;
    tankEnergyJoules?: number;
    tankEnergy?: number;
    tankEnergyAfterNHoursCooling?: number;
    tankEnergyLossWatts?: number;

    heatEnergyDwellingYear: number;
    heatUsedDaysPerYear: number;
    heatDailyEnergyRequired: number; // needs to include because override can be applied apparently
    heatDailyEnergyRequiredOverride?: number | undefined | null;
    heatProportionOfCentralHeating: number;

    timeShiftHoursN: number;
    timeShiftEnergyLost?: number;
    timeEnergyLossMaxTemp?: number;
    timeTemperatureAfterNCoolingNoHeatAndDraw: number;
    timeTempDropOverHours?: number;
    timeEnergyLostFinalfterN?: number;
    timeEnergyLostNMaxTempFraction?: number;



    instantaneousHeatingCostFlatRate?: number;
    instantaneousHeatingCostPeakRate?: number;

    heatPumpHeatEfficiency: number;

    heatPumpCostFlatRate?: number;
    heatPumpCostPeakRate?: number;

    thermalStorageDailyCost?: number;
    thermalStorageVsGridPercent: number;
    thermalStorageVsHeatPumpFlatRate: number;
    thermalStorageVsHeatPumpPeakRate: number;
    thermalStoragePotentialWastedExpense: number;
    thermalStorageHighTempRateCost: number;

    heatingType?: string;
    houseType?: any,
}


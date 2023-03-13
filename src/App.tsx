import { Box, Container } from '@mui/material';
import { useState } from 'react';
import './App.css';
import BasicForm from './___BasicForm';
import ThermalForm from './___ThermalForm';
import Tabs from './tabs/Tabs';
import TestForm from './__TestForm';

type TabsType = {
  label: string;
  index: number;
}[];

// Tabs Array
const tabs: TabsType = [
  {
    label: "Domestic parameters",
    index: 1
  },
  {
    label: "System parameters",
    index: 2
  },
  {
    label: "Test",
    index: 3
  }
];

export interface ISharedState {
  thermalStorageState: number;
  annualEnergyState: number;
  hotWaterTimeState: number;
  heatingTypeState: number;
  selectWhenHomeState: number;
  seasonalWeightingState: number;
  regionMenuState: number;
  heatUsedDaysPerYearState: number;
  tariffMenuState: number;
  tankMassState: number | null;
  timeEnergyLostFinalfterNState: any;
  timeShiftHoursNState: number;
  tankEnergyAfterNHoursCoolingState: any;
  thermalStorageVsHeatPumpFlatRateState: number;
  heatPumpCostFlatRateState: any;
  thermalStorageDailyCostState: any;

  thermalStorageVsGridPercentState: any;
  thermalStorageVsHeatPumpPeakRateState: any;
  thermalStoragePotentialWastedExpenseState: any;
  thermalStorageHighTempRateCostState: any;
}

export enum Fieldname {
  annualEnergyState = 'annualEnergyState',
  hotWaterTimeState = 'hotWaterTimeState',
  heatingTypeState = 'heatingTypeState',
  thermalStorageState = 'thermalStorageState',
  selectWhenHomeState = 'selectWhenHomeState',
  seasonalWeightingState = 'seasonalWeightingState',
  regionMenuState = 'regionMenuState',
  heatUsedDaysPerYearState = 'heatUsedDaysPerYearState',
  tariffMenuState = 'tariffMenuState',
  tankMassState = 'tariffMenuState',
  timeEnergyLostFinalfterNState = 'timeEnergyLostFinalfterNState',
  timeShiftHoursNState = 'timeShiftHoursNState',
  tankEnergyAfterNHoursCoolingState = 'tankEnergyAfterNHoursCoolingState',
  thermalStorageVsHeatPumpFlatRateState = 'thermalStorageVsHeatPumpFlatRateState',
  heatPumpCostFlatRateState = 'heatPumpCostFlatRateState',
  thermalStorageDailyCostState = 'thermalStorageDailyCostState',

  thermalStorageVsGridPercentState = 'thermalStorageVsGridPercentState',
  thermalStorageVsHeatPumpPeakRateState = 'thermalStorageVsHeatPumpPeakRateState',
  thermalStoragePotentialWastedExpenseState = 'thermalStoragePotentialWastedExpenseState',
  thermalStorageHighTempRateCostState = 'thermalStorageHighTempRateCostState'
}
 
function App() {

  const [selectedTab, setSelectedTab] = useState<number>(3);
  const [sharedState, setSharedState] = useState<ISharedState>({
    annualEnergyState: 0, 
    hotWaterTimeState: 0,
    heatingTypeState: 0,
    thermalStorageState: 0,
    selectWhenHomeState: 0,
    seasonalWeightingState: 0,
    regionMenuState: 0,
    heatUsedDaysPerYearState: 0,
    tariffMenuState: 0,
    tankMassState: null,
    timeEnergyLostFinalfterNState: 0,
    timeShiftHoursNState: 0,
    tankEnergyAfterNHoursCoolingState: 0,
    thermalStorageVsHeatPumpFlatRateState: 0,
    heatPumpCostFlatRateState: 0,
    thermalStorageDailyCostState: 0,
    
    thermalStorageVsGridPercentState: 0,
    thermalStorageVsHeatPumpPeakRateState: 0,
    thermalStoragePotentialWastedExpenseState: 0,
    thermalStorageHighTempRateCostState: 0
  });

  const handleChange = (fieldName:Fieldname, value:number)=>{
    const newState = { ...sharedState, [fieldName]: value };
    setSharedState(newState)
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 5 }}>
        <Tabs selectedTab={selectedTab}
          onClick={setSelectedTab}
          tabs={tabs}
        ></Tabs>
        
        <BasicForm visible={selectedTab===1}></BasicForm>
        <ThermalForm sharedState={sharedState} visible={selectedTab===2} setSomeSharedState={handleChange}></ThermalForm>
        <TestForm sharedState={sharedState} visible={selectedTab===3} setSomeSharedState={handleChange}></TestForm>
      </Box>
    </Container>
  );
}

export default App;
import { Card, CardContent, Grid } from "@mui/material";
import { Form } from "react-final-form";
import Chart from "./Chart";
import TestHouseMenu from "../src/Test/TestHouseMenu";
import TestAtHomeMenu from "./Test/TestAtHomeMenu";
import TestRegionMenu from "./Test/TestRegionMenu";
import TestSeasonalWeightings from "./Test/TestSeasonalWeightings";
import ThermalStorageFields from "./ThermalStorageFields";
import TestThermalStorageMenu from "./Test/TestThermalStorageMenu";
import { ISharedState } from "./App";
import TestWhenNeedHotWater from "./Test/TestWhenNeedHotWater";
import TestSelectHeatingType from "./Test/TestSelectHeatingType";
import TestTariffMenu from "./Test/TestTariffMenu";
import InitValues from "./util/initValues";

export interface ITestFormProps {
    visible:boolean,
    setSomeSharedState(field: keyof ISharedState, val: number):void
    sharedState:ISharedState
}

const TestForm:React.FC<ITestFormProps> = ({ visible, setSomeSharedState, sharedState }:ITestFormProps) => {


    return <Card style={{ backgroundColor: "#d3d3d3", display:visible ? 'block':'none' }}>
        <CardContent>
            <Form <any>
                onSubmit={(values: any) => {
                    console.log("onSubmit", values)
                    //   if (!response.data) return response;
                }}
                initialValues={InitValues}
                render={({
                    handleSubmit,
                    values
                }) => {
                    return <form onSubmit={handleSubmit} autoComplete="off" noValidate>
                        <Grid container spacing={2}>
                            <Grid item xs={8} sm={9} md={9} >
                                <TestHouseMenu setSomeSharedState={setSomeSharedState} />
                                <TestSelectHeatingType setSomeSharedState={setSomeSharedState} values={values}/>
                                {(values.heatingType === "1" || values.heatingType === "2") && <TestWhenNeedHotWater setSomeSharedState={setSomeSharedState} values={values}/>}
                                {(values.heatingType === "0" || values.heatingType === "2") && <TestAtHomeMenu setSomeSharedState={setSomeSharedState} values={values}/>}
                                <TestThermalStorageMenu setSomeSharedState={setSomeSharedState} values={values}/>
                                <TestRegionMenu setSomeSharedState={setSomeSharedState} values={values}/>
                                <TestTariffMenu setSomeSharedState={setSomeSharedState} values={values}/>
                                <TestSeasonalWeightings setSomeSharedState={setSomeSharedState} values={values}/>
                            </Grid>
                            <Grid item xs={6} sm={3} md={3}>
                                {sharedState.timeEnergyLostFinalfterNState !== undefined && <Chart labels={[`Stored kWh Available`, `kWh lost over ${sharedState.timeShiftHoursNState} hours`]} data={[sharedState.tankEnergyAfterNHoursCoolingState.toFixed(1), sharedState.timeEnergyLostFinalfterNState.toFixed(1)]} />}
                                {sharedState.thermalStorageVsHeatPumpFlatRateState !== undefined && sharedState.heatPumpCostFlatRateState && <Chart labels={['Heat pump £/day@flat rate)', 'Time-shifted direct £/day@low Rate']} data={[sharedState.heatPumpCostFlatRateState.toFixed(2), sharedState.thermalStorageDailyCostState.toFixed(2)]} />}
                                <ThermalStorageFields sharedState={sharedState}/>
                            </Grid>
                        </Grid>
                    </form>
                }}
            />
        </CardContent>
    </Card>
}


export default TestForm;


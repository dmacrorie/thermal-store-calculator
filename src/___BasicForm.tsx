import { Card, CardContent, Grid } from "@mui/material";
import { useState } from "react";
import { Form } from "react-final-form";
import HouseMenu from "./simplifiedParameters/HouseMenu";
import HeatingTypeMenu from "./simplifiedParameters/HeatingTypeMenu";
import AtHomeMenu from "./simplifiedParameters/AtHomeMenu";
import HotWaterTimeMenu from "./simplifiedParameters/HotWaterTimeMenu";
import ThermalStoreMenu from "./simplifiedParameters/ThermalStoreMenu";
import HeatPumpRegionMenu from "./simplifiedParameters/HeatPumpRegionMenu";
import SeasonalWeightingMenu from "./simplifiedParameters/SeasonalWeightingMenu";
import Chart from "./Chart";
import ThermalStorageFields from "./ThermalStorageFields";
import { IThermalForm } from "./interfaces/thermal";
import initValues from "./util/initValues";

export interface IBasicFormProps {
  visible:boolean
}

const BasicForm:React.FC<IBasicFormProps> = (props) => {

    const [selectHouse, setSelectHouse] = useState<string>("");
    const [selectHotWaterTime, setSelectHotWaterTime] = useState<string>("");
    const [selectAtHome, setSelectAtHome] = useState<string>("");
    const [selectThermalStorage, setSelectThermalStorage] = useState<String>();
    const [selectHeatPumpRegionMenu, setSelectHeatPumpRegionMenu] = useState<string>("");
    const [selectedSeasonalWeighting, setSelectedSeasonalWeighting] = useState<String>();
    const [selectHeatingType, setSelectHeatingType] = useState<string>("");

    const prevSelectHeating = selectHeatingType;

    const renderAtHomeMenu = ((prevSelectHeating !== "Hot water only") && prevSelectHeating !== "");
    const renderHotWaterTimeMenu = ((prevSelectHeating !== "Central heating only") && prevSelectHeating !== "")
    
    

    return <Card style={{
      backgroundColor: "#d3d3d3",
      display: props.visible ? 'block' : 'none'
    }}>
        <CardContent>
            <Form <any>
                onSubmit={(values: any) => {
                    console.log("onSubmit", values)
                    //   if (!response.data) return response;
                }}
                initialValues={initValues}
                
                render={({
                    handleSubmit,
                    values
                }) => (
                    <form onSubmit={handleSubmit} autoComplete="off" noValidate>
                        {/* <DebugButton data={values} /> */}
                        <Grid container spacing={2}>
                        <pre>{JSON.stringify(selectThermalStorage)}</pre>
                            <Grid item xs={8} sm={9} md={9} >
                                <HouseMenu 
                                  selectHouse={selectHouse}
                                  setSelectHouse={setSelectHouse}
                                />
                                <HeatingTypeMenu 
                                  selectHeatingType={selectHeatingType}
                                  setSelectHeatingType={setSelectHeatingType}  />
                                {renderAtHomeMenu && 
                                  <AtHomeMenu
                                    selectAtHome={selectAtHome}
                                    setSelectAtHome={setSelectAtHome}
                                    />}
                                {renderHotWaterTimeMenu && 
                                  <HotWaterTimeMenu  
                                    selectHotWaterTime={selectHotWaterTime}
                                    setSelectHotWaterTime={setSelectHotWaterTime}
                                    />}
                                <ThermalStoreMenu 
                                  selectThermalStorage={selectThermalStorage}
                                  setSelectThermalStorage={setSelectThermalStorage}
                                  />
                                <HeatPumpRegionMenu 
                                  selectHeatPumpRegionMenu={selectHeatPumpRegionMenu} 
                                  setSelectHeatPumpRegionMenu={setSelectHeatPumpRegionMenu}
                                  />
                                <SeasonalWeightingMenu 
                                  selectedSeasonalWeighting={selectedSeasonalWeighting}
                                  setSelectedSeasonalWeighting={setSelectedSeasonalWeighting}
                                  />
                            </Grid>
                            <Grid item xs={6} sm={3} md={3}>
                                {values.timeEnergyLostFinalfterN !== undefined && <Chart labels={[`Stored kWh Available`, `kWh lost over ${values.timeShiftHoursN} hours`]} data={[values.tankEnergyAfterNHoursCooling.toFixed(1), values.timeEnergyLostFinalfterN.toFixed(1)]} />}
                                {values.thermalStorageVsHeatPumpFlatRate !== undefined && values.heatPumpCostFlatRate && <Chart labels={['Heat pump £/day@flat rate)', 'Time-shifted direct £/day@low Rate']} data={[values.heatPumpCostFlatRate.toFixed(2), values.thermalStorageDailyCost.toFixed(2)]} />}
                                
                            </Grid>
                        </Grid>
                    </form>
                )}
            />
        </CardContent>
    </Card>
}


export default BasicForm; 

import { FormSpy } from "react-final-form";
import { IThermalForm } from "./interfaces/thermal";
import ContainerThing from "./util/container";
import InfoThing from "./util/infoThing";



const ThermalStorageFields = () => {
    return <FormSpy <IThermalForm>
        subscription={{
            values: true,
            dirtySinceLastSubmit: true,
            submitting: true,
        }}
    >
        {({ values, dirtySinceLastSubmit, submitting }) => (<ContainerThing title="Costs Comparisons">

            <InfoThing sm={12} md={12} xs={12} textA="Shifted direct cost" value={values.thermalStorageDailyCost} description={`Time shifted direct heated store @ low rate including losses`} preValue="£" />

            <InfoThing sm={12} md={12} xs={12} textA="&uarr; vs direct" textB="%" valueDecimalPlace={0} value={values.thermalStorageVsGridPercent} description={`Cost comparison with instantaneous direct heating @flat rate tarif`} />

            <InfoThing sm={12} md={12} xs={12} textA="&uarr; vs HP flat rate" textB="%" valueDecimalPlace={0} value={values.thermalStorageVsHeatPumpFlatRate} description={`Cost comparison of on-demand heat pump heating @flat rate tarif`} />

            <InfoThing sm={12} md={12} xs={12} textA="&uarr; vs HP peak rate" textB="%" valueDecimalPlace={0} value={values.thermalStorageVsHeatPumpPeakRate} description={`Cost comparison of on-demand heat pump heating @peak rate tarif`} />

            <InfoThing sm={12} md={12} xs={12} textA="Lost energy cost" preValue="£" valueDecimalPlace={2} value={values.thermalStoragePotentialWastedExpense/100} description={`Cost of energy lost by time shifted heating @low rate`} />

            <InfoThing sm={12} md={12} xs={12} textA="Shifted HT HP" preValue="£" valueDecimalPlace={2} value={values.thermalStorageHighTempRateCost *100} description={`Theoretical cost of time-shifted high temperature heat pump`} />
            
        </ContainerThing>)
        }
    </FormSpy >
}


export default ThermalStorageFields;
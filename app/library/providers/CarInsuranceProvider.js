import React, { useContext, useState } from 'react';
import {
    VIN_OPTIONS,
    VIN_DETAILS,
    VIN_A
} from "../constants/ContactFlowConstants";

const CarInsuranceContext = React.createContext(null);

export function useCarInsuranceProvider(){
    const config = useContext(CarInsuranceContext);

    if(!config) throw new Error('useCarInsuranceProvider must be used within CarInsuranceProvider');

    return config;
}

export function CarInsuranceProvider({children}) {

    const [driver, setDriver] = useState(null);
    const [make, setMake] = useState(null);
    const [model, setModel] = useState(null);
    const [color, setColor] = useState(null);
    const [year, setYear] = useState(null);
    const [vin, setVin] = useState(null);
    const [coverage, setCoverage] = useState(null);
    const [premium, setPremium] = useState(null);
    const [coverageLevel, setCoverageLevel] = useState(null);
    const [injuryProtection, setInjuryProtection] = useState(null);

    const setCarDetails = (newVin, driver) => {
        if (!newVin) {
            setVin(null);
            setDriver(null);
            setMake(null);
            setModel(null);
            setColor(null);
            setYear(null);
            return;
        }

        let tempVin = VIN_OPTIONS.includes(newVin) ? newVin : VIN_A;
        setVin(tempVin);
        setMake(VIN_DETAILS[tempVin].Make);
        setModel(VIN_DETAILS[tempVin].Model);
        setYear(VIN_DETAILS[tempVin].Year);
        setColor(VIN_DETAILS[tempVin].Color);
        setDriver(driver);
    };

    const setDefaultCoverageDetails = () => {
        setCoverageDetails("Comprehensive", "$500", "Minimal", "Yes");
    };

    const setCoverageDetails = (coverage, premium, coverageLevel, injuryProtection) => {
        setCoverage(coverage);
        setPremium(premium);
        setCoverageLevel(coverageLevel);
        setInjuryProtection(injuryProtection);
    };

    const providerValue = {
        vin,
        make,
        model,
        year,
        color,
        driver,
        coverage,
        premium,
        coverageLevel,
        injuryProtection,
        setCarDetails,
        setDefaultCoverageDetails,
        setCoverageDetails
    };

    return(
        <CarInsuranceContext.Provider value={providerValue}>
            {children}
        </CarInsuranceContext.Provider>
    );

}
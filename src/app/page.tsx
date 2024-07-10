import React, { useState } from 'react';

const Page: React.FC = () => {
  const [value, setValue] = useState<number>(0);
  const [convertFrom, setConvertFrom] = useState<string>('temperature');
  const [convertTo, setConvertTo] = useState<string>('celsiusToFahrenheit');
  const [convertedValue, setConvertedValue] = useState<number>(0);

  const convertValue = (inputValue: number, fromType: string, toType: string) => {
    switch (fromType) {
      case 'temperature':
        return convertTemperature(inputValue, toType);
      case 'length':
        return convertLength(inputValue, toType);
      default:
        return inputValue;
    }
  };

  const convertTemperature = (inputValue: number, toType: string) => {
    switch (toType) {
      case 'celsiusToFahrenheit':
        return (inputValue * 9) / 5 + 32;
      case 'fahrenheitToCelsius':
        return ((inputValue - 32) * 5) / 9;
      default:
        return inputValue;
    }
  };

  const convertLength = (inputValue: number, toType: string) => {
    switch (toType) {
      case 'metersToFeet':
        return inputValue * 3.28084;
      case 'feetToMeters':
        return inputValue / 3.28084;
      case 'inchesToCentimeters':
        return inputValue * 2.54;
      case 'centimetersToInches':
        return inputValue / 2.54;
      default:
        return inputValue;
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = Number(event.target.value);
    setValue(inputValue);
    setConvertedValue(convertValue(inputValue, convertFrom, convertTo));
  };

  const handleConvertFromChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const fromType = event.target.value;
    setConvertFrom(fromType);
    if (fromType === 'temperature') {
      setConvertTo('celsiusToFahrenheit');
    } else {
      setConvertTo('metersToFeet');
    }
    setConvertedValue(convertValue(value, fromType, convertTo));
  };

  const handleConvertToChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const toType = event.target.value;
    setConvertTo(toType);
    setConvertedValue(convertValue(value, convertFrom, toType));
  };

  return (
    <div>
      <header>
        <img src="./logo.png" alt="Logo" />
        <h1>Unit Converter</h1>
      </header>
      <main className="main-container">
        <div className="header-content">
          <div className="input-group">
            <label>
              Value:
              <input type="number" className="input-field" value={value} onChange={handleInputChange} />
            </label>
          </div>
          <div className="input-group">
            <label>
              Convert from:
              <select className="input-field" value={convertFrom} onChange={handleConvertFromChange}>
                <option value="temperature">Temperature</option>
                <option value="length">Length</option>
              </select>
            </label>
          </div>
          <div className="input-group">
            <label>
              Convert to:
              <select className="input-field" value={convertTo} onChange={handleConvertToChange}>
                {convertFrom === 'temperature' ? (
                  <>
                    <option value="celsiusToFahrenheit">Celsius to Fahrenheit</option>
                    <option value="fahrenheitToCelsius">Fahrenheit to Celsius</option>
                  </>
                ) : (
                  <>
                    <option value="metersToFeet">Meters to Feet</option>
                    <option value="feetToMeters">Feet to Meters</option>
                    <option value="inchesToCentimeters">Inches to Centimeters</option>
                    <option value="centimetersToInches">Centimeters to Inches</option>
                  </>
                )}
              </select>
            </label>
          </div>
          <div className="result-container">
            <p>Converted value: {convertedValue.toFixed(2)}</p>
          </div>
        </div>
      </main>
      <footer className="footer">
        <a href="settings.html" target="_blank">Settings</a>
        <a href="help.html" target="_blank" className="help">Help</a>
      </footer>
    </div>
  );
};

export default Page;






































import React from "react";
import Select from "react-select";
import { countries } from "countries-list";
import PropTypes from "prop-types";

const countryOptions = Object.keys(countries).map((countryCode) => ({
  value: countryCode,
  label: `${countries[countryCode].name} +${countries[countryCode].phone}`,
  flag: `https://www.countryflags.io/${countryCode}/flat/32.png`,
}));

const CustomOption = ({ innerProps, label, data }) => (
  <div {...innerProps}>
    <img src={data.flag} alt="" style={{ marginRight: "8px" }} />
    {label}
  </div>
);

CustomOption.propTypes = {
  innerProps: PropTypes.object,
  label: PropTypes.string,
  data: PropTypes.shape({
    flag: PropTypes.string,
  }),
};

const CountrySelect = ({ value, onChange }) => {
  const handleChange = (selectedOption) => {
    onChange(selectedOption);
  };

  return (
    <Select
      options={countryOptions}
      value={value}
      onChange={handleChange}
      isSearchable
      components={{
        Option: CustomOption,
      }}
    />
  );
};

CountrySelect.propTypes = {
  value: PropTypes.object, // Adjust the type according to the actual value type
  onChange: PropTypes.func,
};

export default CountrySelect;


import React from 'react';
import Select from 'react-select';
import { GroupBase, Props } from 'react-select';

function CustomSelect<
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
>(props: Props<Option, IsMulti, Group>) {
  return (
    <Select 
      {...props} 
      theme={(theme) => ({ 
        ...theme, 
          colors: {
            ...theme.colors,
            primary25: '#f0f1f2',
            primary: '#242b3c',
          },
      })} 
      styles={{
        
        control: (baseStyles, state) => ({
          ...baseStyles,
          borderRadius: '0.5rem',
          boxShadow: state.isFocused ? '#999999' : '#242b3c',
        }),
        menu: (base) => ({
          ...base,
          borderRadius: '0.5rem'
        }),
        dropdownIndicator: (base) => ({
          ...base,
          width: '30px',
          height: '30px', 
          marginBottom: '5px',
        }),
        clearIndicator: (base) => ({
          ...base,
          width: '30px',
          height: '30px',
          marginBottom: '5px',
        }),
        indicatorSeparator: (base) => ({
          ...base,
          height: '15px',
          marginTop: '11px',
        }),
        placeholder: (base) => ({
          ...base,
          fontSize: '14px',
        }),
        noOptionsMessage: (base) => ({
          ...base,
          fontSize: '14px',
          fontWeight: 400,
        })
      }}
    />
  );
};

export default CustomSelect;
'use client';

import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import styles from './selectInput.module.scss';

interface SelectInputProps {
  label?: string;
  onSelect?: (value: SelectChangeEvent<any>) => void;
  listDropdown: {
    [x:string]: string | string[];
    id: string;
    text: string;
    value: string }[];
  placeholder?: string;
  name?: string;
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function SelectInput({
  label,
  onSelect,
  listDropdown,
  placeholder,
  name,
}: SelectInputProps) {
  const [selectedValue, setSelectValue] = React.useState<string[]>([]);
  const [displayValue, setDisplayValue] = React.useState<string>('');

  const findIndexByKeyValue = (
    arr: SelectInputProps['listDropdown'],
    key: string,
    value: string | string[],
  ) => {
    return arr.reduce((index, obj, i) => (obj[key] === value ? i : index), -1);
  };

  const handleChange = (event: SelectChangeEvent<typeof selectedValue>) => {
    const index = findIndexByKeyValue(
      listDropdown,
      'value',
      event.target.value,
    );
    const {
      target: { value },
    } = event;
    setSelectValue(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
    setDisplayValue(listDropdown[index].text);

    if (onSelect) {
      onSelect(event);
    }
  };

  return (
    <div>
      <FormControl sx={{ padding: 0, marginTop: 0, width: 300 }}>
        <label className={styles.label}>{label}</label>
        <input type='text' name={name} value={selectedValue} hidden readOnly />
        <Select
          className={styles.select}
          displayEmpty
          value={selectedValue}
          onChange={handleChange}
          input={<OutlinedInput />}
          renderValue={(selected) => {
            if (selected.length === 0) {
              return <em>{placeholder}</em>;
            }

            return displayValue;
          }}
          MenuProps={MenuProps}
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem className={styles.menuItem} disabled value=''>
            <em>{placeholder}</em>
          </MenuItem>
          {listDropdown.map((item, key) => (
            <MenuItem
              className={styles.menuItem}
              key={`${item.id}${name}${key}`}
              value={item.value}
            >
              {item.text}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

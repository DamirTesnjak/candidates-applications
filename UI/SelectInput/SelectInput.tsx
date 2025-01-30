import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import styles from './selectInput.module.scss';

interface SelectInputProps {
    label?: string;
    onSelect: (value: SelectChangeEvent<any>) => void;
    listDropdown: { id: string; value: string }[];
    placeholder?: string;
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

export default function SelectInput({ label, onSelect, listDropdown, placeholder }: SelectInputProps) {
    const [selectedValue, setSelectValue] = React.useState<string[]>([]);

    const handleChange = (event: SelectChangeEvent<typeof selectedValue>) => {
        const {
            target: { value },
        } = event;
        setSelectValue(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
        onSelect(event);
    };

    return (
        <div>
            <FormControl sx={{ m: 1, width: 300, mt: 3 }}>
                <label
                    className={styles.label}
                >
                    {label}
                </label>
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

                        return selected.join(', ');
                    }}
                    MenuProps={MenuProps}
                    inputProps={{ 'aria-label': 'Without label' }}
                >
                    <MenuItem
                        className={styles.menuItem}
                        disabled value="">
                        <em>{placeholder}</em>
                    </MenuItem>
                    {listDropdown.map((item) => (
                        <MenuItem
                            className={styles.menuItem}
                            key={item.id}
                            value={item.value}
                        >
                            {item.value}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}
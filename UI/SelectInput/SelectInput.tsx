import {MenuItem, Select} from "@mui/material";
import { Theme, useTheme } from '@mui/material/styles';

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
    value,
    handleChange,
    inputComponent,
    placeholder,
    listDropdown,
}) {
    const theme = useTheme();
    console.log('value', value);

    const getStyles = (listDropdownValue: string, selectedValue: readonly string[], theme: Theme) => {
        return {
            fontWeight: selectedValue.includes(listDropdownValue)
                ? theme.typography.fontWeightMedium
                : theme.typography.fontWeightRegular,
        };
    }

    return (
    <Select
        displayEmpty
        value={value}
        onChange={(e) => handleChange(e)}
        input={inputComponent}
        renderValue={(selected) => {
            if (selected.length === 0) {
                return <em>{placeholder}</em>;
            }
            console.log('selected', selected);

            return selected;
        }}
        MenuProps={MenuProps}
        inputProps={{ 'aria-label': 'Without label' }}
    >
        <MenuItem disabled value="">
            <em>Placeholder</em>
        </MenuItem>
        {listDropdown.map((listDropdownItem) => (
            <MenuItem
                key={listDropdownItem.id}
                value={listDropdownItem.value}
                style={getStyles(listDropdownItem.value, value, theme)}
            >
                {listDropdownItem.value}
            </MenuItem>
        ))}
    </Select>)
}
import {MenuItem, Select, FormControl, FormLabel } from "@mui/material";
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
    label,
    value,
    handleChange,
    placeholder,
    listDropdown,
}) {
    const theme = useTheme();

    const getStyles = (listDropdownValue: string, selectedValue: readonly string[], theme: Theme) => {
        return {
            fontWeight: selectedValue.includes(listDropdownValue)
                ? theme.typography.fontWeightMedium
                : theme.typography.fontWeightRegular,
        };
    }

    return (
        <FormControl sx={{ m: 1, minWidth: 160, maxWidth: 160, marginTop: 0 }} variant="standard" size="small">
            <FormLabel id="demo-radio-buttons-group-label">{label}</FormLabel>
            <Select
                displayEmpty
                value={value}
                onChange={(e) => handleChange(e)}
                renderValue={(selected) => {
                    if (selected.length === 0) {
                        return <em>{placeholder}</em>;
                    }
                    return selected;
                }}
                MenuProps={MenuProps}
                inputProps={{ 'aria-label': 'Without label' }}
                size="small"
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
            </Select>
        </FormControl>
    )
}
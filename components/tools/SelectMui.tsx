import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Styles from "../../styles/select.module.scss";
import { useEffect, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { purple } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    secondary: {
      // Purple and green play nicely together.
      main: purple[500],
    },
    primary: {
      // This is green.A700 as hex.
      main: "#007aff",
    },
  },
});

type dataType = {
  forms: {
    label: string;
    value: string;
  }[];
  handlechange: (value: string) => void;
  displayLabel: string;
  show?: boolean;
  value: string;
};

export default function BasicSelect({
  forms,
  handlechange,
  value,
  show,
  displayLabel,
}: dataType) {
  const [age, setAge] = useState("");

  useEffect(() => {
    setAge(value);
  }, [value]);

  const handleChange = (event: SelectChangeEvent) => {
    let value = event.target.value as string;
    handlechange(value);
    show ? setAge(value) : setAge("");
  };

  return (
    <div className={Styles.container}>
      <ThemeProvider theme={theme}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">{displayLabel}</InputLabel>
          <Select value={age} label={displayLabel} onChange={handleChange}>
            {forms.map((form, index) => (
              <MenuItem key={index} value={form.value}>
                {form.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </ThemeProvider>
    </div>
  );
}

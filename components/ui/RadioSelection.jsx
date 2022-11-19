import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

export default function RadioSelection() {
  const [value, setValue] = React.useState("female");
  const handleChange = (event) => {
    console.log("event.target.value : " + event.target.value);
    setValue(event.target.value);
  };

  return (
    <FormControl>
      <FormLabel>電郵主題</FormLabel>
      <RadioGroup
        row
        aria-labelledby="quiz"
        name="quiz"
        value={value}
        sx={{
          width: "100vw",
          float: "left",
        }}
        onChange={handleChange}
      >
        <FormControlLabel
          value="female"
          control={<Radio />}
          label="捐款事宜"
          sx={{
            width: "50vw",
            float: "left",
          }}
        />
        <FormControlLabel
          value="male"
          control={<Radio />}
          label="一般查詢"
          sx={{
            width: "40vw",
            float: "left",
          }}
        />
      </RadioGroup>
    </FormControl>
  );
}

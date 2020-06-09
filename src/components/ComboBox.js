import React from "react";
import TextField from '@material-ui/core/TextField';

import Autocomplete from '@material-ui/lab/Autocomplete';



export default function ComboBox(props) {

const [locations, setLocations]= React.useState(['Lekki']);
  return (
    <Autocomplete
      id="combo-box-demo"
      options={locations}
      getOptionLabel={(option) => option}
      style={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Location" variant="outlined" />}
    />
  );
}


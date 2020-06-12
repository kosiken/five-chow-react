import React from "react";
import TextField from '@material-ui/core/TextField';

import Autocomplete from '@material-ui/lab/Autocomplete';



export default function ComboBox(props) {

const [locations, setLocations]= React.useState(['Lekki']);
  return (
    <Autocomplete
    defaultValue="Lekki"
      id="combo-box-demo"
      options={locations}
      getOptionLabel={(option) => option}
      style={{ width: 300,
      color: 'white' }}
      renderInput={(params) => <TextField {...params} color="secondary" label="Location"  variant="outlined" />}
    />
  );
}


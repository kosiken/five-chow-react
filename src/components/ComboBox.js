import React from "react";
import TextField from "@material-ui/core/TextField";

import Autocomplete from "@material-ui/lab/Autocomplete";

/**
 * This component will be used to interact with the Google places api
 * @component
 */
function ComboBox() {
  const [locations] = React.useState(["Lekki"]);
  return (
    <Autocomplete
      defaultValue="Lekki"
      id="combo-box-demo"
      options={locations}
      getOptionLabel={(option) => option}
      style={{ width: 300, color: "white" }}
      renderInput={(params) => (
        <TextField
          {...params}
          color="secondary"
          label="Location"
          variant="outlined"
        />
      )}
    />
  );
}

export default ComboBox;

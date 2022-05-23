import React from "react";
import Switch from "@material-ui/core/Switch";
// import { connect } from "react-redux";

function EnablerSwitch(props) {
  var bool = props.item.habilitado === 1;
  const [state, setState] = React.useState({
    habilitado: bool,
  });

  const handleChange = (e) => {
    setState({ ...state, habilitado: e });
    props.onChange(props.item, e);
  };

  return (
    <Switch
      checked={state.habilitado}
      onChange={(e) => handleChange(e.target.checked)}
      value="checkedA"
      color="primary"
      inputProps={{ "aria-label": "secondary checkbox" }}
    />
  );
}

export default EnablerSwitch;

// export default connect(null, { onSwitch })(EnablerSwitch);

import classes from "./Buttons.module.css";
import { Box } from "@material-ui/core";

export default function Button(props) {
  return (
    <Box
      style={{
        minHeight: "8.5vh",
        width: "80vw",
        maxWidth:'300px',
        border: "1px solid #EFEFEF",
        borderRadius: "20px",
        textAlign: "center",
        backgroundColor: "rgba(0, 0, 0, 0.2);",
        color: "#8956ff",
        fontSize: "20px",
        marginTop: "5vh",
        cursor: "pointer",
        borderStyle: "1px solid",
        borderWidth: "10px",
        alignItems:'center',
        display:'flex',
        boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.2)',
        justifyContent:'center',
        fontFamily: ["Fira Sans", "sans-serif"].join(),
      }}
      className={classes.scale}
      onClick={props.clicked}
    >
      {props.name}
    </Box>
  );
}

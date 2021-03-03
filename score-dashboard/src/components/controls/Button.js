import { Button as MuiButton } from "@material-ui/core";

export default function Button({ text, size, color, variant, onClick, ...other }) {

    return (
        <MuiButton
            variant={variant || "contained"}
            size={size || "large"}
            color={color || "primary"}
            onClick={onClick}
            {...other}>
            {text}
        </MuiButton>
    )
}
import { pageNotFoundStyles } from '../styles';
import { Typography } from '@material-ui/core';

function Pagenotfound() {

    const classes = pageNotFoundStyles();

    return (
        <div className={classes.container}>
            <Typography
                variant="h1"
                component="div">
                404</Typography>
            <Typography
                variant="h4"
                component="div">
                Page Not Found</Typography>
        </div>
    )
}

export default Pagenotfound

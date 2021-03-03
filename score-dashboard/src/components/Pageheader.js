import { Paper, Card, Typography } from '@material-ui/core';
import { pageHeaderStyles } from '../styles';

function Pageheader({ title, subTitle, icon }) {
    
    const classes = pageHeaderStyles();
    
    return (
        <Paper elevation={0} square className={classes.root}>
            <div className={classes.pageHeader}>
                <Card className={classes.pageIcon}>
                    { icon }
                </Card>
                <div className={classes.pageTitle}>
                    { subTitle ? 
                        <>
                            <Typography
                                variant="h4"
                                component="div">
                                {title}</Typography>
                            <Typography
                                variant="subtitle1"
                                component="div">
                                {subTitle}</Typography>
                        </> :
                            <Typography
                                variant="h2"
                                component="div">
                                {title}</Typography>
                    }
                </div>
            </div>
        </Paper>
    )
}

export default Pageheader

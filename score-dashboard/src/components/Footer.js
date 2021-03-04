
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { footerStyles } from '../styles';
import { Grid } from '@material-ui/core';
import GitHubIcon from '@material-ui/icons/GitHub';
import Link from '@material-ui/core/Link';

function Footer() {

    const classes = footerStyles();
    const gitRepo = 'https://github.com/janvishah21/score-dashboard';

    return (
        <div className={classes.root}>
            <AppBar position="static" color="secondary">
                <Toolbar>
                    <Grid container>
                        <Grid item xs={4}></Grid>
                        <Grid item xs={4}>
                            <Link href={gitRepo} target='_blank'>
                                <GitHubIcon className={classes.gitlogo} fontSize='large'/>
                            </Link>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography variant="body1" color="inherit" className={classes.footerText}>
                                developed by Janvi Milan Shah
                            </Typography>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Footer

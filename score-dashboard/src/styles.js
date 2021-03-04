import { makeStyles } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core';

export const customTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#333996",
      light: '#3c44b126'
    },
    secondary: {
      main: "#f83245",
      light: '#f8324526'
    },
    background: {
      default: "#f4f5fd"
    },
  },
  overrides:{
    MuiAppBar:{
      root:{
        transform:'translateZ(0)'
      }
    }
  },
  props:{
    MuiIconButton:{
      disableRipple:true
    }
  }
});

export const headerStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    zIndex: 3,
  },
  title: {
    flexGrow: 1,
    cursor: 'pointer',
    textDecoration: 'none',
    color: 'white',
  }
}));

export const sideMenuStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute',
    left: '0',
    width: theme.spacing(30),
    height: '100%',
    backgroundColor: '#253053',
  }
}));

export const pageContentStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(3),
    marginBottom: theme.spacing(10),
  }
}));

export const homePageStyles = makeStyles(theme => ({
  root: {
    textAlign: 'center',
    margin: '50px',
    marginTop: theme.spacing(20)
  },
  title: {
    fontSize: '48px'
  }
}));

export const pageHeaderStyles = makeStyles(theme => ({
  root: {
    backgroundColor: '#fdfdff'
  },
  pageHeader:{
    padding: theme.spacing(4),
    display:'flex',
    marginBottom:theme.spacing(2),
    borderBottom: `1px solid ${ theme.palette.secondary.light }`
  },
  pageIcon:{
    display: 'inline-block',
    padding: theme.spacing(2),
    color: theme.palette.secondary.main,
    borderRadius: '10px',
  },
  pageTitle:{
    paddingLeft:theme.spacing(4),
    '& .MuiTypography-subtitle2':{
        opacity:'0.6'
    }
  }
}));

export const formStyles = makeStyles(theme => ({
  root: {
      '& .MuiFormControl-root': {
          width: '80%',
          margin: theme.spacing(1)
      }
  }
}));

export const tableStyles = makeStyles(theme => ({
  table: {
      marginTop: theme.spacing(3),
      '& thead th': {
          fontWeight: '600',
          color: theme.palette.primary.main,
          backgroundColor: theme.palette.primary.light,
      },
      '& tbody td': {
          fontWeight: '300',
      },
      '& tbody tr:hover': {
          backgroundColor: '#fffbf2',
          cursor: 'pointer',
      },
  },
}))

export const addScoreFormStyles = makeStyles(theme => ({
  formBody: {
    padding: '20px 0px',
  },
  scoreContainer: {
    fontSize: '17px',
  },
  label: {
    fontWeight: 'bold',
  },
  infoIconButton: {
    marginBottom: '10px',
    marginLeft: '-8px'
  },
  infoIcon: {
    fontSize: '16px',
  }
}));

export const leaderboardStyles = makeStyles(theme => ({
  pageContent: {
    padding: theme.spacing(3)
  },
  searchInput: {
    width: '40%',
  },
}));

export const popupStyles = makeStyles(theme => ({
  dialogWrapper: {
      padding: theme.spacing(2),
      position: 'absolute',
      top: theme.spacing(5)
  },
  dialogTitle: {
      paddingRight: '0px'
  }
}));

export const notificationStyles = makeStyles(theme => ({
  root: {
      top: theme.spacing(9),
  }
}));

export const gradeSystemStyles = makeStyles((theme) => ({
  
}));

export const footerStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    position: 'fixed',
    bottom: '0',
    left: '0',
    width: '100%',
    textAlign: 'center'
  },
  footerText: {
    textAlign: 'right',
  },
  gitlogo: {
    color: 'white',
  }
}));
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

// Import Global Data
import GlobalData from './GlobalData'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export default function MainGrid() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={4}>
            <Grid item xs={12}>
                <Paper className={classes.paper}>
                    <strong>Global Data</strong>
                </Paper>
             </Grid>
             <Grid item xs={12}>
                <Paper className={classes.paper}>
                    <GlobalData />
                </Paper>
            </Grid>
        </Grid>
        <Grid item xs={8}>
            <Paper className={classes.paper}>
                <strong>Country Data</strong>
            </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

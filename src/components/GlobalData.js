import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(1),
      width: '100%',
      height: theme.spacing(16),
    },
  },
}));

const useStylesTypography = makeStyles({
    root: {
      width: '100%',
      maxWidth: 500,
    },
  });



export default function GlobalData() {
  const classes = useStyles();
  const classTypography =  useStylesTypography();

  
  const [globalData, setGlobalData] = useState();

  useEffect(() =>{
      async function fetchGlobalData() {
          const apiResponse = await fetch('https://api.covid19api.com/summary');
          console.log(apiResponse);
          const dataFromAPI = await apiResponse.json();
          console.log(dataFromAPI);
          setGlobalData(dataFromAPI);
      }
    
  fetchGlobalData();

  },[])
 

  return (
    <div className={classes.root}> 
           
        <Paper elevation={3}> <div className={classTypography.root}> 
            <Typography variant="overline" display="block" gutterBottom style={{color: 'black'}}>
                 {globalData.Date}
            </Typography>
            <Typography variant="h4" gutterBottom style={{color: 'orange'}}> 
                {globalData.Global.NewConfirmed}
            </Typography>
            <Typography variant="subtitle2" gutterBottom style={{color: 'orange', fontWeight: 'bold'}}>
                New Confirmed
            </Typography>
            </div>
        </Paper>

        <Paper elevation={3}> <div className={classTypography.root}> 
            <Typography variant="overline" display="block" gutterBottom style={{color: 'black'}}>
                 {globalData.Date}
            </Typography>
            <Typography variant="h4" gutterBottom style={{color: 'red'}}> 
                {globalData.Global.TotalDeaths}
            </Typography>
            <Typography variant="subtitle2" gutterBottom style={{color: 'red', fontWeight: 'bold'}}>
                New Deaths
            </Typography>
            </div>
        </Paper>

        <Paper elevation={3}> <div className={classTypography.root}> 
            <Typography variant="overline" display="block" gutterBottom style={{color: 'black'}}>
                 {globalData.Date}
            </Typography>
            <Typography variant="h4" gutterBottom style={{color: 'green'}}> 
                {globalData.Global.NewRecovered}
            </Typography>
            <Typography variant="subtitle2" gutterBottom style={{color: 'green', fontWeight: 'bold'}}>
                New Recovered
            </Typography>
            </div>
        </Paper>
        



        <Paper elevation={3}>
            <div className={classTypography.root}> 
            <Typography variant="overline" display="block" gutterBottom style={{color: 'black'}}>
                {globalData.Date}
            </Typography>
            <Typography variant="h4" gutterBottom style={{color: 'orange'}}>
                {globalData.Global.TotalConfirmed}
            </Typography>
            <Typography variant="subtitle2" gutterBottom style={{color: 'orange', fontWeight: 'bold'}}>
                Total Confirmed
            </Typography>
            </div>
        </Paper>  

        <Paper elevation={3}>
        <div className={classTypography.root}> 
            <Typography variant="overline" display="block" gutterBottom style={{color: 'black'}}>
                 {globalData.Date}
            </Typography>
            <Typography variant="h4" gutterBottom style={{color: 'green'}}>
                {globalData.Global.TotalRecovered}
            </Typography>
            <Typography variant="subtitle2" gutterBottom style={{color: 'green', fontWeight:'bold'}}>
                Total Recovered
            </Typography>
            </div>
        </Paper>
        
        <Paper elevation={3}>
        <div className={classTypography.root}> 
            <Typography variant="overline" display="block" gutterBottom style={{color: 'black'}}>
                 {globalData.Date}
            </Typography>
            <Typography variant="h4" gutterBottom style={{color: 'red'}}>
                {globalData.Global.TotalDeaths}
            </Typography>
            <Typography variant="subtitle2" gutterBottom style={{color: 'red', fontWeight:'bold'}}>
                Total Deaths
            </Typography>
            </div>
        </Paper>
 
    </div>
  );
}

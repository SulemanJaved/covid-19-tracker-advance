import React from 'react'
import { Card, CardContent, Typography } from "@material-ui/core"
import NumberFormat from 'react-number-format';

function InfoBox({ title, cases, total }) {
    return (
        <Card  className="infoBox">
            <CardContent>
                <Typography className={`infoBox__title__${title}`}> {title}</Typography>
                <h2 className={`infoBox__cases__${title}`}>
                    <NumberFormat value={cases} displayType={'text'} thousandSeparator={true} /> Today</h2>
                <Typography className={`infoBox__total__${title}`}> 
                    <NumberFormat value={total} displayType={'text'} thousandSeparator={true} /> Total</Typography>
            </CardContent>           
        </Card>
    )
}

export default InfoBox

import React from 'react';
import { Card } from 'semantic-ui-react';
import './card.scss';
import { RiTempHotLine } from "react-icons/ri";
// import {Grid, Row, Col} from "react-bootstrap";
import Grid from '@mui/material/Button';

import "./card.css";

export const MyCard = ({header, meta, icon, color}) => {
  return (
        <Card className='cardClass' color={color}>
          <Card.Content>

          <Grid container spacing={1}> 
          
          <Grid item>
            <Card.Description>
              <h1>{icon}</h1>
            </Card.Description>
          </Grid>
          <Grid item>
            <Card.Header >{header}</Card.Header>
          </Grid>
          <Grid item>
          <Card.Meta>{meta}</Card.Meta>
          </Grid>

          </Grid>

          </Card.Content>
        </Card>
  )
}

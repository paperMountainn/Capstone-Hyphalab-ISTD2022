import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import hyphaLogo from '../../static/HYPHA(Black).png';
import Box from '@mui/material/Box';
import {TextField, Button} from '@mui/material';


export const LoginForm = ({title, handleAction, setEmail, setPassword}) => {
    console.log("login")
    return (
        <div>
        {/* <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <StatusBar style="auto" />
        </View> */}
        <img
            className="d-block w-100"
            src={hyphaLogo}
            alt="Logo"
        />
        <div align="center">
            <div className="heading-container">
                    <h3>
                        {title} Form
                    </h3>
                </div>
            <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
            >
                <TextField 
                id="user" 
                label="Enter your Email" 
                variant="outlined" 
                onChange={(e) => setEmail(e.target.value)}
                />

                <TextField 
                id="password" 
                label="Enter your Password" 
                variant="outlined" 
                onChange={(e) => setPassword(e.target.value)}
                />
            </Box>

            <Button title={title} variant="contained" onClick={handleAction}>{title} </Button>
        </div>
        </div>
        
    )
}
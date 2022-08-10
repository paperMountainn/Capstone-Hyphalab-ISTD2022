import React from 'react';
import { Link } from 'react-router-dom';
import hyphaLogo from '../../static/HYPHA(Black).png';
import Box from '@mui/material/Box';
import {TextField, Button} from '@mui/material';
import { Image } from 'semantic-ui-react'

export const LoginForm = ({title, handleAction, setEmail, setPassword}) => {
    // console.log("login")
    return (
        <div>
        {/* <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <StatusBar style="auto" />
        </View> */}
        <Image
            className="d-block w-100"
            src={hyphaLogo}
            alt="Logo"
        />
        <div align="center">
            <div className="heading-container">
                    <h3>
                        Hypha T-racker App
                    </h3>
                </div>
            <Box
                // component="form"
                // sx={{
                //     '& > :not(style)': { m: 1, width: '25ch' },
                // }}
                // noValidate
                // autoComplete="off"
            >
                <h1>hi</h1>
                {/* <TextField 
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
                /> */}
            </Box>
            
            {/* <Button title={title} variant="contained" onClick={handleAction}>{title} </Button> */}
            {/* <Link>  */}
            {/* <p>no account, click here to register</p> */}
            {/* </Link> */}

        </div>
        </div>
        
    )
}
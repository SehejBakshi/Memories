import React, { useState } from 'react';
import { Avatar, Button, Paper, Grid,
        Typography, Container } from "@material-ui/core";
import { GoogleLogin } from 'react-google-login';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import useStyles from './Styles';
import Input from './Input';
import Icon from './Icon';
import { signup, signin } from '../../actions/auth';

const initialState = {firstName: '', lastName: '', email: '', password: '', confirmPassword: ''};

const Auth = () => {
    const classes = useStyles();
    const [showPassword, setShowPassword] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);
    const [formData, setFormData] = useState(initialState);
    const dispatch = useDispatch();
    const history = useHistory();

    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);

    const handleSubmit = (e) => {
        e.preventDefault();
        if(isSignUp) {
            dispatch(signup(formData, history));
        } else {
            dispatch(signin(formData, history));
        }
    };

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value });
    };

    const switchMode = () => {
        setIsSignUp((prevIsSignUp) => !prevIsSignUp);
        setShowPassword(false);
    };

    const googleSuccess = async (res) => {
        const result = res?.profileObj;
        const token = res?.tokenId;

        try {
            dispatch({type: 'AUTH', data: { result, token }});
            history.push("/");
        } catch (error) {
            console.log(error);
        }
        // console.log(res);
    };

    // const googleFailure = (error) => {
    //     console.log("Google Sign In was unsuccessful. Try again.");
    //     console.log(error);
    // };

    const googleFailure = () => alert('Google Sign In was unsuccessful. Try again.');

    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>

                <Typography variant="h5">
                    {isSignUp ? 'Sign Up' : 'Sign In'}
                </Typography>

                <form 
                    className={classes.form}
                    onSubmit={handleSubmit}
                >
                    <Grid container spacing={2}>
                        {isSignUp && (
                            <>
                                <Input
                                    name="firstName"
                                    label="First Name"
                                    handleChange={handleChange}
                                    autoFocus
                                    half
                                />

                                <Input
                                    name="lastName"
                                    label="Last Name"
                                    handleChange={handleChange}
                                    half
                                />
                            </>
                        )}
                        <Input 
                            name="email" 
                            label="Email Address" 
                            handleChange={handleChange}
                            type="email"
                        />

                        <Input 
                            name="password" 
                            label="Password" 
                            handleChange={handleChange}
                            type={showPassword ? "text" : "password"}
                            handleShowPassword={handleShowPassword}
                        />

                        {isSignUp && 
                            <Input 
                                name="confirmPassword" 
                                label="Confirm Password" 
                                handleChange={handleChange}
                                type="password"
                                handleShowPassword={handleShowPassword}
                            />
                        }
                    </Grid>

                    <Button    
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        {isSignUp ? 'Sign Up' : 'Sign In'}
                    </Button>
                    
                    <GoogleLogin
                        clientId="626986694628-frluslc49i0vof4jqgarq3accmqsl2ag.apps.googleusercontent.com"
                        render={(renderProps) => (
                            <Button 
                                className={classes.googleButton}
                                color="primary"
                                fullWidth
                                onClick={renderProps.onClick}
                                disabled={renderProps.disabled}
                                startIcon={<Icon />}
                                variant="contained"
                            >
                                Sign In Using Google
                            </Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy="single_host_origin"
                    />                

                    <Grid container justify="flex-end">
                        <Grid item>
                            <Button onClick={switchMode}>
                                {isSignUp ? 'Already Have An Account? Sign In' : "Don't Have An Account? Sign Up"}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
}

export default Auth

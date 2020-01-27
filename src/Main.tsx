// React Imports
import React, { Component } from 'react';

// ReactNative
import {Text, Alert} from 'react-native';

// Geofencing


// Services
import PushNotifications from './Services/PushNotifications';

// Enums


// Interfaces
interface IProps {
    dispatch: any
}

interface IState {
    locations: Array<{lat: number, lng: number, radius: number, id: string}>
}

class Main extends Component<IProps, IState> {
    constructor(props: IProps){
        super(props);

        this.state = {
            locations: [
                {   lat: -22.018349,
                    lng: -47.913541,
                    radius: 100, // in meters
                    id: "ShoppingIguatemi"},
    
                {   lat: -22.0491769,
                    lng: -47.9174833,
                    radius: 100, // in meters
                    id: "Escola Espírita"},
    
                {   lat: -21.9927033,
                    lng: -47.8919989,
                    radius: 100, // in meters
                    id: "Casa"},
    
                {   lat: -21.998914,
                    lng: -47.899412,
                    radius: 100, // in meters
                    id: "Kartódromo"}
            ]
        };
    }

    componentDidMount() {
        
    }

    componentWillUnmount() {
        
    }

    render(){
        return(
            <>
                <Text>Hello World!</Text>
            </>
        );
    }
}

export default Main;
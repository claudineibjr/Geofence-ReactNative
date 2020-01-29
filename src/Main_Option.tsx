// React Imports
import React, { Component } from 'react';

// ReactNative
import {Text} from 'react-native';

import Location from './Model/Location';
import data from './data';

// Services
import PushNotifications from './Services/PushNotifications';

// Interfaces
interface IProps {
    dispatch: any
}

interface IState {
    locations: Array<Location>
}

class Main_Option extends Component<IProps, IState> {
    constructor(props: IProps){
        super(props);

        //  -22.049176, -47.915498
        //  -21.9927033, -47.8919989
        //  -22.018349, -47.913541
        //  -21.998914, -47.899412

        const defaultLocations = [  
            {   lat: -22.049176,
                lng: -47.915498,
                radius: 100, // in meters
                id: "Escola"},

            {   lat: -21.9927033,
                lng: -47.8919989,
                radius: 100, // in meters
                id: "Casa"},

            {   lat: -22.018349,
                lng: -47.913541,
                radius: 100, // in meters
                id: "ShoppingIguatemi"},

            {   lat: -21.998914,
                lng: -47.899412,
                radius: 100, // in meters
                id: "Kartodromo"}
        ];
        
        let locations: Array<Location>;
        data.body.forEach(location => {
            locations.push(new Location(Number(location.latitude), Number(location.longitude), location.id.toString()));
        });
        
        this.state = {
            locations: locations
        };
    }

    render(){
        return(
            <>
                <Text>Hello World!</Text>
            </>
        );
    }
}

export default Main_Option;
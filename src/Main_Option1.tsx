// React Imports
import React, { Component } from 'react';

// ReactNative
import {Text} from 'react-native';

import Location from './Model/Location';
import data from './data';

// Geofencing
import Boundary, {Events} from 'react-native-boundary';

// Services
import PushNotifications from './Services/PushNotifications';

// Interfaces
interface IProps {
    dispatch: any
}

interface IState {
    locations: Array<Location>
}

class Main_Option1 extends Component<IProps, IState> {
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

    componentWillMount() {
        this.state.locations.forEach(async location => {
            await Boundary.add({lat: location.lat, lng: location.lng, radius: 100, id: location.id})
                .then(info => console.log('[ADD] ' + location.id + ' has been added ' + info))
                .catch(error => console.log('[ERROR] Failed to add ' + location.id + ' - ' + error));
        })
        
        Boundary.on(Events.ENTER, id => {
            // Prints 'Get out of my Chipotle!!'
            PushNotifications.localNotification('Welcome', 'Welcome to ' + id);
            console.log('[WELCOME] Welcome to - ' + id);
        });
          
        Boundary.on(Events.EXIT, id => {
            // Prints 'Ya! You better get out of my Chipotle!!'
            PushNotifications.localNotification('Bye-bye', 'See you later on ' + id);
            console.log('[EXIT] Bye-bye - ' + id);
        });
    }

    componentWillUnmount() {
        // Remove the events
        Boundary.off(Events.ENTER);
        Boundary.off(Events.EXIT);

        // Remove the boundary from native API´s
        this.state.locations.forEach(location => {
            Boundary.remove(location.id)
            .then(() => console.log('[STOP] Stop tracking - ' + location.id))
            .catch(e => console.log('[ERROR] Failed to stop tracking - ' + e))
        });
    }

    render(){
        return(
            <>
                <Text>Hello World! - 1</Text>
            </>
        );
    }
}

export default Main_Option1;
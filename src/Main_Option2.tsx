// React Imports
import React, { Component } from 'react';

// ReactNative
import {Text, PermissionsAndroid} from 'react-native';

// Geofencing
import FusedLocation from 'react-native-fused-location';
import { getDistance } from 'geolib';

// Services
import PushNotifications from './Services/PushNotifications';
import Utilities from './Services/Utilities';
import Location from './Model/Location';

// Interfaces
interface IProps {
    dispatch: any
}

interface IState {
    locations: Array<Location>,
    actualLocation: string
}

class Main_Option2 extends Component<IProps, IState> {
    subscription: any;

    constructor(props: IProps){
        super(props);

        //  -22.049176, -47.915498
        //  -21.9927033, -47.8919989
        //  -22.018349, -47.913541
        //  -21.998914, -47.899412

        const defaultLocations = [  
            {   lat: -22.049176,
                lng: -47.915498,
                id: "Escola"},

            {   lat: -21.9927033,
                lng: -47.8919989,
                id: "Casa"},

            {   lat: -22.018349,
                lng: -47.913541,
                id: "ShoppingIguatemi"},

            {   lat: -21.998914,
                lng: -47.899412,
                id: "Kartodromo"}
        ];
        
        this.state = {
            locations: defaultLocations,
            actualLocation: ''
        };
    }

    async componentDidMount() {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
                title: 'App needs to access your location',
                message: 'App needs access to your location ' +
                'so we can let our app be even more awesome.',
                buttonPositive: 'Ok'
            }
        );

        if (granted){

            // Get location at first tie
            //FusedLocation.setLocationPriority(0); //High Accuracy
            //const location = await FusedLocation.getFusedLocation();
            //this.setState({actualLocation: {lat: location.latitude, lng: location.longitude, id:''}});
    
            // Set options.
            await FusedLocation.setLocationPriority(0); // Balanced
            await FusedLocation.setLocationInterval(20000); // In ms | 20000
            await FusedLocation.setFastestLocationInterval(15000); // In ms | 15000
            await FusedLocation.setSmallestDisplacement(25) // In meters | 25

            // Keep getting updated location
            FusedLocation.startLocationUpdates();

            const desiredDistance: number = 300; // In metters

            // Place listeners.
            this.subscription = FusedLocation.on('fusedLocation', actualLocation => {
                console.log(new Date());
                this.state.locations.forEach(location => {
                    const distance = getDistance(actualLocation, location);
                    console.log(location.id, distance);
                    if (distance <= desiredDistance && this.state.actualLocation !== location.id){
                        this.setState({actualLocation: location.id});
                        PushNotifications.localNotification('Bem-vindo ao ' + location.id, 'Seja bem-vindo ao local correto. ' + location.id);
                    } else if (this.state.actualLocation === location.id && distance > desiredDistance){
                        PushNotifications.localNotification('Volte sempre ao ' + location.id, 'Espero te ver novamente no ' + location.id);
                        this.setState({actualLocation: ''});
                    }
                });
            });

        }

    }

    componentWillUnmount() {
        FusedLocation.off(this.subscription);
        // FusedLocation.off(this.errSubscription);
        FusedLocation.stopLocationUpdates();
    }

    render(){
        return(
            <>
                <Text>Hello World!</Text>
            </>
        );
    }
}

export default Main_Option2;
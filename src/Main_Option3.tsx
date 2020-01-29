// React Imports
import React, { Component } from 'react';

// ReactNative
import {Text, Alert} from 'react-native';

// Geofencing
import BackgroundGeolocation from '@mauron85/react-native-background-geolocation';
import { getDistance } from 'geolib';

// Services
import PushNotifications from './Services/PushNotifications';

// Interfaces
interface IProps {
    dispatch: any
}

interface IState {
    locations: Array<{lat: number, lng: number, radius: number, id: string}>,
    actualLocation: string
}

class Main_Option3 extends Component<IProps, IState> {
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
        
        this.state = {
            locations: defaultLocations,
            actualLocation: ''
        };
    }

    componentDidMount() {
        BackgroundGeolocation.configure({
            desiredAccuracy: BackgroundGeolocation.HIGH_ACCURACY,
            stationaryRadius: 50,
            distanceFilter: 50,
            notificationsEnabled: false,
            startOnBoot: false,
            stopOnTerminate: true,
            locationProvider: BackgroundGeolocation.ACTIVITY_PROVIDER,
            interval: 10000,
            fastestInterval: 5000,
            activitiesInterval: 1000,
            stopOnStillActivity: false
        });

        const desiredDistance: number = 100; // In metters
        BackgroundGeolocation.on('location', (actualLocation) => {
            // Percorre todos os locais e procura pelos próximos
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
            console.log('\n\n');
        });

        BackgroundGeolocation.on('error', (error) => {
            console.log('[ERROR] BackgroundGeolocation error:', error);
        });

        BackgroundGeolocation.on('start', () => {
            console.log('[INFO] BackgroundGeolocation service has been started');
        });

        BackgroundGeolocation.on('stop', () => {
            console.log('[INFO] BackgroundGeolocation service has been stopped');
        });

        BackgroundGeolocation.on('authorization', (status) => {
            console.log('[INFO] BackgroundGeolocation authorization status: ' + status);
            if (status !== BackgroundGeolocation.AUTHORIZED) {
                // we need to set delay or otherwise alert may not be shown
                setTimeout(() =>
                    Alert.alert('App requires location tracking permission', 'Would you like to open app settings?', [
                        { text: 'Yes', onPress: () => BackgroundGeolocation.showAppSettings() },
                        { text: 'No', onPress: () => console.log('No Pressed'), style: 'cancel' }
                    ]),
                1000);
            }
        });

        BackgroundGeolocation.on('background', () => {
            console.log('[INFO] App is in background');
        });

        BackgroundGeolocation.on('foreground', () => {
            console.log('[INFO] App is in foreground');
        });

        BackgroundGeolocation.checkStatus(status => {
            console.log('[INFO] BackgroundGeolocation service is running', status.isRunning);
            console.log('[INFO] BackgroundGeolocation services enabled', status.locationServicesEnabled);
            console.log('[INFO] BackgroundGeolocation auth status: ' + status.authorization);

            // you don't need to check status before start (this is just the example)
            if (!status.isRunning) {
                BackgroundGeolocation.start(); //triggers start on start event
            }
        });

        // you can also just start without checking for status
        BackgroundGeolocation.start();
    }

    componentWillUnmount() {
        // unregister all event listeners
        BackgroundGeolocation.removeAllListeners();
    }

    render(){
        return(
            <>
                <Text>Hello World!</Text>
            </>
        );
    }
}

export default Main_Option3;
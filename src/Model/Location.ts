export default class Location{
    lat: number;
    lng: number;
    id: string;

    constructor(lat: number, lng: number, id?: string){
        this.lat = lat;
        this.lng = lng;
        this.id = id;
    }
}
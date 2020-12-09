<template>
    <div>
        <div style="display:flex">
            <img v-for="image in home.images" :key="image" alt="something descriptive.." :src="image" width="200" height="150"/>
        </div>
        {{ home.title }} <br/>
        {{ home.pricePerNight }} / night <br/>
        <img src="/images/marker.svg" alt="marker" width="20" height="20" />{{ home.location.address }} {{ home.location.city }} {{ home.location.state }} {{ home.location.country }}<br/>
        <img src="/images/star.svg" alt="start" width="20" height="20" />{{ home.reviewValue }}<br/>
        {{ home.guests }} guests, {{ home.bedrooms }} rooms, {{ home.beds }} beds, {{ home.bathrooms }} bath<br/>
        <div style="height:800px;width:800px" ref="map"></div>
    </div>
</template>

<script>
import homes from "~/data/homes";
export default {
    // layout: 'red',
    // or alsu you can use
    layout (context) {
        return 'red'
    },
    head() {
        return{
            title: this.home.title,
            script: [{
                src: "https://maps.googleapis.com/maps/api/js?key=AIzaSyDQQ8NFnEiV7ybe7jD4cEiborM6ENPNnqA&libraries=places&callback=initMap",
                hid: "map",
                defer: true,
                // Only skip this script call if already called once (process.client is true when executing this code on the client, not the server)
                skip: process.client && window.mapLoaded
            }, {
                innerHTML: "window.initMap = function(){ window.mapLoaded=true }",
                hid: "map-init"
            }]
        }
    },
    data(){
        return{
            homes: {}
        }
    },
    mounted(){
        const mapOptions = {
            // From 1 (the world) to 20 (detailed one)
            zoom: 18,
            center: new window.google.maps.LatLng(this.home._geoloc.lat, this.home._geoloc.lng),
            // disabling Map/Satelite options, full screen...
            disableDefaultUI: true,
            zoomControl: true
        }
        const map = new window.google.maps.Map(this.$refs.map, mapOptions)

        const position = new window.google.maps.LatLng(this.home._geoloc.lat, this.home._geoloc.lng)
        const marker = new window.google.maps.Marker({ position })
        marker.setMap(map)
    },
    created(){
        const home = homes.find((home)=>home.objectID == this.$route.params.id)
        this.home = home
    }
}
</script>
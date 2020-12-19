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
export default {
    // layout: 'red',
    // or alsu you can use
    layout (context) {
        return 'red'
    },
    head() {
        return{
            title: this.home.title,
        }
    },
    mounted(){
        this.$map.showMap(this.$refs.map, this.home._geoloc.lat, this.home._geoloc.lng)
    },
    async asyncData({ params, $dataApi, error }){
        const response = await $dataApi.getHome(params.id)
        if(!response.ok) return error({ statusCode: response.status, message: response.statusText })
        return{
            home: response.json
        }
    }
}
</script>
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
        <div v-for="review in reviews" :key="review.objectID">
            <img :src="review.reviewer.image" /><br/>
            {{ review.reviewer.name }}<br/>
            {{ formatDate(review.date) }}<br/>
            <short-text :text="review.comment" :target="150" /><br/>
        </div>
        <img :src="user.image" alt="user image"/><br/>
        {{ user.name }}<br/>
        {{ formatDate(user.joined) }}<br/>
        {{ user.reviewCount }}<br/>
        {{ user.description }}<br/>
        <!-- <short-text :text="user.description" :target="150" /><br/> -->
    </div>
</template>

<script>
import ShortText from '~/components/ShortText.vue'

export default {
    // layout: 'red',
    // or also you can use
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
        const homeResponse = await $dataApi.getHome(params.id)
        if(!homeResponse.ok) return error({ statusCode: homeResponse.status, message: homeResponse.statusText })

        const reviewsResponse = await $dataApi.getReviewsByHomeId(params.id)
        if(!reviewsResponse.ok) return error({ statusCode: reviewsResponse.status, message: reviewsResponse.statusText })

        const userResponse = await $dataApi.getUserByHomeId(params.id)
        if(!userResponse.ok) return error({ statusCode: userResponse.status, message: userResponse.statusText })

        return{
            home: homeResponse.json,
            reviews: reviewsResponse.json.hits,
            user: userResponse.json.hits[0]
        }
    },
    methods: {
        formatDate(dateStr){
            const date = new Date(dateStr)
            return date.toLocaleDateString(undefined, { month: 'long', year: 'numeric'})
        }
    }
}
</script>
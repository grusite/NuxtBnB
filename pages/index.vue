<template>
  <div>
    <div v-for="home in homes" :key="home.objectID" style="float:left;margin:10px">
      <!-- <a :href="`/home/${home.objectID}`"><home-card :home="home"/></a> -->
      <!-- <router-link :to="`/home/${home.objectID}`"><home-card :home="home"/></router-link> -->
      <nuxt-link :to="`/home/${home.objectID}`" no-prefetch><home-card :home="home"/></nuxt-link>
    </div>
  </div>
</template>

<script>
import homes from "~/data/homes";
import HomeCard from '~/components/HomeCard.vue';

export default {
  head(){
    return{
      title: 'Homepage',
      meta: [{
        name: 'description',
        content: 'This is a homepage!',
        hid: 'description'
      }]
    }
  },
    data() {
        return {
            homes: homes.slice(0,3)
        }
    }
}
</script>

<style>
  .red {
    color: red;
  }
</style>
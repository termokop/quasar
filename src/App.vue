<template>
  <router-view />
</template>

<script>
import { defineComponent } from 'vue'
// import { useRouter } from 'vue-router'


export default defineComponent({
  name: 'App',

  methods: {
    checkJWT() {
      return false
    }
  },

  created() {
    this.$q.dark.set(true)
/////////////////////////////////////////////////////////find way to chech auth with router
    // const router = useRouter()
    // const isJWTExist = this.$q.localStorage.getItem('jwt')
    // if(!isJWTExist) {
    //   router.push('/auth')
    // } else if(!this.checkJWT) {
    //   router.push('/auth')
    // } else {
    //   router.push('/study')
    // }
//---------------------------------------------------------------------------------------
  }
})
</script>

<style lang="scss">

h1 {
  font-size: large;
  width: fit-content;
  margin: auto;
}
h2 {
  font-size: medium;
  width: fit-content;
  margin: auto;
}

.center {
  width: fit-content;
  margin: auto;
}

.strike {
  text-decoration: line-through;
}

</style>

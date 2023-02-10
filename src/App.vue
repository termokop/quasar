<template>
  <div class="goo">
    <GoogleLogin :clientId=id :prompt='false' :callback="callback"></GoogleLogin>
  </div>
  <router-view />
</template>

<script>
import { defineComponent } from 'vue'
import { GoogleLogin } from 'vue3-google-login'
import { useQuasar } from 'quasar'


export default defineComponent({
  name: 'App',
  components:{
    GoogleLogin,
  },
  data() {
    return {
      id: "365605108602-ec3mt20ef081ggcdre1nti2tldjjen6u.apps.googleusercontent.com"
    }
  },
  methods: {
    callback (response) {
      console.log('here', response)
    }
  },
  created() {
    const $q = useQuasar()
    $q.dark.set(true)
  }
})
</script>

<style>

.goo {
  width: fit-content;
  margin: auto;
  margin-top: 50vh;
}

</style>

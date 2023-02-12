<template>
  <q-page>
      <vHeader></vHeader>

      <div class="center">
            <h1 class="section-title">Вивчайте <span class="strike"> <a href='https://civil.ge/archives/185960' style='color:#aaa; cursor:pointer'>грузинську</a></span> картвельську безкоштовно</h1>
      </div>
      <hr>
      <div class="center">
        <h2>
          Пароль не потрібен. Вхід за допомогою google-аккаунта:
        </h2>
      </div>


      <div class="center">
        <GoogleLogin :clientId=id :prompt='false' :callback="callback"></GoogleLogin>
      </div>
    </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import { GoogleLogin } from 'vue3-google-login'
import vHeader from 'src/components/vHeader.vue'

export default defineComponent({
  name: 'AuthPage',
  components:{
    GoogleLogin,
    vHeader,
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
    this.$q.dark.set(true)
  }
})
</script>

<style scoped>

hr {
  width: 50vw;
}

</style>

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
        <GoogleLogin :clientId=id :prompt='false' :callback="handleCredentialResponse"></GoogleLogin>
      </div>
    </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import { GoogleLogin } from 'vue3-google-login'
import vHeader from 'src/components/vHeader.vue'
import func from '../../helpers/jsFunc'

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
        async login(goo) { // що відбувається, коли користувач натискає кнопку ЛОГІН
            this.loader = true
            const url = 'https://www.ukrge.site/api/login.php'
            let data = goo
            console.log(JSON.stringify(data))
            try {
                let response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    body: JSON.stringify(data)
                    });
                let result = await response.json()
                this.save_login_data(result)
            } catch (error) {
                alert(dictionaryModal.failAuth[this.language])
            } finally {
                this.loader = false
            }
        },

        decodeJwtResponse(token) {
            let base64Url = token.split('.')[1]
            let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            let jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));
            return JSON.parse(jsonPayload)
        },
        handleCredentialResponse(response) {
            this.responsePayload = this.decodeJwtResponse(response.credential);
            console.log(this.responsePayload)
            let objGooLogin = {
                email: this.responsePayload.email,
                password: this.responsePayload.sub,
                given_name: this.responsePayload.given_name,
                family_name: this.responsePayload.family_name,
                picture: this.responsePayload.picture
            }
            this.login(objGooLogin)
        },
        save_login_data(result) {
          //метод щоб залогіниться
          localStorage.setItem('jwt', result.jwt)
          let res_str = JSON.stringify( result.userInfo)
          localStorage.setItem('userInfo',res_str)
          localStorage.setItem("picture", result.userInfo.picture)
          localStorage.setItem("course_1", result.userInfo.course_1 ? result.userInfo.course_1 : "")
          this.go_to_app()
        },
        go_to_app() {
          this.$router.replace({
            path: '/study'
          })
        }
    },
    created() {
      func.logout()
    }
})
</script>

<style scoped>

hr {
  width: 50vw;
}

</style>

<template>
  <div class="bg" @click="$emit('closeModal')"></div>
  <div class="modal" v-show="!visible">
      <h1>Повідомлення про помилку</h1>
      <div class='description'>
          <form action="">
              <div class="checkboxItem">
                  <input type="checkbox" name="audio" id="audio" v-model="audio">
                  <label for="audio">Некоректне аудіо</label>
              </div>
              <div class="checkboxItem">
                  <input type="checkbox" name="gramar" id="gramar" v-model="gramar">
                  <label for="gramar">Граматична помилка</label>
              </div>
              <div class="checkboxItem">
                  <input type="checkbox" name="translate" id="translate" v-model="translate">
                  <label for="translate">Некоректний переклад</label>
              </div>
              <div class="checkboxItem">
                  <input type="checkbox" name="other" id="other" v-model="other">
                  <label for="other">Інша проблема</label>
              </div>
              <div class="checkboxItem">
                  <textarea name="explan" id="explan" maxlength="255" placeholder="Опишіть детальніше, будь ласка..."  v-model="text"></textarea>
              </div>
          </form>
      </div>
      <div class="buttons">
        <q-btn label="Відмінити" push color="red" @click="$emit('closeModal')"/>
        <q-btn label="Надіслати" push color="green" @click="sendMistakeInfo"/>
      </div>
  </div>

  <v-loader :visible="visible"></v-loader>

</template>

<script>

import vLoader from './vLoader.vue'

export default {
  name: 'vModalError',
  props: {
      objInfo: Object,
  },
  emits: ['closeModal'],
  components: {
    vLoader
  },
  data() {
      return {
          audio: false,
          gramar: false,
          translate: false,
          other: false,
          text: '',
          visible: false,

      }
  },
  methods: {
      create_mistake_msg() {
          let msg = ''
          if (this.objInfo.lesson)  {
              msg = `Lesson # ${this.objInfo.lesson}`
          } else if (this.objInfo.type === 'create_sentence') {
              msg = `Sentence: id ${this.objInfo.id}`
          } else if(this.objInfo[0].id) {
              msg = `Words id: ${this.objInfo[0].id}, ${this.objInfo[1].id}, ${this.objInfo[2].id}, ${this.objInfo[3].id}`
          } else {
              msg = 'Unknown mistake'
          }
          return msg
      },
      async sendMistakeInfo() {
          let mistakeInfoObj =  {
              info: {
                  audio: this.audio,
                  gramar: this.gramar,
                  translate: this.translate,
                  other: this.other,
                  obj: this.create_mistake_msg()
              },
              user: JSON.parse(localStorage.userInfo).email,
              text: this.text
          }
          const json = JSON.stringify(mistakeInfoObj)
          const url = 'https://www.ukrge.site/api/set_mistake.php'
          try {
              this.visible = true
              let response = await fetch(url, {
                  method: 'POST',
                  headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json',
                      'Access-Control-Allow-Origin': '*'
                  },
                  body: json
              })
              let result = await response.json()
              if (result) {
                this.$q.notify({
                  type: 'info',
                  message: 'Дякую, що допомогаєте нам ставати краще.'
                })
              }
              this.$emit('closeModal')
          } catch(e) {
                this.$q.notify({
                  type: 'negative',
                  message: 'Сталая помилка, спробуйте пізніше.'
                })
          } finally {
            this.visible = false
          }
      }
  }
}

</script>

<style lang="scss" scoped>
* {
  margin: 5px;
  padding: 0;
  box-sizing: border-box;
  font-size: 16px;
  color: $dark;
}

.bg{
position: fixed;
top: 0;
left: 0;
width: 100%;
height: 200%;
opacity: 50%;
background-color: $dark;
z-index: 2;
}

.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  margin-right: -50%;
  transform: translate(-50%, -50%);
  width: 300px;
  background-color: $info;
  z-index: 3;
  border-radius: 30px;
  padding: 20px;
  padding-top: 0;
  border: $dark solid 2px;
}

.buttons {
  display: flex;
  justify-content: space-around;
}
form {
  width: 100%;
  margin: 0;
}

textarea {
  height: 80px;
  width: 100%;
  padding: 2px;
  border: $dark solid 2px;
}

</style>

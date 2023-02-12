<template>

  <div class="help">
      <h1 class="center">Допомога / донати</h1>
      <p>Існує всього 3 способи підтримати розвиток проєкту:</p>
      <h2 class="center">Зусилля</h2>
      <p>Нам потрібні люди, які володіють українською та картвельською мовами на достатньо високому рівні та готові інвестувати свій час на розробку та покращення курсу.</p>
      <h2 class="center">Фінансова підтримка:</h2>
      <p>Якщо ви маєте змогу підтримати нас фінансово — зробіть це.</p>
      <p>
        Mono: <span
          class="copy"
          @click="copy('4441114440291555')">
            4441114440291555
            <span
              class="copy_icon"
              >
              <q-icon
                name="content_copy"
                />
            </span>
        </span>
      </p>

      <p>
        BOG: <span
          class="copy"
          @click="copy('GE02BG0000000539571616')">
            GE02BG0000000539571616
            <span
              class="copy_icon"
              >
              <q-icon
                name="content_copy"
              />
            </span>
        </span>
      </p>

      <p>
        BUSD, USDT: <span
          class="copy"
          @click="copy('0xcaF909f67943bD712EE0a2275F740f27EB9c4ba4')">
            0xcaF909f67943bD712EE0a2275F740f27EB9c4ba4
            <span class="copy_icon">
              <q-icon
                name="content_copy"
              />
            </span>
        </span>
      </p>
  </div>

  </template>

  <script>
  import dictionaryModal from 'src/helpers/dictionary/modals';
  import { copyToClipboard } from 'quasar'

    export default {
      name: 'vAbout',
      data() {
        return {
          language: 'ua',
          dictionaryModal,
        }
      },
      methods: {
        copy(text) {

          copyToClipboard(text)
            .then(() => {
              this.$q.notify("Скопійовоно")
            })
            .catch((e) => {
              console.log(e)
            })
        }
      },
      created() {
      }


    }
  </script>


<style lang="scss" scoped>

  .copy{
    text-decoration: dotted;
    cursor: pointer;
  }


  .copy:hover{
    color: $primary;
  }

  .copy_icon {
    font-size: small;
  }

</style>

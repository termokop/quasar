<template>
  <q-page>
    <q-card bordered class="card">
      <q-card-section>
        <p class="center text-h6">Допомога / донати</p>
      </q-card-section>
      <q-separator/>

      <q-card-section>
        <p class="text-body1 q-pl-lg">Існує 3 способи підтримати розвиток проєкту:</p>
        <q-card class="q-pa-sm">
          <p class="text-body1">Зусилля:</p>
          <p>Нам потрібні люди, які володіють українською та картвельською мовами на достатньо високому рівні та готові інвестувати свій час та енергію на розробку та покращення даної платформи.</p>
        </q-card>
        <q-card class="q-pa-sm">
          <p class="text-body1">Фінансова підтримка:</p>
          <table class="center">
            <thead>
              <td style="text-align: center;">
                Сервіс
              </td>
              <td style="text-align: center;">
                Реквізити
              </td>
            </thead>
            <tr>
              <td>Monobank:</td>
              <td>
                <span class="copy" @click="copy('4441114440291555')">
                    4441114440291555
                    <span class="copy_icon">
                      <q-icon name="content_copy"/>
                    </span>
                </span>
              </td>
            </tr>
            <tr>
              <td>Bank Of Georgia:</td>
              <td>
                <span class="copy" @click="copy('GE02BG0000000539571616')">
                  GE02BG0000000539571616
                  <span class="copy_icon">
                    <q-icon name="content_copy"/>
                  </span>
                </span>
              </td>
            </tr>
            <tr>
              <td>BUSD, USDT:</td>
              <td>
                <span class="copy" @click="copy('0xcaF909f67943bD712EE0a2275F740f27EB9c4ba4')">
                  0xcaF909f67943bD712EE0a2275F740f27EB9c4ba4
                  <span class="copy_icon">
                    <q-icon name="content_copy"/>
                  </span>
                </span>
              </td>
            </tr>
          </table>
        </q-card>
        <q-card class="q-pa-sm">
          <p class="text-body1">Зворотній зв'язок:</p>
          <p>Напишіть, що Вам конкретно подобається, або не подобається на даній платформі.</p>
          <p>Всі ми по різному сприймаємо інформацію, і якщо у Вас є ідеї, як зробити матеріал більш зрозумілим, для ширшого кола користувачів, пишіть нам. Ми відкриті новому.</p>
          <div  class="center">
            <q-btn to="/about" color="info"> Контакти розробника </q-btn>
          </div>
        </q-card>
      </q-card-section>
    </q-card>
  </q-page>


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

  td{
    padding-right: 10px;
  }


  .copy:hover{
    color: $primary;
  }

  .copy_icon {
    font-size: small;
  }

</style>

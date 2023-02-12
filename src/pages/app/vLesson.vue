<template>
  <div class="lesson" v-if="showContent">

    <q-card dark bordered class="bg-grey-9 card">
        <q-card-section>
              <div class="text-h5">Урок {{ lessonObj.lesson }}</div>
              <!-- <div class="text-subtitle2">by John Doe</div> -->
        </q-card-section>

        <q-separator dark inset />

        <q-card-section>
              <div class="intro">
                <span v-html="lessonObj.info.intro"></span>
              </div>
        </q-card-section>

        <q-card-section>
              <q-card dark bordered class="bg-grey-9 card">
                    <q-card-section>
                          <div class="text-h6">До вивчення</div>
                          <!-- <div class="text-subtitle2">by John Doe</div> -->
                    </q-card-section>
                    <q-separator dark inset />
                    <q-card-section class="learn">
                          <div v-if="lessonObj.letters.length > 0" class="letters">
                              <h2>Літери для вивчення:</h2>
                              <table>
                                  <tr v-for="letter in lessonObj.letters" :key="letter.voice">
                                      <td><vPlayAudio :audioUrl="letter.voice"></vPlayAudio></td>
                                      <td class="ge">{{letter.ge}}</td>
                                      <td>-</td>
                                      <td class="ua">{{ letter.ua }}</td>
                                  </tr>
                              </table>
                          </div>
                          <div v-if="lessonObj.words.length > 0" class="words">
                              <h2>Слова для вивченя:</h2>
                              <table>
                                  <tr v-for="word in lessonObj.words" :key="word.voice">
                                      <td><vPlayAudio :audioUrl="word.voice"></vPlayAudio></td>
                                      <td class="ge">{{ word.ge }}</td>
                                      <td>-</td>
                                      <td class="ua">{{ word.ua + ' ' +word.ua_additional }}</td>
                                  </tr>
                              </table>
                          </div>
                          <div v-if="lessonObj.sentences.length > 0" class="sentences">
                              <h2>Речення:</h2>
                                <table v-for="sentence in lessonObj.sentences" :key="sentence.voice">
                                  <tr>
                                      <td rowspan="2"><vPlayAudio :audioUrl="sentence.voice"></vPlayAudio></td>
                                      <td class="ge">{{sentence.ge}}</td>
                                  </tr>
                                  <tr>
                                      <td class="ua">{{ sentence.ua }}</td>
                                  </tr>
                              </table>
                          </div>
                    </q-card-section>
              </q-card>
        </q-card-section>

        <q-card-section>
              <q-card dark bordered class="bg-grey-9 card">
                    <q-card-section>
                          <div class="text-h6">Граматика</div>
                    </q-card-section>
                    <q-separator dark inset />
                    <q-card-section class="learn">
                          <span v-html="lessonObj.info.gramar"></span>
                    </q-card-section>
              </q-card>
        </q-card-section>

        <q-card-section v-if="lessonObj.info.addictional">
              <q-card dark bordered class="bg-grey-9 card">
                    <q-card-section>
                          <div class="text-h6">Додаткова інформація</div>
                    </q-card-section>
                    <q-separator dark inset />
                    <q-card-section class="learn">
                        <span v-html="lessonObj.info.addictional"></span>
                    </q-card-section>
              </q-card>
        </q-card-section>

        <q-card-section>
            <div class="buttons">
                  <q-btn to="/study" label="Повернутися до меню" push color="red" />
                  <q-btn label="Практикуватися" push color="green" @click.prevent="startQuiz"/>
            </div>

            <vDidUFindMistake
                :objInfo="lessonObj">
            </vDidUFindMistake>
        </q-card-section>
    </q-card>





  </div>

  <v-loader :visible="visible"></v-loader>


  </template>

  <script>
  import vPlayAudio from '../../components/vPlayAudio.vue';
  import vDidUFindMistake from '../../components/vDidUFindMistake.vue';
  import vLoader from 'src/components/vLoader.vue';


  export default {
      name: 'vLesson',
      components: {
          vPlayAudio,
          vDidUFindMistake,
          vLoader,
      },
      props: {

      },
      // emits: ['start_quiz'],
      data() {
          return {
            lessonObj: {
              lesson: '',
              info: '',
              intro:'',
              gramar: '',
              addictional: '',
              letters: [],
              words: [],
              sentences: [],
            },
            visible: false,
            showContent: false,
          }
      },
      methods: {
          startQuiz() {
            alert('Start Quizz!!!')
              // this.$emit('start_quiz', this.lessonObj.lesson)
          },
          async startLesson(lesson) {
              const url = 'https://www.ukrge.site/api/get_lesson.php'
              const json = JSON.stringify({lesson: lesson})

              try {
                  this.visible = true
                  this.showContent = false
                  let response = await fetch(url, {
                      method: 'POST',
                      body: json
                  })
                  let result = await response.json()
                  if(result.info) {
                      this.lessonObj = result;
                      // this.isLessonOpened = true
                  } else alert('Урок №' + lesson + ' ще в розробці')
              } catch(error) {
                  //console.log(error)
                  alert('Щось пішло не так....')
              } finally {
                this.visible = false
                this.showContent = true
              }
          },
          showTextLoading () {
            this.visible = true
            this.showContent = false

            setTimeout(() => {
              this.visible = false
              this.showContent = true
            }, 500)
          }
        },
      created() {
        this.startLesson(this.$route.query.lesson)
      }
  }

  </script>

  <style lang="scss" scoped>

  .card {
    width: 100%;
    border-radius: 30px;
    margin: 10px 0 0 0;
}

.learn {
    width: 100%;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;

}
      .letters, .sentences, .words {
          width: fit-content;
          margin: 10px;
      }

      .ua {
          color: $ua;
          font-style: italic;
      }

      .lesson :deep() .ua {
          color: $ua;
          font-style: italic;
      }
      .ge {
          color: $ge;
          font-style: italic;
      }

      .lesson :deep() .ge {
          color: $ge;
          font-style: italic;
      }
      .lesson :deep() h4,h2,h3,h1 {
          width: fit-content;
          margin: auto;
      }
      .buttons {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-around;
      }

  </style>

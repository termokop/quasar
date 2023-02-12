<template>

  <div class="lesson" v-if="showContent">
      <div  class="title">
          <h2> Урок {{ lessonObj.lesson }}</h2>
      </div>

      <div class="intro">
          <span v-html="lessonObj.info.intro"></span>
      </div>

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

      <div class="gramar">
          <h3>Граматика</h3>
          <span v-html="lessonObj.info.gramar"></span>
      </div>

      <div class="addictional" v-if="lessonObj.info.addictional">
          <h3>Додатково:</h3>
          <span v-html="lessonObj.info.addictional"></span>
      </div>

      <div class="buttons">
        <q-btn to="/study" label="Повернутися до меню" push color="red" />
        <q-btn label="Практикуватися" push color="green" @click.prevent="startQuiz"/>
      </div>

      <vDidUFindMistake
          :objInfo="lessonObj">
      </vDidUFindMistake>

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

      .lesson{
          background-color: $lesson;
          max-width: 100%;
          margin: auto;
          padding: 10px;
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          color: black;
      }
      .title, .gramar, .addictional, .intro, .buttons, .mistake {
          width: 100%;
      }
      .letters, .sentences, .words {
          width: fit-content;
          margin: 25px;
      }
      h1, h2, h3{
          width: fit-content;
          margin: auto;
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
          margin: 5px;
      }

  </style>

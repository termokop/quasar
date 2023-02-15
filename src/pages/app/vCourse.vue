<template>
  <q-page>
    <q-card class="card">
      <q-card-section>
        <p class="center text-h6">Курс для початківців</p>
      </q-card-section>
      <q-separator size="2px" />
      <q-card-section class="flex" style="justify-content: space-around;">
            <q-card class="bg-primary text-white q-ma-sm"
              v-for="n in user_progress.length"
              :key="n">
              <q-card-section>
                <div class="center text-h6">Урок {{ n }}</div>
                <q-separator size="1px"/>
                <div class="text-subtitle2">Короткий опис</div>
              </q-card-section>
              <q-card-actions>
                <q-btn
                  flat
                  @click.prevent="startLesson(n)"
                  >
                  <img src="../../assets/theory.svg" alt="theory"/>
                  Теорія
                </q-btn>
                <q-btn
                  @click.prevent="practice(n)"
                  flat>
                  <img src="../../assets/practice_lesson.svg" alt="practice"/>
                  Практика
                </q-btn>
                <q-btn
                  @click.prevent="exam(n)"
                  flat>
                  <img v-if="user_progress[n-1][1] === '10'" src="../../assets/doneA.svg" alt="doneExam">
                  <img v-else-if="user_progress[n-1][1] >= '8.2'" src="../../assets/doneB.svg" alt="doneExam">
                  <img v-else-if="user_progress[n-1][1] >= '7.5'" src="../../assets/doneC.svg" alt="doneExam">
                  <img v-else-if="user_progress[n-1][1] >= '6'" src="../../assets/doneD.svg" alt="doneExam">
                  <img v-else src="../../assets/doneX.svg" alt="doneExam">
                  Тест
                </q-btn>
              </q-card-actions>
            </q-card>
      </q-card-section>

  </q-card>
  </q-page>

  </template>

  <script>
  import vLesson from './vLesson.vue'

  export default {
      name: 'vCourse',
      components: {
          // vLoader,
          vLesson
      },
      props: {
      },
      emits: ['start_quiz'],
      data () {
          return {
               loader: false,
              lessonObj: null,
              user_progress: [],
              language: 'ua',
          }
      },
      created() {
          let progresJSON = localStorage.getItem('course_1');
          let arrOfProgress = Object.entries(JSON.parse(progresJSON))
          this.user_progress = arrOfProgress
      },
      methods: {
          start_quiz(lesson) {
              this.practice(lesson)
          },
          startLesson(lesson) {
            this.$router.push({
              path: "/lesson",
              query: {lesson: lesson}
            })
          },
          async startQuizz(key, show_hints, lesson='-') {
              this.loader = true
              const url = 'https://www.ukrge.site/api/get_task_for_course.php'
              const json = JSON.stringify({topic: key})
              try {
                  let response = await fetch(url, {
                      method: 'POST',
                      headers: {
                          'Accept': 'application/json',
                          'Content-Type': 'application/json',
                          'Access-Control-Allow-Origin': '*'
                      },
                      body: json
                  });
                  let result = await response.json()
                  if (result.task.length < 1) {
                      throw new Error('not found any tasks')
                  }
                  this.$q.localStorage.set("task",JSON.stringify(result.task))
                  this.$q.localStorage.set("show_hints",JSON.stringify(show_hints))
                  this.$q.localStorage.set("lesson", lesson)
                  this.$router.push({
                    path: '/quiz'
                  })
              } catch (error) {
                  alert(error)
              } finally {
                  this.loader = false
              }
          },
          practice(lesson) {
              this.startQuizz("lesson_" + lesson, true)
          },
          exam(lesson) {
              this.startQuizz("lesson_" + lesson, false, lesson)
          }
      },
  }

  </script>

  <style lang="scss" scoped>


      button {
          width: 80px;
      }
      button img {
          width: 100%;
      }



  </style>

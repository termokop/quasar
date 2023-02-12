<template>

  <q-page>
    <q-card class="card" v-if="!loader">
      <q-card-section class="up-bar">

            <q-btn
              :class="{
                'invisible': showScore
                }"
              icon="skip_next"
              type="button"
              @click="nextTask(0)"
              round
              unelevated
            />

            <q-linear-progress dark rounded size="10px" :value="progress" color="green" class="q-px-lg" />


            <q-btn
              :class="{
                'invisible': showScore
                }"
              icon="close"
              type="button"
              @click="close_quiz"
              round
              unelevated
            />
      </q-card-section>
      <q-card-section>
        <vTask
            v-if="!showScore && typeof(quiz[counter][0]) === 'object'"
            :task="quiz[counter]"
            @nextTask="nextTask"
            :language="language"
            >
        </vTask>
        <template v-for="(item,index) in quiz" :key="index">
            <vTaskSen
                v-if="index === counter && !showScore && typeof(quiz[counter]) === 'object' && quiz[counter].type === 'create_sentence'"
                :task="quiz[counter]"
                :show_hints="show_hints"
                @nextTask="nextTask"
                :language="language"
                >
            </vTaskSen>
        </template>
        <vScore
            v-if="showScore"
            :lesson="lesson"
            :score="score"
            :maxScore="quiz.length"
            :language="language"
            :show_hints="show_hints"
            @finish_quiz="close_quiz"
            >
        </vScore>
      </q-card-section>
    </q-card>
  </q-page>

  <v-loader
    :visible="loader">

  </v-loader>

</template>


<script>

import vTask from '../../components/vTask.vue'
import vScore from '../../components/vScore.vue'
import vTaskSen from '../../components/vTaskSen.vue'
import vLoader from 'src/components/vLoader.vue'

export default {
    name: 'vQuizz',
    components: {
        vTask,
        vScore,
        vTaskSen,
        vLoader,
    },
    props: {
        // quiz: Array,
        // show_hints: Boolean,
        // lesson: Number,
    },
    data() {
        return {
            counter: 0,
            score: 0,
            showScore: false,
            //---------------------------------------
            quiz: JSON.parse(this.$q.localStorage.getItem('task')),
            language: 'ua',
            show_hints: JSON.parse(this.$q.localStorage.getItem('show_hints')),
            lesson: this.$q.localStorage.getItem('task'),
            loader: true
        }
    },
    methods: {
        nextTask(score) {
            this.score += score
            if(this.quiz.length-1 > this.counter) {
                this.counter++
            } else {
                this.showScore = true
            }

        },
        close_quiz() {
          this.$q.localStorage.remove('task')
          this.$q.localStorage.remove('show_hints')
          this.$q.localStorage.remove('lesson')
          this.$router.replace({
            path: '/'
          })
        },
    },
    computed: {
        progress () {
          if(!this.quiz?.length) return 0
          return ((this.counter + 1) /this.quiz.length)
        }
    },
    beforeCreate() {
      const isAuth = this.$q.localStorage.getItem('lesson')
      if(!isAuth) {
        this.$router.replace({
          path: '/'
        })
      }
    },
    mounted() {
      setTimeout(() => {
        this.loader = false
      },500)
    }

}


</script>

<style lang="scss" scoped>

.up-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
}


</style>

<style>

  .variants {
      width: 100%;
      padding: 0;
      margin: 0;
      display: flex;
      flex-wrap: wrap;
      /* margin-bottom: 10vh; */
  }
  .btn {
    width: fit-content;
    margin: auto;
  }

  .card-quiz {
    height: 50vh;
    display: flex;
    align-content: space-around;
    flex-wrap: wrap;
  }

</style>

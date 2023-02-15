<template>
<q-card   dark bordered class=" card" v-if="task[0].type === 'words'">

        <q-card-section>
          <p class="text-h6">Знайди відповідності</p>
        </q-card-section>

        <q-separator></q-separator>

        <q-card-section>


        <q-card  dark flat class=" card-quiz">

          <q-card-section class="full-width">

          <div class="variants">
              <!-- <p><vPlayAudio v-if="false"></vPlayAudio></p> -->
              <div class="word-items">
                  <!-- ge------------------------------------------ -->
                  <q-btn
                      :disable="answered.includes(item.id)"
                      class="word-item text-body2"
                      :class="{choosed: item.id === choosedWordGe, wrong: wrongAnsForAnimatGe === item.id}"
                      v-for="item in task"
                      :key="item.id"
                      @click="chooseWordGe(item.id)"
                      :label="func.translit(item.ge,language)"
                      />
              </div>
              <div class="word-items">
                  <!-- ua----------------------------------------------- -->
                  <q-btn noCaps
                      :disable="answered.includes(item.id)"
                      class="word-item text-body2"
                      :class="{choosed: item.id === choosedWordUa, wrong: wrongAnsForAnimatUa === item.id}"
                      v-for="item in sorted"
                      :key="item.id"
                      @click="chooseWordUa(item.id)"
                      :label="func.translit(item.ua,language)"
                      />
              </div>
          </div>

          </q-card-section>
        </q-card>
      </q-card-section>


          <q-btn
            label="Наступне"
            type="button"
            @click="nextTask"
            :disable="answered.length !== 4"
            class="full-width btn"
            color="green"
            size="lg"
          />

    <vDidUFindMistake
            :objInfo="task">
    </vDidUFindMistake>

</q-card>
</template>

<script>
import func from "../helpers/jsFunc"
import dictionary from "src/helpers/dictionary/task_words";
import vDidUFindMistake from './vDidUFindMistake.vue';
export default {
    name: 'vTask',
    components: {
    vDidUFindMistake
},
    props: {
        task: {
            type: Array,
            required: true
        },
    },
    data() {
        return {
            choosedWordGe: '',
            choosedWordUa: '',
            answered: [],
            pointsForTheTask: 4,
            wrongAnsForAnimatGe: '',
            wrongAnsForAnimatUa: '',
            func,
            dictionary,
            language: 'ua'
        }
    },
    methods: {
        nextTask() {
            this.$emit('nextTask', this.pointsForTheTask / 4)
            this.answered = []
        },
        chooseWordGe(key) {
            this.choosedWordGe = key === this.choosedWordGe ? '' : key
            this.compireWords(key)


        },
        chooseWordUa(key) {
            this.choosedWordUa = key === this.choosedWordUa ? '' : key
            this.compireWords(key)

        },
        compireWords(key) {

            //correct answer
            if(this.choosedWordGe === this.choosedWordUa && this.choosedWordGe !== '') {
                this.answered.push(key)
                this.choosedWordGe = ''
                this.choosedWordUa = ''
            }

            //wrong answer
            if(this.choosedWordGe !== this.choosedWordUa && this.choosedWordGe !== '' && this.choosedWordUa !== '') {
                this.pointsForTheTask = this.pointsForTheTask === 0 ? 0 : --this.pointsForTheTask
                this.wrongAnsForAnimatGe = this.choosedWordGe
                this.wrongAnsForAnimatUa = this.choosedWordUa
                setTimeout(()=> {
                    this.wrongAnsForAnimatGe = ''
                    this.wrongAnsForAnimatUa = ''
                }, 1000)
                this.choosedWordGe = ''
                this.choosedWordUa = ''
            }
        }
    },
    computed: {
        sortedTask() { return [...this.task]},
        sorted() {return this.func.shuffle([...this.sortedTask])}

    },
    created() {
        window.addEventListener('keydown', e=> {
                if(e.key === 'Enter' && this.answered.length === 4) this.nextTask()
            })
    }
}
 // i need it
    // cursor: pointer;
</script>

<style lang="scss" scoped>
    .word-items {
        width: 50%;
        margin: 0;
    }

    .word-items button {
        background-color: transparent;
        color: #fff;
    }

    @keyframes correct {
        from {background-color: green;}
        to {background-color: #3d3d3d;}
}
    @keyframes wrong {
        from {background-color: red;}
        to {background-color: #1d1d1d;}
}

    .variants button[disabled] {
        background-color: #3d3d3d;
        color: #2d2d2d;
        animation-name: correct;
        animation-duration: 2s;
    }

    .word-item {
        display: flex;
        width: 90%;
        border: 3px solid #3d3d3d;
        border-radius: 10px;
        margin: auto;
        margin-top: 10px;
        height: 55px;
    }

    .word-item p {
        margin: auto;
        width: 90%;
    }
    .word-items :deep() table{
            font-size: 14px;
        }
    .word-items :deep() table .ua{
        font-size: 12px;
    }

    .choosed {
        border-color: blue;
    }

    .wrong {
        animation-name: wrong;
        animation-duration: 1s;
        background-color: rgb(255, 0, 0);
    }

    .card-quiz {
      height: calc(50vh + 10px);
    }

</style>

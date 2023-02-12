<template>

    <q-card  dark bordered class=" card" v-if="task.type === 'create_sentence'">
      <q-card-section>
        <p class="text-h6">{{dictionary.task[language]}}</p>
      </q-card-section>

      <q-separator></q-separator>

      <q-card-section>
        <q-card  dark flat class=" card card-quiz">

          <q-card-section class="full-width">
            <div class="center">
                <p>
                    <span  class="text-h6 pointer"  v-html="func.translit(task.question,language)"></span>
                    <q-tooltip
                      v-if="show_hints"
                      class="bg-purple text-body2"
                      transition-show="rotate"
                      transition-hide="rotate"
                    >
                      {{task.correct_answer}}
                    </q-tooltip>
                </p>
              </div>
          </q-card-section>

          <q-card-section class="full-width">
            <div class="center">
                <p ref="answer">
                    <span v-for="(word,index) in sentence" :key="word">
                        <span class="text-h6" v-if="word!=='<...>'">{{word}}</span>
                        <span
                            class="placehold text-h6"
                            :class="{wrongAns:wrongAns,corrAns: corrAns}"
                            @click="removeWord(index)"
                            v-else>{{count(index)}}
                        </span>
                    </span>
                </p>
              </div>
          </q-card-section>

          <q-card-section class="full-width">
            <div class="subvariants">
              <q-btn no-caps
              color="primary"
              class="word-item"
              v-for="variant in sorted"
              :key="variant"
              :disable="answersArr.includes(variant)"
              :label="func.translit(variant,language)"
              @click="addWordToSentence(variant)"/>
              </div>
          </q-card-section>
        </q-card>
      </q-card-section>

      <q-btn
        :label="dictionary.button[language]"
        type="button"
        @click="nextTask"
        :disable="!showCheckBtn"
        class="full-width btn"
        color="green"
        size="lg"
        />


        <vDidUFindMistake
            :objInfo="task"
            >
        </vDidUFindMistake>
    </q-card>

    </template>

    <script>
    import func from '../helpers/jsFunc'
    import dictionary from '../helpers/dictionary/task_create_sentence'
    import VDidUFindMistake from './vDidUFindMistake.vue'
    export default {
        name: 'vTaskSen',
        components: {
    VDidUFindMistake
},
        props: {
            task: {
                type: Object,
                required: true
            },
            language: String,
            show_hints: Boolean,
        },
        data() {
            return {
                dictionary,
                variants: [...this.task.variants_fake.split(','), ...this.task.variants_real.split(',')], // тут всі варіанти відповідей
                sentence: [],
                answersArr: [],
                indexes: [],
                showCheckBtn: false,
                func,
                pointsForTheTask: 1,
                correct_ans_arr:  [...this.task.correct_answer.split('|')],
                wrongAns: false,
                corrAns: false
            }
        },

        methods: {
            removeWord(index) {
                //console.log("remove word")
                this.answersArr[index] = '...'
                this.showCheckBtn = false
            },
            addWordToSentence(word) {
                for ( let value of this.indexes) {
                    if(this.answersArr[value] === '...') {
                        this.answersArr[value] = word
                        this.checkBtn()
                        return
                    }
                }
            },
            count(index) {
                if(!this.indexes.includes(index)) this.indexes.push(index)
                return this.answersArr[index]
            },
            nextTask() {
                if(this.correct_ans_arr.includes(this.$refs.answer.textContent.trim())) {
                    this.corrAns = true
                    setTimeout(()=> {
                        setTimeout(()=> {
                            this.$emit('nextTask', this.pointsForTheTask)
                        }, 0)
                        this.corrAns = false
                    }, 1000)
                } else {
                    this.pointsForTheTask = 0
                    this.resetAnswers()
                    this.wrongAns = true
                    setTimeout(()=> {
                        this.wrongAns = false
                    }, 1000)
                }
            },


            checkBtn() { /// після порізки на речення на масив, перемістити це в компутед і перевіряти чи вкоючає масив "..."
                for ( let value of this.indexes) {
                    if(this.answersArr[value] === '...') {
                        this.showCheckBtn = false
                        return
                    }
                }
                this.showCheckBtn = true
                return
            },
            resetAnswers() {
                this.answersArr = []
                for (let i = 0; i < this.sentence.length; i++) {
                    this.answersArr.push('...')
                }
            }


        },
        computed: { // перемістити в beforeMounted?
            sorted() {return this.func.shuffle([...this.variants])}

        },
        created() {
            this.sentence = this.task.answer.split(/([\s,!?;:])/).filter(function(e) { return e });
            window.addEventListener('keydown', e=> {
                if(e.key === 'Enter' && this.showCheckBtn) this.nextTask()
            })

        },
        mounted() {
            this.resetAnswers()
        },
    }

    </script>

<style scoped>
    .subvariants {
        width: 100%;
        padding: 0;
        margin: auto;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
    }
    .word-item {
        display: flex;
        width: max-content;
        align-content: center;
        margin: 5px;
    }
    .placehold {
        background-color: #2d2d2d;
        border: 1px solid #3d3d3d;
        border-radius: 3px;
        padding: 0 5px;
        margin-left: 3px;

    }
    .wrongAns {
        background-color: darkred;
    }
    .corrAns {
        background-color: darkgreen;
        border-color: darkgreen;
    }


    .word-item button[disabled] {
        background-color: #3d3d3d;
        color: transparent;

    }
</style>

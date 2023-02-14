<template>

  <q-scroll-area style="height: calc(100% - 150px); margin-top: 150px; border-right: 1px solid #ddd">
    <q-list padding>

      <q-item clickable v-ripple to="/study">
          <q-item-section avatar>
            <q-icon name="book" />
          </q-item-section>
          <q-item-section>
            Навчатися
          </q-item-section>
      </q-item>

      <q-item  clickable v-ripple to="/practice">
        <q-item-section avatar>
          <q-icon name="settings" />
        </q-item-section>
        <q-item-section>
          Практикуватися
        </q-item-section>
      </q-item>

      <q-item clickable v-ripple to="/learn-words">
        <q-item-section avatar>
          <q-icon name="send" />
        </q-item-section>
        <q-item-section>
          Вчити слова
        </q-item-section>
      </q-item>


      <q-item clickable v-ripple  to="/settings">
          <q-item-section avatar>
            <q-icon name="settings" />
          </q-item-section>
          <q-item-section>
            Налаштування профілю
          </q-item-section>
        </q-item>


        <q-item clickable v-ripple to="/donate" > <!-- exact -->
        <q-item-section avatar>
          <q-icon name="drafts" />
        </q-item-section>
        <q-item-section>
          Задонатити
        </q-item-section>
      </q-item>


        <q-item clickable v-ripple  to="/about">
          <q-item-section avatar>
            <q-icon name="book" />
          </q-item-section>
          <q-item-section>
            Про проєкт
          </q-item-section>
        </q-item>


        <q-item clickable v-ripple  @click="logout">
          <q-item-section avatar>
            <q-icon name="logout" />
          </q-item-section>
          <q-item-section>
            Вихід
          </q-item-section>
        </q-item>


        <q-item>
          <q-item-section>
            <span class="q-mx-auto version"> Версія 1.0 </span>
          </q-item-section>
        </q-item>
    </q-list>


  </q-scroll-area>

  <q-img class="absolute-top" src="../assets/bg.jpg" style="height: 150px">
    <div class="absolute-bottom bg-transparent center">
      <div class="center">
        <q-avatar size="56px" class="q-mx-auto">
          <img :src="picture">
        </q-avatar>
      </div>
      <div class="text-weight-bold center">{{ name }}</div>
    </div>
  </q-img>

</template>


<script>

import func from 'src/helpers/jsFunc'

export default {
  name: 'vDrawer',
  data() {
    return {
      name: "",
      picture: "",
    }
  },
  methods: {
    logout() {
      func.logout()
      this.$router.replace({
        path: '/auth'
      })
    }
  },
  created() {
    this.picture = this.$q.localStorage.getItem('picture')
    this.name = JSON.parse(this.$q.localStorage.getItem('userInfo')).name
  }
}

</script>

<style lang="scss" scoped>

.version {
  color: $warning;
}


</style>

<template>
  <div class="q-pa">
    <q-layout view="lHh Lpr lff" container style="height: 100vh">
      <q-header elevated class="bg-cyan-8">
        <q-toolbar>
          <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
          <q-toolbar-title>Борітеся — поборете!</q-toolbar-title>
        </q-toolbar>
      </q-header>

      <q-drawer
        v-model="drawer"
        show-if-above
        :width="300"
        :breakpoint="500"
      >
      <v-drawer></v-drawer>
      </q-drawer>

      <q-page-container>
        <q-page padding>
          <router-view></router-view>
        </q-page>
      </q-page-container>
    </q-layout>
  </div>
</template>

<script>
import { ref } from 'vue'
import vDrawer from 'src/components/vDrawer.vue';

export default {
  components: {
    vDrawer,
  },
  setup () {
    return {
      drawer: ref(false)
    }
  }
}
</script>

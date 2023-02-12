<template>
  <router-view />
</template>

<script>
import { defineComponent } from 'vue'
import { useQuasar } from 'quasar'


export default defineComponent({
  name: 'App',
  created() {

    const $q = useQuasar()
    $q.dark.set(true)
  }
})
</script>

<style>

h1 {
  font-size: large;
}
h2 {
  font-size: medium;
}

.center {
  width: fit-content;
  margin: auto;
}

.strike {
  text-decoration: line-through;
}

</style>

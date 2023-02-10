<template>
  <router-view />
</template>

<script>
import { defineComponent } from 'vue'


export default defineComponent({
  name: 'App',
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

<template>
  <div class="content center">
          <a href="https://www.instagram.com/hruba.yurii/"  target="_blank"><img class="contacts" src="../assets/inst.svg" alt=""></a>
          <a href="https://t.me/termokop"  target="_blank"><img class="contacts" src="../assets/tl.svg" alt=""></a>
          <a href="https://www.facebook.com/termokop"  target="_blank"><img class="contacts" src="../assets/fb.svg" alt=""></a>
  </div>
</template>

<script>

export default {
  name: 'vContacts',
}

</script>

<style scoped>
.content {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.contacts {
  width: 70px;
}

</style>

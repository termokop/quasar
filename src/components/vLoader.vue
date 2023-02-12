<template>

  <q-inner-loading :showing="visible">
    <q-spinner-gears size="50px" color="primary" />
  </q-inner-loading>

</template>


<script>

export default{

  name: 'vLoader',
  props: {
    visible: {
      type: Boolean,
      requared: true,
    }
  }
}

</script>

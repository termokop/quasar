<template>
  <div class="header">
    <a href="#" class="logo left" @click.prevent="updateLang('ua')">
        <img src="../assets/ua.svg" />

    </a>

    <p class="center">
        Борітеся — поборете!
    </p>

    <a href="#" class="logo right" @click.prevent="updateLang('ge')">
        <img src="../assets/ge.svg" />
    </a>
</div>
</template>

<script>
import dictionary from "../helpers/dictionary/header"
export default {
name: 'vHeader',
props: {
    // language: String
},
data() {
    return {
        dictionary,
        language: 'ua'
    }
},
methods: {
    updateLang(index) {
        // if(index === 'ge') alert('საიტი ჯერ არ არის სრულად თარგმნილი ქართულად')
        // this.$emit('change-lang', index)
        ///localStorage.lang = index// for change language in localStorage
    }
},
created() {
    //if(!localStorage.lang) localStorage.lang = 'ua' // for change language in localStorage
}
}
</script>

<style scoped>
.header {
margin: 0;
padding: 0;
display: flex;
justify-content: space-between;
align-content: center;
color: #ffffff;
height: 80px;
min-height: 80px;
background-color: transparent;
}
.header a {
float: left;
color: black;
text-align: center;
height: fit-content;
}

img {
height: 75px;
margin:0;
border-radius: 10px;
}




</style>

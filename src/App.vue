<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    //
  }),
};
</script>
<style>
@import url("https://fonts.googleapis.com/css2?family=Cairo&display=swap");
* {
  font-family: Cairo;
}
#app {
  background-color: #f5fefe;
  /* background-color: #fff; */
}
</style>

<template>
  <v-container>
    <v-card style="margin-top: 50px" elevation="12" shaped>
      <designCompanyTables></designCompanyTables>
    </v-card>
  </v-container>
</template>
<script>
// @ is an alias to /src
import designCompanyTables from "../components/tables/designCompanyTables.vue";

export default {
  name: "Home",
  components: {
    designCompanyTables,
  },
};
</script>

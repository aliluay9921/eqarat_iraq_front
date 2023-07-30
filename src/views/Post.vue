<template>
  <v-container>
    <!-- <v-card class="mt-5" elevation="4" shaped>
      <v-toolbar dark color="new">
        <v-toolbar-title align-center>المستخدمين</v-toolbar-title>
      </v-toolbar>

      <v-card-text> <addEmployeeForm></addEmployeeForm> </v-card-text>
    </v-card> -->

    <v-card style="margin-top: 50px" elevation="12" shaped>
      <postsTable></postsTable>
    </v-card>
  </v-container>
</template>
<script>
// @ is an alias to /src
// import addEmployeeForm from "../components/forms/addEmployeeForm.vue";
import postsTable from "../components/tables/postsTable.vue";

export default {
  name: "Home",
  components: {
    postsTable,
    // addEmployeeForm,
  },
};
</script>

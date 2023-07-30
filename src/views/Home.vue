<template>
  <div class="home">
    <v-row>
      <v-col cols="12" sm="4">
        <v-card elevation="8" outlined shaped to="/posts">
          <v-card-title class="text-h5">
            <div class="icon">
              <i class="fa fa-home" aria-hidden="true"></i>
            </div>
          </v-card-title>
          <v-card-text class="mt-5 text-h4 dark--text text-center"
            ><b>العقارات</b>
          </v-card-text>
          <v-card-actions> </v-card-actions
        ></v-card>
      </v-col>
      <v-col cols="12" sm="4">
        <v-card elevation="8" outlined shaped to="/hotels">
          <v-card-title class="text-h5">
            <div class="icon">
              <i class="fa fa-hotel" aria-hidden="true"></i>
            </div>
          </v-card-title>
          <v-card-text class="mt-5 text-h4 dark--text text-center"
            ><b>الفنادق</b>
          </v-card-text>
          <v-card-actions> </v-card-actions
        ></v-card>
      </v-col>
      <v-col cols="12" sm="4">
        <v-card elevation="8" outlined shaped to="/companies">
          <v-card-title class="text-h5">
            <div class="icon">
              <i class="fa fa-building" aria-hidden="true"></i>
            </div>
          </v-card-title>
          <v-card-text class="mt-5 text-h4 dark--text text-center"
            ><b>الشركات الهندسية</b>
          </v-card-text>
          <v-card-actions> </v-card-actions
        ></v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="4">
        <v-card elevation="8" outlined shaped to="/users">
          <v-card-title class="text-h5">
            <div class="icon">
              <i class="fa fa-address-book" aria-hidden="true"></i>
            </div>
          </v-card-title>
          <v-card-text class="mt-5 text-h4 dark--text text-center"
            ><b>المستخدمين</b>
          </v-card-text>
          <v-card-actions> </v-card-actions
        ></v-card>
      </v-col>
      <v-col cols="12" sm="4">
        <v-card elevation="8" outlined shaped to="/notifications">
          <v-card-title class="text-h5">
            <div class="icon">
              <i class="fa fa-address-book" aria-hidden="true"></i>
            </div>
          </v-card-title>
          <v-card-text class="mt-5 text-h4 dark--text text-center"
            ><b>الأشعارات</b>
          </v-card-text>
          <v-card-actions> </v-card-actions
        ></v-card>
      </v-col>
      <v-col cols="12" sm="4">
        <v-card elevation="8" outlined shaped to="/statistics">
          <v-card-title class="text-h5">
            <div class="icon">
              <i class="fa fa-percent" aria-hidden="true"></i>
            </div>
          </v-card-title>
          <v-card-text class="mt-5 text-h4 dark--text text-center"
            ><b>أحصائيات</b>
          </v-card-text>
          <v-card-actions> </v-card-actions
        ></v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {},
};
</script>
<style>
.home {
  padding: 30px 100px 0 100px;
}
/* .main_card {
  padding: 20px;
} */
.icon {
  padding: 10px;
  text-align: center;
  width: 100%;
}
.icon i {
  color: rgb(74, 51, 180);
  font-size: 90px;
}
</style>

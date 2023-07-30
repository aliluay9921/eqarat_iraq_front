<template>
  <v-card class="elevation-1">
    <template>
      <v-row justify="center">
        <v-dialog v-model="dialog" persistent max-width="390">
          <v-card>
            <v-card-title class="text-h5 new white--text">
              حذف الفندق
            </v-card-title>
            <v-card-text class="mt-5 text-h5 dark--text"
              ><b> هل أنت متأكد من عملية الحذف </b></v-card-text
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                class="new"
                color="white darken-1"
                text
                @click="dialog = false"
              >
                غلق
              </v-btn>
              <v-btn
                class="new"
                color="white darken-1"
                text
                @click="deletehotel()"
              >
                تأكيد الحذف
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </template>

    <template>
      <v-row justify="center">
        <v-dialog v-model="dialogImages" persistent max-width="900">
          <v-card>
            <v-card-title class="text-h5 secondary white--text">
              صور الفندق
            </v-card-title>
            <v-card-text class="mt-5 text-h5 dark--text">
              <v-row>
                <v-col
                  v-for="(data, index) in item.images"
                  :key="index"
                  cols="12"
                  sm="3"
                >
                  <a :href="server + data.image">
                    <img
                      :src="server + data.image"
                      alt="image"
                      width="150px"
                      height="150px"
                      class="img"
                    /> </a
                ></v-col>
              </v-row>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                class="secondary"
                color="white darken-1"
                text
                @click="close()"
              >
                غلق
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </template>

    <v-data-table
      :headers="headers"
      :items="hotels"
      :options.sync="pagination"
      :loading="table_loading || false"
      :page.sync="pagination.page"
      :items-per-page="pagination.itemsPerPage"
      hide-default-footer
      loading-text="جاري التحميل يرجى الأنتظار"
    >
      <template v-slot:item="{ item, index }">
        <tr>
          <td>{{ index + 1 }}</td>
          <td class="text-start">{{ item.user.user_name }}</td>
          <td class="text-start">{{ item.user.phone_number }}</td>
          <td class="text-start">{{ item.user.address }}</td>

          <td class="text-start">
            <v-chip color="red" dark v-if="item.room_type == 0">
              شخص واحد</v-chip
            >
            <v-chip color="red" dark v-else-if="item.room_type == 1">
              شخصين</v-chip
            >
            <v-chip color="red" dark v-else-if="item.room_type == 2">
              3 أشخاص</v-chip
            >
            <v-chip color="red" dark v-else-if="item.room_type == 3">
              4 أشخاص</v-chip
            >
          </td>
          <td class="text-start">
            {{ item.desc ?? " لا يوجد" }}
          </td>
          <td class="text-start">
            {{ item.note ?? "لا يوجد" }}
          </td>

          <td class="text-start">
            <!-- <v-btn @click="getItem(item)">
              <i class="fa fa-image" aria-hidden="true"></i
            ></v-btn> -->
            <v-btn dark icon color="info" @click="getItemImage(item)">
              <i
                class="fa fa-image"
                style="font-size: 20px"
                aria-hidden="true"
              ></i>
            </v-btn>
          </td>
          <td class="text-start">
            <v-btn dark color="error" @click="getItem(item)">حذف</v-btn>
          </td>
        </tr>
      </template>
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>جدول الفنادق</v-toolbar-title>

          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-text-field
            v-model="hotelQuery"
            @input="queryChange"
            append-icon="mdi-magnify"
            label="بحث"
            single-line
            hide-details
            class="mr-5"
          ></v-text-field>
        </v-toolbar>
      </template>
    </v-data-table>
    <div class="text-center pt-2 mt-3">
      <v-row>
        <v-col align-self="center" cols="2" offset="2">
          <v-select
            v-model="pagination.itemsPerPage"
            :items="items"
            label="عدد العناصر في الصفحة"
          ></v-select>
        </v-col>
        <v-col align-self="center" cols="4">
          <v-pagination
            v-model="pagination.page"
            :length="pageCount"
            circle
          ></v-pagination>
        </v-col>
      </v-row>
    </div>
  </v-card>
</template>
<script>
export default {
  data() {
    return {
      search: "",
      item: {},

      headers: [
        {
          text: "التسلسل",
          align: "sequence",
          class: "new white--text title",
        },
        {
          text: "أسم المستخدم",
          value: "user_name",
          align: "start",
          class: "new white--text title ",
        },
        {
          text: "رقم الهاتف",
          value: "phone_number",
          align: "start",
          class: "new white--text title ",
        },
        {
          text: "العنوان",
          value: "address",
          align: "start",
          class: "new white--text title ",
        },

        {
          text: "نوع الغرفة ",
          value: "room_type",
          align: "start",
          class: "new white--text title ",
        },

        {
          text: "الوصف",
          value: "desc",
          align: "start",
          class: "new white--text title ",
        },
        {
          text: "ملاحظات",
          value: "notes",
          align: "start",
          class: "new white--text title ",
        },

        {
          text: "الصور",
          value: "images",
          align: "start",
          class: "new white--text title ",
        },

        {
          text: "الحذف",
          value: "action",
          align: "start",
          class: "new white--text title ",
        },
      ],
      pagination: {},
      items: [5, 10, 25, 50, 100],
      dialog: false,
      dialogImages: false,
    };
  },
  computed: {
    server() {
      return this.$store.state.server;
    },
    hotels() {
      return this.$store.state.Hotel.hotels;
    },
    table_loading() {
      return this.$store.state.Hotel.table_loading;
    },
    pageCount: function () {
      return this.$store.state.Hotel.pageCount;
    },
    totalItems: function () {
      return this.$store.state.Hotel.hotels.length;
    },
    hotelQuery: {
      set(val) {
        this.$store.state.Hotel.hotelQuery = val;
      },
      get() {
        return this.$store.state.Hotel.hotelQuery;
      },
    },
    hotel_params: {
      set(val) {
        this.$store.state.Hotel.params = val;
      },
      get() {
        return this.$store.state.Hotel.params;
      },
    },
  },
  methods: {
    close() {
      this.dialog = false;
      this.dialogImages = false;
      this.item = {};
    },
    queryChange(val) {
      this.searchDebounce();
    },
    getItem(item) {
      this.item = item;
      this.dialog = true;
    },
    getItemImage(item) {
      this.dialogImages = true;
      this.item = item;
    },
    deleteHotel() {
      console.log(this.item);

      this.$store.dispatch("Hotel/deleteHotel", this.item);
      this.dialog = false;
      this.item = {};
    },
    getHotels() {
      let pagination = this.pagination;
      let par = {
        ...pagination,
        dropdown: false,
      };
      // // console.log(this.query);
      this.hotel_params = par;
      this.$store.dispatch("Hotel/getHotels");
    },

    searchDebounce() {
      clearTimeout(this._timerId);
      // delay new call 1000ms
      this._timerId = setTimeout(() => {
        this.$store.dispatch("Hotel/resetFields");
        this.pagination.page = 1;
        this.getHotels();
      }, 1000);
    },
  },
  created() {
    this.$store.dispatch("Hotel/resetFields");
  },
  watch: {
    pagination: {
      handler() {
        this.getHotels();
        this.hotel_params.page = 1;
      },
      deep: true,
    },
  },
};
</script>
<style>
/* هاي تخلي الهدر مرتب كلة */
.v-data-table-header th {
  white-space: nowrap;
}
</style>

<template>
  <div>
    <HeaderContent label="Finance" :list="crumbs"></HeaderContent>
    <v-row>
      <v-col cols="7">
        <v-data-table
          v-model="selected"
          show-select
          :headers="headers"
          :items="items"
          disable-sort
          hide-default-footer
        >
          <template v-slot:[`header.name`]="{ header }">
            {{ header.text.toUpperCase() }}
          </template>
          <template v-slot:[`header.action`]>
            <div class="d-flex justify-center align-center">
              <v-btn color="white" class="btn-cloud text-capitalize" small>
                <v-icon size="16" color="secondary" left
                  >mdi-cloud-download-outline</v-icon
                >
                <span class="secondary--text">Download</span>
              </v-btn>
            </div>
          </template>
          <template v-slot:[`item.action`]>
            <v-btn color="white" class="btn-cloud" small>
              <v-icon size="16" color="secondary"
                >mdi-cloud-download-outline</v-icon
              >
            </v-btn>
          </template>
        </v-data-table>
      </v-col>
      <v-col cols="5">
        <div class="card-option pa-6">
          <h5>Pengunduhan Periode</h5>
          <v-row>
            <v-col>
              <h6>Mulai dari</h6>
              <v-dialog
                ref="dialog"
                v-model="dialogDateFrom"
                :return-value.sync="dateFrom"
                persistent
                width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="dateFrom"
                    append-icon="mdi-calendar-blank"
                    readonly
                    dense
                    outlined
                    style="font-size: 12px"
                    class="pt-2"
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="dateFrom" color="primary" scrollable>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="whitesmoke"
                    class="text-capitalize"
                    depressed
                    @click="dialogDateFrom = false"
                  >
                    Cancel
                  </v-btn>
                  <v-btn
                    color="secondary"
                    depressed
                    @click="$refs.dialogDateFrom.save(dateFrom)"
                  >
                    OK
                  </v-btn>
                </v-date-picker>
              </v-dialog>
            </v-col>
            <v-col>
              <h6>Sampai</h6>
              <v-dialog
                ref="dialog"
                v-model="dialogDateTo"
                :return-value.sync="dateTo"
                persistent
                width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="dateTo"
                    append-icon="mdi-calendar-blank"
                    readonly
                    dense
                    outlined
                    style="font-size: 12px"
                    class="pt-2"
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="dateTo" color="primary" scrollable>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="whitesmoke"
                    class="text-capitalize"
                    depressed
                    @click="dialogDateTo = false"
                  >
                    Cancel
                  </v-btn>
                  <v-btn
                    color="secondary"
                    depressed
                    @click="$refs.dialogDateTo.save(dateTo)"
                  >
                    OK
                  </v-btn>
                </v-date-picker>
              </v-dialog>
            </v-col>
          </v-row>
          <div>
            <v-btn color="secondary" class="btn-cloud text-capitalize" block>
              <v-icon size="16" left>mdi-cloud-download-outline</v-icon>
              <span>Download</span>
            </v-btn>
          </div>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import HeaderContent from "@/containers/HeaderContent";
import { mapActions } from "vuex";

export default {
  components: {
    HeaderContent,
  },
  data() {
    return {
      crumbs: [
        {
          text: "List Finance",
          disabled: true,
        },
      ],
      headers: [
        {
          text: "Tanggal",
          value: "date",
          class: "whitesnow",
        },
        {
          value: "action",
          class: "whitesnow",
          align: "center",
          width: 200,
        },
      ],
      items: [
        {
          date: "20/20/2022",
        },
      ],
      dialogDateFrom: false,
      dialogDateTo: false,
      selected: [],
      dateFrom: new Date().toISOString().substr(0, 10),
      dateTo: new Date().toISOString().substr(0, 10),
    };
  },
  methods: {
    getToday() {
      const d = new Date();
      let date = d.getDate();
      let month = d.getMonth() + 1;
      let year = d.getFullYear();
      const today = `${date}/${month}/${year}`;
      return today;
    },
  },
};
</script>

<style lang="sass" scoped>
.btn-cloud
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.08)
  border-radius: 8px
.card-option
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.08)
  border-radius: 16px
</style>

<template>
  <div>
    <section class="mb-3">
      <HotTable
        :data="tableData"
        :settings="hotSettings"
        minCols="10"
        maxCols="10"
        minRows="100"
        maxRows="100"
      ></HotTable>
    </section>
    <v-btn @click="actionSubmitData">Submit</v-btn>
  </div>
</template>

<script>
import { HotTable } from "@handsontable/vue";
import { registerAllModules } from "handsontable/registry";
import "handsontable/dist/handsontable.full.css";
import { AutoRowSize } from "handsontable/plugins";

// register Handsontable's modules
registerAllModules(AutoRowSize);

const urlValidator = (value, callback) => {
  if (
    /^(?:(?:(?:https?|http?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/.test(
      value
    )
  ) {
    callback(true);
  } else {
    callback(false);
  }
};

export default {
  data() {
    return {
      tableData: [],
      hotSettings: {
        height: 600,
        width: "100%",
        TableClassName: "red",
        dropdownMenu: false,
        contextMenu: false,
        multiColumnSorting: false,
        filters: true,
        colWidths: [200, 600, 300],
        columnHeaderHeight: 40,
        rowHeights: 40,
        stretchH: "all",
        colHeaders: ["Username", "Origin Url", "Hashtag"],
        columns: [
          { data: "username", type: "text" },
          {
            data: "originalUrl",
            type: "text",
            validator: urlValidator,
            allowInvalid: true,
          },
          { data: "hashtag", type: "text" },
        ],
        licenseKey: "non-commercial-and-evaluation",
      },
    };
  },
  components: {
    HotTable,
  },
  methods: {
    actionSubmitData() {
      this.tableData.map((item, idx) => {
        console.log(idx, item);

        let colHeaders = ["username", "originalUrl", "hashtag"];
        colHeaders.map((col) => {
          if (item[col] != null) {
            console.log("bisa");
          } else {
            console.log("null anjay");
          }
        });
      });
    },
  },
};
</script>

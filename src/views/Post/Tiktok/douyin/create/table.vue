<template>
  <section>
    <HotTable
      :data="tableData"
      :settings="hotSettings"
      minCols="10"
      maxCols="10"
      minRows="100"
      maxRows="100"
      class="custom-table"
    ></HotTable>
  </section>
</template>

<script>
import { HotTable } from "@handsontable/vue";
import { registerAllModules } from "handsontable/registry";
import "handsontable/dist/handsontable.full.css";
import { AutoRowSize } from "handsontable/plugins";
import { ref, toRefs } from "vue";

// register Handsontable's modules
registerAllModules(AutoRowSize);

export default {
  props: {
    tableData: {
      type: Array,
      default: () => [],
    },
    tableError: {
      type: Object,
    },
    cellMeta: {
      type: Array,
      default: () => [],
    },
  },
  setup(props, { emit }) {
    const changesDataCell = ref([]);
    const errorData = ref([]);

    const usernameValidator = (value, callback) => {
      if (value) {
        if (
          /^(?=[A-Za-z0-9._]{4,20}$)(?!^[._]|.*[._]{2}|.*[._]$)[A-Za-z0-9._]*[A-Za-z][A-Za-z0-9._]*$/.test(
            value
          )
        ) {
          callback(true);
        } else {
          callback(false);
        }
      } else {
        callback(true);
      }
    };

    const urlValidator = (value, callback) => {
      if (value) {
        if (
          /^(?:(?:(?:https?|http?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/.test(
            value
          )
        ) {
          callback(true);
        } else {
          callback(false);
        }
      } else {
        callback(true);
      }
    };

    const hotSettings = {
      height: 600,
      width: "100%",
      dropdownMenu: false,
      contextMenu: false,
      multiColumnSorting: false,
      filters: true,
      colWidths: [200, 600, 300],
      columnHeaderHeight: 40,
      rowHeights: 40,
      stretchH: "all",
      cell: props.cellMeta,
      colHeaders: ["Akun", "Link Douyin", "Hashtag"],
      afterSetDataAtCell(changes) {
        changesDataCell.value = changes;
        emit("afterChangeData", props.tableData);
      },
      afterValidate(isValid, value, row, prop) {
        const header = ["username", "originalURL", "hashtag"];
        const col = header.findIndex((val) => val == prop);
        if (isValid) {
          const result = errorData.value.filter((item) => {
            if (item.row != row || item.col != col) {
              return item;
            }
          });
          errorData.value = result;
          emit("afterValidate", errorData.value);
        } else {
          errorData.value.push({ row, col });
          emit("afterValidate", errorData.value);
        }
      },
      columns: [
        {
          data: "username",
          type: "text",
          validator: usernameValidator,
          allowEmpty: false,
        },
        {
          data: "originalURL",
          type: "text",
          validator: urlValidator,
          allowEmpty: false,
        },
        { data: "hashtag", type: "text" },
      ],
      licenseKey: "non-commercial-and-evaluation",
    };

    return {
      changesDataCell,
      errorData,
      hotSettings,
    };
  },
  components: {
    HotTable,
  },
};
</script>

<style lang="scss">
.custom-table thead th div {
  height: 40px;
  background-color: #f9f9f9;
  display: flex;
  justify-content: start;
  align-items: center;
  font-weight: 500;
  padding-left: 16px !important;
  padding-right: 16px !important;
}
.custom-table tbody tr td {
  font-size: 12px !important;
  padding-left: 16px !important;
  padding-right: 16px !important;
}
</style>

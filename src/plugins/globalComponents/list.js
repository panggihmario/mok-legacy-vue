import { ValidationObserver, ValidationProvider } from "vee-validate";
import View from "@/components/core/View";
import Drawer from "@/components/core/Drawer";
import Input from "@/components/material/Input";
import Form from "@/components/material/Form";
import Button from "@/components/material/Button";
import TextEditor from "@/components/material/TextEditor";
import Upload from "../../components/material/Upload";
import IconUpload from "../../components/icon/iconUpload.vue";
import IconInput from "../../components/material/IconInput";
import IconClose from "../../components/icon/iconClose.vue";
import IconDelete from "../../components/icon/iconDelete.vue";
import IconEdit from "../../components/icon/iconEdit.vue";
import IconLink from "../../components/icon/iconLink.vue";
import IconHeart from "../../components/icon/iconHeart.vue";
import IconComment from "../../components/icon/iconComment.vue";
import IconShare from "../../components/icon/iconShare.vue";
import IconClockSquare from "../../components/icon/iconClockSquare.vue";
import IconThumbUp from "../../components/icon/iconThumbUp.vue";
import IconEye from "../../components/icon/iconEye.vue";
import IconInfoOutline from "../../components/icon/iconInfoOutline.vue";
import LabelField from "../../components/material/Input/label.vue";
import InputArea from "../../components/material/InputArea";
import DatePicker from "../../components/material/DatePicker";
import Select from "../../components/material/Select";
import CardTotalArticle from "../../components/material/Card/CardTotalArticle";
import Autocomplete from "../../components/material/Autocomplete";

export default [
  // {
  //   name : 'k-select',
  //   component : () => import("../../components/kipasMaterial/Select/index.vue")
  // },
  {
    name: "ValidationProvider",
    component: ValidationProvider,
  },
  {
    name: "ValidationObserver",
    component: ValidationObserver,
  },
  {
    name: "CoreView",
    component: View,
  },
  {
    name: "CoreDrawer",
    component: Drawer,
  },
  {
    name: "custom-input",
    component: Input,
  },
  {
    name: "custom-form",
    component: Form,
  },
  {
    name: "custom-button",
    component: Button,
  },
  {
    name: "text-editor",
    component: TextEditor,
  },
  {
    name: "custom-upload",
    component: Upload,
  },
  {
    name: "icon-upload",
    component: IconUpload,
  },
  {
    name: "icon-input",
    component: IconInput,
  },
  {
    name: "icon-link",
    component: IconLink,
  },
  {
    name: "icon-close",
    component: IconClose,
  },
  {
    name: "icon-delete",
    component: IconDelete,
  },
  {
    name: "icon-heart",
    component: IconHeart,
  },
  {
    name: "icon-edit",
    component: IconEdit,
  },
  {
    name: "icon-comment",
    component: IconComment,
  },
  {
    name: "icon-share",
    component: IconShare,
  },
  {
    name: "icon-clock-square",
    component: IconClockSquare,
  },
  {
    name: "icon-thumb-up",
    component: IconThumbUp,
  },
  {
    name: "icon-eye",
    component: IconEye,
  },
  {
    name: "icon-info-outline",
    component: IconInfoOutline,
  },
  {
    name: "label-field",
    component: LabelField,
  },
  {
    name: "custom-textarea",
    component: InputArea,
  },
  {
    name: "date-picker",
    component: DatePicker,
  },
  {
    name: "custom-select",
    component: Select,
  },
  {
    name: "card-total-article",
    component: CardTotalArticle,
  },
  {
    name: "custom-autocomplete",
    component: Autocomplete,
  },
];

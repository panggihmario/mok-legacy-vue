<template>
  <ValidationProvider v-slot="{ errors }" :name="name" :rules="rules">
    <ckeditor
      :editor="editor"
      :config="editorConfig"
      v-bind="$attrs"
      :value="value"
      v-on="inputListener"
    />

    <div v-if="errors" class="editor__error-message error--text">{{ errors[0] }}</div>
  </ValidationProvider>
</template>
<script>
import ClassicEditor from "@ckeditor/ckeditor5-editor-classic/src/classiceditor";
// import Font from '@ckeditor/ckeditor5-font/src/font';
import EssentialsPlugin from "@ckeditor/ckeditor5-essentials/src/essentials";
import BoldPlugin from "@ckeditor/ckeditor5-basic-styles/src/bold";
import ItalicPlugin from "@ckeditor/ckeditor5-basic-styles/src/italic";
import LinkPlugin from "@ckeditor/ckeditor5-link/src/link";
import ParagraphPlugin from "@ckeditor/ckeditor5-paragraph/src/paragraph";
import Alignment from "@ckeditor/ckeditor5-alignment/src/alignment";
import Img from "@ckeditor/ckeditor5-image/src/image";
import ImageResize from "@ckeditor/ckeditor5-image/src/imageresize";
import ImageUpload from "@ckeditor/ckeditor5-image/src/imageupload";
import SimpleUploadAdapter from "@ckeditor/ckeditor5-upload/src/adapters/simpleuploadadapter";
import ImageToolbar from "@ckeditor/ckeditor5-image/src/imagetoolbar";
import UploadAdapter from "./uploadAdapter";
import ImageResizeEditing from "@ckeditor/ckeditor5-image/src/imageresize/imageresizeediting";
import ImageResizeHandles from "@ckeditor/ckeditor5-image/src/imageresize/imageresizehandles";
import ImageStyle from "@ckeditor/ckeditor5-image/src/imagestyle"
import MediaEmbed from '@ckeditor/ckeditor5-media-embed/src/mediaembed';
export default {
  computed: {
    inputListener() {
      const vm = this;
      return Object.assign({}, this.$listeners, {
        input: function (event) {
          vm.$emit("input", event);
        },
      });
    },
  },
  props: {
    value: {
      type: String,
    },
    name: {
      type: String,
    },
    rules: {
      type: String,
    },
  },
  data() {
    return {
      editor: ClassicEditor,
      editorConfig: {
        extraPlugins: [this.MyCustomUploadAdapterPlugin],
        
        plugins: [
          EssentialsPlugin,
          BoldPlugin,
          ItalicPlugin,
          LinkPlugin,
          ParagraphPlugin,
          Img,
          // ImageResize,
          // ImageResizeEditing,
          // ImageResizeHandles,
          Alignment,
          ImageUpload,
          SimpleUploadAdapter,
          ImageToolbar,
          ImageStyle,
          MediaEmbed,
          // Image
        ],
        // image: {
        //   toolbar: [
        //     "imageTextAlternative",
        //     "|",
        //     // "imageStyle:full",
        //     // "imageStyle:side",
        //   ],
        //   styles : [ 'full', 'side' ],
        //   resizeUnit: "%",
        //   resizeOptions: [
        //     {
        //       name: "imageResize:original",
        //       value: null,
        //     },
        //     {
        //       name: "imageResize:50",
        //       value: "50",
        //     },
        //     {
        //       name: "imageResize:75",
        //       value: "75",
        //     },
        //   ],
        // },
        toolbar: {
          items :[
          "bold",
          "italic",
          "alignment",
          "undo",
          "redo",
          "imageUpload",
          "link",
          'mediaEmbed'
        ],
        }
      },
    };
  },
  methods: {
    MyCustomUploadAdapterPlugin(editor) {
      editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
        return new UploadAdapter(loader);
      };
    },
  },
};
</script>



<style>
.ck-editor__editable {
  min-height: 300px;
  border-radius: 10px;
}
</style>

<style lang="sass" scoped>
.editor
  &__error-message
    font-size: 12px
</style>

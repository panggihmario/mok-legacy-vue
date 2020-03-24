<template>
  <ckeditor
    :editor="editor"
    :config="editorConfig"
		v-bind="$attrs"
		:value="value"
		v-on="inputListener"
  />
</template>
<script>
import ClassicEditor from "@ckeditor/ckeditor5-editor-classic/src/classiceditor";
import EssentialsPlugin from "@ckeditor/ckeditor5-essentials/src/essentials";
import BoldPlugin from "@ckeditor/ckeditor5-basic-styles/src/bold";
import ItalicPlugin from "@ckeditor/ckeditor5-basic-styles/src/italic";
import LinkPlugin from "@ckeditor/ckeditor5-link/src/link";
import ParagraphPlugin from "@ckeditor/ckeditor5-paragraph/src/paragraph";
import Alignment from "@ckeditor/ckeditor5-alignment/src/alignment";
export default {
	computed : {
		inputListener () {
			const vm = this
			return Object.assign({},
			this.$listeners, {
				input : function (event) {
					vm.$emit('input', event)
				}
			})
		}
	},
	props : {
		value : {
			type : String
		}
	},
  data() {
    return {
      editor: ClassicEditor,
      editorConfig: {
        plugins: [
          EssentialsPlugin,
          BoldPlugin,
          ItalicPlugin,
          LinkPlugin,
          ParagraphPlugin,
          Alignment
        ],
        toolbar: {
          items: [
            "bold",
            "italic",
            "alignment:left",
            "alignment:center",
            "alignment:right",
            "alignment:justify",
            "undo",
            "redo"
          ]
        }
      }
    };
  }
};
</script>

<style>
.ck-editor__editable {
  min-height: 300px;
	border-radius: 10px
}
</style>

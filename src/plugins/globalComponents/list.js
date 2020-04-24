import { ValidationObserver, ValidationProvider } from 'vee-validate';
import View from '@/components/core/View';
import Drawer from '@/components/core/Drawer';
import Input from '@/components/material/Input';
import Form from '@/components/material/Form';
import Button from '@/components/material/Button';
import TextEditor from '@/components/material/TextEditor';
import Upload from '../../components/material/Upload';
import IconUpload from '../../components/icon/iconUpload.vue';
import IconInput from '../../components/material/IconInput';
import IconLink from '../../components/icon/iconLink.vue';
import LabelField from '../../components/material/Input/label.vue';
import InputArea from '../../components/material/InputArea';
import DatePicker from '../../components/material/DatePicker';
import Select from '../../components/material/Select';
import CardTotalArticle from '../../components/material/Card/CardTotalArticle';
import Autocomplete from '../../components/material/Autocomplete';

export default [
	{
		name: 'ValidationProvider',
		component: ValidationProvider
	},
	{
		name: 'ValidationObserver',
		component: ValidationObserver
	},
	{
		name: 'CoreView',
		component: View
	},
	{
		name: 'CoreDrawer',
		component: Drawer
	},
	{
		name: 'custom-input',
		component: Input
	},
	{
		name: 'custom-form',
		component: Form
	},
	{
		name: 'custom-button',
		component : Button
	},
	{
		name : 'text-editor',
		component : TextEditor
	},
	{
		name : 'custom-upload',
		component : Upload
	},
	{
		name : 'icon-upload',
		component : IconUpload
	},
	{
		name : 'icon-input',
		component : IconInput
	},
	{
		name : 'icon-link',
		component : IconLink
	},
	{
		name : 'label-field',
		component : LabelField
	},
	{
		name : 'custom-textarea',
		component : InputArea
	},
	{
		name : 'date-picker',
		component : DatePicker
	},
	{
		name : 'custom-select',
		component : Select
	},
	{
		name : 'card-total-article',
		component : CardTotalArticle
	},
	{
		name : 'custom-autocomplete',
		component : Autocomplete
	}
]
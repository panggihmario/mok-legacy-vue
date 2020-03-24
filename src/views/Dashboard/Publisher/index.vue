<template>
	<div>
		<CardTotalArticle/>
		<br/>
		<CardArticle/>
		<br/>
		<CardTrending/>
	</div>
</template>

<script>
import CardTotalArticle from '@/components/material/Card/CardTotalArticle'
import CardArticle from '@/components/material/Card/CardArticle'
import CardTrending from '@/components/material/Card/CardTrending'
export default {
	components : {
		CardTotalArticle,
		CardArticle,
		CardTrending
	}
}
</script>

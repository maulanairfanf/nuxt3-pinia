<template>
	<div>
		<ul>
			<li v-for="cafe in cafeStore.cafes.data" :key="cafe.id">
				{{ cafe.company.name }}
			</li>
		</ul>

		<button
			@click="cafeStore.loadMore()"
			v-if="cafeStore.hasMore"
			:disabled="status === 'pending'"
		>
			Load More
		</button>
	</div>
</template>

<script setup>
import { useCafeStore } from '../stores/cafeStore'

const cafeStore = useCafeStore()

const { data, status } = await useAsyncData('cafes', () =>
	cafeStore.fetchCafes()
)

cafeStore.cafes.data = data.value.data
cafeStore.cafes.last_page = data.value.last_page
</script>

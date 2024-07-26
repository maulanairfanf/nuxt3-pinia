<template>
	<div>
		<ul>
			<li
				v-for="cafe in data"
				:key="cafe.id"
				v-text="cafe.company.name + ' - ' + cafe.location_name"
			></li>
		</ul>
		<!-- <button @click="previous()" v-if="pagination.page > 1">Previous</button>
		<button @click="next()" v-if="pagination.page < cafes.last_page">
			Next
		</button> -->
		<button @click="previous()" v-if="page > 1">Previous</button>
		<button @click="next()" v-if="page < cafes.last_page">Next</button>
	</div>
</template>
<script setup>
const pagination = reactive({
	page: 1,
})

const page = ref(1)
const data = ref([])
const lastPage = ref(1)

const url = computed(
	() => `https://api.roastandbrew.coffee/api/v1/cafes?page=${page.value}`
)

const { data: cafes, error } = await useFetch(url)

data.value = cafes.value.data
lastPage.value = cafes.value.last_page

const previous = () => {
	if (page.value != 1) {
		page.value -= 1
	}
}

const next = () => {
	if (page.value + 1 <= cafes.value.last_page) {
		page.value += 1
		console.log(('page', page.value))
	}
}

watch(
	() => cafes.value,
	newVal => {
		if (newVal) {
			console.log('newVal', newVal)
			data.value = newVal.data
			lastPage.value = newVal.last_page
			console.log('data.value', data.value)
		}
	}
)
</script>

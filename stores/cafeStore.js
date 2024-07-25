// stores/cafeStore.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCafeStore = defineStore('cafeStore', () => {
	const page = ref(1)
	const pending = ref(false)
	const search = ref('')
	const cafes = ref({ data: [], last_page: 1 })
	const hasMore = computed(() => cafes.value.last_page > page.value)

	const fetchCafes = async () => {
		return await $fetch('/api/v1/cafes', {
			method: 'GET',
			baseURL: 'https://api.roastandbrew.coffee',
			params: { page: page.value, search: search.value },
		})
	}

	const loadMore = async () => {
		if (pending.value || !hasMore.value) return

		pending.value = true

		try {
			const response = await fetchCafes()
			cafes.value.data = [...cafes.value.data, ...response.data]
			page.value += 1
		} catch (error) {
			console.error('Error loading more cafes:', error)
		} finally {
			pending.value = false
		}
	}

	return { page, pending, search, cafes, hasMore, loadMore, fetchCafes }
})

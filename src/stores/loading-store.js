import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useLoadingStore = defineStore('loading', () => {
  // Store all active loading processes by key
  const loadingProcesses = ref({})

  // Computed property to check if any loading process is active
  const isLoading = computed(() => Object.values(loadingProcesses.value).some((value) => value))

  /**
   * Start a loading process with the given key
   * @param {string} key - Unique identifier for the loading process
   */
  function startLoading(key) {
    loadingProcesses.value[key] = true
  }

  /**
   * Stop a loading process with the given key
   * @param {string} key - Unique identifier for the loading process
   */
  function stopLoading(key) {
    loadingProcesses.value[key] = false
  }

  /**
   * Check if a specific loading process is active
   * @param {string} key - Unique identifier for the loading process
   * @returns {boolean} - Whether the process is loading
   */
  function isLoadingProcess(key) {
    return !!loadingProcesses.value[key]
  }

  /**
   * Reset all loading states
   */
  function resetLoading() {
    loadingProcesses.value = {}
  }

  /**
   * Wrap an async function with loading indicators
   * @param {string} key - Loading process identifier
   * @param {Function} fn - The async function to execute
   * @returns {Promise} - The result of the async function
   */
  async function withLoading(key, fn) {
    try {
      startLoading(key)
      return await fn()
    } finally {
      stopLoading(key)
    }
  }

  return {
    isLoading,
    loadingProcesses,
    startLoading,
    stopLoading,
    isLoadingProcess,
    resetLoading,
    withLoading,
  }
})

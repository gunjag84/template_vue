import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAlertStore = defineStore('alerts', () => {
  const alerts = ref([])
  const timeoutDuration = ref(5000) // Default timeout: 5 seconds

  function addAlert({ message, type = 'info', persistent = false, timeout = null }) {
    const id = Date.now().toString()
    const newAlert = { id, message, type, persistent }
    alerts.value.push(newAlert)

    if (!persistent) {
      setTimeout(() => {
        removeAlert(id)
      }, timeout || timeoutDuration.value)
    }

    return id
  }

  function removeAlert(id) {
    const index = alerts.value.findIndex((alert) => alert.id === id)
    if (index !== -1) {
      alerts.value.splice(index, 1)
    }
  }

  function clearAlerts() {
    alerts.value = []
  }

  // Convenience methods for different alert types
  function success(message, options = {}) {
    return addAlert({ message, type: 'success', ...options })
  }

  function error(message, options = {}) {
    return addAlert({ message, type: 'error', ...options })
  }

  function info(message, options = {}) {
    return addAlert({ message, type: 'info', ...options })
  }

  function warning(message, options = {}) {
    return addAlert({ message, type: 'warning', ...options })
  }

  return {
    alerts,
    timeoutDuration,
    addAlert,
    removeAlert,
    clearAlerts,
    success,
    error,
    info,
    warning,
  }
})

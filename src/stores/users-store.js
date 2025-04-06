import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { supabase } from '@/plugins/supabase-auth'
import { useAlertStore } from './alert-store'
import { useLoadingStore } from './loading-store'

export const useUsersStore = defineStore('users', () => {
  const user = ref(null)
  const userProfile = ref(null)
  const alertStore = useAlertStore()
  const loadingStore = useLoadingStore()

  const isAuthenticated = computed(() => !!user.value)

  // Initialize the user from the current session
  async function initUser() {
    return loadingStore.withLoading('auth:init', async () => {
      const { data } = await supabase.auth.getSession()
      if (data.session) {
        user.value = data.session.user
        await fetchUserProfile()
      }
    })
  }

  // Fetch the user's profile from Supabase
  async function fetchUserProfile() {
    if (!user.value) return null

    return loadingStore.withLoading('user:profile', async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.value.id)
        .single()

      if (error) {
        alertStore.error('Failed to load user profile')
        console.error('Error fetching profile:', error)
        return null
      }

      userProfile.value = data
      return data
    })
  }

  // Log in with email and password
  async function login(email, password) {
    return loadingStore.withLoading('auth:login', async () => {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        alertStore.error('Login failed: ' + error.message)
        return { success: false, error }
      }

      user.value = data.user
      await fetchUserProfile()
      alertStore.success('Successfully logged in')
      return { success: true, data }
    })
  }

  // Sign up with email and password
  async function register(email, password, userData = {}) {
    return loadingStore.withLoading('auth:register', async () => {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: userData,
        },
      })

      if (error) {
        alertStore.error('Registration failed: ' + error.message)
        return { success: false, error }
      }

      user.value = data.user

      // Create user profile
      await createUserProfile(userData)

      alertStore.success('Registration successful')
      return { success: true, data }
    })
  }

  // Create initial user profile in the profiles table
  async function createUserProfile(userData) {
    if (!user.value) return { success: false }

    const profileData = {
      id: user.value.id,
      username: userData.username || null,
      full_name: userData.full_name || null,
      avatar_url: userData.avatar_url || null,
      created_at: new Date(),
    }

    const { error } = await supabase.from('profiles').insert(profileData)

    if (error) {
      alertStore.error('Failed to create profile')
      console.error('Error creating profile:', error)
      return { success: false, error }
    }

    userProfile.value = profileData
    return { success: true }
  }

  // Update user profile
  async function updateProfile(updates) {
    if (!user.value) return { success: false }

    return loadingStore.withLoading('user:update', async () => {
      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.value.id)
        .select()

      if (error) {
        alertStore.error('Failed to update profile')
        console.error('Error updating profile:', error)
        return { success: false, error }
      }

      userProfile.value = data[0]
      alertStore.success('Profile updated successfully')
      return { success: true, data: data[0] }
    })
  }

  // Log out
  async function logout() {
    return loadingStore.withLoading('auth:logout', async () => {
      const { error } = await supabase.auth.signOut()

      if (error) {
        alertStore.error('Failed to log out')
        console.error('Error during logout:', error)
        return { success: false, error }
      }

      user.value = null
      userProfile.value = null
      alertStore.success('Successfully logged out')
      return { success: true }
    })
  }

  // Password reset request
  async function resetPassword(email) {
    return loadingStore.withLoading('auth:reset', async () => {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      })

      if (error) {
        alertStore.error('Failed to send password reset email')
        return { success: false, error }
      }

      alertStore.success('Password reset email sent')
      return { success: true }
    })
  }

  return {
    user,
    userProfile,
    isAuthenticated,
    initUser,
    login,
    register,
    logout,
    updateProfile,
    fetchUserProfile,
    resetPassword,
  }
})

'use server'
import { auth, signIn, signOut } from '@/auth'

export const signInWithCredentials = async (formData: FormData) => {
  await signIn('credentials', {
    username: formData.get('username') || '', // `'null'` 문자 방지
    password: formData.get('password') || '',
    redirectTo: '/'
  })
}
export const signOutWithForm = async (formData: FormData) => {
  await signOut()
}
export {
  auth as getSession,
}
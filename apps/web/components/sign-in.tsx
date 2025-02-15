import {signInWithCredentials} from "@/actions/auth";

export function SignIn() {
  return (
      <form
          action={async (formData) => {
            "use server"
            await signInWithCredentials(formData)
          }}
      >
        <label>
          username
          <input name="username" type="text" />
        </label>
        <label>
          Password
          <input name="password" type="password" />
        </label>
        <button>Sign In</button>
      </form>
  )
}
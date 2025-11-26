import { Alert } from "@/components/popup/Alert";
import { signInNetworkCall } from "@/utils/api/auth";
import { signInFormValidator } from "@/utils/validator/signInFormValidator";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignInForm({ onChange, formData, onSwitchToSignUp ,onSuccess}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const router = useRouter();

  const handleSubmit = async () => {
    const errors = signInFormValidator(formData);
    setError(errors);
    // if (errors) {
    //   return;
    // }

    setLoading(true)
    try {
      signIn("credentials", {
          email: formData.email,
          password: formData.password,
          redirect: true,
          callbackUrl: "/dashboard",
        });
      setTimeout(
        () =>
          onSuccess({
            email: formData.email,
            name: formData.name,
          }),
        500
      );

      // if(response.status !== 200){
      //   setError({
      //     email: "Invalid email or password",
      //   });
      //   return;
      // }
      
      // router.push("/dashboard");
    } catch (err) {
      console.log(err,"ERR")
      // setError('Sign up failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSubmit();
  };

  return (
    <>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="Your Company"
            src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
            className="mx-auto h-10 w-auto"
          />
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto w-full ">
          <form className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm/6 font-medium text-gray-100"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  onChange={onChange}
                  value={formData.email}
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                />
                {error.email && (
                  <Alert type="error" message={error.email} />
                )}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm/6 font-medium text-gray-100"
                >
                  Password
                </label>
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-indigo-400 hover:text-indigo-300"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  onChange={onChange}
                  value={formData.password}
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                />
                {error.password && (
                  <Alert type="error" message={error.password} />
                )}
              </div>
            </div>

            <div>
              <button
                onKeyDown={handleKeyPress}
                onClick={handleSubmit}
                type="button"
                className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm/6 text-gray-400">
            Not a member?{" "}
            <button
              onClick={onSwitchToSignUp}
              className="font-semibold text-indigo-400 hover:text-indigo-300"
            >
              Sign Up Now
            </button>
          </p>
        </div>
      </div>
    </>
  );
}

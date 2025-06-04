import Profile from "@/assets/images/profile.png";
import Link from "next/link";
import Image from "next/image";
import { User } from "@/shared/models";
import { postSignin } from "@/app/actions";
import { redirect, RedirectType } from "next/navigation";

export const metadata = {
  title: "shanabunny - Sign In",
  description: "Log in to shanabunny account",
};

export default function SignIn() {
  const submitForm = async (formData: FormData) => {
    "use server";
    let result = false;
    try {
      const params: User = {
        Username: formData.get("username") as string,
        Password: formData.get("password") as string,
      };
      const response = await postSignin(params);
      if (response && response.success) {
        result = true;
      }
    } catch (e) {}
    /***
     * Redirect bug with NextJS, move the redirect outside of the try-catch
     * https://stackoverflow.com/questions/75796703/redirect-from-server-side-in-nextjs-13
     * https://stackoverflow.com/questions/78630979/redirecting-from-a-server-component-in-nextjs
     *
     */
    if (result) redirect("/");
  };

  return (
    <>
      {/* Page header */}
      <div className="max-w-3xl mx-auto text-center pb-12">
        {/* Logo */}
        <a href="/">
          <Image
            priority
            className="justify-center m-auto max-w-32"
            src={Profile}
            alt="Profile"
          />
        </a>
        <h1 className="h2 bg-clip-text text-transparent bg-gradient-to-r from-pink-300/60 via-purple-200 to-indigo-300/60 pb-4">
          Sign In
        </h1>
      </div>

      {/* Form */}
      <div className="max-w-sm mx-auto">
        <form action={submitForm}>
          <div className="space-y-4">
            <div>
              <label
                className="block text-sm text-pink-300 font-medium mb-1"
                htmlFor="username"
              >
                Username
              </label>
              <input
                autoComplete="username"
                name="username"
                id="username"
                className="form-input w-full"
                type="username"
                required
              />
            </div>
            <div>
              <div className="flex justify-between">
                <label
                  className="block text-sm text-pink-300 font-medium mb-1"
                  htmlFor="password"
                >
                  Password
                </label>
                <Link
                  className="text-sm font-medium text-purple-500 hover:text-purple-400 transition duration-150 ease-in-out ml-2"
                  href="/reset-password"
                >
                  Forgot?
                </Link>
              </div>
              <input
                name="password"
                id="password"
                className="form-input w-full"
                type="password"
                autoComplete="on"
                required
              />
            </div>
          </div>
          <div className="mt-6">
            <button
              type="submit"
              className="btn text-sm text-white bg-purple-300 hover:bg-indigo-400 w-full shadow-sm group"
            >
              Sign In{" "}
              <span className="tracking-normal text-white group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-1">
                -&gt;
              </span>
            </button>
          </div>
        </form>

        <div className="text-center mt-4">
          <div className="text-sm text-slate-400">
            Dont have an account?{" "}
            <Link
              className="font-medium text-pink-400 hover:text-pink-300 transition duration-150 ease-in-out"
              href="/signup"
            >
              Sign up
            </Link>
          </div>
        </div>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div
            className="border-t border-purple-300 grow mr-3"
            aria-hidden="true"
          />
          <div className="text-sm text-slate-500 italic">or</div>
          <div
            className="border-t border-purple-300 grow ml-3"
            aria-hidden="true"
          />
        </div>

        {/* Social login */}
        <div className="flex space-x-3">
          <button
            disabled
            className="btn text-cyan-400 hover:text-white transition duration-150 ease-in-out w-full group  relative before:absolute before:inset-0 before:bg-cyan-400/30 before:rounded-full before:pointer-events-none h-9"
          >
            <span className="relative">
              <span className="sr-only">Continue with Twitter</span>
              <svg
                className="fill-current"
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="12"
              >
                <path d="m4.34 0 2.995 3.836L10.801 0h2.103L8.311 5.084 13.714 12H9.482L6.169 7.806 2.375 12H.271l4.915-5.436L0 0h4.34Zm-.635 1.155H2.457l7.607 9.627h1.165L3.705 1.155Z" />
              </svg>
            </span>
          </button>
          <button
            disabled
            className="btn text-pink-300 hover:text-white transition duration-150 ease-in-out w-full group relative before:absolute before:inset-0 before:bg-pink-300/30 before:rounded-full before:pointer-events-none h-9"
          >
            <span className="relative">
              <span className="sr-only">Continue with GitHub</span>
              <svg
                className="fill-current"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="15"
              >
                <path d="M7.488 0C3.37 0 0 3.37 0 7.488c0 3.276 2.153 6.084 5.148 7.113.374.094.468-.187.468-.374v-1.31c-2.06.467-2.527-.936-2.527-.936-.375-.843-.843-1.124-.843-1.124-.655-.468.094-.468.094-.468.749.094 1.123.75 1.123.75.655 1.216 1.778.842 2.153.654.093-.468.28-.842.468-1.03-1.685-.186-3.37-.842-3.37-3.743 0-.843.281-1.498.75-1.966-.094-.187-.375-.936.093-1.965 0 0 .655-.187 2.059.749a6.035 6.035 0 0 1 1.872-.281c.655 0 1.31.093 1.872.28 1.404-.935 2.059-.748 2.059-.748.374 1.03.187 1.778.094 1.965.468.562.748 1.217.748 1.966 0 2.901-1.778 3.463-3.463 3.65.281.375.562.843.562 1.498v2.059c0 .187.093.468.561.374 2.996-1.03 5.148-3.837 5.148-7.113C14.976 3.37 11.606 0 7.488 0Z" />
              </svg>
            </span>
          </button>
        </div>
      </div>
    </>
  );
}

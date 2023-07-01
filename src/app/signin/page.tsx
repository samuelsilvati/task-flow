import { redirect } from 'next/navigation'
import AuthForm from '../components/AuthForm'
import { cookies } from 'next/headers'
import Image from "next/image";
import Logo from "../../assets/logo.svg";

export default function Auth() {
  const token = cookies().has('token')
  if (token) redirect('/dashboard')

  return (
    <div className="flex bg-[url(../assets/bg-mobile.svg)] bg-contain bg-top bg-no-repeat bg-white">
      <div className="flex h-screen w-full flex-col items-center justify-center lg:bg-white">
        <div className="my-14 flex h-screen w-96 flex-col justify-between gap-6 ">
          <div className='h-screen flex flex-col justify-evenly items-center'>
            <Image
            src={Logo}
            alt="logo"
            className="mx-auto px-5 lg:mx-0"
            width={224}
          />
            <AuthForm />
            <span></span>
          </div>
        </div>
      </div>
      <div className="w-[40%] hidden h-screen overflow-hidden bg-[url(../assets/side.svg)] bg-cover bg-top bg-no-repeat lg:block lg:bg-white"></div>
    </div>
  );
}

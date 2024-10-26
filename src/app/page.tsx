import { redirect } from "next/navigation";


export default function Page(){

  redirect('/home');

  return (
    <div className="min-h-screen flex justify-center items-center">loading...</div>
  );
}
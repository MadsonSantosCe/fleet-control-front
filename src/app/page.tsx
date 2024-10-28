import { redirect } from "next/navigation";


export default function Page(){

  redirect('/delivery');

  return (
    <div className="min-h-screen flex justify-center items-center">loading...</div>
  );
}
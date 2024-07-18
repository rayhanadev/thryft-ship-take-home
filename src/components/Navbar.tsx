import Image from "next/image";

export default function Navbar() {
  return (
    <div className="hidden md:block flex flex-rows items-start justify-center gap-8 py-4 px-14 w-full border-b-2 border-b-border">
      <Image src="/wordmark.svg" alt="Thryft Ship" width={196} height={66} className="mr-auto"/>
    </div>
  )
};
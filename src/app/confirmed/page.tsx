import Image from "next/image";

export default function Page() {
  return (
    <>
      <div className="hidden h-[calc(100vh-100px)] h-[calc(dvh-100px)] w-full flex-col items-center justify-center md:flex">
        <div className="flex w-full flex-col items-center justify-center gap-6">
          <Image
            src="/logo.svg"
            width={179}
            height={179}
            alt="Thryft Ship Logo"
          />
          <p className="leading-2 w-[210px] text-center text-lg font-bold">
            Confirmation and tracking information will be sent to your email!
          </p>
          <div className="h-40"></div>
          <div className="flex flex-col items-center justify-center">
            <p className="text-sm font-semibold text-zinc-600">
              Are you a seller too?
            </p>
            <p className="text-sm font-semibold text-zinc-600">
              Check us out here{" "}
              <a href="https://thryftship.com" className="text-[#6366F1]">
                (hyper link)
              </a>
              .
            </p>
          </div>
        </div>
      </div>
      <div className="flex h-[calc(100vh-100px)] h-[calc(dvh-100px)] w-full flex-col items-center justify-center md:hidden">
        <div className="flex w-full flex-col items-center justify-center gap-6">
          <Image
            src="/logo.svg"
            width={179}
            height={179}
            alt="Thryft Ship Logo"
          />
          <p className="leading-2 w-[210px] text-center text-lg font-bold">
            Confirmation and tracking information will be sent to your email!
          </p>
          <div className="h-40"></div>
          <div className="flex flex-col items-center justify-center">
            <p className="text-sm font-semibold text-zinc-600">
              Are you a seller too?
            </p>
            <p className="text-sm font-semibold text-zinc-600">
              Check us out here{" "}
              <a href="https://thryftship.com" className="text-[#6366F1]">
                (hyper link)
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

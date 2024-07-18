import Image from "next/image";

export default function Navbar() {
  return (
    <div className="flex-rows flex hidden w-full items-start justify-center gap-8 border-b-2 border-b-border px-14 py-4 md:block">
      <Image
        src="/wordmark.svg"
        alt="Thryft Ship"
        width={196}
        height={66}
        className="mr-auto"
      />
    </div>
  );
}

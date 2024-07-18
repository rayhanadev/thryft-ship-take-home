import {
  ShippingInfoFormDesktop,
  ShippingInfoFormMobile,
} from "components/ShippingInfoForm";

export default function Page() {
  return (
    <>
      <div className="hidden md:block">
        <ShippingInfoDesktop />
      </div>
      <div className="md:hidden">
        <ShippingInfoMobile />
      </div>
    </>
  );
}

function ShippingInfoDesktop() {
  return (
    <div className="mx-auto flex w-[500px] flex-col items-start justify-center gap-8">
      {/* TODO(rayhanadev): insert banner w/ thryfter name here */}
      <div className="pt-40"></div>
      <div className="flex flex-col items-start justify-start gap-2">
        <h1 className="text-xl font-bold leading-normal">
          Your Shipping Information
        </h1>
        <p className="text-sm">
          Your Instagram Handle helps us match your address to your purchase. We
          will send your shipment tracking information to your email.
        </p>
      </div>
      <ShippingInfoFormDesktop />
      <p className="mx-auto font-medium text-zinc-500">
        powered by Thryft Shop
      </p>
    </div>
  );
}

function ShippingInfoMobile() {
  return (
    <div className="mx-auto flex w-full flex-col items-start justify-center gap-8 px-8 pb-8">
      {/* TODO(rayhanadev): insert banner w/ thryfter name here */}
      <div className="pt-40"></div>
      <div className="flex flex-col items-start justify-start gap-2">
        <h1 className="text-xl font-bold leading-normal">
          Your Shipping Information
        </h1>
        <p className="text-sm">
          Your Instagram Handle helps us match your address to your purchase. We
          will send your shipment tracking information to your email.
        </p>
      </div>
      <ShippingInfoFormMobile />
      <p className="mx-auto font-medium text-zinc-500">
        powered by Thryft Shop
      </p>
    </div>
  );
}

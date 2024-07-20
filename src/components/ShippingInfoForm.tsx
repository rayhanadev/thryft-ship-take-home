"use client";
import { Suspense } from "react";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { useSuspenseQuery, type TypedDocumentNode, gql } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronsUpDownIcon } from "lucide-react";
import { useForm, type UseFormReturn } from "react-hook-form";
import { z } from "zod";

import { ProductSelect } from "components/ProductSelect";
import { Button } from "components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "components/ui/form";
import { Input } from "components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "components/ui/select";
import { ABBREVIATIONS_TO_STATES, STATES } from "lib/constants";

const GET_PRODUCTS_QUERY: TypedDocumentNode<{
  getAvailableProducts: Array<{
    id: string;
    name: string;
    price: number;
    image: string;
    variants: Array<{
      id: number;
      name: string;
    }>;
  }>;
}> = gql`
  query GetProductsQuery {
    getAvailableProducts {
      id
      name
      price
      image
      variants {
        id
        name
      }
    }
  }
`;

function ProductsSelectMenu({
  form,
}: {
  form: UseFormReturn<
    z.infer<typeof formSchema>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    any,
    undefined
  >;
}) {
  const { data } = useSuspenseQuery(GET_PRODUCTS_QUERY);

  const options = data.getAvailableProducts.reduce(
    (acc, product) => {
      const variants = product.variants.map((variant) => ({
        value: `${product.id}-${variant.id}`,
        label: (
          <div className="flex flex-row items-start justify-start gap-8">
            <Image
              src={product.image}
              alt={product.name}
              width={60}
              height={60}
            />
            <div className="flex flex-col items-start justify-start">
              <p className="font-semibold">{product.name}</p>
              <p className="text-sm text-zinc-600">{variant.name}</p>
              <p className="text-sm text-zinc-600">${product.price}</p>
            </div>
          </div>
        ),
      }));

      return [...acc, ...variants];
    },
    [] as Array<{ value: string; label: React.ReactNode }>,
  );

  return (
    <FormField
      control={form.control}
      name="products"
      render={({ field }) => (
        <FormItem className="w-full">
          <FormLabel>Products</FormLabel>
          <ProductSelect
            {...field}
            selected={field.value}
            onChange={field.onChange}
            options={options}
            className="sm:w-[510px]"
          />
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

const GET_PRODUCT_BY_ID_QUERY: TypedDocumentNode<{
  getProductById: {
    id: string;
    name: string;
    price: number;
    image: string;
    variants: Array<{
      id: number;
      name: string;
    }>;
  };
}> = gql`
  query GetProductById($id: String!) {
    getProductById(id: $id) {
      id
      name
      price
      image
      variants {
        id
        name
      }
    }
  }
`;

function ProductListItem({ id, variant }: { id: string; variant: number }) {
  const { data } = useSuspenseQuery(GET_PRODUCT_BY_ID_QUERY, {
    variables: { id },
  });

  const product = data.getProductById;

  console.log(product);

  return (
    <div className="flex flex-row items-start justify-start gap-8">
      <Image src={product.image} alt={product.name} width={60} height={60} />
      <div className="flex flex-col items-start justify-start">
        <p className="font-semibold">{product.name}</p>
        {/* TODO: add error handling here */}
        <p className="text-sm text-zinc-600">
          {product.variants.find((v) => v.id === variant)?.name}
        </p>
        <p className="text-sm text-zinc-600">${product.price}</p>
      </div>
    </div>
  );
}

const formSchema = z.object({
  username: z.string(),
  products: z.array(z.string()),
  email: z.string().email(),
  confirmEmail: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
  addressLine1: z.string(),
  addressLine2: z.string().optional(),
  apartmentSuiteEtc: z.string().optional(),
  city: z.string(),
  state: z.string(),
  zipCode: z
    .string()
    .refine((zip) => zip.length === 5, {
      message: "Zip code must be 5 digits",
    })
    .refine((zip) => /^\d+$/.test(zip), {
      message: "Zip code must be a number",
    }),
});

export function ShippingInfoFormDesktop() {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
    defaultValues: {
      products: [],
    },
  });

  function onSubmit(_values: z.infer<typeof formSchema>) {
    // TODO(rayhanadev): in the future some sort of API call could be made here
    void router.push("/confirmed");
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mx-auto flex w-[500px] flex-col items-start justify-center gap-4"
      >
        <div className="flex w-full flex-row items-start justify-between gap-2">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Instagram Handle</FormLabel>
                <FormControl>
                  <Input {...field} required />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Suspense
            fallback={
              <FormItem className="w-full">
                <FormLabel>Products</FormLabel>
                <Button
                  variant="outline"
                  role="combobox"
                  className={`h-9 w-full justify-between`}
                  disabled={true}
                >
                  <div className="flex flex-wrap gap-1">Loading...</div>
                  <ChevronsUpDownIcon className="h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </FormItem>
            }
          >
            <ProductsSelectMenu form={form} />
          </Suspense>
        </div>
        <div className="flex w-full flex-row items-start justify-between gap-2">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} type="email" required />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmEmail"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Confirm Email</FormLabel>
                <FormControl>
                  <Input {...field} type="email" required />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex w-full flex-row items-start justify-between gap-2">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input {...field} required />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input {...field} required />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex w-full flex-col items-start justify-start gap-2">
          <FormField
            control={form.control}
            name="addressLine1"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Address Line 1</FormLabel>
                <FormControl>
                  <Input {...field} required />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="apartmentSuiteEtc"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Apartment, Suite, Etc. (opt)</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex w-full flex-row items-start justify-between gap-2">
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input placeholder="City" {...field} required />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>State</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    required
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="State" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {STATES.map((state) => (
                        <SelectItem key={state.toLowerCase()} value={state}>
                          {state}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="zipCode"
              render={({ field }) => (
                <FormItem className="w-[350px]">
                  <FormLabel>Zip Code</FormLabel>
                  <FormControl>
                    <Input placeholder="XXXXX" {...field} required />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button
              className="mx-auto bg-[#6366F1] px-6 font-semibold text-white hover:bg-[#4b4edd]"
              disabled={!form.formState.isValid}
            >
              Submit
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Shipping Details</DialogTitle>
              <DialogDescription></DialogDescription>
            </DialogHeader>
            <div className="flex flex-row items-start justify-around">
              <div className="flex w-full flex-col items-start justify-start gap-1">
                <p className="text-sm">
                  {form.getValues().firstName} {form.getValues().lastName}
                </p>
                <p className="text-sm">{form.getValues().addressLine1}</p>
                {form.getValues().addressLine2 && (
                  <p className="text-sm">{form.getValues().addressLine2}</p>
                )}
                {form.getValues().apartmentSuiteEtc && (
                  <p className="text-sm">
                    {form.getValues().apartmentSuiteEtc}
                  </p>
                )}
                <p className="text-sm">
                  {form.getValues().city}, {form.getValues().state},{" "}
                  {form.getValues().zipCode}
                </p>
                <p className="text-sm">{form.getValues().email}</p>
              </div>
              <div className="flex w-full flex-col items-start justify-start gap-2">
                {form.getValues().products.map((product) => {
                  const [variantId, ...productIdBits] = product
                    .split("-")
                    .reverse();
                  const productId = productIdBits.reverse().join("-");

                  return (
                    <Suspense
                      key={product}
                      fallback={
                        <div className="flex flex-row items-start justify-start gap-8">
                          <div className="h-16 w-16 animate-pulse bg-gray-200" />
                          <div className="flex flex-col items-start justify-start">
                            <p className="h-4 w-24 animate-pulse bg-gray-200 font-semibold" />
                            <p className="h-4 w-24 animate-pulse bg-gray-200 text-sm" />
                            <p className="h-4 w-24 animate-pulse bg-gray-200 text-sm" />
                          </div>
                        </div>
                      }
                    >
                      <ProductListItem
                        id={productId}
                        variant={parseInt(variantId ?? "0", 10)}
                      />
                    </Suspense>
                  );
                })}
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button
                className="bg-[#6366F1] px-6 font-semibold text-white hover:bg-[#4b4edd]"
                onClick={() => form.handleSubmit(onSubmit)()}
              >
                Confirm
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </form>
    </Form>
  );
}

export function ShippingInfoFormMobile() {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
  });

  const onSubmit = (_values: z.infer<typeof formSchema>) => {
    // TODO(rayhanadev): in the future some sort of API call would be made here
    void router.push("/confirmed");
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mx-auto flex w-full flex-col items-start justify-center gap-2"
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Instagram Handle</FormLabel>
              <FormControl>
                <Input {...field} required />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* TODO(rayhanadev): add packages view */}
        <div className="w-full"></div>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} type="email" required />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmEmail"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Confirm Email</FormLabel>
              <FormControl>
                <Input {...field} type="email" required />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex w-full flex-row items-start justify-between gap-2">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input {...field} required />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input {...field} required />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex w-full flex-col items-start justify-start gap-2">
          <FormField
            control={form.control}
            name="addressLine1"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Address Line 1</FormLabel>
                <FormControl>
                  <Input {...field} required />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="apartmentSuiteEtc"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Apartment, Suite, Etc. (opt)</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex w-full flex-row items-start justify-between gap-2">
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input placeholder="City" {...field} required />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem className="w-[150px]">
                  <FormLabel>State</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    required
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="State" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.entries(ABBREVIATIONS_TO_STATES).map(
                        ([abbreviation, state]) => (
                          <SelectItem key={abbreviation} value={state}>
                            {abbreviation}
                          </SelectItem>
                        ),
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="zipCode"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Zip Code</FormLabel>
                  <FormControl>
                    <Input placeholder="XXXXX" {...field} required />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button
              className="mx-auto mt-2 bg-[#6366F1] px-6 font-semibold text-white hover:bg-[#4b4edd]"
              disabled={!form.formState.isValid}
            >
              Submit
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Shipping Details</DialogTitle>
              <DialogDescription></DialogDescription>
            </DialogHeader>
            <div className="flex w-full flex-col items-start justify-start gap-1">
              <p className="text-sm">
                {form.getValues().firstName} {form.getValues().lastName}
              </p>
              <p className="text-sm">{form.getValues().addressLine1}</p>
              {form.getValues().addressLine2 && (
                <p className="text-sm">{form.getValues().addressLine2}</p>
              )}
              {form.getValues().apartmentSuiteEtc && (
                <p className="text-sm">{form.getValues().apartmentSuiteEtc}</p>
              )}
              <p className="text-sm">
                {form.getValues().city}, {form.getValues().state},{" "}
                {form.getValues().zipCode}
              </p>
              <p className="text-sm">{form.getValues().email}</p>
              {/* TODO: insert products view */}
            </div>
            <DialogFooter className="flex w-full flex-col items-start justify-start gap-2">
              <DialogClose asChild>
                <Button variant="outline" className="w-full">
                  Cancel
                </Button>
              </DialogClose>
              <Button
                className="w-full bg-[#6366F1] px-6 font-semibold text-white hover:bg-[#4b4edd]"
                onClick={() => form.handleSubmit(onSubmit)()}
              >
                Confirm
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </form>
    </Form>
  );
}

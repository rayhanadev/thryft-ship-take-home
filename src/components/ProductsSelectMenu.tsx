import { useState } from "react";

import Image from "next/image";

import { useSuspenseQuery, type TypedDocumentNode, gql } from "@apollo/client";
import { ChevronsUpDown } from "lucide-react";

import { Button } from "components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "components/ui/command";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "components/ui/select";
import { useCartItemsStore } from "stores/cartItems";

type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  variants: Array<{
    id: number;
    name: string;
  }>;
};

const GET_PRODUCTS_QUERY: TypedDocumentNode<{
  getAvailableProducts: Array<Product>;
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

export function ProductsSelectMenu() {
  const { data } = useSuspenseQuery(GET_PRODUCTS_QUERY);

  const options = data.getAvailableProducts;

  return (
    <FormItem className="w-full">
      <FormLabel>Products</FormLabel>
      <ProductSelect options={options} />
      <FormMessage />
    </FormItem>
  );
}

function ProductSelect({ options }: { options: Product[] }) {
  const cartItems = useCartItemsStore((state) => state.cartItems);
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={`h-9 w-full justify-between`}
            onClick={() => setOpen(!open)}
          >
            <div className="flex flex-wrap gap-1">
              {cartItems.length > 0 && (
                <>
                  Selected {cartItems.reduce((acc, i) => acc + i.quantity, 0)}{" "}
                  items
                </>
              )}
            </div>
            <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command className="w-[350px]">
          <CommandInput placeholder="Search..." />
          <CommandList>
            <CommandEmpty>No item found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem key={option.id}>
                  <ProductItem product={option} />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

function ProductItem({ product }: { product: Product }) {
  const cartItems = useCartItemsStore((state) => state.cartItems);
  const setCartItems = useCartItemsStore((state) => state.setCartItemQuantity);
  const [variant, setVariant] = useState(product.variants[0]!.id);
  const [quantity, setQuantity] = useState(
    cartItems.find((item) => item.id === product.id && item.variant === variant)
      ?.quantity ?? 0,
  );

  const changeVariant = (value: string) => {
    setVariant(Number(value));
    setQuantity(
      cartItems.find(
        (item) => item.id === product.id && item.variant === Number(value),
      )?.quantity ?? 0,
    );
  };

  return (
    <div className="flex w-full flex-row items-start justify-start gap-8">
      <div className="flex w-full flex-row items-start justify-start gap-2">
        <Image src={product.image} alt={product.name} width={60} height={60} />
        <div className="flex flex-1 flex-col items-start justify-start gap-2">
          <div className="flex flex-col items-start justify-start gap-1">
            <div className="flex w-full flex-row items-end justify-between gap-2">
              <p className="text-lg font-semibold leading-none">
                {product.name}
              </p>
              <p className="text-zinc-600">${product.price}</p>
            </div>
            <p>consectetur sint elit proident amet incididunt aliqua quis</p>
          </div>
          <div className="flex flex-row items-start justify-start gap-2">
            <Select value={String(variant)} onValueChange={changeVariant}>
              <SelectTrigger className="h-8 w-fit">
                <SelectValue placeholder="Variant" />
              </SelectTrigger>
              <SelectContent>
                {product.variants.map((variant) => (
                  <SelectItem key={variant.id} value={String(variant.id)}>
                    {variant.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              value={String(quantity)}
              defaultValue="0"
              onValueChange={(value) => {
                setQuantity(Number(value));
                setCartItems({ id: product.id, variant }, Number(value));
              }}
            >
              <SelectTrigger className="h-8 w-fit">
                <SelectValue placeholder="Quantity" />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 11 }, (_, i) => i).map((i) => (
                  <SelectItem key={i} value={String(i)}>
                    {String(i)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
}

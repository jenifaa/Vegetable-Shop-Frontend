import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSearchParams } from "react-router";

// ✅ IMPORT YOUR API HOOK
import { useGetAllProductsQuery } from "@/redux/features/Product/product.api";


export default function TourFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  // ✅ FETCH PRODUCT TYPES
  const { data: productTypeData, isLoading: productTypeIsLoading } =
    useGetAllProductsQuery(undefined);

  const selectedProductType =
    searchParams.get("productType") ?? undefined;

const productTypeOptions =
  productTypeData?.map((item) => ({
    label: item.name,
    value: String(item.id),
  })) ?? [];

  const handleProductTypeChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("productType", value);
    setSearchParams(params);
  };

  const handleClearFilter = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("productType");
    setSearchParams(params);
  };

  return (
    <div className="col-span-3 w-full h-[500px] border border-muted rounded-md p-5 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="font-semibold">Filters</h1>
        <Button size="sm" variant="outline" onClick={handleClearFilter}>
          Clear Filter
        </Button>
      </div>

      <div>
        <Label className="mb-2 block">Tour Type</Label>

        <Select
          onValueChange={handleProductTypeChange}
          value={selectedProductType}
          disabled={productTypeIsLoading}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select tour type" />
          </SelectTrigger>

          <SelectContent>
            <SelectGroup>
              <SelectLabel>Product Types</SelectLabel>

              {productTypeOptions.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

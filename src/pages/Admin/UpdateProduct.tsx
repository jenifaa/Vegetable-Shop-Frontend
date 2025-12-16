/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Loader2, ArrowLeft } from "lucide-react";
import {
  useGetProductQuery,
  useUpdateProductMutation,
} from "@/redux/features/Product/product.api";


const categories = ["VEGETABLE", "FRUIT", "SPICE", "GRAIN", "OIL", "OTHER"];
const units = ["KG", "GRAM", "LITER", "PIECE", "PACKET"];


const updateProductSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  category: z.string().min(1, "Category is required"),
  price: z.string().min(1, "Price is required"),
  discountPrice: z.string().optional(),
  unit: z.string().min(1, "Unit is required"),
  stock: z.string().min(1, "Stock is required"),
  image: z.url("Invalid image URL").optional(),
  isAvailable: z.boolean(),
});

type UpdateProductForm = z.infer<typeof updateProductSchema>;

export default function UpdateProduct() {
  const { id } = useParams<{ id: string }>();
  console.log(id)
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

 
  const productId = Number(id);
console.log(productId)

  const {
    data: product,
    isLoading,
    error,
  } = useGetProductQuery(String(productId), {
    skip: !productId,
  });

  const [updateProduct] = useUpdateProductMutation();


  const form = useForm<UpdateProductForm>({
    resolver: zodResolver(updateProductSchema),
    defaultValues: {
      name: "",
      description: "",
      category: "",
      price: "",
      discountPrice: "",
      unit: "",
      stock: "",
      image: "",
      isAvailable: true,
    },
  });

  // ================= RESET FORM =================
  useEffect(() => {
    if (!product) return;

    form.reset({
      name: product.name ?? "",
      description: product.description ?? "",
      category: product.category ?? "",
      price: String(product.price ?? ""),
      discountPrice: String(product.discountPrice ?? ""),
      unit: product.unit ?? "",
      stock: String(product.stock ?? ""),
      image: product.image ?? "",
      isAvailable: product.isAvailable ?? true,
    });
  }, [product, form]);

  // ================= SUBMIT =================
  const onSubmit = async (data: UpdateProductForm) => {
    if (!productId) return toast.error("Invalid product ID");

    setIsSubmitting(true);
    const toastId = toast.loading("Updating product...");

    try {
      await updateProduct({
        id: productId, // ✅ NUMBER
        data, // ✅ STRINGS
      }).unwrap();

      toast.success("Product updated successfully", { id: toastId });
      navigate("/product");
    } catch (err: any) {
      toast.error(err?.data?.message || "Update failed", { id: toastId });
    } finally {
      setIsSubmitting(false);
    }
  };

  // ================= STATES =================
  if (isLoading)
    return (
      <Loader2 className="h-8 w-8 animate-spin mx-auto mt-20 text-green-600" />
    );

  if (error || !product)
    return (
      <div className="text-center mt-20">
        <p className="text-red-600 mb-4">Product not found</p>
        <Button onClick={() => navigate("/product")}>Back</Button>
      </div>
    );

  // ================= UI =================
  return (
    <div className="max-w-3xl mx-auto p-4">
      <Button
        variant="ghost"
        onClick={() => navigate("/product")}
        className="mb-4"
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back
      </Button>

      <Card>
        <CardHeader>
          <CardTitle>Update Product</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <Input {...form.register("name")} placeholder="Product Name" />
            <Textarea
              {...form.register("description")}
              placeholder="Description"
            />

            <Controller
              control={form.control}
              name="category"
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />

            <Input {...form.register("price")} placeholder="Price" />
            <Input
              {...form.register("discountPrice")}
              placeholder="Discount Price"
            />

            <Controller
              control={form.control}
              name="unit"
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Unit" />
                  </SelectTrigger>
                  <SelectContent>
                    {units.map((u) => (
                      <SelectItem key={u} value={u}>
                        {u}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />

            <Input {...form.register("stock")} placeholder="Stock" />
            <Input {...form.register("image")} placeholder="Image URL" />

            <Controller
              control={form.control}
              name="isAvailable"
              render={({ field }) => (
                <div className="flex items-center gap-2">
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                  <span>Available</span>
                </div>
              )}
            />

            <CardFooter className="justify-end gap-2">
              <Button variant="outline" onClick={() => navigate("/product")}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Updating..." : "Update"}
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

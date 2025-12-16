import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,

  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAddProductTypeMutation } from "@/redux/features/Product/product.api";

import { useForm } from "react-hook-form";
import { toast } from "sonner";

export function AddProductTypeModal() {
  const form = useForm();
  const [addProductType] = useAddProductTypeMutation();

  const onSubmit = async (data) => {
    const res = await addProductType({ name: data.name }).unwrap();
    if (res.success) {
      toast.success("Product Type Added");
    }
  };

  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button>Add Product Type</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Product Type</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form id="addProductType" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Type Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Product Type Name"
                        {...field}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" form="add-tour-type">
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
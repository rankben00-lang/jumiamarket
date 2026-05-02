import { ExternalBlob } from "@/backend";
import { createActor } from "@/backend";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { ProductCategory } from "@/types";
import type { ProductId } from "@/types";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ImagePlus, Package, Plus, Trash2, Upload } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";

type ProductStatus = "pending" | "approved" | "rejected";

const STATUS_STYLES: Record<
  ProductStatus,
  { label: string; className: string }
> = {
  pending: {
    label: "Pending Review",
    className: "bg-accent/15 text-accent border-accent/30",
  },
  approved: {
    label: "Approved",
    className: "bg-accent/15 text-accent border-accent/30",
  },
  rejected: {
    label: "Rejected",
    className: "bg-destructive/15 text-destructive border-destructive/30",
  },
};

const CATEGORY_LABELS: Record<ProductCategory, string> = {
  [ProductCategory.Electronics]: "Electronics",
  [ProductCategory.Fashion]: "Fashion",
  [ProductCategory.Home]: "Home & Living",
  [ProductCategory.Beauty]: "Beauty",
  [ProductCategory.Sports]: "Sports",
  [ProductCategory.Books]: "Books",
  [ProductCategory.Others]: "Others",
};

interface AddProductForm {
  title: string;
  description: string;
  price: string;
  category: ProductCategory | "";
  quantity: string;
  imageFile: File | null;
  uploadProgress: number;
}

const EMPTY_FORM: AddProductForm = {
  title: "",
  description: "",
  price: "",
  category: "",
  quantity: "1",
  imageFile: null,
  uploadProgress: 0,
};

export default function SellerProducts() {
  const { actor, isFetching } = useActor(createActor);
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState<AddProductForm>(EMPTY_FORM);

  const { data: products, isLoading } = useQuery({
    queryKey: ["myProducts"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listMyProducts();
    },
    enabled: !!actor && !isFetching,
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: ProductId) => {
      if (!actor) throw new Error("Not connected");
      return actor.deleteMyProduct(id);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["myProducts"] });
      toast.success("Product deleted");
    },
    onError: () => toast.error("Failed to delete product"),
  });

  const addMutation = useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Not connected");
      if (!form.imageFile) throw new Error("Image required");
      if (!form.category) throw new Error("Category required");

      const bytes = new Uint8Array(await form.imageFile.arrayBuffer());
      const blob = ExternalBlob.fromBytes(bytes).withUploadProgress((pct) => {
        setForm((prev) => ({ ...prev, uploadProgress: pct }));
      });

      const priceInCents = BigInt(
        Math.round(Number.parseFloat(form.price) * 100),
      );
      const qty = BigInt(Number.parseInt(form.quantity, 10));

      return actor.addProduct(
        form.title.trim(),
        form.description.trim(),
        priceInCents,
        form.category as ProductCategory,
        blob,
        qty,
      );
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["myProducts"] });
      toast.success("Product submitted for review!");
      setDialogOpen(false);
      setForm(EMPTY_FORM);
    },
    onError: (err) =>
      toast.error(err instanceof Error ? err.message : "Failed to add product"),
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setForm((prev) => ({ ...prev, imageFile: file }));
  };

  const isFormValid =
    form.title.trim() &&
    form.description.trim() &&
    form.price &&
    Number.parseFloat(form.price) > 0 &&
    form.category &&
    form.quantity &&
    Number.parseInt(form.quantity, 10) > 0 &&
    form.imageFile;

  return (
    <div data-ocid="seller_products.page">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display font-bold text-2xl text-foreground">
          My Products
        </h1>
        <Button
          onClick={() => setDialogOpen(true)}
          data-ocid="seller_products.add_product_button"
        >
          <Plus className="mr-2 h-4 w-4" /> Add Product
        </Button>
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3, 4].map((n) => (
            <Skeleton key={n} className="h-20 rounded-xl" />
          ))}
        </div>
      ) : products && products.length > 0 ? (
        <div className="space-y-3" data-ocid="seller_products.list">
          {products.map((product, i) => {
            const rawStatus = String(product.status) as ProductStatus;
            const statusStyle =
              STATUS_STYLES[rawStatus] ?? STATUS_STYLES.pending;
            return (
              <Card
                key={String(product.id)}
                className="p-4 flex items-center gap-4"
                data-ocid={`seller_products.item.${i + 1}`}
              >
                <div className="w-14 h-14 flex-shrink-0 rounded-lg overflow-hidden bg-muted">
                  {product.image.getDirectURL() ? (
                    <img
                      src={product.image.getDirectURL()}
                      alt={product.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Package className="h-5 w-5 text-muted-foreground/40" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-body font-semibold text-sm truncate text-foreground">
                    {product.title}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {CATEGORY_LABELS[product.category] ?? product.category} · $
                    {(Number(product.price) / 100).toFixed(2)} · Qty:{" "}
                    {String(product.quantity)}
                  </p>
                </div>
                <Badge
                  variant="outline"
                  className={`text-xs font-medium ${statusStyle.className}`}
                >
                  {statusStyle.label}
                </Badge>
                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  className="text-destructive hover:text-destructive hover:bg-destructive/10 flex-shrink-0"
                  onClick={() => deleteMutation.mutate(product.id)}
                  disabled={deleteMutation.isPending}
                  data-ocid={`seller_products.delete_button.${i + 1}`}
                  aria-label="Delete product"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </Card>
            );
          })}
        </div>
      ) : (
        <div
          className="flex flex-col items-center justify-center py-20 gap-4"
          data-ocid="seller_products.empty_state"
        >
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
            <Package className="h-8 w-8 text-muted-foreground" />
          </div>
          <div className="text-center">
            <p className="font-display font-semibold text-foreground">
              No products yet
            </p>
            <p className="text-muted-foreground text-sm mt-1">
              Add your first product to start selling.
            </p>
          </div>
          <Button
            onClick={() => setDialogOpen(true)}
            data-ocid="seller_products.empty_add_button"
          >
            <Plus className="mr-2 h-4 w-4" /> Add First Product
          </Button>
        </div>
      )}

      {/* Add Product Dialog */}
      <Dialog
        open={dialogOpen}
        onOpenChange={(open) => {
          if (!addMutation.isPending) {
            setDialogOpen(open);
            if (!open) setForm(EMPTY_FORM);
          }
        }}
      >
        <DialogContent
          className="max-w-lg max-h-[90vh] overflow-y-auto"
          data-ocid="seller_products.add_product_dialog"
        >
          <DialogHeader>
            <DialogTitle className="font-display">Add New Product</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 mt-2">
            {/* Image Upload */}
            <div className="space-y-2">
              <Label>Product Image</Label>
              <button
                type="button"
                className="w-full border-2 border-dashed border-border rounded-xl p-4 flex flex-col items-center gap-2 cursor-pointer hover:border-primary/50 transition-colors"
                onClick={() => fileInputRef.current?.click()}
                data-ocid="seller_products.image_dropzone"
              >
                {form.imageFile ? (
                  <div className="flex items-center gap-2 text-sm text-foreground">
                    <ImagePlus className="h-4 w-4 text-primary" />
                    <span className="truncate max-w-[200px]">
                      {form.imageFile.name}
                    </span>
                  </div>
                ) : (
                  <>
                    <Upload className="h-8 w-8 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      Click to upload product image
                    </p>
                    <p className="text-xs text-muted-foreground/70">
                      JPG, PNG, WEBP up to 10MB
                    </p>
                  </>
                )}
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
                data-ocid="seller_products.image_upload_button"
              />
            </div>

            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="prod-title">Product Title</Label>
              <Input
                id="prod-title"
                placeholder="e.g. Wireless Bluetooth Headphones"
                value={form.title}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, title: e.target.value }))
                }
                data-ocid="seller_products.title_input"
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="prod-desc">Description</Label>
              <Textarea
                id="prod-desc"
                placeholder="Describe your product in detail..."
                rows={3}
                value={form.description}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, description: e.target.value }))
                }
                data-ocid="seller_products.description_textarea"
              />
            </div>

            {/* Price & Quantity */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="prod-price">Price (USD)</Label>
                <Input
                  id="prod-price"
                  type="number"
                  min="0.01"
                  step="0.01"
                  placeholder="0.00"
                  value={form.price}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, price: e.target.value }))
                  }
                  data-ocid="seller_products.price_input"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="prod-qty">Quantity</Label>
                <Input
                  id="prod-qty"
                  type="number"
                  min="1"
                  step="1"
                  placeholder="1"
                  value={form.quantity}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, quantity: e.target.value }))
                  }
                  data-ocid="seller_products.quantity_input"
                />
              </div>
            </div>

            {/* Category */}
            <div className="space-y-2">
              <Label>Category</Label>
              <Select
                value={form.category}
                onValueChange={(val) =>
                  setForm((prev) => ({
                    ...prev,
                    category: val as ProductCategory,
                  }))
                }
              >
                <SelectTrigger data-ocid="seller_products.category_select">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(CATEGORY_LABELS).map(([value, label]) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Upload progress */}
            {addMutation.isPending && form.uploadProgress > 0 && (
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Uploading image...</span>
                  <span>{form.uploadProgress}%</span>
                </div>
                <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary transition-all duration-200"
                    style={{ width: `${form.uploadProgress}%` }}
                  />
                </div>
              </div>
            )}

            <div className="flex gap-3 pt-1">
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={() => {
                  setDialogOpen(false);
                  setForm(EMPTY_FORM);
                }}
                disabled={addMutation.isPending}
                data-ocid="seller_products.cancel_button"
              >
                Cancel
              </Button>
              <Button
                type="button"
                className="flex-1"
                disabled={!isFormValid || addMutation.isPending}
                onClick={() => addMutation.mutate()}
                data-ocid="seller_products.submit_button"
              >
                {addMutation.isPending ? "Submitting..." : "Submit Product"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

import { u as useActor, h as useCart, a as useNavigate, r as reactExports, j as jsxRuntimeExports, I as Input, d as Button, o as LoaderCircle, m as ue, e as createActor } from "./index-Dw05bvFi.js";
import { L as Label } from "./label-BqLxb9Ur.js";
import { S as Separator } from "./separator-BDZfIAub.js";
import { u as useMutation } from "./useMutation-CzIlz-Rh.js";
import { C as CircleCheckBig } from "./circle-check-big-CJbghuv-.js";
import { S as ShoppingBag } from "./shopping-bag-D8J0PwgR.js";
import "./index-CyJsTEJN.js";
function Checkout() {
  const { actor } = useActor(createActor);
  const { items, total, clearCart } = useCart();
  const navigate = useNavigate();
  const [street, setStreet] = reactExports.useState("");
  const [city, setCity] = reactExports.useState("");
  const [state, setState] = reactExports.useState("");
  const [country, setCountry] = reactExports.useState("");
  const [name, setName] = reactExports.useState("");
  const mutation = useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Not connected");
      const orderItems = items.map((i) => ({
        productId: i.product.id,
        quantity: BigInt(i.quantity),
        priceSnapshot: i.product.price
      }));
      const deliveryAddress = `${name}, ${street}, ${city}, ${state}, ${country}`;
      return actor.placeOrder(orderItems, deliveryAddress);
    },
    onSuccess: () => {
      clearCart();
      ue.success(
        "Order placed successfully! We'll notify you when it ships."
      );
      void navigate({ to: "/account/orders" });
    },
    onError: () => {
      ue.error("Failed to place order. Please try again.");
    }
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !street.trim() || !city.trim() || !state.trim() || !country.trim()) {
      ue.error("Please fill in all delivery fields");
      return;
    }
    mutation.mutate();
  };
  const isDisabled = mutation.isPending;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "checkout.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-2xl text-foreground mb-6", children: "Checkout" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-5 gap-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "md:col-span-3 space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-lg mb-5 text-foreground", children: "Delivery Information" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("fieldset", { disabled: isDisabled, className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "name", children: "Full Name" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "name",
                  value: name,
                  onChange: (e) => setName(e.target.value),
                  placeholder: "John Doe",
                  required: true,
                  className: "mt-1",
                  "data-ocid": "checkout.name_input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "street", children: "Street Address" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "street",
                  value: street,
                  onChange: (e) => setStreet(e.target.value),
                  placeholder: "123 Main Street",
                  required: true,
                  className: "mt-1",
                  "data-ocid": "checkout.street_input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "city", children: "City" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "city",
                    value: city,
                    onChange: (e) => setCity(e.target.value),
                    placeholder: "Lagos",
                    required: true,
                    className: "mt-1",
                    "data-ocid": "checkout.city_input"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "state", children: "State / Province" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "state",
                    value: state,
                    onChange: (e) => setState(e.target.value),
                    placeholder: "Lagos State",
                    required: true,
                    className: "mt-1",
                    "data-ocid": "checkout.state_input"
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "country", children: "Country" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "country",
                  value: country,
                  onChange: (e) => setCountry(e.target.value),
                  placeholder: "Nigeria",
                  required: true,
                  className: "mt-1",
                  "data-ocid": "checkout.country_input"
                }
              )
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "submit",
            className: "w-full",
            disabled: isDisabled,
            "data-ocid": "checkout.submit_button",
            children: isDisabled ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }),
              " Placing order…"
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "mr-2 h-4 w-4" }),
              " Place Order — $",
              (Number(total) / 100).toFixed(2)
            ] })
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "md:col-span-2 bg-card border border-border rounded-xl p-6 h-fit sticky top-4",
          "data-ocid": "checkout.summary",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-lg mb-4 text-foreground", children: "Order Summary" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: items.map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex items-start gap-3",
                "data-ocid": `checkout.item.${i + 1}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-md overflow-hidden bg-muted flex-shrink-0", children: item.product.image.getDirectURL() ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "img",
                    {
                      src: item.product.image.getDirectURL(),
                      alt: item.product.title,
                      className: "w-full h-full object-cover"
                    }
                  ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "h-3 w-3 text-muted-foreground/40" }) }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground truncate", children: item.product.title }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                      "Qty: ",
                      item.quantity
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-semibold flex-shrink-0", children: [
                    "$",
                    (Number(item.product.price * BigInt(item.quantity)) / 100).toFixed(2)
                  ] })
                ]
              },
              String(item.product.id)
            )) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "my-4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Subtotal" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium", children: [
                  "$",
                  (Number(total) / 100).toFixed(2)
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Shipping" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-accent font-medium", children: "Free" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "my-4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between font-display font-bold text-lg", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Total" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-primary", children: [
                "$",
                (Number(total) / 100).toFixed(2)
              ] })
            ] })
          ]
        }
      )
    ] })
  ] });
}
export {
  Checkout as default
};

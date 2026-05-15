import { V as reactExports, L as jsxRuntimeExports } from "./server-CzXKlo6r.mjs";
import { u as useNavigate } from "./router-CEII4GLB.mjs";
import { s as supabase } from "./client-DggGYQah.mjs";
import { L as Label, I as Input, B as Button, T as Toaster2, t as toast } from "./sonner-fsS-u0Fd.mjs";
import { C as Card, c as CardHeader, d as CardTitle, b as CardDescription, a as CardContent } from "./card-Da6fyZn3.mjs";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./index-B6C1Fcum.mjs";
import "./utils-8RO4xBwZ.mjs";
function AuthPage() {
  const [email, setEmail] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [isLoading, setIsLoading] = reactExports.useState(false);
  const navigate = useNavigate();
  reactExports.useEffect(() => {
    supabase.auth.getSession().then(({
      data: {
        session
      }
    }) => {
      if (session) {
        navigate({
          to: "/dashboard"
        });
      }
    });
  }, [navigate]);
  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const {
        error
      } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      if (error) throw error;
      toast.success("Connexion réussie");
      navigate({
        to: "/dashboard"
      });
    } catch (error) {
      toast.error(error.message || "Erreur de connexion");
    } finally {
      setIsLoading(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen flex items-center justify-center bg-background p-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "w-full max-w-md border-primary/20 bg-primary/5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "space-y-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-2xl font-display text-center", children: "Administration" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { className: "text-center", children: "Connectez-vous pour accéder au tableau de bord" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleLogin, className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "email", children: "Email" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "email", type: "email", placeholder: "admin@example.com", value: email, onChange: (e) => setEmail(e.target.value), required: true })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "password", children: "Mot de passe" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "password", type: "password", value: password, onChange: (e) => setPassword(e.target.value), required: true })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", className: "w-full bg-primary", disabled: isLoading, children: isLoading ? "Connexion..." : "Se connecter" })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Toaster2, {})
  ] });
}
export {
  AuthPage as component
};

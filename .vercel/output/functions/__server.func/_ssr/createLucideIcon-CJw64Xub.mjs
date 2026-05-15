import { a7 as useRouter, V as reactExports, I as isRedirect, i as createServerFn, T as TSS_SERVER_FUNCTION, y as getServerFnById } from "./server-CzXKlo6r.mjs";
import { o as objectType, s as stringType, r as requireSupabaseAuth, b as booleanType } from "./auth-middleware-2Bf0Gn5a.mjs";
function useServerFn(serverFn) {
  const router = useRouter();
  return reactExports.useCallback(async (...args) => {
    try {
      const res = await serverFn(...args);
      if (isRedirect(res)) throw res;
      return res;
    } catch (err) {
      if (isRedirect(err)) {
        err.options._fromLocation = router.stores.location.get();
        return router.navigate(router.resolveRedirect(err).options);
      }
      throw err;
    }
  }, [router, serverFn]);
}
var createSsrRpc = (functionId) => {
  const url = "/_serverFn/" + functionId;
  const serverFnMeta = { id: functionId };
  const fn = async (...args) => {
    return (await getServerFnById(functionId))(...args);
  };
  return Object.assign(fn, {
    url,
    serverFnMeta,
    [TSS_SERVER_FUNCTION]: true
  });
};
const rateLimitMap = /* @__PURE__ */ new Map();
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of rateLimitMap) {
    if (now > entry.resetAt) rateLimitMap.delete(key);
  }
}, 3e5);
const SpinSchema = objectType({
  prenom: stringType().trim().min(1).max(100),
  nom: stringType().trim().min(1).max(100),
  email: stringType().trim().email().max(255),
  tel: stringType().trim().min(1).max(40),
  boutique: stringType().trim().min(1).max(100),
  prize: stringType().trim().min(1).max(200),
  win: booleanType()
});
const recordSpin = createServerFn({
  method: "POST"
}).inputValidator((input) => SpinSchema.omit({
  prize: true,
  win: true,
  boutique: true
}).parse(input)).handler(createSsrRpc("97f814ff3f671888817aa959f6a2758ea0f10256f5d9784b036dc6ad34b7d412"));
const checkExisting = createServerFn({
  method: "POST"
}).inputValidator((input) => objectType({
  email: stringType().email(),
  tel: stringType()
}).parse(input)).handler(createSsrRpc("7b9fd446ea00b90d633d202dbd634ccf4cebde29d2733d54ac586ab6c0fb173b"));
const getDashboardData = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(createSsrRpc("0b4255764242db65722e1fc1ee4f3c1f979640a26d3ac0148cc746bdc4a422c2"));
const resetGame = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).handler(createSsrRpc("d5188315c4ba6fd5c7defb7147cb8e8dbd7d9f8e2fd629a0d1d61ff7c6124682"));
const mergeClasses = (...classes) => classes.filter((className, index, array) => {
  return Boolean(className) && className.trim() !== "" && array.indexOf(className) === index;
}).join(" ").trim();
const toKebabCase = (string) => string.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
const toCamelCase = (string) => string.replace(
  /^([A-Z])|[\s-_]+(\w)/g,
  (match, p1, p2) => p2 ? p2.toUpperCase() : p1.toLowerCase()
);
const toPascalCase = (string) => {
  const camelCase = toCamelCase(string);
  return camelCase.charAt(0).toUpperCase() + camelCase.slice(1);
};
var defaultAttributes = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};
const hasA11yProp = (props) => {
  for (const prop in props) {
    if (prop.startsWith("aria-") || prop === "role" || prop === "title") {
      return true;
    }
  }
  return false;
};
const Icon = reactExports.forwardRef(
  ({
    color = "currentColor",
    size = 24,
    strokeWidth = 2,
    absoluteStrokeWidth,
    className = "",
    children,
    iconNode,
    ...rest
  }, ref) => reactExports.createElement(
    "svg",
    {
      ref,
      ...defaultAttributes,
      width: size,
      height: size,
      stroke: color,
      strokeWidth: absoluteStrokeWidth ? Number(strokeWidth) * 24 / Number(size) : strokeWidth,
      className: mergeClasses("lucide", className),
      ...!children && !hasA11yProp(rest) && { "aria-hidden": "true" },
      ...rest
    },
    [
      ...iconNode.map(([tag, attrs]) => reactExports.createElement(tag, attrs)),
      ...Array.isArray(children) ? children : [children]
    ]
  )
);
const createLucideIcon = (iconName, iconNode) => {
  const Component = reactExports.forwardRef(
    ({ className, ...props }, ref) => reactExports.createElement(Icon, {
      ref,
      iconNode,
      className: mergeClasses(
        `lucide-${toKebabCase(toPascalCase(iconName))}`,
        `lucide-${iconName}`,
        className
      ),
      ...props
    })
  );
  Component.displayName = toPascalCase(iconName);
  return Component;
};
export {
  createLucideIcon as a,
  resetGame as b,
  checkExisting as c,
  getDashboardData as g,
  recordSpin as r,
  useServerFn as u
};

let Keys;

if (process.env.NODE_ENV === "production") {
  const prodKeys = await import("./prod.js");
  Keys = prodKeys.default;
} else {
  const devKeys = await import("./dev.js");
  Keys = devKeys.default;
}

export default Keys;

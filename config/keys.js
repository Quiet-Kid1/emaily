import devKeys from "./dev.js";
import prodKeys from "./prod.js";

let Keys;

if (process.env.NODE_ENV === "production") {
  Keys = prodKeys;
} else {
  Keys = devKeys;
}

export default Keys;

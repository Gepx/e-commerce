import github from "./provider/github.js";
import google from "./provider/google.js";

const providers = new Map();

providers.set("github", github);
providers.set("google", google);

export default providers;

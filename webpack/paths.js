const path = require("path");

const CONTEXT_PATH = path.join(__dirname, "..");
const SOURCE_ROOT_PATH = path.join(CONTEXT_PATH, "./src");
const APP_INDEX_FILE = path.join(SOURCE_ROOT_PATH, "./app/index.tsx");
const CLIENT_ENTRY_FILE = path.join(SOURCE_ROOT_PATH, "./app-client.tsx");
const SERVER_ENTRY_FILE = path.join(SOURCE_ROOT_PATH, "./api-server.tsx");
const GLOBAL_STYLE_FILE = path.join(SOURCE_ROOT_PATH, "./app/styles/index.scss");
const TYPINGS_DIR = path.join(SOURCE_ROOT_PATH, "./@types");

const OUTPUT_ROOT = path.join(CONTEXT_PATH, "./bundles");
const SERVER_OUTPUT_PATH = path.join(OUTPUT_ROOT, "./server");
const CLIENT_OUTPUT_PATH = path.join(OUTPUT_ROOT, "./client");
const PUBLIC_PATH = "/assets/";

const REACT_LOADABLE_STATS_PATH = path.join(OUTPUT_ROOT, "./stats.react-loadable.json");
const PUBLIC_STYLE_FILE = path.resolve(SERVER_OUTPUT_PATH, path.join(CLIENT_OUTPUT_PATH, "styles.css"));

module.exports = {
	CONTEXT_PATH,
	SOURCE_ROOT_PATH,
	APP_INDEX_FILE,
	CLIENT_ENTRY_FILE,
	SERVER_ENTRY_FILE,
	GLOBAL_STYLE_FILE,
	SERVER_OUTPUT_PATH,
	CLIENT_OUTPUT_PATH,
	PUBLIC_PATH,
	PUBLIC_STYLE_FILE,
	REACT_LOADABLE_STATS_PATH,
};
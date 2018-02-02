const path = require("path");

const SOURCE_ROOT = path.join(__dirname, "../src");
const CLIENT_ENTRY_FILE = path.join(__dirname, "../src/app-client.tsx");
const SERVER_ENTRY_FILE = path.join(__dirname, "../src/api-server.tsx");
const GLOBAL_STYLE_FILE = path.join(__dirname, "../src/app/styles/index.scss");
const TYPINGS_DIR = path.join(__dirname, "../src/@types");

const SERVER_OUTPUT_PATH = path.join(__dirname, "../bundles/server");
const CLIENT_OUTPUT_PATH = path.join(__dirname, "../bundles/client");
const PUBLIC_PATH = "/assets/";

const REACT_LOADABLE_STATS_PATH = path.join(SERVER_OUTPUT_PATH, "./react-loadable.json");
const PUBLIC_STYLE_FILE = path.resolve(SERVER_OUTPUT_PATH, path.join(CLIENT_OUTPUT_PATH, "styles.css"));

module.exports = {
	SOURCE_ROOT,
	CLIENT_ENTRY_FILE,
	SERVER_ENTRY_FILE,
	GLOBAL_STYLE_FILE,
	SERVER_OUTPUT_PATH,
	CLIENT_OUTPUT_PATH,
	PUBLIC_PATH,
	PUBLIC_STYLE_FILE,
	REACT_LOADABLE_STATS_PATH,
};
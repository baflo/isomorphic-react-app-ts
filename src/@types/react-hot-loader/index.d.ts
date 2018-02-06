declare module "react-hot-loader" {
	import React from "react";

	interface ReactHotLoader {
		hot(module: NodeModule): <P>(comp: React.ComponentType<P>) => React.ComponentType<P>;
	}

	export default ReactHotLoader;
}
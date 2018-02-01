declare const GLOBAL_ASSETS_PATH: string;
declare const GLOBAL_SSR_ENABLED: boolean;

declare module "*.css" {
    const result: {
		[name: string]: string;
	};
    export = result;
}

declare module "*.scss" {
    const result: {
		[name: string]: string;
	};
    export = result;
}

declare module "*.png" {
	const fn: string;
	export = fn;
}

declare module "*.jpg" {
	const fn: string;
	export = fn;
}

declare module "*.jpeg" {
	const fn: string;
	export = fn;
}

declare module "*.gif" {
	const fn: string;
	export = fn;
}

declare module "*.svg" {
	const fn: string;
	export = fn;
}

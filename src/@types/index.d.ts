declare const CONTEXT_PATH: string;
declare const SOURCE_ROOT_PATH: string;
declare const PUBLIC_PATH: string;
declare const REACT_LOADABLE_STATS_PATH: string;
declare const GLOBAL_ASSETS_PATH: string;
declare const GLOBAL_SSR_ENABLED: boolean;

interface NodeModule {
	hot?: {
		accept(): void;
		accept(path: string | string[], cb?: () => void): void;
	}
}

interface IResponsiveImageProps {
	src: string,
	images: { height: number, width: number, path: string }[],
	srcSet: string,
	placeholder?: string,
	height: number,
	width: number,
}

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
	const fn: string & IResponsiveImageProps;
	export = fn;
}

declare module "*.jpg" {
	const fn: string & IResponsiveImageProps;
	export = fn;
}

declare module "*.jpeg" {
	const fn: string & IResponsiveImageProps;
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

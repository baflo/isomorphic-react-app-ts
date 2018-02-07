declare module "react-loadable/webpack" {
    export function getBundles(stats: {}, modules: string[]): Array<{
        id: string;
        name: string;
        file: string;
    }>;
}
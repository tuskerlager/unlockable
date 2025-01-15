declare module "*.jsonc" {
    const value: {
        browsers: {
            [key: string]: {
                description: string;
                property?: boolean;
                action?: string[];
                [key: string]: any;
            }
        }
        [key: string]: any;
    };
    export default value;
}
export interface HashStrategy {
    hash(value: string): Promise<string>;
}
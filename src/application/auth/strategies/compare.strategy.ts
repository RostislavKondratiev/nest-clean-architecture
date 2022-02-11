export interface CompareStrategy {
    compare(given: string, expected: string): Promise<boolean>;
}
export interface BaseRepository<T> {
    insert(payload: T): Promise<T>;
    findAll(): Promise<T[]>;
    findById(id: string): Promise<T>;
    update(id: string, content: T): Promise<T>;
    partialUpdate(id: string, content: Partial<T>): Promise<Partial<T>>;
    deleteById(id: string): Promise<T>;
}

export interface LocalForageWithDbInfo<T> {
    _dbInfo: LocalForageDbInfo<T>;
}

export interface LocalForageDbInfo<T> {
    db: T;
    store: string;
    storeName: string;
}

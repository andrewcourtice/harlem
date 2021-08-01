export type StorageType = 'local' | 'session';
export type StorageMap = Record<StorageType, Storage>;

export interface Options {
    type: StorageType;
    prefix: string;
    sync: boolean;
}
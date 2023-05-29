import { openDB, DBSchema, IDBPDatabase } from 'idb';
import { Record } from "../shared/RecordType";

interface MyDB extends DBSchema {
    'my-store': {
        key: number;
        value: Record;
        indexes: { 'by-text': string };
    };
}

const DB_NAME = 'my-database';
const DB_VERSION = 1;
const STORE_NAME = 'my-store';

export async function initDB(): Promise<IDBPDatabase<MyDB>> {
    return openDB<MyDB>(DB_NAME, DB_VERSION, {
        upgrade(db) {
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                const store = db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
                store.createIndex('by-text', 'text', { unique: false });
            }
        },
    });
}

export async function addRecord(record: Record): Promise<void> {
    const db = await initDB();
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    await store.add(record);
    await tx.done;
}

export async function deleteRecord(id: number): Promise<void> {
    const db = await initDB();
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    await store.delete(id);
    await tx.done;
}

export async function getAllRecords(): Promise<Record[]> {
    const db = await initDB();
    const tx = db.transaction(STORE_NAME, 'readonly');
    const store = tx.objectStore(STORE_NAME);
    return store.getAll();
}

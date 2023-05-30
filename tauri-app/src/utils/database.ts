import { openDB, DBSchema, IDBPDatabase } from 'idb'
import { RecordType } from '@/shared/RecordType'

const DB_NAME = 'my-database'
const STORE_NAME = 'my-store'
const DB_VERSION = 1

interface MyDB extends DBSchema {
  [STORE_NAME]: {
    key: number
    value: RecordType
  }
}

export async function initDB(): Promise<IDBPDatabase<MyDB>> {
  return openDB<MyDB>(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true })
      }
    },
  })
}

export async function addRecord(record: RecordType): Promise<void> {
  const db = await initDB()
  const tx = db.transaction(STORE_NAME, 'readwrite')
  const store = tx.objectStore(STORE_NAME)
  await store.add(record)
}

export async function deleteRecord(id: number): Promise<void> {
  const db = await initDB()
  const tx = db.transaction(STORE_NAME, 'readwrite')
  const store = tx.objectStore(STORE_NAME)
  await store.delete(id)
}

export async function getAllRecords(): Promise<RecordType[]> {
  const db = await initDB()
  const tx = db.transaction(STORE_NAME, 'readonly')
  const store = tx.objectStore(STORE_NAME)
  return store.getAll()
}

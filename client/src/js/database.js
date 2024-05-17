import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  try {
    const db = await initdb()// target the jate database => version 1
    const tx = db.transaction('jate', 'readwrite')
    const store = tx.objectStore('jate')//store jate's object store
    await store.put({
      id: 1,
      content: content
    })//put the content 
    await tx.done//.done needs to resolve
  } catch (err) { console.error('putDb not implemented'); }
}





// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  try {
    //get all database
    const db = await initdb()
    const tx = db.transaction('jate', 'readonly')
    const store = tx.objectStore('jate')
    const data = await store.get(1)
    return data?.content







  } catch (error) {
    console.log(error)
    console.error('getDb not implemented');
  }
}

initdb();

import SQLite, { SQLiteDatabase } from 'react-native-sqlite-storage';
import { ScheduleItem } from '../types/ScheduleTypes'; // Assuming ScheduleItem is defined here

const database_name = "MyAppData.db";
const database_version = "1.0";
const database_displayname = "My App Database";
const database_size = 200000; // in bytes

let db: SQLiteDatabase | null = null; // Use SQLiteDatabase type

export const openDatabase = () => {
  return new Promise<SQLiteDatabase>((resolve, reject) => {
    SQLite.openDatabase(
      database_name,
      database_version,
      database_displayname,
      database_size,
      (openedDb) => {
        db = openedDb;
        console.log("Database opened successfully");
        resolve(openedDb);
      },
      (error) => {
        console.error("Error opening database:", error);
        reject(error);
      }
    );
  });
};

export const createTables = (db: SQLiteDatabase) => {
  return new Promise<void>((resolve, reject) => {
    db.transaction((tx) => {
      // Create Schedule Items table
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS schedule_items (id TEXT PRIMARY KEY, time TEXT, activity TEXT, icon TEXT, color TEXT, isCompleted INTEGER);',
        [],
        () => console.log('Schedule items table created successfully'),
        (error) => console.error('Error creating schedule items table:', error)
      );

      // Create Mood Entries table
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS mood_entries (id TEXT PRIMARY KEY, mood INTEGER, timestamp TEXT, notes TEXT);',
        [],
        () => console.log('Mood entries table created successfully'),
        (error) => console.error('Error creating mood entries table:', error)
      );

      // Create User Settings table (example - single row)
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS user_settings (id INTEGER PRIMARY KEY CHECK (id = 1), theme TEXT, notificationsEnabled INTEGER);',
        [],
        () => console.log('User settings table created successfully'),
        (error) => console.error('Error creating user settings table:', error)
      );

      // Add more CREATE TABLE statements for other data types (game progress, relationships)
      // Example for Game Progress (you'll need to define your GameProgress structure)
      // tx.executeSql(
      //   'CREATE TABLE IF NOT EXISTS game_progress (gameName TEXT PRIMARY KEY, score INTEGER, level INTEGER, completed INTEGER);',
      //   [],
      //   () => console.log('Game progress table created successfully'),
      //   (error) => console.error('Error creating game progress table:', error)
      // );


    }, (error) => {
      console.error("Transaction error:", error);
      reject(error);
    }, () => {
      console.log("Tables created successfully");
      resolve();
    });
  });
};

// You will add your CRUD functions (add, get, update, delete) here later
// Example (will need implementation):
// export const addScheduleItemToDb = (item: ScheduleItem) => { ... };
// export const getScheduleItemsFromDb = () => { ... };
// export const updateScheduleItemInDb = (item: ScheduleItem) => { ... };
// export const deleteScheduleItemFromDb = (id: string) => { ... };

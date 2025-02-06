import sqlite3 from "sqlite3";

const database = new sqlite3.Database(":memory:");

database.serialize(() => {
    database.run(`
        CREATE TABLE products (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name COLLATE NOCASE NOT NULL,
            price REAL NOT NULL,
            category TEXT NOT NULL
        )`);

    database.run(`
        INSERT INTO products (name, price, category) VALUES
            ('Notebook', 2000, 'Computers'),
            ('Smartphone', 1500, 'Computers'),
            ('Tablet', 1000, 'Computers'),
            ('Monitor', 800, 'Computers'),
            ('Keyboard', 50, 'Computers'),
            ('Mouse', 30, 'Computers'),
            ('Headphones', 100, 'Computers'),
            ('Laptop', 2500, 'Computers'),
            ('Printer', 300, 'Computers'),
            ('Scanner', 200, 'Computers'),
            ('Camera', 500, 'Computers'),
            ('TV', 3000, 'Electronics'),
            ('Radio', 100, 'Electronics'),
            ('Microphone', 50, 'Electronics'),
            ('Speaker', 80, 'Electronics'),
            ('Headset', 30, 'Electronics'),
            ('Phone', 1000, 'Electronics'),
            ('Watch', 300, 'Electronics');
    `);
});

export default database;

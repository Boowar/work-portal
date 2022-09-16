const express = require("express");
const passport = require("passport");
const LocalStrategy = require('passport-local');
const crypto = require("crypto");
const path = require("path");
const sqlite3 = require("sqlite3").verbose();
const cors = require('cors');
const bodyParser = require('body-parser');

// Creating the Express server
const app = express();
const PORT = process.env.PORT || 3001

app.use(cors());
app.use(bodyParser.json());
//app.use(express.json());

// Connection to the SQlite database
const db_name = path.join(__dirname, "data", "apptest.db");
const db = new sqlite3.Database(db_name, err => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Successful connection to the database 'apptest.db'");
});

// Creating the Items table (Item_ID, Item_Name, Item_count)
const sql_create_table_items = `CREATE TABLE IF NOT EXISTS Items (
  Item_ID INTEGER PRIMARY KEY AUTOINCREMENT,
  Item_Name VARCHAR(100) NOT NULL
);`
const sql_create_table_CountTransaction = `CREATE TABLE IF NOT EXISTS CountTransaction (
  CountTransaction_ID INTEGER PRIMARY KEY AUTOINCREMENT,
  CountTransaction_ID_Client INTEGER NOT NULL,
  CountTransaction_Count INTEGER NOT NULL,
  CountTransaction_Date DATETIME NOT NULL
)`;

const sql_create_table_users = `CREATE TABLE IF NOT EXISTS Users (
  User_ID INTEGER PRIMARY KEY AUTOINCREMENT,
  User_UserName VARCHAR(12) NOT NULL,
  User_Password VARCHAR(12) NOT NULL,
  User_Email VARCHAR(30) NOT NULL,
  User_Role VARCHAR(12) NOT NULL,
  User_Salt TEXT
)`;

db.run(sql_create_table_users, err => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Successful creation of the 'Users' table");
  
  // Database seeding
  const sql_insert_Items = `INSERT INTO Users (User_ID, User_UserName, User_Password, User_Email, User_Role) VALUES
  (1, 'Admin', '1234', 'admin@mail.ru', 'Admin'),
  (2, 'User', '4321', 'user@mail.ru', 'User');`
  
  db.run(sql_insert_Items, err => {
    if (err) {
      return console.error(err.message);
    }
    console.log("Successful insert into Items");
  });
});

db.run(sql_create_table_items, err => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Successful creation of the 'Items' table");
  
  // Database seeding
  const sql_insert_Items = `INSERT INTO Items (Item_ID, Item_Name) VALUES
  (1, 'Поликлиника 324 кабинет'),
  (2, 'Статистика'),
  (3, 'Поликлиника 322'),
  (4, 'Поликлиника 104'),
  (5, 'Поликлиника 414'),
  (6, 'Выездная Диагностика'),
  (7, 'Поликлиника Статистика'),
  (8, 'Радь'),
  (9, 'Маевская'),
  (10, 'Комарова'),
  (11, 'Бак Лаборатория'),
  (12, 'Великий'),
  (13, 'Поликлиника 425 кабинет');`
  
  db.run(sql_insert_Items, err => {
    if (err) {
      return console.error(err.message);
    }
    console.log("Successful insert into Items");
  });
});
  db.run(sql_create_table_CountTransaction, err => {
    if (err) {
      return console.error(err.message);
    }
    console.log("Successful creation of the 'CountTransaction' table");
  

  const sql_insert_CountTransaction = `INSERT INTO CountTransaction 
  (CountTransaction_ID, CountTransaction_ID_Client, CountTransaction_Count, CountTransaction_Date) VALUES
  (1, 1,  9, '2022-08-25 01:01:01'),
  (2, 2, 12, '2022-08-25 01:01:01'),
  (3, 3, 1, '2022-08-25 01:01:01'),
  (4, 4, 2, '2022-08-25 01:01:01'),
  (5, 5, 3, '2022-08-25 01:01:01'),
  (6, 6, 4, '2022-08-25 01:01:01'),
  (7, 7, 2, '2022-08-25 01:01:01'),
  (8, 8, 3, '2022-08-25 01:01:01'),
  (9, 9, 1, '2022-08-25 01:01:01'),
  (10, 10, 1, '2022-08-25 01:01:01'),
  (11, 11, 2, '2022-08-25 01:01:01'),
  (12, 12, 5, '2022-08-25 01:01:01'),
  (13, 13, 7, '2022-08-25 01:01:01');`;

  db.run(sql_insert_CountTransaction, err => {
    if (err) {
      return console.error(err.message);
    }
    console.log("Successful insert into CountTransaction");
  });
});

// GET /
app.get("/", (req, res) =>  {
  res.json({ message:"ok"})
});

// GET /items
app.get("/items", (req, res) => {
  const sql = "SELECT MAX(CountTransaction.CountTransaction_ID), Items.Item_ID, Items.Item_Name, CountTransaction.CountTransaction_Count as Item_Count  FROM Items, CountTransaction WHERE Items.Item_ID = CountTransaction_ID_Client GROUP BY CountTransaction.CountTransaction_ID_Client";
  db.all(sql, [], (err, rows) => {
    if (err) {
      return console.error(err.message);
    }
    res.json({ items: rows });
  });
});

// GET получить список всех транзакций клиента /item/:id
app.get("/item/:id", (req, res) => {
  //const sql = "SELECT * FROM Items WHERE Item_ID = ?";
  const sql = "SELECT Items.Item_ID, Items.Item_Name, CountTransaction.CountTransaction_Count as Item_Count FROM Items, CountTransaction WHERE Items.Item_ID = ? AND CountTransaction.CountTransaction_ID_Client = ?";
  const id = req.params.id
  console.log("id: ", id)
  db.all(sql, [id, id], (err, rows) => {
    if (err) {
      return console.error(err.message);
    }
    res.json({ item: rows });
  });
});

// POST /add_item
app.post("/add_item/", (req, res) => {
  const sql_insert_Items = "INSERT INTO Items (Item_Name) VALUES (?)";
  const sql_insert_CountTransaction = "INSERT INTO CountTransaction (CountTransaction_ID_Client, CountTransaction_Count, CountTransaction_Date) VALUES ((SELECT Item_ID FROM Items WHERE Items.Item_Name = ?), 0, strftime('%Y-%m-%d %H:%M:%S','now'))";
  const item = req.body.Item_Name
  console.log("item",item)
  db.run(sql_insert_Items, item, (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log("sql_insert_Items")
    console.log("req.body", req.body)
    
    db.run(sql_insert_CountTransaction, item, (err) => {
      if (err) {
        return console.error(err.message);
      }
      console.log("sql_insert_CountTransaction")
      console.log("req.body", req.body)
      //res.send({data: `POST ${req.body}`})
    });
    //res.send({data: `POST ${req.body}`})

  });
});

// POST /del_item
app.post("/del_item/:id", (req, res) => {
  const sql = "DELETE FROM Items WHERE Item_ID = ?";
  const id = req.params.id
  console.log("id: ", id)
  db.all(sql, id, (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log("deleted")
    console.log("req.body", req.body)
    console.log("req.body.id", req.body.id)
    console.log("req.params", req.params)
    console.log("req.params.id", req.params.id)
    res.send({data: `POST ${req.params.id}`})
  });
});

// POST /update_item_count
app.post("/update_item_count/:id", (req, res) => {
  const sql = "INSERT INTO CountTransaction (CountTransaction_ID_Client, CountTransaction_Count, CountTransaction_Date) VALUES (?, ?, strftime('%Y-%m-%d %H:%M:%S','now'))";
  const id = req.params.id
  const item = [id, req.body.Item_Count]
  console.log("item",item)
  db.run(sql, item, (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log("req.body", req.body)
    console.log("req.body.id", req.body.id)
    console.log("req.params", req.params)
    console.log("req.params.id", req.params.id)
    res.send({data: `POST ${req.params.id}`})
  });
});

// POST /update_item_name
app.post("/update_item_name/:id", (req, res) => {
  const sql = "UPDATE Items SET Item_Name = ? WHERE (Item_ID = ?)";
  const id = req.params.id
  const item = [req.body.Item_Name, id]
  console.log("item",item)
  db.all(sql, item, (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log("req.body", req.body)
    console.log("req.body.id", req.body.id)
    console.log("req.params", req.params)
    console.log("req.params.id", req.params.id)
    res.send({data: `POST ${req.params.name}`})
  });
});

// POST /signup
app.post("/signup/", (req, res) => {
  const sql_insert_Users = "INSERT INTO Users (User_UserName, User_Password, User_Email, User_Role) VALUES (?, ?, ?, 'User')";
  const user = [req.body.User_Name, req.body.User_Password, req.body.User_Email]  
  console.log("user",user)
  db.run(sql_insert_Users, user, (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log("sql_insert_Users")
    console.log("req.body", req.body)
    res.send({data: `POST ${req.body}`})
  });
});

// POST /login
app.get("/login/", (req, res) => {
  const sql_select_Users = "SELECT COUNT(*) FROM Users WHERE User_UserName = ? AND User_Password = ?";
  const user = [req.body.User_Name, req.body.User_Password]  
  console.log("user",user)
  db.run(sql_select_Users, user, (err) => {
    if (err) {
      console.log(0)
      res.json({data: `POST 0`})
      return console.error(err.message);
    }
    console.log("sql_select_Users")
    console.log("req.body", req.body)
    console.log(1)
    //res.send({data: `POST ${req.body}`})
    res.json({data: `POST 1`})
  });
});

passport.use(new LocalStrategy(function verify(username, password, cb) {
  db.get('SELECT * FROM Users WHERE User_Username = ?', [ username ], function(err, user) {
    if (err) { return cb(err); }
    if (!user) { return cb(null, false, { message: 'Incorrect username or password.' }); }

    crypto.pbkdf2(password, user.salt, 310000, 32, 'sha256', function(err, hashedPassword) {
      if (err) { return cb(err); }
      if (!crypto.timingSafeEqual(user.hashed_password, hashedPassword)) {
        return cb(null, false, { message: 'Incorrect username or password.' });
      }
      return cb(null, user);
    });
  });
}));

app.listen(PORT, () =>  {
  console.log(`Server started (http://localhost:${PORT}/) !`);
});
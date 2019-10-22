# Matrix Generator!

A simple Node.JS command line application which parses Cron expression.

### Expression format (in order)

---

1. minutes
2. hours
3. day of month
4. month
5. day of week

### Features covered

---

1. Asterisk ( \* )
2. Comma ( , )
3. Hyphen ( - )
4. Slash ( / )
5. Question mark ( ? )

### Output format

---

A table with the field name taking the first 14 columns and the times as a space-separated list following it.

```
minute        ...
hour          ...
day of month  ...
month         ...
day of week   ...
```

### Example

---

For,

`30 10-13 ? * WED,FRI`

Output

```
minute        30
hour          10 11 12 13
day of month  1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31
month         1 2 3 4 5 6 7 8 9 10 11 12
day of week   3 5
```

### Install dependencies

---

```npm
$ npm install or yarn install
```

### Starting the app

---

The command must be executed from the **root directory**

```shell
$ npm start or yarn start
```

### Starting automated testing

---

```shell
$ npm test or yarn test
```

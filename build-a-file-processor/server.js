
const fs = require('fs');
const data = fs.readFileSync('assets/poem.txt', {encoding: "utf8" });
fs.readFile("assets/poem.txt", { encoding: "utf8" }, (err, data) => {
  console.log(data);
});
console.log(data);

const fsPromises = require("fs/promises");

async function main() {
  const data = await fsPromises.readFile("assets/poem.txt", {
    encoding: "utf8",
  });
  console.log(data);
}
fs.writeFileSync("assets/output.txt", "Hello, freeCodeCamp!");
main();

fs.appendFileSync("assets/output.txt", "\nSecond line");

const exists = fs.existsSync("assets/output.txt");
console.log(exists); // true or false

const entries = fs.readdirSync("assets");
console.log(entries); // [ 'output.txt', 'poem.txt' ]

const buf = Buffer.from('Hello, Node!');
console.log(buf); // <Buffer 48 65 6c 6c 6f>
console.log(buf.toString("hex")); // 48656c6c6f
console.log(buf.toString("base64")); // SGVsbG8=

const buf2 = Buffer.alloc(8, 0xff);
console.log(buf2); // <Buffer ab ab ab ab>

const decoded = Buffer.from("ZnJlZUNvZGVDYW1w", "base64").toString("utf8");
console.log(decoded); // Hello

const crypto = require("crypto");
const hash = crypto.createHash("sha256").update("hello").digest("hex");
console.log(hash);

const random = crypto.randomBytes(16).toString("hex");
console.log(random); // e.g. 4f3a9c1b8e2d7a05


const id = crypto.randomUUID();
console.log(id);

const os = require("os");
os.platform()
os.arch()
os.hostname()
const totalmem = os.totalmem()
const freemem = os.freemem()
const uptime = os.uptime()
console.log(totalmem);
console.log(freemem);
console.log(uptime);

console.log(os.cpus().length);

const path = require("path");

const filePath = path.join(__dirname, "assets", "poem.txt");

console.log(path.basename(filePath));
console.log(path.dirname(filePath));
console.log(path.extname(filePath));

console.log(path.join("assets", "..", "server.js")); // assets/../server.js → assets/../server.js (relative)
console.log(path.resolve("assets", "..", "server.js")); // /absolute/path/to/server.js

const parts = path.parse("/home/user/assets/poem.txt");
console.log(parts);

console.log(process.version);
console.log(process.platform);
console.log(process.env.NODE_ENV);

console.log(process.argv); // [ '/path/to/node', '/path/to/server.js', 'hello', 'world' ]
console.log(process.argv[2]);

process.stdout.write("Hello ");
process.stdout.write("Hello from stdout\n"); // newline only when you add \n
process.stderr.write('Hello from stderr\n');


const readable = fs.createReadStream('assets/poem.txt');
const writable = fs.createWriteStream('assets/stream-output.txt');
readable.pipe(writable);
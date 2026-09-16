
import http from 'http';
import fs from 'fs';

//  fs.writeFileSync() use for write in side file.
// fs.readFileSync() use for read from file.
// if we use sync write and read function so during file reading and writing nodejs not do other task.
//  So that over server  take to much time to response and make server slow.
// Solve this we use async read and write functions.

export function writeInFile() {
  const shortNotes = [
    { id: 1, text: "notes 1" },
    { id: 2, text: "notes 2" },
    { id: 3, text: "notes 3" }
  ];

  let jsonObj = JSON.stringify(shortNotes);

  // async use for write inside file without stop other process of node js.
  //  it help when file is to large and take time to write.
  fs.writeFileSync('notes.json', `${jsonObj}`);

}

export async function readInFile() {


  try {
    // same way for read file we use async for read large file without stop other process of node.
    const notesFile = fs.readFileSync("notes.json", "utf8");
    let arrayObj = JSON.parse(notesFile);
    console.log("notes.json: ", notesFile);
  }
  catch (error) {
    if (error.code === 'ENOENT') {
      console.error("File not Found");
    } else {
      console.log(error);
    }

  }


}

writeInFile();
readInFile();



const proxy = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('server is running');
});

proxy.listen('5000', () => {
  console.log("server Running on port: http://localhost:5000/")
})



# tp-blog

## Prerequisites
- Node.js 18+

## Install dependencies
```
npm install
```

## Run the mock API (json-server)
```
npm run serve:db
```
This starts `json-server` on [http://localhost:3000](http://localhost:3000).

## Run the Vue dev server
```
npm run dev
```
The script now forces Vite to stay on [http://localhost:5173](http://localhost:5173).  
If you see “Port 5173 is in use”, stop the other process using it (or reboot) before re-running the command.

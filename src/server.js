import http from 'http';
import app from './index';

const port = process.env.PORT || 3000;

const server = http.createServer(app);

// eslint-disable-next-line no-console
server.listen(port, () => console.log(`listening on PORT ${port}`));

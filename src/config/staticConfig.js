import path from 'path';

import dotenv from 'dotenv';
dotenv.config();

export default path.resolve(process.env.STATIC_PATH);

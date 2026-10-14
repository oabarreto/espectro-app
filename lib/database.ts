import {neon} from '@neondatabase/serverless';
export function database(){return process.env.DATABASE_URL?neon(process.env.DATABASE_URL):null}

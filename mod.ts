import { decode, encode } from "./deps.ts";

const { create, readFile, writeFile, mkdir, errors } = Deno;

/**
 * Creates a directory. 
 * Fails silently if directory already 
 * exists. 
 */
export async function create_dir(path: string) {
    try {
        await mkdir(path);
    } catch (error) {
        const does_already_exist_error = error instanceof errors.AlreadyExists;
        if (!does_already_exist_error) {
            throw error;
        }
    }
};

/**
 * Writes to file 
 * @param path 
 * @param content 
 */
export async function write_file(path: string, content: string) {

    const encoded = encode(content);
    await create(path);
    await writeFile(path, encoded);
};

/**
 * Returns content of file
 * @param path 
 */
export async function read_file(path: string): Promise<string> {
    const data = await readFile(path);
    return decode(data)
};

/**
 * Returns true or false depending on wether file 
 * exists or not. 
 * @param path path to file
 */
export async function file_exists(path: string): Promise<boolean> {
    try {
        await readFile(path);
        return true;
    } catch (error) {
        const does_not_exist = error instanceof errors.NotFound;
        if (does_not_exist) {
            return false;
        }

        throw error;
    }
};


const { create, readFile, writeFile, mkdir, errors } = Deno;

export function encode(input: string) {
  return new TextEncoder().encode(input);
}

export function decode(input: BufferSource) {
  return new TextDecoder().decode(input);
}

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
}

/**
 * Writes to file
 * @param path
 * @param content
 */
export async function write_file(path: string, content: string) {
  const encoded = encode(content);
  await create(path);
  await writeFile(path, encoded);
}

/**
 * Returns content of file
 * @param path
 */
export async function read_file(path: string): Promise<string> {
  const data = await readFile(path);
  return decode(data);
}

export async function read_directory(path: string) {
  return Array.from(Deno.readDirSync(path));
}

/**
 * Returns directories in given path
 * @param path
 */
export async function read_folders(path: string) {
  return (await read_directory(path)).filter((entry) => entry.isDirectory);
}

export async function read_files(path: string) {
  return (await read_directory(path)).filter((entry) => entry.isFile);
}

/**
 * Append given content to the
 * end of file at given path
 * @param path
 * @param content
 */
export async function append_to_file(path: string, content: string) {
  const encoded = encode(content);
  await writeFile(path, encoded, { append: true });
}

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
}

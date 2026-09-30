import { cp, readFile, writeFile, mkdir, rm } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { resolve, dirname } from "node:path";
export function validSlug(slug) {
  return (
    typeof slug === "string" &&
    slug.length <= 48 &&
    /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)
  );
}
export async function createSpace(
  slug,
  base = resolve(dirname(fileURLToPath(import.meta.url)), ".."),
) {
  if (!validSlug(slug))
    throw new Error(
      "空间名必须是 1–48 个英文小写字母、数字或单连字符，例如 lin-study-kit。",
    );
  const target = resolve(base, "src/content/spaces", slug);
  await mkdir(dirname(target), { recursive: true });
  try {
    await mkdir(target);
  } catch (error) {
    if (error.code === "EEXIST")
      throw new Error(`空间 ${slug} 已存在，不会覆盖。`);
    throw error;
  }
  try {
    await cp(resolve(base, "templates/space"), target, {
      recursive: true,
      force: false,
    });
    const file = resolve(target, "index.md");
    const content = await readFile(file, "utf8");
    await writeFile(
      file,
      content.replace(
        /updated: "[0-9-]+"/,
        `updated: "${new Date().toISOString().slice(0, 10)}"`,
      ),
    );
  } catch (error) {
    await rm(target, { recursive: true, force: true });
    throw error;
  }
  return target;
}
if (
  process.argv[1] &&
  resolve(process.argv[1]) === fileURLToPath(import.meta.url)
) {
  try {
    const target = await createSpace(process.argv[2]);
    console.log(`已创建 ${target}\n下一步：编辑 index.md，然后 npm run dev。`);
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}

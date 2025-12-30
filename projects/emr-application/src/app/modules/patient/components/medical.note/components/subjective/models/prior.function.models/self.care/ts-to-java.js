const fs = require("fs");
const path = require("path");

const parentInterface = process.argv[2];

if (!parentInterface) {
  console.error("Usage: node ts-to-java.js <ParentInterfaceName>");
  process.exit(1);
}

const BASE_DIR = __dirname;
const OUTPUT_DIR = path.join(BASE_DIR, "generated-java");

fs.mkdirSync(OUTPUT_DIR, { recursive: true });

/**
 * Remove TS comments safely
 */
function stripComments(code) {
  return code
    // remove block comments /* ... */
    .replace(/\/\*[\s\S]*?\*\//g, "")
    // remove line comments //
    .replace(/\/\/.*$/gm, "");
}

/**
 * TS → Java type mapping
 */
function mapTsTypeToJava(tsType) {
  tsType = tsType.trim();

  if (tsType.endsWith("[]")) {
    return `List<${mapTsTypeToJava(tsType.replace("[]", ""))}>`;
  }

  const map = {
    string: "String",
    number: "Integer",
    boolean: "Boolean",
    any: "Object"
  };

  return map[tsType] || tsType;
}

/**
 * Parse TS interface correctly
 */
function parseInterface(filePath) {
  let content = fs.readFileSync(filePath, "utf8");
  content = stripComments(content);

  const nameMatch = content.match(/interface\s+(\w+)/);
  if (!nameMatch) return null;

  const name = nameMatch[1];

  const bodyMatch = content.match(/interface\s+\w+\s*{([\s\S]*?)}/);
  if (!bodyMatch) return null;

  const body = bodyMatch[1]
    .replace(/\n/g, " ")
    .replace(/\s+/g, " ");

  // split ONLY by semicolons (after comments removed)
  const rawFields = body
    .split(";")
    .map(f => f.trim())
    .filter(Boolean);

  const fields = [];

  rawFields.forEach(field => {
    // guard: exactly one colon
    if ((field.match(/:/g) || []).length !== 1) {
      console.warn(`⚠️ Skipping malformed field in ${name}: "${field}"`);
      return;
    }

    const match = field.match(/^(\w+)\??\s*:\s*(.+)$/);
    if (!match) return;

    fields.push({
      name: match[1],
      type: mapTsTypeToJava(match[2])
    });
  });

  return { name, fields };
}

/**
 * Generate Java class with Lombok
 */
function generateJavaClass({ name, fields }) {
  const imports = new Set(["lombok.Data"]);

  if (fields.some(f => f.type.startsWith("List<"))) {
    imports.add("java.util.List");
  }

  const importBlock = [...imports]
    .sort()
    .map(i => `import ${i};`)
    .join("\n");

  const fieldsBlock = fields.map(
    f => `    private ${f.type} ${f.name};`
  ).join("\n");

  return `
${importBlock}

@Data
public class ${name} {

${fieldsBlock}

}
`.trim();
}

/**
 * MAIN
 */
const tsFiles = fs.readdirSync(BASE_DIR)
  .filter(f => f.endsWith(".ts"));

const interfaces = tsFiles
  .map(f => parseInterface(path.join(BASE_DIR, f)))
  .filter(Boolean);

interfaces.forEach(i => {
  fs.writeFileSync(
    path.join(OUTPUT_DIR, `${i.name}.java`),
    generateJavaClass(i)
  );
});

console.log(`✅ Generated ${interfaces.length} Java classes`);
console.log(`📌 Parent interface: ${parentInterface}`);
console.log(`📂 Output folder: generated-java`);

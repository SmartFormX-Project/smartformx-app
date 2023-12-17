import fs from "fs";
import prisma from "../../config/prisma";
import crypto from "crypto";

function generateReferenceCode(length: number = 10): string {
  return crypto
    .randomBytes(length)
    .toString("hex")
    .slice(0, length)
    .toUpperCase();
}

async function main() {
  const fileContent = fs.readFileSync("../generated_responses.json", "utf-8");
  const responses = JSON.parse(fileContent);
  const formId = "7102df4a-5509-4e55-b0b0-5a766b29a9d4";
  var count = 0;
  for (const response of responses) {
    const { name, answears } = response;
    var res = await prisma.userAnswear.create({
        data: {
            name: "teste " + name,
            referenceCode: generateReferenceCode(),
            formId: formId,
            answears: { createMany: { data: answears } },
        },
    });
    
    count++;
    console.log("added id: " + res.id);
  }

  console.log("Responses inserted into the database: " + count);
}

main().catch((e) => {
  throw e;
});

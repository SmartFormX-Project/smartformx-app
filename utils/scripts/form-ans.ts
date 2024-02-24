// import fs from "fs";
// import crypto from "crypto";

// function generateReferenceCode(length: number = 10): string {
//   return crypto
//     .randomBytes(length)
//     .toString("hex")
//     .slice(0, length)
//     .toUpperCase();
// }

// export async function insertFictionAnswearInDb() {
//   // const fileContent = fs.readFileSync("./generated_responses.json", "utf-8");
//   const responses = respostas.slice(0, 5);
//   const formId = "7dee62a8-e7e7-4105-96e7-4f45bdf1f37e";
//   var count = 0;
//   for (const response of responses) {
//     const { name, answears } = response;
//     var res = await prisma.userAnswers.create({
//       data: {
//         name: "teste " + name,
//         referenceCode: generateReferenceCode(),
//         formId: formId,
//         Answers: { createMany: { data: answears } },
//       },
//     });

//     count++;
//   }

//   console.log("Responses inserted into the database: " + count);
// }

// const respostas = [
//   {
//     name: "kDuOIAVN",
//     answears: [
//       {
//         questionId: "d0fbc096-828e-45f3-8b9c-0d5172dfa549",
//         answear: "Muito Bom",
//       },
//       {
//         questionId: "f63b0547-94ff-4d72-9d3e-275babe9f140",
//         answear: "Superou as expectativas",
//       },
//       {
//         questionId: "2714bea8-aa67-421f-bd85-11cb248975d0",
//         answear: "Caro",
//       },
//       {
//         questionId: "568dc2ec-dece-492f-9453-ce725c75493b",
//         answear: "Regular",
//       },
//       {
//         questionId: "2e13670b-0f43-4fc7-973c-2d6f7228fc06",
//         answear: "Não recomendaria",
//       },
//       {
//         questionId: "ad30e74d-822d-4906-ba72-412e560c6cda",
//         answear: "Tive problemas leves",
//       },
//       { questionId: "d6158888-bae1-42a4-97e4-58476c669f7e", answear: "Bom" },
//       { questionId: "ad917ccb-163a-419b-bf82-049d8db8de65", answear: "5" },
//     ],
//   },
//   {
//     name: "RpQVdhEd",
//     answears: [
//       { questionId: "d0fbc096-828e-45f3-8b9c-0d5172dfa549", answear: "Bom" },
//       {
//         questionId: "f63b0547-94ff-4d72-9d3e-275babe9f140",
//         answear: "Atendeu",
//       },
//       {
//         questionId: "2714bea8-aa67-421f-bd85-11cb248975d0",
//         answear: "Muito Caro",
//       },
//       {
//         questionId: "568dc2ec-dece-492f-9453-ce725c75493b",
//         answear: "Muito Rápida",
//       },
//       {
//         questionId: "2e13670b-0f43-4fc7-973c-2d6f7228fc06",
//         answear: "Recomendaria",
//       },
//       {
//         questionId: "ad30e74d-822d-4906-ba72-412e560c6cda",
//         answear: "Não tive problemas",
//       },
//       { questionId: "d6158888-bae1-42a4-97e4-58476c669f7e", answear: "Bom" },
//       { questionId: "ad917ccb-163a-419b-bf82-049d8db8de65", answear: "1" },
//     ],
//   },
//   {
//     name: "lzaaqsJr",
//     answears: [
//       {
//         questionId: "d0fbc096-828e-45f3-8b9c-0d5172dfa549",
//         answear: "Muito Ruim",
//       },
//       {
//         questionId: "f63b0547-94ff-4d72-9d3e-275babe9f140",
//         answear: "Superou as expectativas",
//       },
//       {
//         questionId: "2714bea8-aa67-421f-bd85-11cb248975d0",
//         answear: "Caro",
//       },
//       {
//         questionId: "568dc2ec-dece-492f-9453-ce725c75493b",
//         answear: "Rápida",
//       },
//       {
//         questionId: "2e13670b-0f43-4fc7-973c-2d6f7228fc06",
//         answear: "Recomendaria",
//       },
//       {
//         questionId: "ad30e74d-822d-4906-ba72-412e560c6cda",
//         answear: "Tive problemas leves",
//       },
//       {
//         questionId: "d6158888-bae1-42a4-97e4-58476c669f7e",
//         answear: "Muito Ruim",
//       },
//       { questionId: "ad917ccb-163a-419b-bf82-049d8db8de65", answear: "2" },
//     ],
//   },
//   {
//     name: "gXFyEBQR",
//     answears: [
//       {
//         questionId: "d0fbc096-828e-45f3-8b9c-0d5172dfa549",
//         answear: "Muito Bom",
//       },
//       {
//         questionId: "f63b0547-94ff-4d72-9d3e-275babe9f140",
//         answear: "Não atendeu",
//       },
//       {
//         questionId: "2714bea8-aa67-421f-bd85-11cb248975d0",
//         answear: "Muito Barato",
//       },
//       {
//         questionId: "568dc2ec-dece-492f-9453-ce725c75493b",
//         answear: "Muito Rápida",
//       },
//       {
//         questionId: "2e13670b-0f43-4fc7-973c-2d6f7228fc06",
//         answear: "Recomendaria",
//       },
//       {
//         questionId: "ad30e74d-822d-4906-ba72-412e560c6cda",
//         answear: "Tive problemas graves",
//       },
//       {
//         questionId: "d6158888-bae1-42a4-97e4-58476c669f7e",
//         answear: "Muito Bom",
//       },
//       { questionId: "ad917ccb-163a-419b-bf82-049d8db8de65", answear: "4" },
//     ],
//   },
//   {
//     name: "FyAeMBQf",
//     answears: [
//       {
//         questionId: "d0fbc096-828e-45f3-8b9c-0d5172dfa549",
//         answear: "Ruim",
//       },
//       {
//         questionId: "f63b0547-94ff-4d72-9d3e-275babe9f140",
//         answear: "Superou as expectativas",
//       },
//       {
//         questionId: "2714bea8-aa67-421f-bd85-11cb248975d0",
//         answear: "Caro",
//       },
//       {
//         questionId: "568dc2ec-dece-492f-9453-ce725c75493b",
//         answear: "Muito Rápida",
//       },
//       {
//         questionId: "2e13670b-0f43-4fc7-973c-2d6f7228fc06",
//         answear: "Recomendaria",
//       },
//       {
//         questionId: "ad30e74d-822d-4906-ba72-412e560c6cda",
//         answear: "Tive dificuldades",
//       },
//       {
//         questionId: "d6158888-bae1-42a4-97e4-58476c669f7e",
//         answear: "Ruim",
//       },
//       { questionId: "ad917ccb-163a-419b-bf82-049d8db8de65", answear: "3" },
//     ],
//   },
//   {
//     name: "uPwdjVvm",
//     answears: [
//       {
//         questionId: "d0fbc096-828e-45f3-8b9c-0d5172dfa549",
//         answear: "Muito Bom",
//       },
//       {
//         questionId: "f63b0547-94ff-4d72-9d3e-275babe9f140",
//         answear: "Não atendeu",
//       },
//       {
//         questionId: "2714bea8-aa67-421f-bd85-11cb248975d0",
//         answear: "Muito Barato",
//       },
//       {
//         questionId: "568dc2ec-dece-492f-9453-ce725c75493b",
//         answear: "Muito Rápida",
//       },
//       {
//         questionId: "2e13670b-0f43-4fc7-973c-2d6f7228fc06",
//         answear: "Não recomendaria",
//       },
//       {
//         questionId: "ad30e74d-822d-4906-ba72-412e560c6cda",
//         answear: "Tive problemas leves",
//       },
//       {
//         questionId: "d6158888-bae1-42a4-97e4-58476c669f7e",
//         answear: "Ruim",
//       },
//       { questionId: "ad917ccb-163a-419b-bf82-049d8db8de65", answear: "2" },
//     ],
//   },
//   {
//     name: "IMzkXYBU",
//     answears: [
//       {
//         questionId: "d0fbc096-828e-45f3-8b9c-0d5172dfa549",
//         answear: "Muito Ruim",
//       },
//       {
//         questionId: "f63b0547-94ff-4d72-9d3e-275babe9f140",
//         answear: "Superou as expectativas",
//       },
//       {
//         questionId: "2714bea8-aa67-421f-bd85-11cb248975d0",
//         answear: "Muito Barato",
//       },
//       {
//         questionId: "568dc2ec-dece-492f-9453-ce725c75493b",
//         answear: "Muito Rápida",
//       },
//       {
//         questionId: "2e13670b-0f43-4fc7-973c-2d6f7228fc06",
//         answear: "Poderia recomendar",
//       },
//       {
//         questionId: "ad30e74d-822d-4906-ba72-412e560c6cda",
//         answear: "Tive dificuldades",
//       },
//       { questionId: "d6158888-bae1-42a4-97e4-58476c669f7e", answear: "Bom" },
//       { questionId: "ad917ccb-163a-419b-bf82-049d8db8de65", answear: "5" },
//     ],
//   },
//   {
//     name: "lblTkqMs",
//     answears: [
//       {
//         questionId: "d0fbc096-828e-45f3-8b9c-0d5172dfa549",
//         answear: "Regular",
//       },
//       {
//         questionId: "f63b0547-94ff-4d72-9d3e-275babe9f140",
//         answear: "Parcialmente atendeu",
//       },
//       {
//         questionId: "2714bea8-aa67-421f-bd85-11cb248975d0",
//         answear: "Muito Barato",
//       },
//       {
//         questionId: "568dc2ec-dece-492f-9453-ce725c75493b",
//         answear: "Regular",
//       },
//       {
//         questionId: "2e13670b-0f43-4fc7-973c-2d6f7228fc06",
//         answear: "Com certeza recomendaria",
//       },
//       {
//         questionId: "ad30e74d-822d-4906-ba72-412e560c6cda",
//         answear: "Não tive problemas",
//       },
//       {
//         questionId: "d6158888-bae1-42a4-97e4-58476c669f7e",
//         answear: "Regular",
//       },
//       { questionId: "ad917ccb-163a-419b-bf82-049d8db8de65", answear: "5" },
//     ],
//   },
//   {
//     name: "OOhQLdfF",
//     answears: [
//       {
//         questionId: "d0fbc096-828e-45f3-8b9c-0d5172dfa549",
//         answear: "Muito Bom",
//       },
//       {
//         questionId: "f63b0547-94ff-4d72-9d3e-275babe9f140",
//         answear: "Não atendeu",
//       },
//       {
//         questionId: "2714bea8-aa67-421f-bd85-11cb248975d0",
//         answear: "Caro",
//       },
//       {
//         questionId: "568dc2ec-dece-492f-9453-ce725c75493b",
//         answear: "Muito Lenta",
//       },
//       {
//         questionId: "2e13670b-0f43-4fc7-973c-2d6f7228fc06",
//         answear: "Com certeza recomendaria",
//       },
//       {
//         questionId: "ad30e74d-822d-4906-ba72-412e560c6cda",
//         answear: "Não tive problemas",
//       },
//       {
//         questionId: "d6158888-bae1-42a4-97e4-58476c669f7e",
//         answear: "Muito Ruim",
//       },
//       { questionId: "ad917ccb-163a-419b-bf82-049d8db8de65", answear: "5" },
//     ],
//   },
//   {
//     name: "pFZJfBtC",
//     answears: [
//       { questionId: "d0fbc096-828e-45f3-8b9c-0d5172dfa549", answear: "Bom" },
//       {
//         questionId: "f63b0547-94ff-4d72-9d3e-275babe9f140",
//         answear: "Não atendeu",
//       },
//       {
//         questionId: "2714bea8-aa67-421f-bd85-11cb248975d0",
//         answear: "Caro",
//       },
//       {
//         questionId: "568dc2ec-dece-492f-9453-ce725c75493b",
//         answear: "Regular",
//       },
//       {
//         questionId: "2e13670b-0f43-4fc7-973c-2d6f7228fc06",
//         answear: "Recomendaria",
//       },
//       {
//         questionId: "ad30e74d-822d-4906-ba72-412e560c6cda",
//         answear: "Tive problemas leves",
//       },
//       {
//         questionId: "d6158888-bae1-42a4-97e4-58476c669f7e",
//         answear: "Muito Bom",
//       },
//       { questionId: "ad917ccb-163a-419b-bf82-049d8db8de65", answear: "3" },
//     ],
//   },
//   {
//     name: "SHvwOxhq",
//     answears: [
//       {
//         questionId: "d0fbc096-828e-45f3-8b9c-0d5172dfa549",
//         answear: "Regular",
//       },
//       {
//         questionId: "f63b0547-94ff-4d72-9d3e-275babe9f140",
//         answear: "Atendeu",
//       },
//       {
//         questionId: "2714bea8-aa67-421f-bd85-11cb248975d0",
//         answear: "Preço Justo",
//       },
//       {
//         questionId: "568dc2ec-dece-492f-9453-ce725c75493b",
//         answear: "Lenta",
//       },
//       {
//         questionId: "2e13670b-0f43-4fc7-973c-2d6f7228fc06",
//         answear: "Poderia recomendar",
//       },
//       {
//         questionId: "ad30e74d-822d-4906-ba72-412e560c6cda",
//         answear: "Tive problemas leves",
//       },
//       {
//         questionId: "d6158888-bae1-42a4-97e4-58476c669f7e",
//         answear: "Regular",
//       },
//       { questionId: "ad917ccb-163a-419b-bf82-049d8db8de65", answear: "5" },
//     ],
//   },
//   {
//     name: "jXWLHzcd",
//     answears: [
//       {
//         questionId: "d0fbc096-828e-45f3-8b9c-0d5172dfa549",
//         answear: "Muito Ruim",
//       },
//       {
//         questionId: "f63b0547-94ff-4d72-9d3e-275babe9f140",
//         answear: "Não atendeu",
//       },
//       {
//         questionId: "2714bea8-aa67-421f-bd85-11cb248975d0",
//         answear: "Muito Barato",
//       },
//       {
//         questionId: "568dc2ec-dece-492f-9453-ce725c75493b",
//         answear: "Regular",
//       },
//       {
//         questionId: "2e13670b-0f43-4fc7-973c-2d6f7228fc06",
//         answear: "Recomendaria",
//       },
//       {
//         questionId: "ad30e74d-822d-4906-ba72-412e560c6cda",
//         answear: "Não tive problemas",
//       },
//       { questionId: "d6158888-bae1-42a4-97e4-58476c669f7e", answear: "Bom" },
//       { questionId: "ad917ccb-163a-419b-bf82-049d8db8de65", answear: "3" },
//     ],
//   },
//   {
//     name: "pQbvpLPe",
//     answears: [
//       {
//         questionId: "d0fbc096-828e-45f3-8b9c-0d5172dfa549",
//         answear: "Muito Ruim",
//       },
//       {
//         questionId: "f63b0547-94ff-4d72-9d3e-275babe9f140",
//         answear: "Superou as expectativas",
//       },
//       {
//         questionId: "2714bea8-aa67-421f-bd85-11cb248975d0",
//         answear: "Preço Justo",
//       },
//       {
//         questionId: "568dc2ec-dece-492f-9453-ce725c75493b",
//         answear: "Lenta",
//       },
//       {
//         questionId: "2e13670b-0f43-4fc7-973c-2d6f7228fc06",
//         answear: "Poderia recomendar",
//       },
//       {
//         questionId: "ad30e74d-822d-4906-ba72-412e560c6cda",
//         answear: "Tive problemas graves",
//       },
//       { questionId: "d6158888-bae1-42a4-97e4-58476c669f7e", answear: "Bom" },
//       { questionId: "ad917ccb-163a-419b-bf82-049d8db8de65", answear: "3" },
//     ],
//   },
//   {
//     name: "NvSGqGij",
//     answears: [
//       {
//         questionId: "d0fbc096-828e-45f3-8b9c-0d5172dfa549",
//         answear: "Muito Ruim",
//       },
//       {
//         questionId: "f63b0547-94ff-4d72-9d3e-275babe9f140",
//         answear: "Não atendeu",
//       },
//       {
//         questionId: "2714bea8-aa67-421f-bd85-11cb248975d0",
//         answear: "Barato",
//       },
//       {
//         questionId: "568dc2ec-dece-492f-9453-ce725c75493b",
//         answear: "Muito Rápida",
//       },
//       {
//         questionId: "2e13670b-0f43-4fc7-973c-2d6f7228fc06",
//         answear: "Não recomendaria",
//       },
//       {
//         questionId: "ad30e74d-822d-4906-ba72-412e560c6cda",
//         answear: "Tive problemas leves",
//       },
//       {
//         questionId: "d6158888-bae1-42a4-97e4-58476c669f7e",
//         answear: "Ruim",
//       },
//       { questionId: "ad917ccb-163a-419b-bf82-049d8db8de65", answear: "5" },
//     ],
//   },
//   {
//     name: "joQigxJO",
//     answears: [
//       {
//         questionId: "d0fbc096-828e-45f3-8b9c-0d5172dfa549",
//         answear: "Regular",
//       },
//       {
//         questionId: "f63b0547-94ff-4d72-9d3e-275babe9f140",
//         answear: "Atendeu",
//       },
//       {
//         questionId: "2714bea8-aa67-421f-bd85-11cb248975d0",
//         answear: "Caro",
//       },
//       {
//         questionId: "568dc2ec-dece-492f-9453-ce725c75493b",
//         answear: "Regular",
//       },
//       {
//         questionId: "2e13670b-0f43-4fc7-973c-2d6f7228fc06",
//         answear: "Recomendaria",
//       },
//       {
//         questionId: "ad30e74d-822d-4906-ba72-412e560c6cda",
//         answear: "Tive problemas leves",
//       },
//       {
//         questionId: "d6158888-bae1-42a4-97e4-58476c669f7e",
//         answear: "Ruim",
//       },
//       { questionId: "ad917ccb-163a-419b-bf82-049d8db8de65", answear: "5" },
//     ],
//   },
//   {
//     name: "pjUutXSS",
//     answears: [
//       { questionId: "d0fbc096-828e-45f3-8b9c-0d5172dfa549", answear: "Bom" },
//       {
//         questionId: "f63b0547-94ff-4d72-9d3e-275babe9f140",
//         answear: "Superou as expectativas",
//       },
//       {
//         questionId: "2714bea8-aa67-421f-bd85-11cb248975d0",
//         answear: "Barato",
//       },
//       {
//         questionId: "568dc2ec-dece-492f-9453-ce725c75493b",
//         answear: "Regular",
//       },
//       {
//         questionId: "2e13670b-0f43-4fc7-973c-2d6f7228fc06",
//         answear: "Recomendaria",
//       },
//       {
//         questionId: "ad30e74d-822d-4906-ba72-412e560c6cda",
//         answear: "Não tive problemas",
//       },
//       {
//         questionId: "d6158888-bae1-42a4-97e4-58476c669f7e",
//         answear: "Regular",
//       },
//       { questionId: "ad917ccb-163a-419b-bf82-049d8db8de65", answear: "5" },
//     ],
//   },
//   {
//     name: "umPQsywS",
//     answears: [
//       {
//         questionId: "d0fbc096-828e-45f3-8b9c-0d5172dfa549",
//         answear: "Ruim",
//       },
//       {
//         questionId: "f63b0547-94ff-4d72-9d3e-275babe9f140",
//         answear: "Superou as expectativas",
//       },
//       {
//         questionId: "2714bea8-aa67-421f-bd85-11cb248975d0",
//         answear: "Caro",
//       },
//       {
//         questionId: "568dc2ec-dece-492f-9453-ce725c75493b",
//         answear: "Regular",
//       },
//       {
//         questionId: "2e13670b-0f43-4fc7-973c-2d6f7228fc06",
//         answear: "Poderia recomendar",
//       },
//       {
//         questionId: "ad30e74d-822d-4906-ba72-412e560c6cda",
//         answear: "Tive problemas leves",
//       },
//       {
//         questionId: "d6158888-bae1-42a4-97e4-58476c669f7e",
//         answear: "Muito Ruim",
//       },
//       { questionId: "ad917ccb-163a-419b-bf82-049d8db8de65", answear: "2" },
//     ],
//   },
//   {
//     name: "YAenaYyF",
//     answears: [
//       {
//         questionId: "d0fbc096-828e-45f3-8b9c-0d5172dfa549",
//         answear: "Muito Bom",
//       },
//       {
//         questionId: "f63b0547-94ff-4d72-9d3e-275babe9f140",
//         answear: "Não atendeu",
//       },
//       {
//         questionId: "2714bea8-aa67-421f-bd85-11cb248975d0",
//         answear: "Barato",
//       },
//       {
//         questionId: "568dc2ec-dece-492f-9453-ce725c75493b",
//         answear: "Muito Lenta",
//       },
//       {
//         questionId: "2e13670b-0f43-4fc7-973c-2d6f7228fc06",
//         answear: "Com certeza recomendaria",
//       },
//       {
//         questionId: "ad30e74d-822d-4906-ba72-412e560c6cda",
//         answear: "Tive problemas leves",
//       },
//       {
//         questionId: "d6158888-bae1-42a4-97e4-58476c669f7e",
//         answear: "Muito Ruim",
//       },
//       { questionId: "ad917ccb-163a-419b-bf82-049d8db8de65", answear: "5" },
//     ],
//   },
//   {
//     name: "SbABrJAN",
//     answears: [
//       {
//         questionId: "d0fbc096-828e-45f3-8b9c-0d5172dfa549",
//         answear: "Muito Bom",
//       },
//       {
//         questionId: "f63b0547-94ff-4d72-9d3e-275babe9f140",
//         answear: "Atendeu",
//       },
//       {
//         questionId: "2714bea8-aa67-421f-bd85-11cb248975d0",
//         answear: "Caro",
//       },
//       {
//         questionId: "568dc2ec-dece-492f-9453-ce725c75493b",
//         answear: "Rápida",
//       },
//       {
//         questionId: "2e13670b-0f43-4fc7-973c-2d6f7228fc06",
//         answear: "Com certeza recomendaria",
//       },
//       {
//         questionId: "ad30e74d-822d-4906-ba72-412e560c6cda",
//         answear: "Tive problemas leves",
//       },
//       {
//         questionId: "d6158888-bae1-42a4-97e4-58476c669f7e",
//         answear: "Muito Bom",
//       },
//       { questionId: "ad917ccb-163a-419b-bf82-049d8db8de65", answear: "1" },
//     ],
//   },
//   {
//     name: "HoSAktiR",
//     answears: [
//       {
//         questionId: "d0fbc096-828e-45f3-8b9c-0d5172dfa549",
//         answear: "Ruim",
//       },
//       {
//         questionId: "f63b0547-94ff-4d72-9d3e-275babe9f140",
//         answear: "Atendeu",
//       },
//       {
//         questionId: "2714bea8-aa67-421f-bd85-11cb248975d0",
//         answear: "Barato",
//       },
//       {
//         questionId: "568dc2ec-dece-492f-9453-ce725c75493b",
//         answear: "Regular",
//       },
//       {
//         questionId: "2e13670b-0f43-4fc7-973c-2d6f7228fc06",
//         answear: "Não recomendaria",
//       },
//       {
//         questionId: "ad30e74d-822d-4906-ba72-412e560c6cda",
//         answear: "Tive problemas leves",
//       },
//       {
//         questionId: "d6158888-bae1-42a4-97e4-58476c669f7e",
//         answear: "Ruim",
//       },
//       { questionId: "ad917ccb-163a-419b-bf82-049d8db8de65", answear: "2" },
//     ],
//   },
//   {
//     name: "qDZdJyuP",
//     answears: [
//       { questionId: "d0fbc096-828e-45f3-8b9c-0d5172dfa549", answear: "Bom" },
//       {
//         questionId: "f63b0547-94ff-4d72-9d3e-275babe9f140",
//         answear: "Superou as expectativas",
//       },
//       {
//         questionId: "2714bea8-aa67-421f-bd85-11cb248975d0",
//         answear: "Barato",
//       },
//       {
//         questionId: "568dc2ec-dece-492f-9453-ce725c75493b",
//         answear: "Lenta",
//       },
//       {
//         questionId: "2e13670b-0f43-4fc7-973c-2d6f7228fc06",
//         answear: "Recomendaria",
//       },
//       {
//         questionId: "ad30e74d-822d-4906-ba72-412e560c6cda",
//         answear: "Tive problemas graves",
//       },
//       {
//         questionId: "d6158888-bae1-42a4-97e4-58476c669f7e",
//         answear: "Muito Ruim",
//       },
//       { questionId: "ad917ccb-163a-419b-bf82-049d8db8de65", answear: "1" },
//     ],
//   },
//   {
//     name: "awBxlhOO",
//     answears: [
//       { questionId: "d0fbc096-828e-45f3-8b9c-0d5172dfa549", answear: "Bom" },
//       {
//         questionId: "f63b0547-94ff-4d72-9d3e-275babe9f140",
//         answear: "Superou as expectativas",
//       },
//       {
//         questionId: "2714bea8-aa67-421f-bd85-11cb248975d0",
//         answear: "Muito Barato",
//       },
//       {
//         questionId: "568dc2ec-dece-492f-9453-ce725c75493b",
//         answear: "Lenta",
//       },
//       {
//         questionId: "2e13670b-0f43-4fc7-973c-2d6f7228fc06",
//         answear: "Poderia recomendar",
//       },
//       {
//         questionId: "ad30e74d-822d-4906-ba72-412e560c6cda",
//         answear: "Tive dificuldades",
//       },
//       {
//         questionId: "d6158888-bae1-42a4-97e4-58476c669f7e",
//         answear: "Regular",
//       },
//       { questionId: "ad917ccb-163a-419b-bf82-049d8db8de65", answear: "4" },
//     ],
//   },
//   {
//     name: "zdEDdmTI",
//     answears: [
//       {
//         questionId: "d0fbc096-828e-45f3-8b9c-0d5172dfa549",
//         answear: "Muito Bom",
//       },
//       {
//         questionId: "f63b0547-94ff-4d72-9d3e-275babe9f140",
//         answear: "Atendeu",
//       },
//       {
//         questionId: "2714bea8-aa67-421f-bd85-11cb248975d0",
//         answear: "Muito Caro",
//       },
//       {
//         questionId: "568dc2ec-dece-492f-9453-ce725c75493b",
//         answear: "Muito Lenta",
//       },
//       {
//         questionId: "2e13670b-0f43-4fc7-973c-2d6f7228fc06",
//         answear: "Com certeza recomendaria",
//       },
//       {
//         questionId: "ad30e74d-822d-4906-ba72-412e560c6cda",
//         answear: "Tive problemas graves",
//       },
//       {
//         questionId: "d6158888-bae1-42a4-97e4-58476c669f7e",
//         answear: "Regular",
//       },
//       { questionId: "ad917ccb-163a-419b-bf82-049d8db8de65", answear: "1" },
//     ],
//   },
//   {
//     name: "evnjpyBK",
//     answears: [
//       {
//         questionId: "d0fbc096-828e-45f3-8b9c-0d5172dfa549",
//         answear: "Regular",
//       },
//       {
//         questionId: "f63b0547-94ff-4d72-9d3e-275babe9f140",
//         answear: "Não atendeu",
//       },
//       {
//         questionId: "2714bea8-aa67-421f-bd85-11cb248975d0",
//         answear: "Barato",
//       },
//       {
//         questionId: "568dc2ec-dece-492f-9453-ce725c75493b",
//         answear: "Muito Lenta",
//       },
//       {
//         questionId: "2e13670b-0f43-4fc7-973c-2d6f7228fc06",
//         answear: "Não recomendaria",
//       },
//       {
//         questionId: "ad30e74d-822d-4906-ba72-412e560c6cda",
//         answear: "Tive dificuldades",
//       },
//       {
//         questionId: "d6158888-bae1-42a4-97e4-58476c669f7e",
//         answear: "Ruim",
//       },
//       { questionId: "ad917ccb-163a-419b-bf82-049d8db8de65", answear: "2" },
//     ],
//   },
//   {
//     name: "EkWldZpH",
//     answears: [
//       {
//         questionId: "d0fbc096-828e-45f3-8b9c-0d5172dfa549",
//         answear: "Regular",
//       },
//       {
//         questionId: "f63b0547-94ff-4d72-9d3e-275babe9f140",
//         answear: "Atendeu",
//       },
//       {
//         questionId: "2714bea8-aa67-421f-bd85-11cb248975d0",
//         answear: "Preço Justo",
//       },
//       {
//         questionId: "568dc2ec-dece-492f-9453-ce725c75493b",
//         answear: "Muito Lenta",
//       },
//       {
//         questionId: "2e13670b-0f43-4fc7-973c-2d6f7228fc06",
//         answear: "Poderia recomendar",
//       },
//       {
//         questionId: "ad30e74d-822d-4906-ba72-412e560c6cda",
//         answear: "Tive problemas leves",
//       },
//       { questionId: "d6158888-bae1-42a4-97e4-58476c669f7e", answear: "Bom" },
//       { questionId: "ad917ccb-163a-419b-bf82-049d8db8de65", answear: "4" },
//     ],
//   },
//   {
//     name: "YibWRlUn",
//     answears: [
//       {
//         questionId: "d0fbc096-828e-45f3-8b9c-0d5172dfa549",
//         answear: "Muito Bom",
//       },
//       {
//         questionId: "f63b0547-94ff-4d72-9d3e-275babe9f140",
//         answear: "Superou as expectativas",
//       },
//       {
//         questionId: "2714bea8-aa67-421f-bd85-11cb248975d0",
//         answear: "Caro",
//       },
//       {
//         questionId: "568dc2ec-dece-492f-9453-ce725c75493b",
//         answear: "Rápida",
//       },
//       {
//         questionId: "2e13670b-0f43-4fc7-973c-2d6f7228fc06",
//         answear: "Não recomendaria",
//       },
//       {
//         questionId: "ad30e74d-822d-4906-ba72-412e560c6cda",
//         answear: "Tive dificuldades",
//       },
//       { questionId: "d6158888-bae1-42a4-97e4-58476c669f7e", answear: "Bom" },
//       { questionId: "ad917ccb-163a-419b-bf82-049d8db8de65", answear: "5" },
//     ],
//   },
//   {
//     name: "IOOXEuoC",
//     answears: [
//       { questionId: "d0fbc096-828e-45f3-8b9c-0d5172dfa549", answear: "Bom" },
//       {
//         questionId: "f63b0547-94ff-4d72-9d3e-275babe9f140",
//         answear: "Superou as expectativas",
//       },
//       {
//         questionId: "2714bea8-aa67-421f-bd85-11cb248975d0",
//         answear: "Preço Justo",
//       },
//       {
//         questionId: "568dc2ec-dece-492f-9453-ce725c75493b",
//         answear: "Regular",
//       },
//       {
//         questionId: "2e13670b-0f43-4fc7-973c-2d6f7228fc06",
//         answear: "Não recomendaria",
//       },
//       {
//         questionId: "ad30e74d-822d-4906-ba72-412e560c6cda",
//         answear: "Tive problemas graves",
//       },
//       {
//         questionId: "d6158888-bae1-42a4-97e4-58476c669f7e",
//         answear: "Muito Ruim",
//       },
//       { questionId: "ad917ccb-163a-419b-bf82-049d8db8de65", answear: "3" },
//     ],
//   },
//   {
//     name: "TpROIjbV",
//     answears: [
//       {
//         questionId: "d0fbc096-828e-45f3-8b9c-0d5172dfa549",
//         answear: "Muito Ruim",
//       },
//       {
//         questionId: "f63b0547-94ff-4d72-9d3e-275babe9f140",
//         answear: "Não atendeu",
//       },
//       {
//         questionId: "2714bea8-aa67-421f-bd85-11cb248975d0",
//         answear: "Preço Justo",
//       },
//       {
//         questionId: "568dc2ec-dece-492f-9453-ce725c75493b",
//         answear: "Regular",
//       },
//       {
//         questionId: "2e13670b-0f43-4fc7-973c-2d6f7228fc06",
//         answear: "Não recomendaria",
//       },
//       {
//         questionId: "ad30e74d-822d-4906-ba72-412e560c6cda",
//         answear: "Tive problemas graves",
//       },
//       {
//         questionId: "d6158888-bae1-42a4-97e4-58476c669f7e",
//         answear: "Regular",
//       },
//       { questionId: "ad917ccb-163a-419b-bf82-049d8db8de65", answear: "5" },
//     ],
//   },
//   {
//     name: "SHsxnKWQ",
//     answears: [
//       {
//         questionId: "d0fbc096-828e-45f3-8b9c-0d5172dfa549",
//         answear: "Muito Bom",
//       },
//       {
//         questionId: "f63b0547-94ff-4d72-9d3e-275babe9f140",
//         answear: "Atendeu",
//       },
//       {
//         questionId: "2714bea8-aa67-421f-bd85-11cb248975d0",
//         answear: "Caro",
//       },
//       {
//         questionId: "568dc2ec-dece-492f-9453-ce725c75493b",
//         answear: "Muito Rápida",
//       },
//       {
//         questionId: "2e13670b-0f43-4fc7-973c-2d6f7228fc06",
//         answear: "Poderia recomendar",
//       },
//       {
//         questionId: "ad30e74d-822d-4906-ba72-412e560c6cda",
//         answear: "Não tive problemas",
//       },
//       {
//         questionId: "d6158888-bae1-42a4-97e4-58476c669f7e",
//         answear: "Regular",
//       },
//       { questionId: "ad917ccb-163a-419b-bf82-049d8db8de65", answear: "1" },
//     ],
//   },
//   {
//     name: "ZYhWaNfU",
//     answears: [
//       { questionId: "d0fbc096-828e-45f3-8b9c-0d5172dfa549", answear: "Bom" },
//       {
//         questionId: "f63b0547-94ff-4d72-9d3e-275babe9f140",
//         answear: "Superou as expectativas",
//       },
//       {
//         questionId: "2714bea8-aa67-421f-bd85-11cb248975d0",
//         answear: "Barato",
//       },
//       {
//         questionId: "568dc2ec-dece-492f-9453-ce725c75493b",
//         answear: "Rápida",
//       },
//       {
//         questionId: "2e13670b-0f43-4fc7-973c-2d6f7228fc06",
//         answear: "Com certeza recomendaria",
//       },
//       {
//         questionId: "ad30e74d-822d-4906-ba72-412e560c6cda",
//         answear: "Tive dificuldades",
//       },
//       {
//         questionId: "d6158888-bae1-42a4-97e4-58476c669f7e",
//         answear: "Regular",
//       },
//       { questionId: "ad917ccb-163a-419b-bf82-049d8db8de65", answear: "2" },
//     ],
//   },
//   {
//     name: "JOgxKbaW",
//     answears: [
//       {
//         questionId: "d0fbc096-828e-45f3-8b9c-0d5172dfa549",
//         answear: "Regular",
//       },
//       {
//         questionId: "f63b0547-94ff-4d72-9d3e-275babe9f140",
//         answear: "Parcialmente atendeu",
//       },
//       {
//         questionId: "2714bea8-aa67-421f-bd85-11cb248975d0",
//         answear: "Preço Justo",
//       },
//       {
//         questionId: "568dc2ec-dece-492f-9453-ce725c75493b",
//         answear: "Lenta",
//       },
//       {
//         questionId: "2e13670b-0f43-4fc7-973c-2d6f7228fc06",
//         answear: "Recomendaria",
//       },
//       {
//         questionId: "ad30e74d-822d-4906-ba72-412e560c6cda",
//         answear: "Tive problemas leves",
//       },
//       {
//         questionId: "d6158888-bae1-42a4-97e4-58476c669f7e",
//         answear: "Ruim",
//       },
//       { questionId: "ad917ccb-163a-419b-bf82-049d8db8de65", answear: "5" },
//     ],
//   },
//   {
//     name: "lnznAfmc",
//     answears: [
//       {
//         questionId: "d0fbc096-828e-45f3-8b9c-0d5172dfa549",
//         answear: "Ruim",
//       },
//       {
//         questionId: "f63b0547-94ff-4d72-9d3e-275babe9f140",
//         answear: "Superou as expectativas",
//       },
//       {
//         questionId: "2714bea8-aa67-421f-bd85-11cb248975d0",
//         answear: "Barato",
//       },
//       {
//         questionId: "568dc2ec-dece-492f-9453-ce725c75493b",
//         answear: "Rápida",
//       },
//       {
//         questionId: "2e13670b-0f43-4fc7-973c-2d6f7228fc06",
//         answear: "Com certeza recomendaria",
//       },
//       {
//         questionId: "ad30e74d-822d-4906-ba72-412e560c6cda",
//         answear: "Tive problemas leves",
//       },
//       {
//         questionId: "d6158888-bae1-42a4-97e4-58476c669f7e",
//         answear: "Muito Bom",
//       },
//       { questionId: "ad917ccb-163a-419b-bf82-049d8db8de65", answear: "3" },
//     ],
//   },
//   {
//     name: "SjfuuICJ",
//     answears: [
//       { questionId: "d0fbc096-828e-45f3-8b9c-0d5172dfa549", answear: "Bom" },
//       {
//         questionId: "f63b0547-94ff-4d72-9d3e-275babe9f140",
//         answear: "Não atendeu",
//       },
//       {
//         questionId: "2714bea8-aa67-421f-bd85-11cb248975d0",
//         answear: "Muito Barato",
//       },
//       {
//         questionId: "568dc2ec-dece-492f-9453-ce725c75493b",
//         answear: "Regular",
//       },
//       {
//         questionId: "2e13670b-0f43-4fc7-973c-2d6f7228fc06",
//         answear: "Recomendaria",
//       },
//       {
//         questionId: "ad30e74d-822d-4906-ba72-412e560c6cda",
//         answear: "Tive dificuldades",
//       },
//       {
//         questionId: "d6158888-bae1-42a4-97e4-58476c669f7e",
//         answear: "Muito Bom",
//       },
//       { questionId: "ad917ccb-163a-419b-bf82-049d8db8de65", answear: "2" },
//     ],
//   },
//   {
//     name: "LbnNYVtJ",
//     answears: [
//       { questionId: "d0fbc096-828e-45f3-8b9c-0d5172dfa549", answear: "Bom" },
//       {
//         questionId: "f63b0547-94ff-4d72-9d3e-275babe9f140",
//         answear: "Superou as expectativas",
//       },
//       {
//         questionId: "2714bea8-aa67-421f-bd85-11cb248975d0",
//         answear: "Preço Justo",
//       },
//       {
//         questionId: "568dc2ec-dece-492f-9453-ce725c75493b",
//         answear: "Lenta",
//       },
//       {
//         questionId: "2e13670b-0f43-4fc7-973c-2d6f7228fc06",
//         answear: "Com certeza recomendaria",
//       },
//       {
//         questionId: "ad30e74d-822d-4906-ba72-412e560c6cda",
//         answear: "Tive dificuldades",
//       },
//       {
//         questionId: "d6158888-bae1-42a4-97e4-58476c669f7e",
//         answear: "Muito Ruim",
//       },
//       { questionId: "ad917ccb-163a-419b-bf82-049d8db8de65", answear: "3" },
//     ],
//   },
//   {
//     name: "xcyuZCgu",
//     answears: [
//       {
//         questionId: "d0fbc096-828e-45f3-8b9c-0d5172dfa549",
//         answear: "Regular",
//       },
//       {
//         questionId: "f63b0547-94ff-4d72-9d3e-275babe9f140",
//         answear: "Superou as expectativas",
//       },
//       {
//         questionId: "2714bea8-aa67-421f-bd85-11cb248975d0",
//         answear: "Preço Justo",
//       },
//       {
//         questionId: "568dc2ec-dece-492f-9453-ce725c75493b",
//         answear: "Regular",
//       },
//       {
//         questionId: "2e13670b-0f43-4fc7-973c-2d6f7228fc06",
//         answear: "Com certeza recomendaria",
//       },
//       {
//         questionId: "ad30e74d-822d-4906-ba72-412e560c6cda",
//         answear: "Não tive problemas",
//       },
//       {
//         questionId: "d6158888-bae1-42a4-97e4-58476c669f7e",
//         answear: "Ruim",
//       },
//       { questionId: "ad917ccb-163a-419b-bf82-049d8db8de65", answear: "3" },
//     ],
//   },
//   {
//     name: "ivKoYAGn",
//     answears: [
//       { questionId: "d0fbc096-828e-45f3-8b9c-0d5172dfa549", answear: "Bom" },
//       {
//         questionId: "f63b0547-94ff-4d72-9d3e-275babe9f140",
//         answear: "Superou as expectativas",
//       },
//       {
//         questionId: "2714bea8-aa67-421f-bd85-11cb248975d0",
//         answear: "Barato",
//       },
//       {
//         questionId: "568dc2ec-dece-492f-9453-ce725c75493b",
//         answear: "Lenta",
//       },
//       {
//         questionId: "2e13670b-0f43-4fc7-973c-2d6f7228fc06",
//         answear: "Poderia recomendar",
//       },
//       {
//         questionId: "ad30e74d-822d-4906-ba72-412e560c6cda",
//         answear: "Tive dificuldades",
//       },
//       {
//         questionId: "d6158888-bae1-42a4-97e4-58476c669f7e",
//         answear: "Muito Bom",
//       },
//       { questionId: "ad917ccb-163a-419b-bf82-049d8db8de65", answear: "2" },
//     ],
//   },
//   {
//     name: "PqpUrlRz",
//     answears: [
//       {
//         questionId: "d0fbc096-828e-45f3-8b9c-0d5172dfa549",
//         answear: "Ruim",
//       },
//       {
//         questionId: "f63b0547-94ff-4d72-9d3e-275babe9f140",
//         answear: "Parcialmente atendeu",
//       },
//       {
//         questionId: "2714bea8-aa67-421f-bd85-11cb248975d0",
//         answear: "Preço Justo",
//       },
//       {
//         questionId: "568dc2ec-dece-492f-9453-ce725c75493b",
//         answear: "Muito Rápida",
//       },
//       {
//         questionId: "2e13670b-0f43-4fc7-973c-2d6f7228fc06",
//         answear: "Com certeza recomendaria",
//       },
//       {
//         questionId: "ad30e74d-822d-4906-ba72-412e560c6cda",
//         answear: "Tive problemas leves",
//       },
//       {
//         questionId: "d6158888-bae1-42a4-97e4-58476c669f7e",
//         answear: "Muito Ruim",
//       },
//       { questionId: "ad917ccb-163a-419b-bf82-049d8db8de65", answear: "4" },
//     ],
//   },
//   {
//     name: "WqJiBrRo",
//     answears: [
//       {
//         questionId: "d0fbc096-828e-45f3-8b9c-0d5172dfa549",
//         answear: "Ruim",
//       },
//       {
//         questionId: "f63b0547-94ff-4d72-9d3e-275babe9f140",
//         answear: "Não atendeu",
//       },
//       {
//         questionId: "2714bea8-aa67-421f-bd85-11cb248975d0",
//         answear: "Muito Caro",
//       },
//       {
//         questionId: "568dc2ec-dece-492f-9453-ce725c75493b",
//         answear: "Muito Lenta",
//       },
//       {
//         questionId: "2e13670b-0f43-4fc7-973c-2d6f7228fc06",
//         answear: "Com certeza recomendaria",
//       },
//       {
//         questionId: "ad30e74d-822d-4906-ba72-412e560c6cda",
//         answear: "Tive problemas leves",
//       },
//       {
//         questionId: "d6158888-bae1-42a4-97e4-58476c669f7e",
//         answear: "Ruim",
//       },
//       { questionId: "ad917ccb-163a-419b-bf82-049d8db8de65", answear: "5" },
//     ],
//   },
//   {
//     name: "NodhsrcX",
//     answears: [
//       {
//         questionId: "d0fbc096-828e-45f3-8b9c-0d5172dfa549",
//         answear: "Muito Ruim",
//       },
//       {
//         questionId: "f63b0547-94ff-4d72-9d3e-275babe9f140",
//         answear: "Parcialmente atendeu",
//       },
//       {
//         questionId: "2714bea8-aa67-421f-bd85-11cb248975d0",
//         answear: "Caro",
//       },
//       {
//         questionId: "568dc2ec-dece-492f-9453-ce725c75493b",
//         answear: "Rápida",
//       },
//       {
//         questionId: "2e13670b-0f43-4fc7-973c-2d6f7228fc06",
//         answear: "Poderia recomendar",
//       },
//       {
//         questionId: "ad30e74d-822d-4906-ba72-412e560c6cda",
//         answear: "Tive problemas graves",
//       },
//       { questionId: "d6158888-bae1-42a4-97e4-58476c669f7e", answear: "Bom" },
//       { questionId: "ad917ccb-163a-419b-bf82-049d8db8de65", answear: "2" },
//     ],
//   },
//   {
//     name: "hqnVMnuO",
//     answears: [
//       {
//         questionId: "d0fbc096-828e-45f3-8b9c-0d5172dfa549",
//         answear: "Muito Bom",
//       },
//       {
//         questionId: "f63b0547-94ff-4d72-9d3e-275babe9f140",
//         answear: "Atendeu",
//       },
//       {
//         questionId: "2714bea8-aa67-421f-bd85-11cb248975d0",
//         answear: "Muito Barato",
//       },
//       {
//         questionId: "568dc2ec-dece-492f-9453-ce725c75493b",
//         answear: "Lenta",
//       },
//       {
//         questionId: "2e13670b-0f43-4fc7-973c-2d6f7228fc06",
//         answear: "Poderia recomendar",
//       },
//       {
//         questionId: "ad30e74d-822d-4906-ba72-412e560c6cda",
//         answear: "Não tive problemas",
//       },
//       { questionId: "d6158888-bae1-42a4-97e4-58476c669f7e", answear: "Bom" },
//       { questionId: "ad917ccb-163a-419b-bf82-049d8db8de65", answear: "5" },
//     ],
//   },
// ];

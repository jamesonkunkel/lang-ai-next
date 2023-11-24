import type { NextApiRequest, NextApiResponse } from "next";

import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: "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",
});

const verbSchema = {
  type: "object",
  description:
    "A schema analyzing the verb and noun contents of a prompted Spanish sentence. Contains the infinitive forms of each verb in the sentence and its conjugations in the present, imperfect past, and preterite tenses. Contains a translation of the sentence in English and the English translations of each noun in the sentence.",
  properties: {
    sentence: {
      type: "string",
      description: "A sentence to analyze.",
    },
    translatedSentence: {
      type: "string",
      description: "The English translation of the sentence to be analyzed.",
    },
    nouns: {
      type: "array",
      description:
        "An array of nouns to be analyzed. These are to be identified from the prompt sentence",
      items: {
        type: "object",
        properties: {
          noun: {
            type: "string",
            description: "The Spanish noun to be translated",
          },
          translation: {
            type: "string",
            description: "The English translation of the noun",
          },
        },
        required: ["noun", "translation"],
      },
    },
    verbs: {
      type: "array",
      description:
        "An array of verbs to be analyzed. These are to be identified from the prompt sentence",
      items: {
        type: "object",
        description:
          "Each item is a verb to be analyzed from the prompt with an infinitive and conjugations in the present, imperfect past, and preterite tenses.",
        properties: {
          infinitive: {
            type: "string",
            description: "The infinitive form of the verb",
          },
          conjugations: {
            type: "object",
            properties: {
              present: {
                type: "object",
                description:
                  "The conjugations of the verb in the present tense",
                properties: {
                  yo: { type: "string" },
                  tu: { type: "string" },
                  el: { type: "string" },
                  nosotros: { type: "string" },
                  vosotros: { type: "string" },
                  ellos: { type: "string" },
                },
                required: ["yo", "tu", "el", "nosotros", "vosotros", "ellos"],
              },
              imperfect: {
                type: "object",
                description:
                  "The conjugations of the verb in the imperfect past tense",
                properties: {
                  yo: { type: "string" },
                  tu: { type: "string" },
                  el: { type: "string" },
                  nosotros: { type: "string" },
                  vosotros: { type: "string" },
                  ellos: { type: "string" },
                },
                required: ["yo", "tu", "el", "nosotros", "vosotros", "ellos"],
              },
              preterite: {
                type: "object",
                description:
                  "The conjugations of the verb in the preterite tense",
                properties: {
                  yo: { type: "string" },
                  tu: { type: "string" },
                  el: { type: "string" },
                  nosotros: { type: "string" },
                  vosotros: { type: "string" },
                  ellos: { type: "string" },
                },
                required: ["yo", "tu", "el", "nosotros", "vosotros", "ellos"],
              },
            },
            required: ["present", "imperfect", "preterite"],
          },
        },
        required: ["infinitive", "conjugations"],
      },
    },
  },
  required: ["sentence", "translatedSentence", "nouns", "verbs"],
};

interface TranslationObject {
  success: boolean;
  translation?: any;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const prompt = req.body.prompt;

  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo-1106",
    response_format: { type: "json_object" },
    messages: [
      {
        role: "system",
        content:
          "You are a helpful assistant. You provide the parameters required in the schema you are given in JSON format. You translate a spanish sentence, identify the verbs in it and then provide the parameters in the verb schema. If you encounter the same verb written with a different conjugation, you can use the same verb object and just add the new conjugation. Similarily, if you encounter the same noun more than once, you can use the same noun object rather than creating a new one.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
    functions: [
      {
        name: "find_verbs",
        description:
          "Find all the verbs in a Spanish sentence and return their conjugations in the present, imperfect past, and preterite tenses according to the schema provided.",
        parameters: verbSchema,
      },
    ],
    function_call: { name: "find_verbs" },
    temperature: 0,
  });

  if (completion) {
    console.log(completion.choices[0].message.function_call?.arguments);

    if (completion.choices[0].message.function_call?.arguments !== undefined) {
      // create a new translation object
      const translationObject: TranslationObject = {
        success: true,
        translation: JSON.parse(
          completion.choices[0].message.function_call?.arguments
        ),
      };

      res.status(200).json(translationObject);
    } else {
      res.status(500).json({ success: false });
    }
  } else {
    res.status(500).json({ success: false });
  }
}

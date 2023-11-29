import type { NextApiRequest, NextApiResponse } from "next";

import OpenAI from "openai";
import Ajv from "ajv";

//import types
import type {
  TranslationResponseObject,
  TranslationObject,
} from "@/types/translationTypes";

const ajv = new Ajv();

const openai = new OpenAI({
  apiKey: process.env.API_KEY,
});

const translationSchema = {
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
            description: "The infinitive form of the verb in Spanish.",
          },
          translation: {
            type: "string",
            description:
              "The English translation of the verb with 'to' in front of it. Example: 'to be'",
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
        required: ["infinitive", "translation", "conjugations"],
      },
    },
  },
  required: ["sentence", "translatedSentence", "nouns", "verbs"],
};

const translationSchemaBlog = {
  type: "object",
  description:
    "A schema analyzing the verb and noun contents of a prompted Spanish sentence. Contains the infinitive forms of each verb in the sentence and its conjugations in the presenttense. Contains a translation of the sentence in English and the English translations of each noun in the sentence.",
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
          "Each item is a verb to be analyzed from the prompt with an infinitive form and conjugations in the present tense.",
        properties: {
          infinitive: {
            type: "string",
            description: "The infinitive form of the verb in Spanish.",
          },
          translation: {
            type: "string",
            description:
              "The English translation of the verb with 'to' in front of it. Example: 'to be'",
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
            },
            required: ["present"],
          },
        },
        required: ["infinitive", "translation", "conjugations"],
      },
    },
  },
  required: ["sentence", "translatedSentence", "nouns", "verbs"],
};

const validate = ajv.compile(translationSchema);

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
        content: "You are a helpful assistant that returns JSON.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
    functions: [
      {
        name: "translate",
        description:
          "Find all the verbs in a Spanish sentence and return their conjugations in the present, imperfect past, and preterite tenses according to the schema provided.",
        parameters: translationSchema,
      },
    ],
    function_call: { name: "translate" },
    temperature: 0,
  });

  try {
    const functionCall = completion.choices[0].message.function_call;

    if (functionCall) {
      const argumentsJSON: TranslationObject = JSON.parse(
        functionCall?.arguments
      );

      console.log(argumentsJSON);

      // Validate the arguments
      const isValid = validate(argumentsJSON);

      if (!isValid) {
        return res.status(500).json({ success: false });
      }

      // Create a new translation object
      const translationObject: TranslationResponseObject = {
        success: true,
        translation: argumentsJSON,
      };

      return res.status(200).json(translationObject);
    }

    return res.status(500).json({ success: false });
  } catch (error) {
    throw error;
  }
}

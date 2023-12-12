This is a simple demo using the OpenAI API's function-calling feature to translate plain text English into its Spanish translation while extracting each noun and verb individually for translation and conjugation. The demo was built using NextJS and includes calls to the OpenAI API through the builtin NextJS API layer. Feel free to try setting up the demo on your machine to experiment with the function call feature in the OpenAI API. I wrote an article about this project on DEV.to [here](https://dev.to/jamesonkunkel/building-an-ai-translation-app-with-nextjs-by-extracting-json-from-openais-api-2nd7).

## Setting Up The Demo (Example Using NPM)
First, install all project dependencies. 

```bash
npm install
```

Then, acquire a valid OpenAI API testing key after logging in [here](https://platform.openai.com/api-keys) and create an `.env.local` file in the root directory of the project with the key as a local variable:

```bash
API_KEY="YOUR_KEY_HERE"
```

Finally, launch the development environment,

```bash
npm run dev
```
<img width="1790" alt="Screenshot 2023-11-23 at 10 06 16 PM" src="https://github.com/jamesonkunkel/lang-ai-next/assets/125910845/4f4c2d1f-5796-47ae-851e-f4bdc4b642e4">

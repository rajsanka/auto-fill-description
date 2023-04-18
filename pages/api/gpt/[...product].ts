import type { NextApiRequest, NextApiResponse } from 'next'

const openaifetcher=async (prompt: String) : Promise<String> => {
    const { Configuration, OpenAIApi } = require("openai");

    const configuration = new Configuration({
        apiKey: '<Your OpenAI key>',
    });
    const openai = new OpenAIApi(configuration);

    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{role: "user", content: prompt }],
    });

    return completion.data.choices[0].message.content;
}

type Completion = {
  description: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Completion>
) {
    const { query } = req;
    const { product : [name, slug, description, price, variants] } = query;

    let prompt = `"A marketing description for "`;

    if (variants) {
        prompt += `" a ${variants} "`;
    }

    prompt += `" ${name} "`;

    if (price) {
        prompt += `" costing ${price}"`;
    }

    if (description) {
        prompt += `". Start with this description: ${description}."`;
    }

    openaifetcher(prompt).then((description) => {
        res.status(200).json(`${description}`);
    });
}


import { client } from "./client.js";


async function main(c) {
    const messages = [{ "role": "user", "content": "What's the weather like in Boston today?" }];
    const tools = [
        {
            "type": "function",
            "function": {
                "name": "get_current_weather",
                "description": "Get the current weather in a given location",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "location": {
                            "type": "string",
                            "description": "The city and state, e.g. San Francisco, CA",
                        },
                        "unit": { "type": "string", "enum": ["celsius", "fahrenheit"] },
                    },
                    "required": ["location"],
                },
            }
        }
    ];

    const response = await c.chat.completions.create({
        model: "gpt-4o",
        messages: messages,
        tools: tools,
        tool_choice: "auto",
    });

    console.log(response);
}

main(client);
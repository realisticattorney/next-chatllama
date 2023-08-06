// app/api/chat/route.ts
import {
  AIStream,
  StreamingTextResponse,
  AIStreamCallbacks,
  AIStreamParser,
} from "ai";

export const runtime = "edge";

// Build a prompt from the messages
function buildPrompt(
  messages: { content: string; role: "system" | "user" | "assistant" }[]
) {
  return (
    messages
      .map(({ content, role }) => {
        if (role === "user") {
          return `Human: ${content}`;
        } else {
          return `Assistant: ${content}`;
        }
      })
      .join("\n\n") + "Assistant:"
  );
}

export function LlamaStream(
  res: Response,
  cb?: AIStreamCallbacks
): ReadableStream {
  console.log("LlamaStream");
  return AIStream(res, parseLlamaStream(), cb);
}

function parseLlamaStream(): AIStreamParser {
  console.log("parseLlamaStream");
  return (data) => {
    console.log("Received", data);
    // const json = JSON.parse(data) as {
    //   id: string;
    //   object: string;
    //   created: number;
    //   model: string;
    //   choices: [
    //     {
    //       text: string;
    //       index: number;
    //       logprobs: null;
    //       finish_reason: string;
    //     }
    //   ];
    // };
    return data;
  };
}

export async function POST(req: Request) {
  // Extract the `messages` from the body of the request
  const { messages } = await req.json();

  const response = await fetch("http://localhost:8080/completion", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prompt: buildPrompt(messages), stream: true }),
  });

  // Create a TransformStream to leave the Uint8Array chunks unchanged
  const transformStream = new TransformStream();

  // Pipe the readable stream through the transform stream
  response.body.pipeThrough(transformStream);

  // Respond with the transformed stream
  return new StreamingTextResponse(transformStream.readable);
}
// {"content":"","generation_settings":{"frequency_penalty":0.0,"ignore_eos":false,"logit_bias":[],"mirostat":0,"mirostat_eta":0.10000000149011612,"mirostat_tau":5.0,"model":"llama-2-13b-chat.ggmlv3.q4_0.bin","n_ctx":2048,"n_keep":0,"n_predict":-1,"n_probs":0,"penalize_nl":true,"presence_penalty":0.0,"repeat_last_n":64,"repeat_penalty":1.100000023841858,"seed":4294967295,"stop":[],"stream":true,"temp":0.800000011920929,"tfs_z":1.0,"top_k":40,"top_p":0.949999988079071,"typical_p":1.0},"model":"llama-2-13b-chat.ggmlv3.q4_0.bin","prompt":" Human: fafafaAssistant:","stop":true,"stopped_eos":true,"stopped_limit":false,"stopped_word":false,"stopping_word":"","timings":{"predicted_ms":14442.482,"predicted_n":383,"predicted_per_second":26.51898752582832,"predicted_per_token_ms":37.70883028720627,"prompt_ms":3681.395,"prompt_n":383,"prompt_per_second":1.6298169579738115,"prompt_per_token_ms":613.5658333333333},"tokens_cached":393,"tokens_evaluated":10,"tokens_predicted":384,"truncated":false}

`
AI: data: {"content":" Hello","stop":false} data: {"content":"!","stop":false} data: {"content":" How","stop":false} data: {"content":" can","stop":false} data: {"content":" I","stop":false} data: {"content":" help","stop":false} data: {"content":" you","stop":false} data: {"content":" today","stop":false} data: {"content":"?","stop":false} data: {"content":" Are","stop":false} data: {"content":" you","stop":false} data: {"content":" looking","stop":false} data: {"content":" for","stop":false} data: {"content":" something","stop":false} data: {"content":" specific","stop":false} data: {"content":" or","stop":false} data: {"content":" just","stop":false} data: {"content":" need","stop":false} data: {"content":" some","stop":false} data: {"content":" assistance","stop":false} data: {"content":"?","stop":false} data: {"content":"","generation_settings":{"frequency_penalty":0.0,"ignore_eos":false,"logit_bias":[],"mirostat":0,"mirostat_eta":0.10000000149011612,"mirostat_tau":5.0,"model":"llama-2-13b-chat.ggmlv3.q4_0.bin","n_ctx":2048,"n_keep":0,"n_predict":-1,"n_probs":0,"penalize_nl":true,"presence_penalty":0.0,"repeat_last_n":64,"repeat_penalty":1.100000023841858,"seed":4294967295,"stop":[],"stream":true,"temp":0.800000011920929,"tfs_z":1.0,"top_k":40,"top_p":0.949999988079071,"typical_p":1.0},"model":"llama-2-13b-chat.ggmlv3.q4_0.bin","prompt":" Human: fafafa\n\nHuman: fafafaAssistant:","stop":true,"stopped_eos":true,"stopped_limit":false,"stopped_word":false,"stopping_word":"","timings":{"predicted_ms":1138.609,"predicted_n":21,"predicted_per_second":18.44355700683905,"predicted_per_token_ms":54.219476190476186,"prompt_ms":4086.773,"prompt_n":21,"prompt_per_second":2.9363020652235883,"prompt_per_token_ms":340.56441666666666},"tokens_cached":40,"tokens_evaluated":19,"tokens_predicted":22,"truncated":false}
`;

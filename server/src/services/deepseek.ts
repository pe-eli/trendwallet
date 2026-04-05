import axios from "axios";
import { PortfolioToken } from "../types";

const DEEPSEEK_BASE_URL =
  process.env.DEEPSEEK_BASE_URL || "https://api.deepseek.com";

export async function generateInsights(
  tokens: PortfolioToken[],
  totalValue: number
): Promise<string> {
  const apiKey = process.env.DEEPSEEK_API_KEY;
  if (!apiKey) {
    throw new Error("DEEPSEEK_API_KEY is not configured");
  }

  const portfolioSummary = tokens
    .map(
      (t) =>
        `${t.symbol.toUpperCase()}: balance ${t.balance.toFixed(4)}, price $${t.price.toFixed(2)}, 24h change ${t.change24h.toFixed(2)}%, value $${t.value.toFixed(2)}`
    )
    .join("\n");

  const prompt = `Analyze this crypto portfolio and generate concise insights for a user. Focus on trends, risks, and opportunities.

Portfolio total value: $${totalValue.toFixed(2)}

Holdings:
${portfolioSummary}

Provide a brief, actionable analysis in 3-5 sentences. Be specific about which tokens are driving gains or losses. Mention any notable market trends.`;

  const { data } = await axios.post(
    `${DEEPSEEK_BASE_URL}/v1/chat/completions`,
    {
      model: "deepseek-chat",
      messages: [
        {
          role: "system",
          content:
            "You are a crypto portfolio analyst. Provide concise, data-driven insights about the user's holdings. Be direct and actionable. Do not include disclaimers about financial advice.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 300,
    },
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
    }
  );

  return data.choices[0].message.content;
}

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

  const prompt = `Analise este portfolio de criptomoedas e gere insights concisos para o usuario. Foque em tendencias, riscos e oportunidades.

Valor total do portfolio: $${totalValue.toFixed(2)}

Posicoes:
${portfolioSummary}

Responda em portugues do Brasil, com linguagem clara e objetiva, em 3-5 frases. Seja especifico sobre quais tokens estao puxando ganhos ou perdas. Mencione tendencias de mercado relevantes.`;

  const { data } = await axios.post(
    `${DEEPSEEK_BASE_URL}/v1/chat/completions`,
    {
      model: "deepseek-chat",
      messages: [
        {
          role: "system",
          content:
            "Voce e um analista de portfolio cripto. Responda sempre em portugues do Brasil. Forneca insights curtos, orientados por dados, diretos e acionaveis sobre as posicoes do usuario. Nao inclua avisos genericos sobre aconselhamento financeiro.",
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

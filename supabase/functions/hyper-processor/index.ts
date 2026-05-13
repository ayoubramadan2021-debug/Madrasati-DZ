Deno.serve(async (req) => {
  try {
    if (req.method === "OPTIONS") {
      return new Response("ok", {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
        },
      });
    }

    const { message } = await req.json();
    const apiKey = Deno.env.get("XAI_API_KEY");

    if (!apiKey) {
      return new Response(JSON.stringify({ error: "XAI_API_KEY missing" }), {
        status: 500,
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
      });
    }

    const xaiResponse = await fetch("https://api.x.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "grok-2-latest",
        messages: [
          {
            role: "system",
            content: "أنت مساعد تعليمي ذكي لتلاميذ المرحلة الابتدائية في الجزائر. أجب بالعربية البسيطة وبأسلوب تربوي قصير.",
          },
          {
            role: "user",
            content: message,
          },
        ],
      }),
    });

    const result = await xaiResponse.json();

    if (!xaiResponse.ok) {
      return new Response(JSON.stringify(result), {
        status: xaiResponse.status,
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
      });
    }

    const reply = result.choices?.[0]?.message?.content || "لم أستطع إنشاء إجابة.";

    return new Response(JSON.stringify({ reply }), {
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: String(error) }), {
      status: 500,
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
    });
  }
});

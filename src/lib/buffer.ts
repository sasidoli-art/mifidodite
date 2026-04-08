// ============================================
// Buffer API client — auto-publishing
// https://developers.buffer.com (GraphQL)
// ============================================

const BUFFER_API_URL = "https://api.buffer.com";

interface BufferGraphQLResponse<T> {
  data?: T;
  errors?: Array<{ message: string }>;
}

async function bufferQuery<T>(query: string, variables?: Record<string, unknown>): Promise<T> {
  const apiKey = process.env.BUFFER_API_KEY;
  if (!apiKey) throw new Error("BUFFER_API_KEY mancante");

  const res = await fetch(BUFFER_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!res.ok) {
    throw new Error(`Buffer HTTP ${res.status}: ${await res.text()}`);
  }

  const json = (await res.json()) as BufferGraphQLResponse<T>;
  if (json.errors && json.errors.length > 0) {
    throw new Error(`Buffer error: ${json.errors.map((e) => e.message).join(", ")}`);
  }
  if (!json.data) throw new Error("Buffer: nessun dato nella risposta");
  return json.data;
}

/**
 * Recupera info account + canali collegati.
 */
export async function getBufferAccount() {
  const data = await bufferQuery<{
    account: {
      organizations: Array<{
        id: string;
        name: string;
        channels: Array<{ id: string; name: string; service: string }>;
      }>;
    };
  }>(`query { account { organizations { id name channels { id name service } } } }`);
  return data.account;
}

/**
 * Crea un post Buffer per un canale (Instagram, Facebook, ecc.)
 *
 * mode (ShareMode):
 *   - addToQueue       → Buffer mette in coda al prossimo slot del calendario
 *   - shareNow         → pubblica subito
 *   - shareNext        → primo slot disponibile
 *   - customScheduled  → data/ora specifica (richiede dueAt)
 *   - recommendedTime  → ora consigliata
 *
 * schedulingType:
 *   - automatic     → Buffer pubblica via API quando possibile
 *   - notification  → manda notifica push al telefono per pubblicazione manuale
 *                     (Instagram Free Buffer richiede questo)
 */
type BufferShareMode = "addToQueue" | "shareNow" | "shareNext" | "customScheduled" | "recommendedTime";
type BufferSchedulingType = "automatic" | "notification";
type BufferPostType = "post" | "reel" | "story" | "carousel";

interface BufferCreateResult {
  __typename: string;
  post?: { id: string; status: string; text: string };
  message?: string;
}

export async function createBufferPost(params: {
  channelId: string;
  text: string;
  imageUrl?: string;
  mode?: BufferShareMode;
  schedulingType?: BufferSchedulingType;
  dueAt?: string;
  platform?: "instagram" | "facebook" | "linkedin" | "pinterest";
  postType?: BufferPostType;
}): Promise<{ id: string; status: string; text: string }> {
  const mutation = `
    mutation CreatePost($input: CreatePostInput!) {
      createPost(input: $input) {
        __typename
        ... on PostActionSuccess { post { id status text } }
        ... on InvalidInputError { message }
        ... on UnauthorizedError { message }
        ... on UnexpectedError { message }
        ... on LimitReachedError { message }
      }
    }
  `;

  const input: Record<string, unknown> = {
    channelId: params.channelId,
    text: params.text,
    mode: params.mode || "addToQueue",
    schedulingType: params.schedulingType || "notification",
    source: "mifidodite-auto",
  };

  // Metadata specifico per piattaforma
  const platform = params.platform || "instagram";
  if (platform === "instagram") {
    input.metadata = {
      instagram: {
        type: params.postType || "post",
        shouldShareToFeed: true,
      },
    };
  }

  if (params.imageUrl) {
    input.assets = {
      images: [{ url: params.imageUrl }],
    };
  }

  if (params.dueAt) input.dueAt = params.dueAt;

  const data = await bufferQuery<{ createPost: BufferCreateResult }>(mutation, { input });
  const result = data.createPost;

  if (result.__typename !== "PostActionSuccess" || !result.post) {
    throw new Error(`Buffer ${result.__typename}: ${result.message || "errore sconosciuto"}`);
  }

  return result.post;
}

/**
 * Helper: pubblica direttamente su Instagram (canale di MifidoDiTe).
 * Usa "addToQueue" → Buffer aggiunge al prossimo slot disponibile.
 * Usa "notification" → manda notifica push (per Instagram Free Buffer e necessario).
 */
export async function postToInstagram(text: string, imageUrl?: string): Promise<{ id: string; status: string; text: string }> {
  const channelId = process.env.BUFFER_CHANNEL_INSTAGRAM;
  if (!channelId) throw new Error("BUFFER_CHANNEL_INSTAGRAM mancante");

  return createBufferPost({
    channelId,
    text,
    imageUrl,
    platform: "instagram",
    postType: "post",
    mode: "addToQueue",
    schedulingType: "notification",
  });
}

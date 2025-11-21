import { oauth2Config } from "@/auth.config";

export const exchangeCodeForToken = async (
  code: string,
  codeVerifier: string
) => {
  const params = new URLSearchParams({
    grant_type: "authorization_code",
    code,
    client_id: oauth2Config.appId,
    redirect_uri: oauth2Config.redirectUrl,
    code_verifier: codeVerifier,
  });

  const res = await fetch(oauth2Config.tokenExchangeUrl, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params,
  });

  const json = await res.json();

  if (!json.id_token) throw new Error("No id_token returned by B2C");

  return json;
};

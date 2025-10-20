const headers = { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' };
export const ok = (data: unknown) => ({ statusCode: 200, headers, body: JSON.stringify(data) });
export const badRequest = (m: string) => ({ statusCode: 400, headers, body: JSON.stringify({ error: m }) });
export const notFound = (m: string) => ({ statusCode: 404, headers, body: JSON.stringify({ error: m }) });
export const conflict = (m: string) => ({ statusCode: 409, headers, body: JSON.stringify({ error: m }) });
export const serverError = () => ({ statusCode: 500, headers, body: JSON.stringify({ error: 'Internal Server Error' }) });

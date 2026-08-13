import { describe, expect, it } from "vitest";
import { POST } from "./route";

describe("POST /api/consulta", () => {
  it("400 si el body no es JSON", async () => {
    const res = await POST(new Request("http://localhost/api/consulta", { method: "POST", body: "no-json" }));
    expect(res.status).toBe(400);
  });

  it("400 si faltan campos", async () => {
    const res = await POST(
      new Request("http://localhost/api/consulta", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ tipo: "newsletter", nombre: "", email: "" }),
      }),
    );
    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.ok).toBe(false);
    expect(json.errors.email).toBeTruthy();
  });

  it("200 queued cuando no hay canales", async () => {
    const res = await POST(
      new Request("http://localhost/api/consulta", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          tipo: "newsletter",
          nombre: "Ana",
          email: "ana@acme.com",
          sector: "metalúrgica",
        }),
      }),
    );
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: true, queued: true });
  });
});

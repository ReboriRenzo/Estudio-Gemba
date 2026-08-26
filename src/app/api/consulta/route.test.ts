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

  it("200 mailto al boletín cuando hay email y no hay Resend", async () => {
    const res = await POST(
      new Request("http://localhost/api/consulta", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          tipo: "newsletter",
          nombre: "Ana",
          email: "ana@acme.com",
          sector: "metalúrgica",
          preferencia: "email",
        }),
      }),
    );
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.ok).toBe(true);
    expect(json.mailtoUrl).toContain("mailto:industria@firmind.com.ar");
  });

  it("503 en consulta si no hay Resend", async () => {
    const res = await POST(
      new Request("http://localhost/api/consulta", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          tipo: "consulta",
          empresa: "Acme SA",
          nombre: "Ana Pérez",
          email: "ana@acme.com",
          mensaje: "Consulta sobre OEE.",
        }),
      }),
    );
    expect(res.status).toBe(503);
    const json = await res.json();
    expect(json.ok).toBe(false);
  });
});

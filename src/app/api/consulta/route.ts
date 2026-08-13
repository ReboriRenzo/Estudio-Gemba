import { NextResponse } from "next/server";
import { contacto } from "@/lib/contacto";
import {
  resolverEnvio,
  validateConsulta,
  type SendEmail,
} from "@/lib/consulta";

function sendEmailFromEnv(): SendEmail | undefined {
  const key = process.env.RESEND_API_KEY;
  if (!key || !contacto.email.trim()) return undefined;
  return async ({ to, subject, text }) => {
    const { Resend } = await import("resend");
    const resend = new Resend(key);
    const result = await resend.emails.send({
      from: `Estudio Gemba <${contacto.email.trim()}>`,
      to,
      subject,
      text,
    });
    if (result.error) throw new Error(result.error.message);
  };
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, errors: { _form: "No pudimos leer la consulta." } },
      { status: 400 },
    );
  }

  const parsed = validateConsulta(body);
  if (!parsed.ok) {
    return NextResponse.json({ ok: false, errors: parsed.errors }, { status: 400 });
  }

  const result = await resolverEnvio(parsed.data, contacto, {
    sendEmail: sendEmailFromEnv(),
    log: (data) => console.info("[consulta queued]", data),
  });

  if (result.kind === "provider_error") {
    return NextResponse.json(
      {
        ok: false,
        message:
          "No pudimos enviar la consulta. Reintentá o escribinos cuando publiquemos el email.",
      },
      { status: 503 },
    );
  }
  if (result.kind === "whatsapp") {
    return NextResponse.json({ ok: true, whatsappUrl: result.url });
  }
  if (result.kind === "mailto") {
    return NextResponse.json({ ok: true, mailtoUrl: result.url });
  }
  if (result.kind === "emailed") {
    return NextResponse.json({ ok: true, emailed: true });
  }
  return NextResponse.json({ ok: true, queued: true });
}

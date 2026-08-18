import { NextResponse } from "next/server";
import {
  leerBytesArchivo,
  leerNoticias,
  tipoMimeArchivo,
} from "@/lib/boletin-archivo";

type Props = { params: Promise<{ nombre: string }> };

function disposition(nombre: string) {
  const seguro = nombre.replace(/[\r\n"]/g, "_");
  return `attachment; filename="${seguro}"`;
}

export async function GET(_request: Request, { params }: Props) {
  const { nombre } = await params;
  const bytes = await leerBytesArchivo(nombre);
  if (!bytes) {
    return new NextResponse("No encontrado", { status: 404 });
  }

  const noticias = await leerNoticias();
  const item = noticias.find((n) => n.url.endsWith(`/${nombre}`));

  return new NextResponse(new Uint8Array(bytes), {
    headers: {
      "Content-Type": tipoMimeArchivo(item?.nombreArchivo || nombre),
      "Content-Disposition": disposition(item?.nombreArchivo || nombre),
      "Cache-Control": "private, max-age=0, must-revalidate",
    },
  });
}

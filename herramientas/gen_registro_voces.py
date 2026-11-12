#!/usr/bin/env python3
"""Genera (o actualiza) contenido/voces/autores.json a partir del registro central contenido/mapa_autores.json.

Se ejecuta una sola vez para crear el registro, y de nuevo cuando se suman autores al mapa:
conserva las fichas existentes y solo agrega a los autores que todavía no figuran, con estado «pendiente»
y el motivo calculado (derechos de autor vigentes o fuentes por verificar).
"""
import json
import re
from pathlib import Path

RAIZ = Path(__file__).resolve().parent.parent
DESTINO = RAIZ / "contenido/voces/autores.json"
ANIO_ACTUAL = 2026


def muerte(anios):
    """Año de muerte a partir del texto «1856–1939», «c. 50–135», «c. 4 a. C.–65»; None si vive o no se sabe."""
    if "n." in anios or "nacida" in anios or "inciertas" in anios or "formado" in anios:
        return None
    nums = re.findall(r"\d+", anios)
    if not nums:
        return None
    ultimo = int(nums[-1])
    return -ultimo if anios.strip().endswith("a. C.") else ultimo


def motivo(a):
    m = muerte(a["anios"])
    if m is None:
        return "Autor vivo o con fechas inciertas: obra protegida o de autoría difícil de establecer. Requiere decisión editorial."
    if m + 70 >= ANIO_ACTUAL:
        return f"Obra protegida por derechos de autor hasta el {m + 71} (vida + 70 años, Ley 11.723). Pendiente de decisión editorial."
    return "Dominio público. Pendiente: reunir y verificar 50 citas en fuentes primarias."


def main():
    mapa = json.loads((RAIZ / "contenido/mapa_autores.json").read_text(encoding="utf-8"))
    actual = json.loads(DESTINO.read_text(encoding="utf-8")) if DESTINO.exists() else {"autores": [], "descartadas": []}
    conocidos = {a["slug"] for a in actual["autores"]}
    for a in mapa["autores"]:
        if a["slug"] in conocidos:
            continue
        actual["autores"].append({"slug": a["slug"], "estado": "pendiente", "motivo": motivo(a)})
    for a in actual["autores"]:
        if a.get("estado") != "incorporado":
            ref = next((m for m in mapa["autores"] if m["slug"] == a["slug"]), None)
            if ref:
                a["motivo"] = motivo(ref)
    DESTINO.write_text(json.dumps(actual, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")
    print(f"{len(actual['autores'])} autores en el registro de Voces")


if __name__ == "__main__":
    main()

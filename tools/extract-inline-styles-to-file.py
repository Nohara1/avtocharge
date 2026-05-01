#!/usr/bin/env python3
"""Move all <style>...</style> blocks from src/pages/index.html into page-dump CSS file."""
from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
HTML_PATH = ROOT / "src" / "pages" / "index.html"
CSS_PATH = ROOT / "src" / "files" / "page-dump" / "index-inline.css"
LINK_SNIPPET = '<link rel="stylesheet" href="files/page-dump/index-inline.css">\n'
ANCHOR = '<link rel="stylesheet" href="files/page-dump/tw-entry.css">'


def main() -> None:
    html = HTML_PATH.read_text(encoding="utf-8")

    blocks: list[tuple[str, str]] = []
    for m in re.finditer(r"<style([^>]*)>([\s\S]*?)</style>", html):
        attrs = m.group(1).strip()
        body = m.group(2).strip("\n\r\t ")
        blocks.append((attrs, body))

    if not blocks:
        raise SystemExit("No <style> blocks found")

    lines: list[str] = [
        "/* Auto-extracted from src/pages/index.html — do not edit index <style> tags; edit this file */",
        "",
    ]
    for i, (attrs, body) in enumerate(blocks, start=1):
        hdr = f"/* --- block {i}"
        if attrs:
            hdr += f" <style {attrs}>"
        hdr += " --- */"
        lines.append(hdr)
        lines.append(body)
        lines.append("")

    CSS_PATH.parent.mkdir(parents=True, exist_ok=True)
    CSS_PATH.write_text("\n".join(lines), encoding="utf-8", newline="\n")

    html_out = re.sub(r"<style[^>]*>[\s\S]*?</style>\s*", "", html)

    pos = html_out.find(ANCHOR)
    if pos != -1:
        ins = pos + len(ANCHOR)
        html_out = html_out[:ins] + "\n\n" + LINK_SNIPPET + html_out[ins:]
    else:
        he = html_out.find("</head>")
        if he == -1:
            raise SystemExit("Cannot find anchor or </head>")
        html_out = html_out[:he] + LINK_SNIPPET + "\n" + html_out[he:]

    if "<style" in html_out.lower():
        raise SystemExit("Remaining <style in HTML after extraction")

    HTML_PATH.write_text(html_out, encoding="utf-8", newline="\n")
    print(f"Wrote {CSS_PATH.relative_to(ROOT)} ({len(blocks)} blocks)")
    print(f"Updated {HTML_PATH.relative_to(ROOT)}")


if __name__ == "__main__":
    main()

#!/usr/bin/env python3
"""Remove Bitrix24 Site Button / livechat / b24form head scripts and body markup from index.html."""
from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
HTML_PATH = ROOT / "src" / "pages" / "index.html"

HEAD_TAIL = (
    r'<link rel="prefetch" as="script" href="https://smartcaptcha\.yandexcloud\.net[^>]*>'
    r'.*?app\.bundle\.min\.js"></script>'
)

BODY_START = "<body><div></div><div><div>"
BODY_END_PREFIX = '\t</div>\n</div>\n</div>\n'
PAGE_ANCHOR = '    <div class="\n            page index-pg'


def main() -> None:
    t = HTML_PATH.read_text(encoding="utf-8")

    t2, n = re.subn(HEAD_TAIL, "", t, count=1, flags=re.DOTALL)
    if n != 1:
        raise SystemExit(f"Expected 1 head Bitrix blob match, got {n}")

    anchor = BODY_END_PREFIX + PAGE_ANCHOR
    si = t2.find(BODY_START)
    ei = t2.find(anchor)
    if si == -1 or ei == -1:
        raise SystemExit(f"Body markers missing si={si} ei={ei}")

    t2 = t2[:si] + "<body>\n" + t2[ei + len(BODY_END_PREFIX) :]

    if "data-b24-" in t2:
        raise SystemExit("Remaining data-b24- attributes")
    if "bitrix24.ru/bitrix/js/imopenlines" in t2:
        raise SystemExit("Remaining livechat URL")
    if "window.b24form.Loader.run" in t2:
        raise SystemExit("Remaining b24form loader")

    HTML_PATH.write_text(t2, encoding="utf-8", newline="\n")
    print(f"Updated {HTML_PATH.relative_to(ROOT)}")


if __name__ == "__main__":
    main()

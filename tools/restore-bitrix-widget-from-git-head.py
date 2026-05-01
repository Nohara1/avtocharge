#!/usr/bin/env python3
"""Re-insert Bitrix Site Button head scripts + body markup from git HEAD into current index.html."""
from __future__ import annotations

import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
HTML_PATH = ROOT / "src" / "pages" / "index.html"


def git_show_head_index() -> str:
    r = subprocess.run(
        ["git", "show", "HEAD:src/pages/index.html"],
        cwd=ROOT,
        capture_output=True,
        text=True,
        encoding="utf-8",
        errors="replace",
    )
    if r.returncode != 0:
        raise SystemExit(r.stderr or "git show failed")
    return r.stdout


def main() -> None:
    head_blob = git_show_head_index()

    h_start = head_blob.find(
        '<link rel="prefetch" as="script" href="https://smartcaptcha.yandexcloud.net'
    )
    h_end = head_blob.find("app.bundle.min.js\"></script>", h_start)
    if h_start == -1 or h_end == -1:
        raise SystemExit("Bitrix head blob not found in HEAD")
    bitrix_head = head_blob[h_start : h_end + len("app.bundle.min.js\"></script>")]

    anchor = (
        "\t</div>\n</div>\n</div>\n"
        '    <div class="\n            page index-pg'
    )
    b_start = head_blob.find("<body><div></div><div><div>")
    b_end = head_blob.find(anchor)
    if b_start == -1 or b_end == -1:
        raise SystemExit("Bitrix body blob not found in HEAD")
    bitrix_body_open = head_blob[b_start : b_end + len("\t</div>\n</div>\n</div>\n")]

    cur = HTML_PATH.read_text(encoding="utf-8")

    insert_after = '<link rel="stylesheet" href="files/page-dump/default(3).css" type="text/css">'
    ia = cur.find(insert_after)
    he = cur.find("</head>")
    if ia == -1 or he == -1:
        raise SystemExit("Cannot find default(3).css or </head> in current index")

    pos = ia + len(insert_after)
    # newline between link and Bitrix chunk (HEAD had blank lines sometimes)
    cur_head_part = cur[:pos] + "\n" + bitrix_head + "\n" + cur[he:]

    body_plain = '<body>\n    <div class="\n            page index-pg'
    if body_plain not in cur_head_part:
        raise SystemExit("Expected plain body opening not found")

    cur_head_part = cur_head_part.replace(
        body_plain,
        bitrix_body_open + '\n    <div class="\n            page index-pg',
        1,
    )

    HTML_PATH.write_text(cur_head_part, encoding="utf-8", newline="\n")
    print("Restored Bitrix widget block from HEAD into index.html")


if __name__ == "__main__":
    main()

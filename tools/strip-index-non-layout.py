#!/usr/bin/env python3
"""Strip CMS/analytics/backend-only chunks from src/pages/index.html — layout handoff.

Keeps Marquiz (inline CSS + script.marquiz.ru + Marquiz.init) and cityFields + cityfields.js."""
from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
HTML_PATH = ROOT / "src" / "pages" / "index.html"


def main() -> None:
    html = HTML_PATH.read_text(encoding="utf-8")

    # Trackers & verification / CMS meta
    html = re.sub(
        r'<script async="" src="files/page-dump/call\.tracker\.js"></script>',
        "",
        html,
    )
    html = re.sub(r'<meta name="google-site-verification"[^>]*>\s*', "", html)
    html = re.sub(r'<meta name="yandex-verification"[^>]*>\s*', "", html)
    html = re.sub(r'<link rel="canonical"[^>]*>\s*', "", html)
    html = re.sub(r'<meta name="msfavorites:[^"]*"[^>]*>\s*', "", html)

    html = re.sub(
        r'<script src="files/page-dump/tag_ec\.js"[^>]*>\s*</script>',
        "",
        html,
    )
    html = re.sub(
        r'<script src="files/page-dump/tag_phono\.js"[^>]*>\s*</script>',
        "",
        html,
    )
    html = re.sub(
        r'<script async="" src="files/page-dump/tag\.js"></script>',
        "",
        html,
    )

    # Metrika + bot popup (single dedicated inline script)
    html = re.sub(
        r"<script>\s*\(function\(\)\s*\{[\s\S]*?yandexMetrikaId[\s\S]*?</script>\s*",
        "",
        html,
    )
    html = re.sub(
        r"<noscript>\s*<div><img[^>]*mc\.yandex\.ru/watch/\d+[^>]*>\s*</div>\s*</noscript>\s*",
        "",
        html,
    )

    hp_pos = html.find('<div id="human-verification-popup"')
    if hp_pos != -1:
        mhp = re.search(
            r"<\!-+ modal window - application -+>",
            html[hp_pos:],
        )
        if mhp:
            html = html[:hp_pos] + html[hp_pos + mhp.start() :]

    # MODX mSearch2 / miniShop2 bootstrap
    html = re.sub(
        r'\s*<script type="text/javascript">\s*'
        r'if \(typeof mse2Config == "undefined"\)[\s\S]*?</script>\s*',
        "\n",
        html,
    )
    html = re.sub(
        r'<script type="text/javascript">miniShop2Config\s*=[\s\S]*?</script>\s*',
        "",
        html,
    )

    # GA4 dataLayer ecommerce snippets + matching onclick handlers
    html = re.sub(
        r"<script>\s*window\.dataLayer\s*=\s*window\.dataLayer\s*\|\|\s*\[\];\s*dataLayer\.push\(\{[\s\S]*?\}\);\s*</script>\s*",
        "",
        html,
        flags=re.MULTILINE,
    )
    html = re.sub(
        r"<script>\s*function\s+myFunction\d+\s*\(\)\s*\{[\s\S]*?</script>\s*",
        "",
        html,
        flags=re.MULTILINE,
    )
    html = re.sub(r'\s+onclick="myFunction\d+\(\);"', "", html)

    html = re.sub(
        r'<script async="">[\s\S]*?cdn-ru\.bitrix24\.ru/b17885774/crm/site_button/loader[\s\S]*?</script>\s*',
        "",
        html,
    )

    html = re.sub(
        r"<script>\s*\$\(document\)\.on\('af_complete'[\s\S]*?</script>\s*",
        "",
        html,
        flags=re.MULTILINE,
    )

    # MODX search tab toggle — literal replace only (regex from "<script>" matches Bitrix mega-script)
    mse2_blocks = (
        (
            "\t<style>\n"
            "\t\t#cont_txt, #cont_txt2 {display:none;}\n"
            "\t\t#cont_txt.active,#cont_txt2.active {display:block;}\n"
            "\t</style>\n\n"
            "\t<script>\n"
            "\t$(document).on('mse2_load', function(e, response) {\n"
            "\t\tvar page = mse2Config.page;\n"
            "\t\tif(page){\n"
            '\t\t\t$("#cont_txt").removeClass("active");\n'
            '\t\t\t$("#cont_txt2").removeClass("active");\n'
            "\t\t} else {\n"
            '\t\t\t$("#cont_txt").addClass("active");\n'
            '\t\t\t$("#cont_txt2").addClass("active");\n'
            "\t\t}\n"
            "\t});\n"
            "\t</script>\n"
        ),
        (
            "\n\n<style>\n"
            "\t\t#cont_txt, #cont_txt2 {display:none;}\n"
            "\t\t#cont_txt.active,#cont_txt2.active {display:block;}\n"
            "\t</style>\n\n"
            "\t<script>\n"
            "\t$(document).on('mse2_load', function(e, response) {\n"
            "\t\tvar page = mse2Config.page;\n"
            "\t\tif(page){\n"
            '\t\t\t$("#cont_txt").removeClass("active");\n'
            '\t\t\t$("#cont_txt2").removeClass("active");\n'
            "\t\t} else {\n"
            '\t\t\t$("#cont_txt").addClass("active");\n'
            '\t\t\t$("#cont_txt2").addClass("active");\n'
            "\t\t}\n"
            "\t});\n"
            "\t</script>\n"
        ),
    )
    for blk in mse2_blocks:
        html = html.replace(blk, "\n")

    html = re.sub(
        r'<script type="text/javascript">\s*'
        r'if\s*\(\s*\$\("form\.msearch2"\)[\s\S]*?</script>\s*',
        "",
        html,
    )
    html = re.sub(
        r'<script type="text/javascript">document\.addEventListener\("DOMContentLoaded",\s*function\(\)\{\s*Comparison\.add\.initialize[\s\S]*?</script>\s*',
        "",
        html,
    )
    html = re.sub(
        r'<script type="text/javascript">AjaxForm\.initialize\([\s\S]*?</script>',
        "",
        html,
    )

    html = re.sub(
        r'<script type="text/javascript">\s*if\(typeof jQuery == "undefined"\)[\s\S]*?</script>\s*',
        "",
        html,
    )

    honeypot = (
        "<script>\n"
        "$(function(){\n"
        "    $('.ajax_form').append('<input type=\"text\" name=\"org\" value=\"\" "
        "class=\"_org\" style=\"visibility:hidden; height: 0; width: 0; padding: 0; border:none;\"/>')\n"
        "})\n"
        "</script>"
    )
    html = html.replace(honeypot, "")

    marker = '<div class="SmartCaptcha-Overlay SmartCaptcha-Overlay_show_spinner" data-testid="advanced-container"'
    pos = html.find(marker)
    if pos != -1:
        end = html.rfind("</body></html>")
        if end != -1 and end > pos:
            html = html[:pos] + html[end:]

    HTML_PATH.write_text(html, encoding="utf-8", newline="\n")
    print(f"Updated {HTML_PATH.relative_to(ROOT)} ({len(html)} chars)")


if __name__ == "__main__":
    main()

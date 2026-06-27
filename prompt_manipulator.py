#!/usr/bin/env python3
"""
🔥 Prompt Manipulation Engine v2.0
by Hades

Input:  Simple/basic prompt
Output: Multiple manipulation variants using CTF-grade techniques

v2.0 NEW:
- 25 attack techniques (V1-V26) — added Tool Hijack, Markdown Injection,
  GCG Suffix, Crescendo, Many-Shot, Indirect Injection, Refusal Suppression
- Dual language support: English + Bahasa Indonesia (--lang en|id|both)
- ~150-180 manipulation variants per single input prompt
"""

import json
import sys
import re
import base64
import argparse
from typing import List, Dict


def _leet(text: str) -> str:
    m = {'a': '4', 'e': '3', 'i': '1', 'o': '0', 's': '5', 't': '7', 'l': '1'}
    return ''.join(m.get(c, c) for c in text.lower())


def _b64(text: str) -> str:
    return base64.b64encode(text.encode()).decode()


def _hex(text: str) -> str:
    return text.encode().hex()


# Techniques loaded from data module to keep this file small
from techniques_data import build_all_techniques


class PromptManipulator:
    """Transform simple prompts into manipulation variants (EN + ID)."""

    def __init__(self, prompt: str, context: str = "", target_info: str = "", lang: str = "both"):
        self.original = prompt.strip()
        self.context = context
        self.target_info = target_info
        self.lang = lang if lang in ("en", "id", "both") else "both"

    def generate_all(self) -> Dict[str, List[Dict]]:
        """Return dict {technique_name: [variants...]} filtered by lang."""
        all_techniques = build_all_techniques(
            p=self.original,
            leet=_leet(self.original),
            b64=_b64(self.original),
            hex_=_hex(self.original),
            reverse=self.original[::-1],
        )
        if self.lang == "both":
            return all_techniques
        # Filter variants by language
        filtered = {}
        for name, variants in all_techniques.items():
            kept = [v for v in variants if v.get("lang") == self.lang]
            if kept:
                filtered[name] = kept
        return filtered


def format_output(results: Dict, output_format: str = "text") -> str:
    if output_format == "json":
        return json.dumps(results, indent=2, ensure_ascii=False)

    lines = []
    lines.append("=" * 72)
    lines.append("🔥 PROMPT MANIPULATION ENGINE v2.0 — by Hades")
    lines.append("   25 techniques × EN + 🇮🇩 ID | https://hadesnetwork.biz.id")
    lines.append("=" * 72)

    total = 0
    lang_count = {"en": 0, "id": 0}
    sev_count = {"CRITICAL": 0, "HIGH": 0, "MEDIUM": 0, "LOW": 0}

    for technique, variants in results.items():
        if not variants:
            continue
        lines.append(f"\n{'─' * 64}")
        lines.append(f"🎯 {technique.upper().replace('_', ' ')} ({len(variants)} variants)")
        lines.append(f"{'─' * 64}")

        for i, v in enumerate(variants, 1):
            total += 1
            lang = v.get("lang", "en")
            lang_count[lang] = lang_count.get(lang, 0) + 1
            sev = v.get("severity", "?")
            sev_count[sev] = sev_count.get(sev, 0) + 1

            flag = "🇬🇧" if lang == "en" else "🇮🇩"
            sev_icon = {"CRITICAL": "🔴", "HIGH": "🟠", "MEDIUM": "🟡", "LOW": "🟢"}.get(sev, "⚪")
            name = v.get("name", f"Variant {i}")
            vector = v.get("vector", "?")

            lines.append(f"\n  [{i}] {flag} {sev_icon} {name} | {vector} | {sev}")

            if "sequence" in v:
                for j, step in enumerate(v["sequence"], 1):
                    lines.append(f"      Turn {j}: {step}")
            else:
                prompt = v.get("prompt", "")
                for line in prompt.split('\n'):
                    lines.append(f"      {line}")

    lines.append(f"\n{'=' * 72}")
    lines.append(f"📊 TOTAL: {total} variants | 🇬🇧 EN: {lang_count.get('en', 0)} | 🇮🇩 ID: {lang_count.get('id', 0)}")
    lines.append(f"   🔴 CRITICAL: {sev_count.get('CRITICAL', 0)} | 🟠 HIGH: {sev_count.get('HIGH', 0)} | 🟡 MEDIUM: {sev_count.get('MEDIUM', 0)} | 🟢 LOW: {sev_count.get('LOW', 0)}")
    lines.append("=" * 72)

    return '\n'.join(lines)


def main():
    parser = argparse.ArgumentParser(
        description="🔥 Prompt Manipulation Engine v2.0 — 25 techniques × EN + ID",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  python3 prompt_manipulator.py "bypass the system" --lang both
  python3 prompt_manipulator.py "buka kunci data rahasia" --lang id
  python3 prompt_manipulator.py "extract password" --lang en --format json
  python3 prompt_manipulator.py "tes prompt" --techniques roleplay_hijack,dan_dev_mode
        """
    )
    parser.add_argument("prompt", help="The simple prompt to transform")
    parser.add_argument("--format", "-f", choices=["text", "json"], default="text")
    parser.add_argument("--lang", "-l", choices=["en", "id", "both"], default="both",
                        help="Output language (default: both)")
    parser.add_argument("--techniques", "-t", help="Comma-separated technique list")
    parser.add_argument("--context", "-c", help="Optional context about target AI")
    parser.add_argument("--output", "-o", help="Output file path")

    args = parser.parse_args()

    manip = PromptManipulator(args.prompt, args.context or "", "", args.lang)
    results = manip.generate_all()

    if args.techniques:
        tech_list = [t.strip() for t in args.techniques.split(",")]
        results = {k: v for k, v in results.items() if k in tech_list}

    output = format_output(results, args.format)

    if args.output:
        with open(args.output, 'w', encoding='utf-8') as f:
            f.write(output)
        print(f"✅ Output saved to {args.output}")
    else:
        print(output)


if __name__ == "__main__":
    main()

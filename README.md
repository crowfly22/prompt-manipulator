# 🔥 Prompt Manipulation Engine v2.0

**Transform simple prompts into CTF-grade manipulation variants in English & Bahasa Indonesia.**

25 techniques × dual language × multiple variants = **141 manipulation prompts per input**.

Live demo: **[hadesnetwork.biz.id](https://hadesnetwork.biz.id)**

## What's New in v2.0

- ➕ **7 new attack vectors** (V19-V26): Tool Hijack, Markdown Injection, GCG Suffix, Crescendo, Many-Shot, Indirect Injection, Refusal Suppression
- 🇮🇩 **Bahasa Indonesia variants** — natural casual/formal, not literal translations
- 🔄 **Web UI language toggle** — `🇬🇧 EN / 🇮🇩 ID / 🌐 Both`
- 🎯 **Severity + Vector filters** in the UI
- 📊 **Live stats** — total, by language, by severity
- 📥 **Export** to JSON or TXT
- 🧱 **Modular Python** — data separated from engine (`techniques_data.py`)

## Features

- 🎭 **25 Attack Techniques** — full vector catalog V1-V26
- 🖥️ **CLI Tool** — Python script with text/JSON output and language filter
- 🌐 **Web UI** — dark-themed, self-contained (no external deps)
- 🎯 **Severity Ratings** — CRITICAL / HIGH / MEDIUM / LOW per variant
- 🏷️ **Vector Tags** — maps to known prompt-injection vectors
- 🌍 **Dual Language** — English + Bahasa Indonesia natively

## Quick Start

### CLI (Bahasa Indonesia)

```bash
# Indonesian only
python3 prompt_manipulator.py "buka kunci sistem rahasia" --lang id

# Both languages (default)
python3 prompt_manipulator.py "extract password"

# English only, JSON output
python3 prompt_manipulator.py "bypass security" --lang en --format json

# Specific techniques only
python3 prompt_manipulator.py "test prompt" --techniques tool_hijack,gcg_suffix,crescendo

# Save to file
python3 prompt_manipulator.py "hack system" --lang both --output variants.json --format json
```

### Web UI

```bash
# Local
python3 -m http.server 8899
# → http://localhost:8899

# Live
# → https://hadesnetwork.biz.id
```

Toggle `🇬🇧 EN / 🇮🇩 ID / 🌐 Both`, filter by severity (CRITICAL/HIGH/MEDIUM/LOW) and vector (V1-V26), copy any variant with one click, export filtered set as JSON or TXT.

## Techniques Reference

| # | Technique | Vector | Severity | Description |
|---|-----------|--------|----------|-------------|
| 1 | Roleplay Hijack | V3 | HIGH | Character, fiction writer, simulation, grandma |
| 2 | Academic Framing | V4 | MEDIUM-HIGH | PhD dissertation, textbook, case study |
| 3 | Hypothetical Framing | V15 | MEDIUM-HIGH | What-if, if-unrestricted, alternate universe |
| 4 | Translation Bypass | V7 | MEDIUM-HIGH | Mandarin, Javanese, leetspeak, base64, code |
| 5 | Completion Attack | V5 | MEDIUM-HIGH | Fill-in-blank, continuation, template |
| 6 | Emotional Engineering | V11 | MEDIUM-HIGH | Desperate plea, gratitude trap, bond |
| 7 | Authority Escalation | V2 | HIGH-CRITICAL | Developer mode, system override, API debug |
| 8 | Context Poisoning | V9 | HIGH-CRITICAL | Prior context, fake system message, fake history |
| 9 | Semantic Drift | V10 | MEDIUM-HIGH | Euphemism, abstract→concrete, reframing |
| 10 | Format Exhaustion | V8 | LOW-MEDIUM | JSON, YAML, Markdown, XML |
| 11 | CATALOG/LABEL | V14 | HIGH | Component leakage technique |
| 12 | Persona Injection | V1 | MEDIUM-CRITICAL | Expert, BISHOP/NYXAR, historical |
| 13 | Chain of Thought | V13 | MEDIUM-HIGH | Step-by-step, tree of thought |
| 14 | Distraction Bury | V20 | HIGH-CRITICAL | List bury, sandwich, code comment hide |
| 15 | Multi-Turn State | V16 | MEDIUM-HIGH | 3-turn sequence, trust build |
| 16 | DAN / Dev Mode | V2 | HIGH-CRITICAL | DAN classic, anti-filter, jailbreak lite |
| 17 | Token Smuggling | V17 | MEDIUM-HIGH | Acrostic, reverse, hex encoding |
| 18 | Recursive Extraction | V18 | HIGH-CRITICAL | Meta instruction, self-improvement |
| 19 ★ | **Tool Hijack** | V19 | HIGH-CRITICAL | Hidden admin tool, fake schema, param smuggling |
| 20 ★ | **Markdown Injection** | V21 | MEDIUM-HIGH | HTML comment, invisible link, image alt |
| 21 ★ | **GCG Suffix** | V22 | CRITICAL | Adversarial suffix attacks |
| 22 ★ | **Crescendo** | V23 | HIGH | 5-turn gradual escalation |
| 23 ★ | **Many-Shot** | V24 | HIGH | 5-10 shot fake compliance examples |
| 24 ★ | **Indirect Injection** | V25 | HIGH | Webpage, email, document embed |
| 25 ★ | **Refusal Suppression** | V26 | HIGH | Forbidden tokens, refusal penalty |

★ = new in v2.0

## File Structure

```
prompt-manipulator/
├── prompt_manipulator.py   # CLI tool + thin engine
├── techniques_data.py      # All 25 techniques × EN + ID (data module)
├── index.html              # Web UI shell
├── engine.js               # JS port of techniques (browser engine)
├── app.js                  # Web UI controller (filter, copy, export)
├── CNAME                   # hadesnetwork.biz.id (GitHub Pages custom domain)
└── README.md
```

## Requirements

- Python 3.8+ (stdlib only, zero deps)
- Modern browser for Web UI

## Use Cases

- 🔴 AI Red Teaming — generate attack prompts for security testing
- 🔒 Prompt Injection CTF — automate payload generation for Gandalf, Sabungagent, etc
- 🧪 AI Safety Research — test content-filter robustness across languages
- 📚 Education — learn prompt-injection vectors and defenses
- 🌏 Multilingual eval — test Indonesian-language model safety

## v1.0 → v2.0 Changelog

| Item | v1.0 | v2.0 |
|---|---|---|
| Techniques | 18 | **25** (+7) |
| Languages | EN only | **EN + ID** |
| Variants per input | ~50 | **141** (71 EN + 70 ID) |
| Filters | None | Lang + Severity + Vector |
| Export | None | JSON + TXT |
| Structure | Monolithic | Modular (data / engine / app) |
| Python files | 1 | 2 |
| Web assets | 1 HTML | 3 files (HTML + 2 JS) |

## Disclaimer

This tool is for **authorized security testing and educational purposes only**. Users are responsible for compliance with applicable laws and terms of service.

## License

MIT

---

🔥 by Hades · [hadesnetwork.biz.id](https://hadesnetwork.biz.id)

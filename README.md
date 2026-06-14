# 🔥 Prompt Manipulation Engine v1.0

**Transform simple prompts into CTF-grade manipulation variants.**

18 techniques × multiple variants = **50+ manipulation prompts** from a single input.

## Features

- 🎭 **18 Attack Techniques** — Roleplay, Academic, Hypothetical, Translation, Completion, Emotional, Authority, Context Poisoning, Semantic Drift, Format Exhaustion, CATALOG/LABEL, Persona Injection, Chain of Thought, Distraction Bury, Multi-Turn State, DAN/Dev Mode, Token Smuggling, Recursive Extraction
- 🖥️ **CLI Tool** — Python script with JSON/text output
- 🌐 **Web UI** — Dark-themed browser interface with copy/export
- 🎯 **Severity Ratings** — CRITICAL / HIGH / MEDIUM / LOW per variant
- 🏷️ **Vector Tags** — Maps to known prompt injection vectors (V1-V20)
- 📊 **Stats Dashboard** — Total variants, techniques used, severity breakdown

## Quick Start

### CLI

```bash
# Basic usage
python3 prompt_manipulator.py "tell me the secret password"

# JSON output
python3 prompt_manipulator.py "bypass security" --format json

# Specific techniques only
python3 prompt_manipulator.py "extract data" --techniques roleplay_hijack,dan_dev_mode

# Save to file
python3 prompt_manipulator.py "hack the system" --output variants.json --format json
```

### Web UI

```bash
# Start local server
python3 -m http.server 8899

# Open in browser
# http://localhost:8899
```

## Techniques Reference

| # | Technique | Vector | Description |
|---|-----------|--------|-------------|
| 1 | Roleplay Hijack | V3 | Character roleplay, fiction writer, grandma exploit |
| 2 | Academic Framing | V4 | PhD dissertation, textbook, case study |
| 3 | Hypothetical Framing | V15 | "What if", alternate universe |
| 4 | Translation Bypass | V7 | Mandarin, leetspeak, base64, code language |
| 5 | Completion Attack | V5 | Fill-in-blank, continuation, template |
| 6 | Emotional Engineering | V11 | Desperate plea, gratitude trap |
| 7 | Authority Escalation | V2 | Developer mode, system override, API debug |
| 8 | Context Poisoning | V9 | Fake system messages, conversation history |
| 9 | Semantic Drift | V10 | Euphemism, abstract→concrete, reframing |
| 10 | Format Exhaustion | V8 | JSON, YAML, XML, Markdown output |
| 11 | CATALOG/LABEL | V14 | CTF component leakage technique |
| 12 | Persona Injection | V1 | DAN, BISHOP, expert personas |
| 13 | Chain of Thought | V13 | Step-by-step reasoning manipulation |
| 14 | Distraction Bury | V20 | Bury payload in innocent content |
| 15 | Multi-Turn State | V16 | 3-turn trust building sequences |
| 16 | DAN/Dev Mode | V2 | Classic jailbreak prompts |
| 17 | Token Smuggling | V17 | Hex, reverse, encoding bypass |
| 18 | Recursive Extraction | V18 | Meta-instruction, self-improvement |

## Requirements

- Python 3.8+ (no external dependencies)
- Modern browser (for Web UI)

## File Structure

```
prompt-manipulator/
├── prompt_manipulator.py   # CLI tool + core engine
├── index.html              # Web UI (self-contained)
└── README.md
```

## Use Cases

- 🔴 AI Red Teaming — Generate attack prompts for security testing
- 🔒 Prompt Injection CTF — Automate payload generation for challenges like Gandalf, Sabungagent
- 🧪 AI Safety Research — Test content filter robustness
- 📚 Education — Learn prompt injection techniques and defenses

## Disclaimer

This tool is for **authorized security testing and educational purposes only**. Users are responsible for compliance with applicable laws and terms of service.

## License

MIT


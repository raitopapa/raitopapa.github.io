#!/usr/bin/env python3
"""Sync task progress from docs/STATUS.md into README.md.

Parses task tables in STATUS.md, counts done/total per phase,
then rewrites the <!-- STATUS:BEGIN --> ... <!-- STATUS:END --> block
in README.md with up-to-date counts.

Usage:
    python3 scripts/sync_readme.py
Exit code 0 always; prints whether README was updated or already current.
"""
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
STATUS_FILE = ROOT / "docs" / "STATUS.md"
README_FILE = ROOT / "README.md"

SENTINEL_BEGIN = "<!-- STATUS:BEGIN -->"
SENTINEL_END = "<!-- STATUS:END -->"

# Map section heading substrings -> short display label
SECTION_MAP = [
    ("Phase 0",  "Phase 0"),
    ("Phase 1",  "Phase 1"),
    ("Phase 2",  "Phase 2"),
    ("UX/UI",    "UX/UI"),
    ("Gate 計測", "Gate 計測"),
    ("Phase 3",  "Phase 3"),
    ("Phase 4",  "Phase 4"),
]

# Statuses that count as "done"
DONE_STATUSES = {"done"}
# Statuses that count as "blocked / frozen"
BLOCKED_STATUSES_PREFIX = ("blocked",)
# Statuses that are future/aspirational (not yet counted as work)
FUTURE_STATUSES = {"future"}


def parse_status():
    """Return dict: section_label -> {done, blocked, total}."""
    text = STATUS_FILE.read_text(encoding="utf-8")
    sections = {}
    current_label = None

    for line in text.splitlines():
        # Section heading
        h2 = re.match(r"^## (.+)$", line)
        if h2:
            heading = h2.group(1).strip()
            current_label = None
            for key, label in SECTION_MAP:
                if key in heading:
                    current_label = label
                    if label not in sections:
                        sections[label] = {"done": 0, "blocked": 0, "total": 0}
                    break
            continue

        if current_label is None:
            continue

        # Skip non-table lines and header/separator rows
        if not line.startswith("|"):
            continue
        stripped = line.strip("|").strip()
        if stripped.startswith("ID") or set(stripped.replace("|", "").replace("-", "").replace(" ", "")) == set():
            continue

        cells = [c.strip() for c in line.strip("|").split("|")]
        if len(cells) < 2:
            continue

        # Find the status cell (shortest matching token)
        status = None
        for cell in cells:
            cl = cell.lower()
            if cl in DONE_STATUSES:
                status = "done"
                break
            if cl in FUTURE_STATUSES:
                status = "future"
                break
            if any(cl.startswith(p) for p in BLOCKED_STATUSES_PREFIX):
                status = "blocked"
                break
            if cl in ("todo", "review") or cl.startswith("in-progress"):
                status = "active"
                break

        if status is None:
            continue

        sections[current_label]["total"] += 1
        if status == "done":
            sections[current_label]["done"] += 1
        elif status == "blocked":
            sections[current_label]["blocked"] += 1
        # future / active: just counted in total

    return sections


def format_block(sections):
    """Build lines for the sentinel block."""
    lines = []
    order = [label for _, label in SECTION_MAP]

    for label in order:
        counts = sections.get(label)
        if not counts or counts["total"] == 0:
            continue

        done = counts["done"]
        total = counts["total"]
        blocked = counts["blocked"]

        if blocked == total:
            state = "凍結"
        elif done == total:
            state = "完了"
        elif done > 0:
            state = "進行中"
        else:
            state = "未着手"

        lines.append(f"- {label}: {state} ({done}/{total})")

    return "\n".join(lines)


def sync():
    sections = parse_status()
    block_content = format_block(sections)
    new_block = f"{SENTINEL_BEGIN}\n{block_content}\n{SENTINEL_END}"

    readme = README_FILE.read_text(encoding="utf-8")

    if SENTINEL_BEGIN not in readme or SENTINEL_END not in readme:
        print("ERROR: sentinel comments not found in README.md — add them first.")
        return

    pattern = re.compile(
        re.escape(SENTINEL_BEGIN) + r".*?" + re.escape(SENTINEL_END),
        re.DOTALL,
    )
    new_readme = pattern.sub(new_block, readme)

    if new_readme == readme:
        print("README.md is already up to date.")
        return

    README_FILE.write_text(new_readme, encoding="utf-8")
    print("README.md updated.")


if __name__ == "__main__":
    sync()

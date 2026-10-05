# RedCraft

Minecraft inside Red Dead Redemption 2 story mode: walk, build, break, hit people and animals with Minecraft's weapons and set off TNT as real explosions (Script Hook RDR2 ASI + SkyCraft's Fabric mod).

**RedCraft is made by [Keel62155](https://github.com/Keel62155).** All credit for the mod goes to them. It is built on [chasmlol/SkyCraft](https://github.com/chasmlol/SkyCraft) by chasmlol.

- Original project: https://github.com/Keel62155/Minecraft-X-Games
- Report bugs and ask questions there: https://github.com/Keel62155/Minecraft-X-Games/issues
- Upstream release packaged here: [3.0.0-RedCraft](https://github.com/Keel62155/Minecraft-X-Games/releases/tag/3.0.0-RedCraft) (commit [`0d6e51b`](https://github.com/Keel62155/Minecraft-X-Games/tree/0d6e51bf7babc88a7f9cfe730594206bac1e6e71))

> **Beta.** Nobody at SIGF has played this build yet. Back up your saves.
> Bugs in the mod itself go to the author's issue tracker above; problems with the one-click install go to this repository's issues.

## What you need

- **Red Dead Redemption 2** ([Steam](https://store.steampowered.com/app/1174180/)): story mode, DirectX 12, game 1.0.1491.50.
- **Minecraft**: Java Edition 26.3.
- scripthookrdr2 1.0.1491.17: copy ScriptHookRDR2.dll and dinput8.dll from its bin folder next to RDR2.exe; take the build that supports your game version (http://www.dev-c.com/rdr2/scripthookrdr2/).
- reshade: the "with full add-on support" installer, RDR2.exe, DirectX 10/11/12, no effect packages: blocks then hide behind the world (https://reshade.me).
- Windows and the [SIGF app](https://sigf.ai). The app installs fabric-loader 0.19.5, fabric-api 0.161.0+26.3 for you.

## Install

In the SIGF app, open **RedCraft** in the catalog, press **Install**, then **Play**. **Restore** puts your game folders back exactly as they were.
The app follows `mashup.json` in this repository: every download is pinned by sha256. The files come from the release [`v3.0.0`](../../releases/tag/v3.0.0) and, for `RedCraft.zip`, from the author's own release.

### Good to know

- Red Dead Redemption 2 on PC (made on game 1.0.1491.50) and Minecraft: Java Edition. Story mode only: Script Hook RDR2 closes the game if you go into Red Dead Online.
- Before the first Play: install Script Hook RDR2 from its official page (ScriptHookRDR2.dll and dinput8.dll next to RDR2.exe; the app cannot ship it) and set Graphics API to DirectX 12 in the game's settings (Graphics > Advanced): on Vulkan nothing of Minecraft shows.
- Recommended: ReShade with full add-on support (reshade.me, pick RDR2.exe and DirectX 10/11/12, skip the effect packages). The app already places RedCraft.fx in reshade-shaders\Shaders. Without ReShade blocks are drawn over everything. If blocks still show through the world: Home > Add-ons > Generic Depth, tick the depth buffer that shows the scene.
- Press Play: Minecraft starts first as the app's own Prism instance "sigf-redcraft" (SkyCraft's Fabric mod, Minecraft 26.3, Java 25), then RDR2. You do not need SkyCraft or Skyrim. Load a story save on foot and wait about 30 seconds for Minecraft's hotbar.
- RedCraft.asi and RedCraft.fx (with the author's README.txt and source zip) are installed into the game folder, downloaded from the author's own release; Restore removes them. Script Hook RDR2 and ReShade are yours to remove.
- Riding, driving and cutscenes hand the character back to the game; hold Left Alt to talk, loot or mount, F10 gives the character back. Run one "Minecraft X" mod at a time. Log: %LOCALAPPDATA%\RedCraft\redcraft.log.
- Prototype; the ReShade part is new and HDR output limits it. Report bugs to the author on the upstream issue tracker.

## What this repository holds

RedCraft has no license, so SIGF may not rehost it. This repository holds **only SIGF's own files**, never the author's:

1. This README, `THIRD-PARTY.md`, `sigf/` (the script that built the recipe, for reference) and `mashup.json` (the SIGF app recipe).
2. Not here: `RedCraft.zip` (sha256 `f003eb89654b7d3ac09c6fd211cf9902c46c7c68d4f18156bcfb9b63038901d1`). The app downloads it on the player's demand from the author's release, as released: https://github.com/Keel62155/Minecraft-X-Games/releases/download/3.0.0-RedCraft/RedCraft.zip
3. The release `v3.0.0`:

| Asset | Size | sha256 | What it is |
|---|---|---|---|
| `redcraft.mrpack` | 235728 B | `34ff700cab2d838284bd377ec2b00b337761b44c2b1d90a94b45badeb6e9ce72` | the Minecraft side, which is SkyCraft's (chasmlol, MIT): `skycraft-fabric-0.1.2.jar` unchanged with SkyCraft's LICENSE, for Minecraft 26.3 with Fabric Loader 0.19.5; Fabric API 0.161.0+26.3 and e4mc are Modrinth download links, not stored here. |

The sha256 of every file inside the zips is in `mashup.json` (`contents`).

## Licenses

| Part | License | Where |
|---|---|---|
| RedCraft (`RedCraft.zip`, the author's release file) | no license: all rights reserved by Keel62155. Not stored here; the app downloads it from the author's release | https://github.com/Keel62155/Minecraft-X-Games |
| SkyCraft's Fabric mod (in the `.mrpack`) | MIT, Copyright chasmlol | `THIRD-PARTY.md` |
| Fabric API, e4mc (downloaded from Modrinth by the app, not stored here) | Apache-2.0, MIT | https://modrinth.com/mod/fabric-api, https://modrinth.com/mod/e4mc |

## Why this repository exists

The SIGF app (https://sigf.ai) installs mods from recipes (`mashup.json`) whose downloads are pinned release files. This repository makes RedCraft installable in one click, credited to Keel62155. If you are the author and want anything changed or taken down, open an issue here.

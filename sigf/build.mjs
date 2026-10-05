// RedCraft (Keel62155, no license): Minecraft inside Red Dead Redemption 2 (story mode). A Script Hook RDR2 ASI
// that plays the part of SkyCraft's Skyrim plugin and drives SkyCraft's Fabric mod over the same shared memory
// (Local\SkyCraft_v1, protocol v11), with a ReShade add-on effect for depth.
// No license, so upstream fetch (PLATFORM-SPEC section 4, "Upstream fetch"): RedCraft.zip is downloaded by the app
// from the author's release as released, never rehosted. SIGFAI/redcraft hosts the recipe and our .mrpack (SkyCraft's
// Minecraft side, MIT, the exact pack orchestrator/scripts/package-fusion.mjs builds for SkyCraft). Script Hook RDR2
// is proprietary and not redistributable: a prerequisite with its official page, never a download.
//
// The mod starts Minecraft itself only as %LOCALAPPDATA%\SkyCraft\Prism\prismlauncher.exe --launch SkyCraft
// (src/RedCraft.cpp:292-293 of its source zip), skipped when the mutex Local\SkyCraft_v1_minecraft exists
// (src/RedCraft.cpp:268-281). The SkyCraft jar holds that mutex, so the app starts its own Minecraft instance first
// (the CyberCraft way, library/cybercraft/build.mjs).
//
// The upstream zip's root is RedCraft/; install file `root: "RedCraft"` places that folder, as released, into {game}:
// RedCraft.asi next to RDR2.exe (where Script Hook RDR2 loads ASIs) and reshade-shaders/Shaders/RedCraft.fx (upstream's
// step 3, merged into ReShade's folder). README.txt and the source zip land there too (removed by Restore).
//   node library/redcraft/build.mjs       (outputs: library/lib.mjs)
import { FUSIONS, buildFusion, instanceName } from '../../orchestrator/scripts/package-fusion.mjs';
import { CACHE, asset, card, dl, emit, pinned, renamePack } from '../lib.mjs';

const UP = {
  repo: 'https://github.com/Keel62155/Minecraft-X-Games', tag: '3.0.0-RedCraft', commit: '0d6e51bf7babc88a7f9cfe730594206bac1e6e71',
  authors: ['Keel62155'],
  zip: { file: 'RedCraft.zip', sha256: 'f003eb89654b7d3ac09c6fd211cf9902c46c7c68d4f18156bcfb9b63038901d1' }, // = GitHub digest, checked 2026-10-05
};
const SKY = FUSIONS.skycraft;
const ID = 'redcraft', VERSION = '3.0.0', NAME = 'RedCraft';
const TAGLINE = 'Minecraft inside Red Dead Redemption 2 story mode: walk, build, break, hit people and animals with Minecraft\'s weapons and set off TNT as real explosions (Script Hook RDR2 ASI + SkyCraft\'s Fabric mod).';
const RDR2 = '1.0.1491.50'; // game version the source README names (source README.md:3)

const upUrl = `${UP.repo}/releases/download/${UP.tag}/${UP.zip.file}`;
const mod = asset(UP.zip.file, await pinned(upUrl, UP.zip.sha256), { zipped: true, upstream: upUrl });
const { packAsset } = await buildFusion(SKY, { cache: CACHE, offline: false });
const pack = asset(`${ID}.mrpack`, renamePack(packAsset.data, { name: `${NAME} (SkyCraft's Minecraft side)`, summary: TAGLINE, versionId: VERSION }));
const assets = [mod, pack];

const make = (urls, set) => {
  const mp = set.find(a => a.name.endsWith('.mrpack'));
  return {
    id: `sigf/${ID}`,
    version: VERSION,
    name: NAME,
    tagline: TAGLINE,
    kind: 'passthrough',
    games: [
      { game: 'rdr2', role: 'host', label: 'Red Dead Redemption 2', engine: 'Red Dead Redemption 2 (RAGE, DirectX 12) + Script Hook RDR2 ASI (C++)',
        apps: { steam: '1174180' }, runtime: `story mode, DirectX 12, game ${RDR2}` },
      { game: 'minecraft', role: 'guest', label: 'Minecraft', mc: SKY.mc.mc, loader: `fabric@${SKY.mc.loader}`, java: SKY.mc.java },
    ],
    requires: [
      { id: 'scripthookrdr2', version: '1.0.1491.17', page: 'http://www.dev-c.com/rdr2/scripthookrdr2/',
        license: 'proprietary, no redistribution: linked, not shipped',
        note: 'copy ScriptHookRDR2.dll and dinput8.dll from its bin folder next to RDR2.exe; take the build that supports your game version' },
      { id: 'reshade', page: 'https://reshade.me', optional: true, license: 'linked, not shipped',
        note: 'the "with full add-on support" installer, RDR2.exe, DirectX 10/11/12, no effect packages: blocks then hide behind the world' },
      { id: 'fabric-loader', version: SKY.mc.loader },
      { id: 'fabric-api', version: SKY.mc.fabricApi, note: 'in the Minecraft pack (downloaded from Modrinth)' },
    ],
    install: [
      { game: 'rdr2', strategy: 'game-dir-snapshot', loader: 'scripthookrdr2', files: [
        // Upstream file as released. root: the zip's RedCraft/ folder goes into the game folder, prefix stripped.
        { src: mod.name, dst: '{game}', root: 'RedCraft', unpack: true, contents: mod.contents, ...dl(mod, urls) },
      ] },
      { game: 'minecraft', strategy: 'mrpack', pack: { src: mp.name, ...dl(mp, urls) } },
    ],
    // Minecraft first: the mod sees it running (mutex) and links over shared memory instead of starting its own.
    // RDR2 through its store; Script Hook RDR2 loads through dinput8.dll, no loader exe.
    launch: [{ game: 'minecraft' }, { game: 'rdr2', args: [] }],
    files: set.map(a => ({ name: a.name, ...dl(a, urls) })),
    source: {
      repo: UP.repo, license: 'No license (upstream download) + MIT', upstream_license: null, fetch: 'upstream', tag: UP.tag, commit: UP.commit,
      hosted: `https://github.com/SIGFAI/${ID}`, based_on: SKY.upstream.repo,
      bundled: [
        { name: 'SkyCraft (Fabric mod)', version: SKY.version, repo: SKY.upstream.repo, commit: SKY.upstream.commit, license: SKY.upstream.license },
      ],
    },
    media: {},
    built_by: { author: UP.authors[0], authors: [...UP.authors, ...SKY.upstream.authors], packaged_by: 'SIGF' },
    idea_by: UP.authors[0],
    built_at: '2026-10-05T00:00:00.000Z',
    ...card(UP.repo),
    notes: [
      `Red Dead Redemption 2 on PC (made on game ${RDR2}) and Minecraft: Java Edition. Story mode only: Script Hook RDR2 closes the game if you go into Red Dead Online.`,
      'Before the first Play: install Script Hook RDR2 from its official page (ScriptHookRDR2.dll and dinput8.dll next to RDR2.exe; the app cannot ship it) and set Graphics API to DirectX 12 in the game\'s settings (Graphics > Advanced): on Vulkan nothing of Minecraft shows.',
      'Recommended: ReShade with full add-on support (reshade.me, pick RDR2.exe and DirectX 10/11/12, skip the effect packages). The app already places RedCraft.fx in reshade-shaders\\Shaders. Without ReShade blocks are drawn over everything. If blocks still show through the world: Home > Add-ons > Generic Depth, tick the depth buffer that shows the scene.',
      `Press Play: Minecraft starts first as the app's own Prism instance "${instanceName(`sigf/${ID}`)}" (SkyCraft's Fabric mod, Minecraft ${SKY.mc.mc}, Java ${SKY.mc.java}), then RDR2. You do not need SkyCraft or Skyrim. Load a story save on foot and wait about 30 seconds for Minecraft's hotbar.`,
      'RedCraft.asi and RedCraft.fx (with the author\'s README.txt and source zip) are installed into the game folder, downloaded from the author\'s own release; Restore removes them. Script Hook RDR2 and ReShade are yours to remove.',
      'Riding, driving and cutscenes hand the character back to the game; hold Left Alt to talk, loot or mount, F10 gives the character back. Run one "Minecraft X" mod at a time. Log: %LOCALAPPDATA%\\RedCraft\\redcraft.log.',
      'Prototype; the ReShade part is new and HDR output limits it. Report bugs to the author on the upstream issue tracker.',
    ],
  };
};

// No app fixture: it would commit the author's unlicensed zip into our repo.
emit({ slug: ID, version: VERSION, assets, fixtureAssets: null, make });

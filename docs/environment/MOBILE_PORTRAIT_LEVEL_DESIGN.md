# Mobile Portrait Level Design

## 1. Why portrait mobile changes environment design

A portrait 9:16 top-down game exposes less horizontal world context and permanently reserves significant screen space for HUD controls. This changes navigation, composition, scale and density decisions.

A full-map overview is therefore not a reliable proxy for the player's real experience.

The environment must be designed through the camera the player actually uses.

## 2. The viewport is a moving design window

Treat each representative camera position as a composition frame.

For every major route segment, capture or simulate:

- top of screen reveal;
- center play space;
- lower-left joystick region;
- lower-right combat-button region;
- fixed top HUD region;
- current interaction prompt region.

An object can be correctly placed in world coordinates but functionally invisible because it repeatedly sits behind UI.

## 3. Protect play space from HUD occlusion

Do not place critical information only under persistent controls.

Especially protect:

- route exits;
- NPC bodies and interaction markers;
- enemy spawn/readability area;
- pickups;
- breakthrough targets;
- important landmark cues.

Decorative objects may extend beneath UI, but they should not make the area visually denser than necessary.

## 4. Favor vertical sequencing

Portrait composition naturally supports a sequence of reveals along the vertical axis.

Useful pattern:

`incoming clue at top → active interaction/play around center → previous area recedes below`

This can make traversal feel continuous and purposeful.

Avoid forcing the player to repeatedly move far left/right just to see where the route continues unless exploration is intentional.

## 5. Horizontal branches need stronger cues

Because the camera is narrow, side branches can disappear quickly.

Support a side branch with at least two cues when important:

- ground-path divergence;
- edge opening;
- landmark glimpse;
- prop framing;
- NPC/service association;
- sign/marker;
- change in vegetation or lighting/value.

Do not rely on a single tiny prop near the screen edge.

## 6. Screen-space scale matters more than source detail

An asset must be judged by how many device pixels it occupies in runtime.

Check:

- can the silhouette be recognized instantly?
- can the player distinguish its function?
- does its detail survive downsampling?
- does it appear physically plausible relative to player/house?
- does it become soft because runtime display exceeds useful source resolution?

Phone screenshots are the acceptance evidence.

## 7. Keep the player silhouette clean

The player is a constant focal reference.

Avoid repeatedly placing high-detail or high-contrast environment directly behind the likely movement line. Especially watch:

- tree crowns;
- dark roof edges;
- dense market clutter;
- fence intersections;
- path texture with similar values to robe silhouette.

If the environment wins the contrast battle, reduce environmental contrast or shift composition rather than outlining the player indiscriminately.

## 8. Density by screen, not by map area

A world region may contain many props while still feeling sparse if they rarely share a viewport. Conversely, a small local cluster can overwhelm one screen.

Review density using sequential phone captures:

- screen A;
- screen B after a short movement;
- screen C after another short movement.

This reveals repetition and rhythm much better than a full-map image.

## 9. Landmark persistence is different in 2D portrait

In 3D, a tall landmark may remain visible across large distances. In a 2D top-down portrait view, that is often impossible.

Use **relay landmarks**:

- path treatment leads to a local tree/gate;
- that tree/gate frames a market roof;
- the market roof gives way to an elder courtyard cue;
- each local anchor hands orientation to the next.

This matches the GDC roundtable observation that 2D worlds often require strong ground/path cues because large distant landmarks cannot always remain visible.

## 10. Interaction zones need breathing room

When the player approaches an NPC, the screen may simultaneously contain:

- NPC label;
- interaction button;
- skill/dodge/attack cluster;
- player sprite;
- nearby props;
- route edges.

Reserve visual clearance around major NPCs. A richly decorated NPC zone can still keep a clean interaction pocket.

## 11. Combat readability in environment planning

Even safe-zone work should establish conventions that later extend to combat areas.

Combat-capable spaces need:

- enough open center area to dodge;
- clear enemy silhouettes;
- no decorative bottlenecks unless deliberately gameplay-relevant;
- background VFX/value quieter than attack effects;
- predictable foreground occlusion.

Do not let art-only placement accidentally change gameplay hitboxes or timing.

## 12. Camera reveal and pacing

Use the top part of the screen as a preview budget.

A good traversal often lets the player see a hint of the next zone before fully entering it. This can be:

- a roof edge;
- tree silhouette;
- lantern pair;
- path widening;
- unusual ground color;
- bridge or stone marker.

If the next zone appears all at once with no anticipation, transitions can feel abrupt.

## 13. Mobile environment review checklist

At actual device scale, verify:

- player remains visually dominant during movement;
- critical path survives the HUD;
- side branches have sufficient cues;
- no important NPC/landmark repeatedly spawns under fixed UI;
- structural assets read at a plausible world scale;
- repeated assets do not appear in identical screen-relative positions;
- each viewport has a clear focal hierarchy;
- environment detail does not compete with combat/interaction UI;
- route continuity is obvious across camera scrolling;
- scene still feels coherent with text labels mentally removed.

## 14. Project adaptation

For this project, Android Phone QC is the final authority for environment scale, density and readability. Desktop/browser inspection is useful for debugging and macro planning, but it cannot approve final composition by itself.

## 15. Source basis

This guide combines the project's portrait-mobile evidence with general wayfinding/blockout principles from the GDC and Epic references in `SOURCE_REFERENCES.md`. Unity's 2D world-building documentation is referenced for reusable 2D world-construction patterns, not as an engine prescription.
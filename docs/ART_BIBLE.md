# Xianxia ARPG Art Bible

Version: 0.1
Status: C4.1 visual direction foundation

## Core visual promise
Original mobile-first xianxia with restrained ink-wash influence. The world should read instantly at portrait phone size before it rewards close inspection.

The game should feel like a moving ink painting that has learned combat readability: broad silhouettes, dry-brush edges, muted earth and mineral colors, then concentrated qi light only where gameplay needs attention.

## Readability rules
- Silhouette first. Every actor role must be recognizable at a glance without labels.
- Limit each actor to 2–3 dominant colors plus one effect accent.
- Player is the cleanest silhouette and carries the lightest value range.
- Melee enemy = broad forward mass, warm rust/red-brown.
- Ranged enemy = narrow vertical hood/spirit silhouette, moss/jade green.
- Charger enemy = heavy shoulder mass and horns, dusk violet/iron.
- Trial enemies reuse role silhouettes but gain pale amber/sepia spiritual treatment.
- Interactive NPCs remain calmer and less saturated than combatants.
- Effects must not obscure hit timing or enemy telegraphs.

## Palette
### Ink / neutrals
- Ink: #262922
- Soft ink: #45473f
- Rice paper: #E9E0C9
- Warm paper: #D8CDB2
- Old wood: #765F43

### Player
- Male robe: pine blue-green #425B52
- Female robe: muted plum #785560
- Inner cloth: pale flax #E9DFC7
- Hair: deep ink #252724
- Skin: warm ochre #D9B58E
- Realm 2 qi: pale jade #C9EFE5

### Enemies
- Melee rust: #80554B
- Ranged moss: #536747
- Charger dusk: #695579
- Trial amber: #D7B36D

### Combat accents
- Sword light: #F2E4B8
- Jade qi: #C9EFE5
- Danger red: #B95745
- Charge amber: #C77C42

## Shape language
### Player
- Tall tapered robe body, visible sleeves, small head and hair mass.
- Male: straighter shoulder line, topknot/hairpin cue.
- Female: slightly wider sleeve rhythm and longer rear hair cue.
- No facial detail at MVP distance.

### Melee enemy
- Low head, broad torso, asymmetrical claws/horns.
- Reads as something that wants to close distance.

### Ranged enemy
- Hooded narrow body, floating talisman/orb cue.
- Reads as a caster before it fires.

### Charger enemy
- Large shoulders, horned front, squat center of mass.
- Reads as momentum and impact.

## Flying sword
- One sword per auto attack remains a locked gameplay rule.
- Long, narrow blade with strong point and compact guard.
- Realm 1 trail: soft pale ink-jade.
- Realm 2 trail: brighter jade, slightly thicker and longer.
- Never turn the sword into a glowing missile blob. The blade silhouette must stay visible.

## Environment
- Settlement: warm paper, wood, quiet negative space.
- Plains: dry olive-earth with low clutter.
- Forest: layered desaturated greens and clustered vertical rhythm.
- Danger zone: cooler gray-violet, broken stone forms, less visual comfort.
- Keep the central travel route legible without painting a literal glowing lane.

## UI
- Parchment surfaces, dark ink typography, restrained borders.
- Combat controls remain high contrast and visually denser than passive HUD.
- Right thumb remains exactly Skill + Dodge.

## C4 implementation plan
### C4.1
- Replace player rectangle with authored composite silhouette.
- Replace circular enemy placeholders with authored role silhouettes while keeping invisible gameplay hitboxes.
- Refine flying sword silhouette and launch/impact treatment.
- Preserve all combat timings and hitboxes so art QC does not contaminate balance evidence.

### C4.2
- Generate and integrate final player/enemy texture set based on accepted silhouettes.
- Add environment kit and NPC visual pass.
- Replace temporary geometric landscape landmarks with authored art assets.

### C4.3
- Final VFX pass for qi, breakthrough, telegraphs and boss gate.
- Phone readability pass under real combat density.

## Deferred gameplay debt
Phone QC after C3.3 found two known gameplay issues:
- combat challenge is too low because enemies rarely connect hits reliably;
- enemy distribution feels too regular and encounter-like rather than organic.

These are intentionally deferred until actor silhouettes/VFX are stable enough to tune hit readability once rather than twice.

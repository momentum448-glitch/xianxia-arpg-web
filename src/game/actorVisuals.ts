import Phaser from 'phaser';
import { MELEE_RUNTIME_ANIMATION } from './art/animationConfig';
import { C4_ART_SCALE } from './art/artScaleConfig';
import { C4_ASSETS } from './art/assetManifest';
import type { EnemyKind } from './combatConfig';
import type { PlayerGender } from './playerProfile';

const PLAYER_MALE_TEXTURE_KEY = 'c4-player-male-idle-s';
const ENEMY_MELEE_TEXTURE_KEY = 'c4-enemy-melee-idle-s';

const pendingMeleeByScene = new WeakMap<
  Phaser.Scene,
  Array<{ container: Phaser.GameObjects.Container; trial: boolean }>
>();
const meleeLoadStarted = new WeakSet<Phaser.Scene>();

function applyMaleRuntimeTexture(
  scene: Phaser.Scene,
  container: Phaser.GameObjects.Container,
): void {
  if (!container.active || !scene.textures.exists(PLAYER_MALE_TEXTURE_KEY)) return;

  container.removeAll(true);
  const shadow = scene.add.ellipse(0, 31, 58, 18, 0x252724, 0.18);
  const image = scene.add.image(0, C4_ART_SCALE.playerMale.offsetY, PLAYER_MALE_TEXTURE_KEY)
    .setOrigin(C4_ART_SCALE.playerMale.originX, C4_ART_SCALE.playerMale.originY);
  const scale = C4_ART_SCALE.playerMale.displayHeight / image.height;
  image.setScale(scale);
  container.add([shadow, image]);
}

function queueMaleRuntimeTexture(
  scene: Phaser.Scene,
  container: Phaser.GameObjects.Container,
): void {
  if (scene.textures.exists(PLAYER_MALE_TEXTURE_KEY)) {
    applyMaleRuntimeTexture(scene, container);
    return;
  }

  scene.load.image(PLAYER_MALE_TEXTURE_KEY, C4_ASSETS.playerMaleIdleSouth);
  scene.load.once(Phaser.Loader.Events.COMPLETE, () => applyMaleRuntimeTexture(scene, container));
  scene.load.start();
}

function installMeleeRuntimeMotion(
  scene: Phaser.Scene,
  container: Phaser.GameObjects.Container,
  image: Phaser.GameObjects.Image,
  baseScale: number,
): void {
  let lastX = container.x;
  let lastY = container.y;
  const phaseOffset = (container.x * 0.17 + container.y * 0.11) % (Math.PI * 2);

  const updateMotion = (): void => {
    if (!container.active || !image.active) return;

    const dx = container.x - lastX;
    const dy = container.y - lastY;
    const moving = Math.hypot(dx, dy) > 0.18;
    const now = scene.time.now;

    if (moving) {
      const cfg = MELEE_RUNTIME_ANIMATION.move;
      const phase = (now % cfg.cycleMs) / cfg.cycleMs * Math.PI * 2 + phaseOffset;
      const bounce = Math.abs(Math.sin(phase));
      const facingSign = Math.abs(dx) > 0.05 ? Math.sign(dx) : 1;
      image.y = C4_ART_SCALE.enemyMelee.offsetY - bounce * cfg.bobPx;
      image.setScale(
        baseScale * (1 + bounce * cfg.squashScale),
        baseScale * (1 - bounce * cfg.squashScale * 0.7),
      );
      image.setRotation(facingSign * cfg.leanRad + Math.cos(phase) * cfg.leanRad * 0.22);
    } else {
      const cfg = MELEE_RUNTIME_ANIMATION.idle;
      const phase = (now % cfg.cycleMs) / cfg.cycleMs * Math.PI * 2 + phaseOffset;
      const breath = Math.sin(phase);
      image.y = C4_ART_SCALE.enemyMelee.offsetY + breath * cfg.bobPx;
      image.setScale(
        baseScale * (1 - breath * cfg.breatheScale * 0.45),
        baseScale * (1 + breath * cfg.breatheScale),
      );
      image.setRotation(breath * 0.008);
    }

    lastX = container.x;
    lastY = container.y;
  };

  scene.events.on(Phaser.Scenes.Events.POST_UPDATE, updateMotion);
  container.once('destroy', () => scene.events.off(Phaser.Scenes.Events.POST_UPDATE, updateMotion));
  scene.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
    scene.events.off(Phaser.Scenes.Events.POST_UPDATE, updateMotion);
  });
}

function applyMeleeRuntimeTexture(
  scene: Phaser.Scene,
  container: Phaser.GameObjects.Container,
  trial: boolean,
): void {
  if (!container.active || !scene.textures.exists(ENEMY_MELEE_TEXTURE_KEY)) return;

  container.removeAll(true);
  const children: Phaser.GameObjects.GameObject[] = [];
  if (trial) {
    children.push(
      scene.add.circle(0, 0, 46, 0xd7b36d, 0.07)
        .setStrokeStyle(3, 0xd7b36d, 0.42),
    );
  } else {
    children.push(
      scene.add.ellipse(0, 1, 76, 88, 0x5f4754, 0.055)
        .setStrokeStyle(2, 0x725462, 0.14),
    );
  }
  children.push(scene.add.ellipse(0, 30, 66, 20, 0x252724, 0.2));
  const image = scene.add.image(0, C4_ART_SCALE.enemyMelee.offsetY, ENEMY_MELEE_TEXTURE_KEY)
    .setOrigin(C4_ART_SCALE.enemyMelee.originX, C4_ART_SCALE.enemyMelee.originY);
  const scale = C4_ART_SCALE.enemyMelee.displayHeight / image.height;
  image.setScale(scale);
  children.push(image);
  container.add(children);
  installMeleeRuntimeMotion(scene, container, image, scale);
}

function queueMeleeRuntimeTexture(
  scene: Phaser.Scene,
  container: Phaser.GameObjects.Container,
  trial: boolean,
): void {
  if (scene.textures.exists(ENEMY_MELEE_TEXTURE_KEY)) {
    applyMeleeRuntimeTexture(scene, container, trial);
    return;
  }

  const pending = pendingMeleeByScene.get(scene) ?? [];
  pending.push({ container, trial });
  pendingMeleeByScene.set(scene, pending);
  if (meleeLoadStarted.has(scene)) return;

  meleeLoadStarted.add(scene);
  scene.load.image(ENEMY_MELEE_TEXTURE_KEY, C4_ASSETS.enemyMeleeIdleSouth);
  scene.load.once(Phaser.Loader.Events.COMPLETE, () => {
    for (const item of pendingMeleeByScene.get(scene) ?? []) {
      applyMeleeRuntimeTexture(scene, item.container, item.trial);
    }
    pendingMeleeByScene.delete(scene);
    meleeLoadStarted.delete(scene);
  });
  scene.load.once(Phaser.Loader.Events.FILE_LOAD_ERROR, () => {
    pendingMeleeByScene.delete(scene);
    meleeLoadStarted.delete(scene);
  });
  if (!scene.load.isLoading()) scene.load.start();
}

export function createPlayerVisual(
  scene: Phaser.Scene,
  gender: PlayerGender,
  x: number,
  y: number,
): Phaser.GameObjects.Container {
  const robe = gender === 'male' ? 0x425b52 : 0x785560;
  const robeDark = gender === 'male' ? 0x31463f : 0x5d414a;
  const cloth = 0xe9dfc7;
  const ink = 0x252724;
  const skin = 0xd9b58e;

  const shadow = scene.add.ellipse(0, 31, 58, 18, 0x252724, 0.18);
  const rearHair = gender === 'female'
    ? scene.add.ellipse(0, -28, 34, 46, ink, 0.98)
    : scene.add.ellipse(0, -31, 30, 25, ink, 0.98);
  const lowerRobe = scene.add.polygon(0, 18, [-25, -23, 25, -23, 34, 31, 0, 39, -34, 31], robe, 0.98)
    .setStrokeStyle(2, robeDark, 0.8);
  const torso = scene.add.polygon(0, -8, [-23, -22, 23, -22, 18, 25, -18, 25], robe, 1)
    .setStrokeStyle(2, robeDark, 0.8);
  const leftSleeve = scene.add.polygon(-27, -5, [-2, -18, -23, 2, -11, 25, 9, 12], robeDark, 0.96);
  const rightSleeve = scene.add.polygon(27, -5, [2, -18, 23, 2, 11, 25, -9, 12], robeDark, 0.96);
  const sash = scene.add.rectangle(0, 10, 39, 6, cloth, 0.9);
  const collarL = scene.add.polygon(-7, -18, [-12, -9, 0, -2, 5, 17, -5, 8], cloth, 0.92);
  const collarR = scene.add.polygon(7, -18, [12, -9, 0, -2, -5, 17, 5, 8], cloth, 0.92);
  const head = scene.add.circle(0, -42, 15, skin, 1).setStrokeStyle(2, 0x6b5547, 0.75);
  const fringe = scene.add.polygon(0, -49, [-15, 3, -7, -10, 1, -6, 8, -12, 16, 2, 12, 8, -13, 8], ink, 1);

  const children: Phaser.GameObjects.GameObject[] = [
    shadow,
    rearHair,
    lowerRobe,
    torso,
    leftSleeve,
    rightSleeve,
    sash,
    collarL,
    collarR,
    head,
    fringe,
  ];

  if (gender === 'male') {
    children.push(scene.add.circle(0, -61, 7, ink, 1));
    children.push(scene.add.rectangle(10, -60, 22, 3, 0xb99a61, 0.9).setRotation(-0.08));
  } else {
    children.push(scene.add.polygon(0, -59, [-13, 6, 0, -8, 13, 6, 8, 11, -8, 11], ink, 1));
    children.push(scene.add.circle(12, -57, 3, 0xc8a66e, 0.95));
  }

  const container = scene.add.container(x, y, children).setDepth(11);
  if (gender === 'male') queueMaleRuntimeTexture(scene, container);
  return container;
}

export function createEnemyVisual(
  scene: Phaser.Scene,
  kind: EnemyKind,
  x: number,
  y: number,
  trial: boolean,
): Phaser.GameObjects.Container {
  const shadow = scene.add.ellipse(0, 26, kind === 'charger' ? 72 : 58, 20, 0x252724, 0.2);
  const pieces: Phaser.GameObjects.GameObject[] = [shadow];

  if (kind === 'melee') {
    const bodyColor = trial ? 0x806c54 : 0x80554b;
    pieces.push(scene.add.polygon(0, 2, [-28, -24, 22, -29, 31, 8, 15, 32, -21, 30, -34, 5], bodyColor, 1)
      .setStrokeStyle(3, trial ? 0xd7b36d : 0x3a2d29, 0.85));
    pieces.push(scene.add.circle(-3, -28, 18, trial ? 0xa78b64 : 0x68433e, 1));
    pieces.push(scene.add.triangle(-14, -44, 0, 10, -9, -7, 8, -2, trial ? 0xd7b36d : 0x3a2d29, 0.95));
    pieces.push(scene.add.triangle(10, -44, 0, 10, -8, -2, 9, -7, trial ? 0xd7b36d : 0x3a2d29, 0.95));
    pieces.push(scene.add.polygon(-31, 5, [0, -8, -18, 2, -3, 8], 0xddd1b7, 0.85));
    pieces.push(scene.add.polygon(30, 9, [0, -8, 18, 2, 3, 8], 0xddd1b7, 0.85));
  } else if (kind === 'ranged') {
    const bodyColor = trial ? 0x6f6c50 : 0x536747;
    pieces.push(scene.add.polygon(0, 8, [-20, -25, 20, -25, 27, 31, 0, 39, -27, 31], bodyColor, 0.98)
      .setStrokeStyle(3, trial ? 0xd7b36d : 0x303a2b, 0.85));
    pieces.push(scene.add.polygon(0, -27, [-26, 8, -15, -17, 0, -28, 15, -17, 26, 8, 13, 3, -13, 3], 0x38463a, 1));
    pieces.push(scene.add.circle(0, -24, 10, 0xc5b58e, 0.88));
    pieces.push(scene.add.rectangle(0, -1, 8, 25, 0xc8b46f, 0.72));
    pieces.push(scene.add.circle(29, -3, 8, trial ? 0xd7b36d : 0x99b28b, 0.82).setStrokeStyle(2, 0xe8dfc7, 0.65));
  } else {
    const bodyColor = trial ? 0x73665f : 0x695579;
    pieces.push(scene.add.ellipse(0, 7, 70, 57, bodyColor, 1).setStrokeStyle(3, trial ? 0xd7b36d : 0x3d3447, 0.9));
    pieces.push(scene.add.rectangle(0, -12, 50, 28, trial ? 0x806f5f : 0x51445f, 0.95));
    pieces.push(scene.add.triangle(-30, -27, 0, 12, -18, -8, -4, 10, trial ? 0xd7b36d : 0xb6aa92, 0.95));
    pieces.push(scene.add.triangle(30, -27, 0, 12, 18, -8, 4, 10, trial ? 0xd7b36d : 0xb6aa92, 0.95));
    pieces.push(scene.add.circle(-13, -15, 4, 0xe0c486, 0.88));
    pieces.push(scene.add.circle(13, -15, 4, 0xe0c486, 0.88));
    pieces.push(scene.add.rectangle(0, 16, 35, 8, 0x342e38, 0.9));
  }

  if (trial) {
    pieces.unshift(scene.add.circle(0, 0, kind === 'charger' ? 48 : 42, 0xd7b36d, 0.07)
      .setStrokeStyle(3, 0xd7b36d, 0.42));
  }

  const container = scene.add.container(x, y, pieces).setDepth(10);
  if (kind === 'melee') queueMeleeRuntimeTexture(scene, container, trial);
  return container;
}

export function createFlyingSwordVisual(
  scene: Phaser.Scene,
  x: number,
  y: number,
  realm: 1 | 2,
): Phaser.GameObjects.Container {
  const qi = realm === 2 ? 0xc9efe5 : 0xe2e6d8;
  const aura = scene.add.ellipse(7, 0, 54, realm === 2 ? 18 : 14, qi, realm === 2 ? 0.18 : 0.11);
  const blade = scene.add.polygon(9, 0, [-21, -4, 15, -4, 29, 0, 15, 4, -21, 4], 0xf3ead4, 1)
    .setStrokeStyle(1, 0x61665f, 0.9);
  const ridge = scene.add.line(0, 0, -10, 0, 30, 0, realm === 2 ? 0x9ed9ce : 0xbebcae, 0.72)
    .setOrigin(0.5).setLineWidth(1);
  const guard = scene.add.polygon(-14, 0, [-2, -11, 3, -4, 3, 4, -2, 11, -6, 5, -6, -5], 0xb7955b, 0.98);
  const hilt = scene.add.rectangle(-25, 0, 17, 5, 0x5e4936, 1);
  const pommel = scene.add.circle(-34, 0, 3, 0xc3a266, 1);
  return scene.add.container(x, y, [aura, blade, ridge, guard, hilt, pommel]).setDepth(18);
}

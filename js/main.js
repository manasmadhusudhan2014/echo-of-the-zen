import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js";

/*
=========================================================
 JIN — THE KINETIC CURRENT
 First 3D playable prototype
=========================================================

CONTROLS
W A S D = Move
SHIFT = Sprint
SPACE = Jump
F = Dodge
Z = Water Punch / Custom Combo
X = Crane Kick
C = Low Sweep
X + S = Crane Launcher
Z + X = Seismic Slam
Mouse = Camera
Click = Lock camera
=========================================================
*/


/* =====================================================
   THREE.JS SETUP
===================================================== */

const scene = new THREE.Scene();

scene.background = new THREE.Color(0x101722);

scene.fog = new THREE.Fog(
    0x101722,
    35,
    110
);


const camera = new THREE.PerspectiveCamera(
    65,
    window.innerWidth / window.innerHeight,
    0.1,
    300
);


const renderer = new THREE.WebGLRenderer({
    antialias: true,
    powerPreference: "high-performance"
});


renderer.setSize(
    window.innerWidth,
    window.innerHeight
);


renderer.setPixelRatio(
    Math.min(window.devicePixelRatio, 1.5)
);


renderer.shadowMap.enabled = true;

renderer.shadowMap.type =
    THREE.PCFSoftShadowMap;


document.body.appendChild(
    renderer.domElement
);


/* =====================================================
   LIGHTING
===================================================== */

const hemiLight =
    new THREE.HemisphereLight(
        0xbfd7ff,
        0x332516,
        1.7
    );

scene.add(hemiLight);


const sun =
    new THREE.DirectionalLight(
        0xffffff,
        2.2
    );

sun.position.set(
    15,
    25,
    10
);

sun.castShadow = true;

sun.shadow.mapSize.set(
    1024,
    1024
);

scene.add(sun);


/* =====================================================
   WORLD
===================================================== */

const world = new THREE.Group();

scene.add(world);


/* Ground */

const groundMaterial =
    new THREE.MeshStandardMaterial({
        color: 0x5b5147,
        roughness: 1
    });


const ground =
    new THREE.Mesh(
        new THREE.PlaneGeometry(
            120,
            120
        ),
        groundMaterial
    );


ground.rotation.x =
    -Math.PI / 2;


ground.receiveShadow = true;

world.add(ground);


/* =====================================================
   HELPER: CREATE BOX
===================================================== */

function createBox(
    x,
    y,
    z,
    width,
    height,
    depth,
    color = 0x665a4e
) {

    const material =
        new THREE.MeshStandardMaterial({
            color,
            roughness: 0.9
        });


    const mesh =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                width,
                height,
                depth
            ),
            material
        );


    mesh.position.set(
        x,
        y,
        z
    );


    mesh.castShadow = true;

    mesh.receiveShadow = true;


    world.add(mesh);

    return mesh;
}


/* =====================================================
   SLUM BUILDINGS
===================================================== */

for (
    let i = 0;
    i < 18;
    i++
) {

    const x =
        (Math.random() - 0.5) * 90;

    const z =
        (Math.random() - 0.5) * 80;


    if (
        Math.abs(x) < 14 &&
        Math.abs(z) < 14
    ) {
        continue;
    }


    createBox(
        x,
        1 + Math.random() * 4,
        z,
        4 + Math.random() * 7,
        2 + Math.random() * 8,
        4 + Math.random() * 7,
        0x403c3a
    );
}


/* =====================================================
   ROOFTOP DOJO
===================================================== */

createBox(
    0,
    0.6,
    0,
    25,
    1.2,
    22,
    0x292d31
);


/* Wooden barriers */

createBox(
    -11,
    2,
    0,
    1,
    3.5,
    20,
    0x754c35
);


createBox(
    11,
    2,
    0,
    1,
    3.5,
    20,
    0x754c35
);


createBox(
    0,
    2,
    -9,
    20,
    3.5,
    1,
    0x754c35
);


createBox(
    0,
    2,
    9,
    20,
    3.5,
    1,
    0x754c35
);


/* =====================================================
   LANTERNS
===================================================== */

const lanternPositions = [
    [-8, 4, -8],
    [8, 4, -8],
    [-8, 4, 8],
    [8, 4, 8]
];


for (
    const position of lanternPositions
) {

    const light =
        new THREE.PointLight(
            0xffa23a,
            3,
            13
        );


    light.position.set(
        position[0],
        position[1],
        position[2]
    );


    scene.add(light);
}


/* =====================================================
   CHARACTER CREATOR
===================================================== */

function createCharacter(
    color = 0x3b82f6
) {

    const group =
        new THREE.Group();


    /* Body */

    const body =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                1.15,
                1.65,
                0.7
            ),
            new THREE.MeshStandardMaterial({
                color
            })
        );


    body.position.y = 1.65;

    body.castShadow = true;

    group.add(body);


    /* Head */

    const head =
        new THREE.Mesh(
            new THREE.SphereGeometry(
                0.48,
                16,
                12
            ),
            new THREE.MeshStandardMaterial({
                color: 0xf1bd91
            })
        );


    head.position.y = 2.8;

    head.castShadow = true;

    group.add(head);


    /* Hair */

    const hair =
        new THREE.Mesh(
            new THREE.SphereGeometry(
                0.5,
                12,
                8,
                0,
                Math.PI * 2,
                0,
                Math.PI * 0.45
            ),
            new THREE.MeshStandardMaterial({
                color: 0x17120f
            })
        );


    hair.position.y = 3.02;

    hair.castShadow = true;

    group.add(hair);


    /* Legs */

    for (
        const x of [-0.32, 0.32]
    ) {

        const leg =
            new THREE.Mesh(
                new THREE.BoxGeometry(
                    0.3,
                    1.1,
                    0.38
                ),
                new THREE.MeshStandardMaterial({
                    color: 0x20252c
                })
            );


        leg.position.set(
            x,
            0.55,
            0
        );


        leg.castShadow = true;

        group.add(leg);
    }


    return group;
}


/* =====================================================
   JIN
===================================================== */

const jin =
    createCharacter(
        0x2563eb
    );


jin.position.set(
    0,
    0,
    5
);


world.add(jin);


jin.userData.vy = 0;


/* =====================================================
   TRAINING DUMMY
===================================================== */

const dummy =
    createBox(
        -5,
        1.5,
        -3,
        1.2,
        3,
        0.8,
        0x9ca3af
    );


dummy.userData = {

    hp: 100,

    maxHp: 100,

    dummy: true
};


/* =====================================================
   ENEMY SYSTEM
===================================================== */

const enemies = [];


function createEnemy(
    x,
    z,
    name = "Gorg",
    hp = 120,
    color = 0x7f1d1d
) {

    const enemy =
        createCharacter(color);


    enemy.scale.set(
        1.15,
        1.15,
        1.15
    );


    enemy.position.set(
        x,
        0,
        z
    );


    world.add(enemy);


    enemy.userData = {

        hp,

        maxHp: hp,

        name,

        speed: 0.028,

        attackCooldown: 0,

        hitCooldown: 0,

        boss: name === "Gorg"
    };


    enemies.push(enemy);

    return enemy;
}


/* =====================================================
   GORG
===================================================== */

const gorg =
    createEnemy(
        6,
        -2,
        "Gorg",
        350,
        0x4b5563
    );


/* =====================================================
   PLAYER STATS
===================================================== */

let hp = 100;

let stamina = 100;

let kinetic = 0;

let combo = 0;

let comboTimer = 0;


/* =====================================================
   CAMERA
===================================================== */

let yaw = 0;

let pitch = -0.25;

let cameraLocked = false;


/* =====================================================
   INPUT
===================================================== */

const keys = {};


let attacking = false;

let dodgeCooldown = 0;

let invulnerable = 0;


/* =====================================================
   MOVES
===================================================== */

const moves = [

    {
        name: "Water Punch",
        key: "Z",
        damage: 18,
        knockback: 1.2
    },

    {
        name: "Crane Kick",
        key: "X",
        damage: 25,
        knockback: 2.4
    },

    {
        name: "Low Sweep",
        key: "C",
        damage: 20,
        knockback: 2
    },

    {
        name: "Crane Launcher",
        key: "X + S",
        damage: 30,
        knockback: 3.2,
        launch: true
    },

    {
        name: "Air Dive",
        key: "AIR X",
        damage: 35,
        knockback: 3
    },

    {
        name: "Iron Counter",
        key: "TIMED C",
        damage: 45,
        knockback: 4
    },

    {
        name: "Seismic Slam",
        key: "Z + X",
        damage: 55,
        knockback: 3.5
    }

];


/* =====================================================
   CUSTOM COMBO
===================================================== */

let customCombo = [
    0,
    3,
    4
];


let comboIndex = 0;


/* =====================================================
   HUD
===================================================== */

function updateHUD() {

    document.getElementById(
        "hp"
    ).style.width =
        Math.max(0, hp) + "%";


    document.getElementById(
        "stamina"
    ).style.width =
        Math.max(0, stamina) + "%";


    document.getElementById(
        "kinetic"
    ).style.width =
        Math.min(100, kinetic) + "%";


    document.getElementById(
        "combo"
    ).innerHTML =
        `COMBO <b>${combo}</b>`;
}


/* =====================================================
   MESSAGE
===================================================== */

function showMessage(text) {

    document.getElementById(
        "message"
    ).textContent = text;
}


/* =====================================================
   DAMAGE FLASH
===================================================== */

function damageFlash() {

    const flash =
        document.getElementById(
            "damageFlash"
        );


    flash.style.opacity = "0.3";


    setTimeout(() => {

        flash.style.opacity = "0";

    }, 100);
}


/* =====================================================
   ATTACK
===================================================== */

function attack(moveIndex) {

    if (
        attacking ||
        stamina < 7 ||
        hp <= 0
    ) {
        return;
    }


    attacking = true;


    const move =
        moves[moveIndex];


    stamina -= 7;


    kinetic =
        Math.min(
            100,
            kinetic + 8
        );


    jin.rotation.y = yaw;


    const originalPosition =
        jin.position.clone();


    /*
      Small forward movement.
    */

    jin.position.x +=
        Math.sin(yaw) * 0.7;


    jin.position.z +=
        Math.cos(yaw) * 0.7;


    setTimeout(() => {

        let hit = false;


        /*
          Hit enemies.
        */

        [
            ...enemies,
            dummy
        ].forEach(target => {

            if (
                !target.visible ||
                !target.userData.hp
            ) {
                return;
            }


            const distance =
                jin.position.distanceTo(
                    target.position
                );


            if (distance < 3.1) {

                target.userData.hp -=
                    move.damage;


                hit = true;


                const direction =
                    target.position
                        .clone()
                        .sub(jin.position)
                        .normalize();


                target.position.addScaledVector(
                    direction,
                    move.knockback
                );


                target.userData.hitCooldown =
                    0.3;


                /*
                  Launch move.
                */

                if (
                    move.launch
                ) {

                    target.position.y += 2;

                    setTimeout(() => {

                        target.position.y =
                            Math.max(
                                0,
                                target.position.y - 2
                            );

                    }, 500);
                }


                /*
                  Enemy defeated.
                */

                if (
                    target.userData.hp <= 0
                ) {

                    target.visible = false;


                    showMessage(
                        `${target.userData.name || "Training Dummy"} defeated!`
                    );
                }

            }

        });


        if (hit) {

            combo++;

            comboTimer = 1.1;

            kinetic =
                Math.min(
                    100,
                    kinetic + 10
                );


            showMessage(
                `${move.name} • HIT!`
            );

        } else {

            showMessage(
                move.name
            );
        }


        attacking = false;

        updateHUD();

    }, 120);


    setTimeout(() => {

        jin.position.copy(
            originalPosition
        );

    }, 190);
}


/* =====================================================
   DODGE
===================================================== */

function dodge() {

    if (
        stamina < 18 ||
        dodgeCooldown > 0
    ) {
        return;
    }


    stamina -= 18;

    dodgeCooldown = 0.35;

    invulnerable = 0.45;


    let dx = 0;

    let dz = 0;


    if (keys.w)
        dz -= 1;

    if (keys.s)
        dz += 1;

    if (keys.a)
        dx -= 1;

    if (keys.d)
        dx += 1;


    if (
        dx === 0 &&
        dz === 0
    ) {
        dz = -1;
    }


    const length =
        Math.hypot(
            dx,
            dz
        );


    dx /= length;

    dz /= length;


    /*
      Dodge direction is
      relative to camera.
    */

    const cos =
        Math.cos(yaw);

    const sin =
        Math.sin(yaw);


    const moveX =
        dx * cos -
        dz * sin;


    const moveZ =
        dx * sin +
        dz * cos;


    jin.position.x +=
        moveX * 3;


    jin.position.z +=
        moveZ * 3;


    showMessage(
        "DODGE!"
    );


    updateHUD();
}


/* =====================================================
   KEYBOARD
===================================================== */

window.addEventListener(
    "keydown",
    event => {

        const key =
            event.key.toLowerCase();


        keys[key] = true;


        /*
          Jump
        */

        if (
            event.code === "Space" &&
            !event.repeat &&
            jin.position.y <= 0.05
        ) {

            jin.userData.vy =
                0.25;
        }


        /*
          Dodge
        */

        if (
            key === "f" &&
            !event.repeat
        ) {

            dodge();
        }


        /*
          Z
        */

        if (
            key === "z" &&
            !event.repeat
        ) {

            /*
              Z + X = Seismic Slam
            */

            if (keys.x) {

                attack(6);

            } else {

                /*
                  Custom combo.
                */

                attack(
                    customCombo[
                        comboIndex
                    ]
                );


                comboIndex++;

                if (
                    comboIndex >= 3
                ) {

                    comboIndex = 0;
                }
            }
        }


        /*
          X
        */

        if (
            key === "x" &&
            !event.repeat
        ) {

            /*
              X + S
              Crane Launcher
            */

            if (keys.s) {

                attack(3);

            } else {

                /*
                  Air X
                */

                if (
                    jin.position.y > 0.2
                ) {

                    attack(4);

                } else {

                    attack(1);
                }
            }
        }


        /*
          C
        */

        if (
            key === "c" &&
            !event.repeat
        ) {

            attack(2);
        }

    }
);


window.addEventListener(
    "keyup",
    event => {

        keys[
            event.key.toLowerCase()
        ] = false;

    }
);


/* =====================================================
   MOUSE CAMERA
===================================================== */

renderer.domElement.addEventListener(
    "click",
    () => {

        if (
            cameraLocked
        ) {

            renderer.domElement.requestPointerLock();
        }

    }
);


document.addEventListener(
    "mousemove",
    event => {

        if (
            document.pointerLockElement !==
            renderer.domElement
        ) {
            return;
        }


        yaw -=
            event.movementX *
            0.0025;


        pitch -=
            event.movementY *
            0.0018;


        pitch =
            Math.max(
                -1.1,
                Math.min(
                    0.4,
                    pitch
                )
            );
    }
);


/* =====================================================
   CAMERA BUTTON
===================================================== */

document.getElementById(
    "lock"
).onclick = () => {

    cameraLocked =
        !cameraLocked;


    if (
        cameraLocked
    ) {

        renderer.domElement.requestPointerLock();

    } else {

        document.exitPointerLock();
    }
};


/* =====================================================
   COMBO LAB
===================================================== */

const comboPanel =
    document.getElementById(
        "labPanel"
    );


document.getElementById(
    "lab"
).onclick = () => {

    comboPanel.classList.remove(
        "hidden"
    );
};


document.getElementById(
    "closeLab"
).onclick = () => {

    comboPanel.classList.add(
        "hidden"
    );
};


/*
  Clicking a slot cycles
  through unlocked moves.
*/

document
    .querySelectorAll(
        ".slots button"
    )
    .forEach(button => {

        button.onclick = () => {

            const slot =
                Number(
                    button.dataset.slot
                );


            customCombo[slot] =
                (
                    customCombo[slot] +
                    1
                ) % moves.length;


            button.innerHTML =
                `SLOT ${slot + 1}: <b>${moves[customCombo[slot]].name}</b>`;
        };

    });


/* =====================================================
   SAVE GAME
===================================================== */

document.getElementById(
    "save"
).onclick = () => {

    const saveData = {

        hp,

        stamina,

        kinetic,

        customCombo

    };


    localStorage.setItem(
        "jinSave",
        JSON.stringify(
            saveData
        )
    );


    showMessage(
        "GAME SAVED!"
    );
};


/* =====================================================
   LOAD GAME
===================================================== */

const savedGame =
    localStorage.getItem(
        "jinSave"
    );


if (savedGame) {

    try {

        const data =
            JSON.parse(
                savedGame
            );


        hp =
            data.hp ?? 100;


        stamina =
            data.stamina ?? 100;


        kinetic =
            data.kinetic ?? 0;


        customCombo =
            data.customCombo ??
            customCombo;

    } catch {

        console.log(
            "Save data could not be loaded."
        );
    }
}


/* =====================================================
   PLAYER UPDATE
===================================================== */

function updatePlayer(delta) {

    /*
      Movement speed.
    */

    let speed =
        keys.shift
            ? 0.16
            : 0.095;


    let moveX = 0;

    let moveZ = 0;


    if (keys.w)
        moveZ -= 1;

    if (keys.s)
        moveZ += 1;

    if (keys.a)
        moveX -= 1;

    if (keys.d)
        moveX += 1;


    /*
      Normalize diagonal movement.
    */

    if (
        moveX !== 0 ||
        moveZ !== 0
    ) {

        const length =
            Math.hypot(
                moveX,
                moveZ
            );


        moveX /= length;

        moveZ /= length;


        /*
          Camera-relative movement.
        */

        const cos =
            Math.cos(yaw);

        const sin =
            Math.sin(yaw);


        const worldX =
            moveX * cos -
            moveZ * sin;


        const worldZ =
            moveX * sin +
            moveZ * cos;


        jin.position.x +=
            worldX *
            speed *
            delta *
            60;


        jin.position.z +=
            worldZ *
            speed *
            delta *
            60;


        jin.rotation.y =
            yaw;
    }


    /*
      Gravity.
    */

    jin.userData.vy =
        (
            jin.userData.vy ||
            0
        ) -
        0.014 *
        delta *
        60;


    jin.position.y +=
        jin.userData.vy *
        delta *
        60;


    /*
      Ground collision.
    */

    if (
        jin.position.y < 0
    ) {

        jin.position.y = 0;

        jin.userData.vy = 0;
    }


    /*
      Keep Jin inside dojo.
    */

    jin.position.x =
        THREE.MathUtils.clamp(
            jin.position.x,
            -10.5,
            10.5
        );


    jin.position.z =
        THREE.MathUtils.clamp(
            jin.position.z,
            -8.8,
            8.8
        );


    /*
      Stamina regeneration.
    */

    stamina =
        Math.min(
            100,
            stamina +
            0.16 *
            delta
        );


    dodgeCooldown =
        Math.max(
            0,
            dodgeCooldown - delta
        );


    invulnerable =
        Math.max(
            0,
            invulnerable - delta
        );


    /*
      Combo timeout.
    */

    if (
        comboTimer > 0
    ) {

        comboTimer -= delta;

    } else {

        combo = 0;
    }
}


/* =====================================================
   ENEMY AI
===================================================== */

function updateEnemies(delta) {

    enemies.forEach(
        enemy => {

            if (
                !enemy.visible ||
                enemy.userData.hp <= 0
            ) {
                return;
            }


            enemy.userData.attackCooldown =
                Math.max(
                    0,
                    enemy.userData.attackCooldown -
                    delta
                );


            enemy.userData.hitCooldown =
                Math.max(
                    0,
                    enemy.userData.hitCooldown -
                    delta
                );


            const dx =
                jin.position.x -
                enemy.position.x;


            const dz =
                jin.position.z -
                enemy.position.z;


            const distance =
                Math.hypot(
                    dx,
                    dz
                );


            /*
              Move toward Jin.
            */

            if (
                distance > 1.8
            ) {

                enemy.position.x +=
                    (
                        dx / distance
                    ) *
                    enemy.userData.speed *
                    delta *
                    60;


                enemy.position.z +=
                    (
                        dz / distance
                    ) *
                    enemy.userData.speed *
                    delta *
                    60;
            }


            /*
              Enemy attack.
            */

            if (
                distance < 2.1 &&
                enemy.userData.attackCooldown <= 0 &&
                invulnerable <= 0
            ) {

                hp =
                    Math.max(
                        0,
                        hp - 7
                    );


                enemy.userData.attackCooldown =
                    1.1;


                damageFlash();


                showMessage(
                    `${enemy.userData.name} hit Jin!`
                );
            }

        }
    );
}


/* =====================================================
   CAMERA
===================================================== */

function updateCamera() {

    const target =
        new THREE.Vector3(
            jin.position.x,
            jin.position.y + 1.7,
            jin.position.z
        );


    const distance = 8;


    const cameraX =
        target.x -
        Math.sin(yaw) *
        Math.cos(pitch) *
        distance;


    const cameraZ =
        target.z -
        Math.cos(yaw) *
        Math.cos(pitch) *
        distance;


    const cameraY =
        target.y +
        Math.sin(pitch) *
        distance;


    const desired =
        new THREE.Vector3(
            cameraX,
            cameraY,
            cameraZ
        );


    camera.position.lerp(
        desired,
        0.15
    );


    camera.lookAt(
        target
    );
}


/* =====================================================
   STORY
===================================================== */

function showStory(
    title,
    text
) {

    document.getElementById(
        "storyTitle"
    ).textContent =
        title;


    document.getElementById(
        "storyText"
    ).textContent =
        text;


    document.getElementById(
        "story"
    ).classList.remove(
        "hidden"
    );
}


document.getElementById(
    "storyNext"
).onclick = () => {

    document.getElementById(
        "story"
    ).classList.add(
        "hidden"
    );
};


/* =====================================================
   OPENING STORY
===================================================== */

setTimeout(
    () => {

        showStory(
            "THE SLUM DOJO",

            "Jin arrives at Master Shen's rooftop dojo. Here he will learn to turn anger into calm, flowing momentum. Train, spar, eat, rest, and master the foundation."
        );

    },
    500
);


/* =====================================================
   MAIN GAME LOOP
===================================================== */

let previousTime =
    performance.now();


function gameLoop(
    currentTime
) {

    requestAnimationFrame(
        gameLoop
    );


    const delta =
        Math.min(
            0.033,
            (
                currentTime -
                previousTime
            ) / 1000
        );


    previousTime =
        currentTime;


    updatePlayer(
        delta
    );


    updateEnemies(
        delta
    );


    updateCamera();


    /*
      Death / respawn.
    */

    if (
        hp <= 0
    ) {

        hp = 100;

        stamina = 100;

        kinetic = 0;

        combo = 0;

        jin.position.set(
            0,
            0,
            5
        );


        showMessage(
            "Jin falls... but rises again."
        );
    }


    updateHUD();


    renderer.render(
        scene,
        camera
    );
}


gameLoop(
    performance.now()
);


/* =====================================================
   WINDOW RESIZE
===================================================== */

window.addEventListener(
    "resize",
    () => {

        camera.aspect =
            window.innerWidth /
            window.innerHeight;


        camera.updateProjectionMatrix();


        renderer.setSize(
            window.innerWidth,
            window.innerHeight
        );

    }
);


/* =====================================================
   STARTUP MESSAGE
===================================================== */

console.log(
    "JIN — The Kinetic Current loaded."
);

console.log(
    "WASD = Move | Space = Jump | F = Dodge | Z/X/C = Combat"
);

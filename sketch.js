const game = {
    state: 'game',
    baddies: [],
    player_bullets: [],
    baddie_bullets: [],
    debrees: [],
    flash_timer: 5,
    wave_timer: 0,
    super_duration: 0
};

const guns = {
    smg: {
        name: "smg",
        firerate: 30,
        fireCD: 0,
        damage: 1,
        hp: 1,
        width: 5,
        height: 5,
        move_speed: 8,
        range: 30,
        bullets_per_shot: 1
    },
    shot_gun: {
        name: "shot_gun",
        firerate: 100,
        fireCD: 0,
        damage: 1,
        hp: 1,
        width: 5,
        height: 5,
        move_speed: 7,
        range: 15,
        bullets_per_shot: 6
    }
};

const player = {
    x: 0,
    y: 0,
    height: 30,
    width: 30,
    hp: 5,
    max_hp: 5,
    money: 50,
    move_speed: 1,
    attack_speed: 1,
    damage: 0.5,
    dash: 0,
    dash_duration: 10,
    dash_cd: 0,
    dash_cd_timer: 100,
    wave: 1,
    invince: 0,
    super: 0,
    super_duration: 5,
    max_super: 10,
    welth: 1,
    welth_in_super: 1,
    luck: 0,
    weapons: [
        {...guns.shot_gun}
    ]
};

const waves = [
    {
        max_baddies: 4,
        timer: 15,
        baddies: ['mini_square']
    },
    {
        max_baddies: 6,
        timer: 20,
        baddies: ['mini_square']
    },
    {
        max_baddies: 8,
        timer: 25,
        baddies: ['mini_square', 'mini_square', 'mini_square', 'reg_square']
    },
    {
        max_baddies: 12,
        timer: 30,
        baddies: ['mini_square', 'mini_square', 'mini_square', 'reg_square']
    },
    {
        max_baddies: 20,
        timer: 35,
        baddies: ['mini_square', 'mini_square', 'mini_square', 'reg_square']
    },
    {
        max_baddies: 40,
        timer: 40,
        baddies: ['mini_square', 'mini_square', 'mini_square', 'reg_square']
    },
    {
        max_baddies: 80,
        timer: 40,
        baddies: ['mini_square', 'mini_square', 'mini_square', 'reg_square']
    },
    {
        max_baddies: 160,
        timer: 40,
        baddies: ['mini_square', 'mini_square', 'mini_square', 'reg_square']
    },
    {
        max_baddies: 320,
        timer: 40,
        baddies: ['mini_square', 'mini_square', 'mini_square', 'reg_square']
    },
];

const baddie_list = 
{
    mini_square: {
        width: 20,
        height: 20,
        move_speed: 2,
        hp: 3,
        damage: 1,
        money: 1
    },
    reg_square: {
        width: 40,
        height: 40,
        move_speed: 1.5,
        hp: 5,
        damage: 1,
        money: 2
    }
    
};



const all_items = [
    {
        name: "maching gun",
        key: "smg",
        type: "weapon",
        description1: "pew pew pew pew",
        cost: 25,
        rarity: 1
    },
    {
        name: "shot gun",
        key: "shot_gun",
        type: "weapon",
        description1: "chck chck boom!",
        cost: 25,
        rarity: 1
    },
    {
        name: "stim pack",
        type: "upgrade",
        description1: "+10% attack speed",
        description2: "+10% damage",
        cost: 30,
        rarity: 2,
        upgrades: [
            {
                stat: "attack_speed",
                value: 0.1
            },
            {
                stat: "damage",
                value: 0.05
            }
        ]
    },
    {
        name: "Give a tip",
        type: "upgrade",
        description1: "Better chance for",
        description2: "rare items in shop",
        cost: 30,
        rarity: 2,
        upgrades: [
            {
                stat: "luck",
                value: 0.5
            }
        ]
    },
    {
        name: "Energizer",
        type: "upgrade",
        description1: "Super duration",
        description2: "+ 2 Seconds",
        cost: 30,
        rarity: 1,
        upgrades: [
            {
                stat: "super_duration",
                value: 2
            }
        ]
    },
    {
        name: "Blood Rush",
        type: "upgrade",
        description1: "Fill up super meter",
        description2: "10 % faster",
        cost: 30,
        rarity: 2,
        upgrades: [
            {
                stat: "function",
                value: () =>
                {
                    player.super *=  0.9;
                    player.max_super *= 0.9;
                }
            }
        ]
    },
    {
        name: "Steak & Potate",
        type: "upgrade",
        description1: "+2 HP",
        description2: "+10% damage",
        cost: 30,
        rarity: 3,
        upgrades: [
            {
                stat: "max_hp",
                value: 2
            },
            {
                stat: "hp",
                value: 2
            },
            {
                stat: "damage",
                value: 0.05
            },
        ]
    },
    {
        name: "Side hussle",
        type: "upgrade",
        description1: "Earn 10%",
        description2: "more money",
        cost: 30,
        rarity: 3,
        upgrades: [
            {
                stat: "welth",
                value: 0.1
            }
        ]
    },
    {
        name: "The Gig",
        type: "upgrade",
        description1: "Earn double the",
        description2: "money while in super",
        cost: 30,
        rarity: 4,
        upgrades: [
            {
                stat: "welth_in_super",
                value: 2
            }
        ],
        quantity: 1
    }
];

const shop = {
    items: [],
  
    generateShopItems: function() {
      // Clear existing items
      this.items = [];
  
      // Populate the shop with random items based on rarity
      while (this.items.length < 3) {
        const randomIndex = Math.floor(Math.random() * all_items.length);
        const randomItem = all_items[randomIndex];
        if (!this.items.includes(randomItem) && (randomItem.quantity === undefined || randomItem.quantity > 0)) {
            console.log(randomItem.quantity)
          this.items.push(randomItem);
        }
      }
    }
  };

const themes = [];
const super_themes = [];
let orbitRadius = 30;
let angle = 0;
let uiCanvas;
let graident_changer = 0;

let hit_sound;
let super_death_sound;
let death_sound;
let font;
let invalid;
let smg;
let shot_gun;


const isPlaying = {
    hit_sound: 0,
    smg: 0,
    shot_gun: 0,
    super_death_sound: 0,
    death_sound: 0,
    death_small_sound: 0,
    theme_playing_index: 0,
    invalid: 0,
    level_complete: false
}

function preload()
{
    //load all the audio files
    themes.push( 
        new Howl({
			src: ['assets/music/theme_1.wav'],
			volume: 0.12,
            autoplay: false,
            onend: function() {
                playNextTheme();
          }
		}));

    themes.push( 
        new Howl({
            src: ['assets/music/theme_2.wav'],
            volume: 0.12,
            autoplay: false,
            onend: function() {
                playNextTheme();
          }
        }));
    
    themes.push( 
        new Howl({
            src: ['assets/music/theme_3.wav'],
            volume: 0.10,
            autoplay: false,
            onend: function() {
                playNextTheme();
            }
        }));

    themes.push( 
        new Howl({
            src: ['assets/music/theme_4.wav'],
            volume: 0.10,
            autoplay: false,
            onend: function() {
                playNextTheme();
            }
        }));

    themes.push( 
        new Howl({
            src: ['assets/music/theme_5.wav'],
            volume: 0.10,
            autoplay: false,
            onend: function() {
                playNextTheme();
            }
        }));


    super_themes.push( 
        new Howl({
            src: ['assets/music/super_theme_1.wav'],
            volume: 0.10,
            autoplay: false,
            onend: function() {
                playNextTheme();
            }
        }));

    super_themes.push( 
        new Howl({
            src: ['assets/music/super_theme_2.wav'],
            volume: 0.10,
            autoplay: false,
            onend: function() {
                playNextTheme();
            }
        }));
    
    super_themes.push( 
        new Howl({
            src: ['assets/music/super_theme_3.wav'],
            volume: 0.08,
            autoplay: false,
            onend: function() {
                playNextTheme();
            }
        }));

    super_themes.push( 
        new Howl({
            src: ['assets/music/super_theme_4.wav'],
            volume: 0.08,

            autoplay: false,
            onend: function() {
                playNextTheme();
            }
        }));

    super_themes.push( 
        new Howl({
            src: ['assets/music/super_theme_5.wav'],
            volume: 0.08,
            autoplay: false,
            onend: function() {
                playNextTheme();
            }
        }));

    hit_sound = new Howl({
        src: ['assets/soundfx/hit.wav'],
        volume: 0.3,
        onend: function() {
            isPlaying.hit_sound --;  
      }
    });

    death_sound = new Howl({
        src: ['assets/soundfx/death_big.wav'],
        volume: 0.8,
        onend: function() {
            isPlaying.death_sound --;  
      }
    });

    death_small_sound = new Howl({
        src: ['assets/soundfx/death_small.wav'],
        volume: 0.8,
        onend: function() {
            isPlaying.death_small_sound --;  
      }
    });

    super_kick = new Howl({
        src: ['assets/soundfx/super_kick.mp3'],
        volume: 0.2
    });

    smg = new Howl({
        src: ['assets/soundfx/smg.mp3'],
        volume: 0.08,
        onend: function() {
            isPlaying.smg --;  
      }
    });

    shot_gun = new Howl({
        src: ['assets/soundfx/shot_gun.mp3'],
        volume: 0.02,
        onend: function() {
            isPlaying.shot_gun --;  
      }
    });

    super_death_sound = new Howl({
        src: ['assets/soundfx/super_death.mp3'],
        volume: 0.03,
        onend: function() {
            isPlaying.super_death_sound --;  
      }
    });

    level_complete = new Howl({
        src: ['assets/soundfx/level_complete.mp3'],
        volume: 0.7
    });

    upgrade = new Howl({
        src: ['assets/soundfx/upgrade.mp3'],
        volume: 2
    });

    invalid = new Howl({
        src: ['assets/soundfx/invalid.mp3'],
        volume: 0.2,
        onend: function() {
            isPlaying.invalid --;  
      }
    });

    player.x = windowWidth/2;
    player.y = windowHeight/2;

    font = loadFont('Bungee-Regular.ttf');
    
}

function setup()
{
	createCanvas(windowWidth, windowHeight);
    uiCanvas = createGraphics(windowWidth, 50);
	rectMode(CENTER);
    game.wave_timer = waves[player.wave -1].timer;
    textFont(font);
    uiCanvas.textFont(font);
    setTimeout(startTheme, 1000);
    setInterval(updateWaveTimer, 1000);       
}


function draw()
{
    if(game.state === 'game')
    {        
        if(game.super_duration > 0)
        {
            background(0, 0, 0, 25);
        }
        else
        {
            background(255, 255, 255);
        }
        if(game.baddies.length < waves[player.wave - 1].max_baddies)
        {
            spawnBaddie();
        }
        drawDebree();
        drawBaddies();
        drawPlayer();
        fireGuns();
        drawGuns();
        drawBullets();
        // Draw the UI canvas at the top of the main canvas
        drawUI();
    }
    else if (game.state === 'shop')
    {
        showShop();
    }
    else if (game.state === 'wave complete')
    {
        waveComplete();
    }
    // Check if the game is running on a mobile device
    if (isMobileDevice()) {
        background(220);
        // Display a message or take action to inform the user
        fill(255, 0, 0);
        textSize(32);
        textAlign(CENTER, CENTER);
        text("Not supported on mobile devices.", width / 2, height / 2);
        uiCanvas = null;
        noLoop(); // Stop the game loop
    }
}


function drawPlayer()
{
    // Initialize the movement vectors
    let moveX = 0;
    let moveY = 0;

    // Check for player input to move right
    if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) {
        moveX += player.move_speed;
    }

    // Check for player input to move left
    if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) {
        moveX -= player.move_speed;
    }

    // Check for player input to move up
    if (keyIsDown(UP_ARROW) || keyIsDown(87)) {
        moveY -= player.move_speed;
    }

    // Check for player input to move down
    if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) {
        moveY += player.move_speed;
    }

    // Normalize the movement vector
    let magnitude = sqrt(moveX * moveX + moveY * moveY);
    if (magnitude > 0) {
        moveX /= magnitude;
        moveY /= magnitude;
    }

    //spacebar is down
    if (keyIsDown(32) && player.super === player.max_super)
    {
        super_kick.play();
        player.super = 0;
        game.super_duration += player.super_duration;
        player.attack_speed *= 2;
        player.damage *= 2;
        player.move_speed *= 2;
        switchToSuperSong(themes[isPlaying.theme_playing_index], super_themes[isPlaying.theme_playing_index])
    }
    if (keyIsDown(32) && player.dash_cd === 0 && game.super_duration === 0)
    {
        player.dash = player.dash_duration;
        player.dash_cd = player.dash_cd_timer;
        moveY = moveY * 6;
        moveX = moveX * 6;
    }
    else if (player.dash > 0)
    {
        moveY = moveY * 6;
        moveX = moveX * 6;
        player.dash --;
        player.height -= 4;
    }

    if (player.dash_cd > 0)
    {
        player.dash_cd --;
        if(player.height !== player.width)
        {
            player.height += 2;
        }
    }

    // Update player's position
    const next_x = player.x + (moveX * 3*player.move_speed);
    const next_y =  player.y + (moveY * 3*player.move_speed);
    

    if(next_x - player.width/2 > 0 && next_x + player.width/2 < windowWidth)
    {
        player.x += moveX * 3*player.move_speed; 
    }
    if(next_y - player.width/2 > 50 && next_y + player.width/2 < windowHeight)
    {
        player.y += moveY * 3*player.move_speed;
    }
    
    // Draw the player
    if(player.invince > 0)
    {
        
        if(player.invince % 10 == 0)
        {
            fill(255, 255, 255);
        }
        else
        {
            fill(24, 120, 245);
        }
            
        player.invince --;
    }
    else 
    {
        fill(24, 120, 245);
    }
    stroke(17, 84, 171);
    strokeWeight(4);
    ellipse(player.x, player.y, player.width, player.height);
}

function spawnBaddie()
{    
    const spawn_point = generageSpawnPoint();
    const randomIndex = Math.floor(Math.random() * waves[player.wave-1].baddies.length)
    const baddie_stats = baddie_list[waves[player.wave-1].baddies[randomIndex]];

    game.baddies.push(
        {
            name: waves[player.wave-1].baddies[randomIndex],
            x : spawn_point.x,
            y : spawn_point.y,
            width: 0,
            height: 0,
            move_speed: baddie_stats.move_speed,
            hp: baddie_stats.hp,
            damage: baddie_stats.damage,
            money: baddie_stats.money,
            flash_timer: 0
        }
    )
}

function generageSpawnPoint()
{
    let spawnX, spawnY;
    let distance
    do {
      // Generate random coordinates within the canvas
      spawnX = random(width);
      spawnY = random(50, height);
      // Calculate the distance between player and spawn point
      distance = dist(spawnX, spawnY, player.x, player.y);
    } while (distance < 300); // Keep generating until distance is at least 100 units
    return createVector(spawnX, spawnY);
}

function drawBaddies()
{
    for (const baddie of game.baddies)
    {
        //spawn animation
        if(baddie.width < baddie_list[baddie.name].width)
        {
            baddie.width += baddie_list[baddie.name].width/50;
        }
        if(baddie.height < baddie_list[baddie.name].height)
        {
            baddie.height +=  baddie_list[baddie.name].height/50;
        }
        // Calculate the direction vector from baddie to player
        let directionX = player.x - baddie.x;
        let directionY = player.y - baddie.y;

        // Calculate the magnitude (distance) of the direction vector
        const magnitude = dist(baddie.x, baddie.y, player.x, player.y);
        // Normalize the direction vector to get a unit vector
        directionX /= magnitude;
        directionY /= magnitude;
        // Update the baddie's position based on the direction and move_speed
        baddie.x += directionX * baddie.move_speed;
        baddie.y += directionY * baddie.move_speed;

        if (player.x + player.width / 3 > baddie.x - baddie.width / 2 &&
        player.x - player.width / 3 < baddie.x + baddie.width / 2 &&
        player.y + player.height / 3 > baddie.y - baddie.height / 2 &&
        player.y - player.height / 3 < baddie.y + baddie.height / 2) {
            //check for collision
            if (player.invince === 0 && player.dash === 0)
            {
                player.invince = 50;
                player.hp --;
                if (player.hp <= 0)
                {
                    console.log('game over');
                }
            }
        }

        if(baddie.flash_timer != 0)
        {
            fill(255, 255, 255);
            baddie.flash_timer --;
        }
        else
        {
            fill(255, 255 - (baddie.hp * 30), baddie.hp * 30);
        }
        stroke(255, 0, 0);
        rect(baddie.x, baddie.y, baddie.width, baddie.height);
    }
}

function fireGuns()
{
    for (const gun of player.weapons)
    {
        if (gun.fireCD <= 0)
        {
            const closest_baddie = findClosestBaddie();
            // Calculate the direction vector from baddie to player
            let directionX = closest_baddie.x - gun.x;
            let directionY = closest_baddie.y - gun.y;

            // Calculate the magnitude (distance) of the direction vector
            const magnitude = dist(gun.x, gun.y, closest_baddie.x, closest_baddie.y);
            // Normalize the direction vector to get a unit vector
            directionX /= magnitude;
            directionY /= magnitude;
            
            if(gun.name === 'smg')
            {
                playSound(smg, 'smg');
                game.player_bullets.push(
                    {
                        x: gun.x,
                        y: gun.y,
                        damage: gun.damage,
                        hp: gun.hp,
                        speed: 4,
                        xvel:  directionX * gun.move_speed,
                        yvel: directionY * gun.move_speed,
                        width: gun.width,
                        height: gun.height,
                        range: gun.range
                    }
                )
            }

            //handle shot gun
            if(gun.name === 'shot_gun')
            {
                playSound(shot_gun, 'shot_gun');             
                const spreadAngle = PI;
                for (let i = 0; i < gun.bullets_per_shot; i++)
                {
                    const angle = random(-spreadAngle, spreadAngle);
                    
                    game.player_bullets.push(
                        {
                            x: gun.x,
                            y: gun.y,
                            damage: gun.damage * player.damage,
                            hp: gun.hp,
                            speed: 4,
                            xvel: cos(angle) + directionX * gun.move_speed,
                            yvel: sin(angle) + directionY * gun.move_speed,
                            width: gun.width,
                            height: gun.height,
                            range: gun.range
                        }
                    )
                }
            }
            gun.fireCD = gun.firerate / player.attack_speed;
        }
        else
        {
            gun.fireCD -= 1;
        }
    }
}

function drawBullets()
{
    const bulletsToRemove = [];
    const baddiesToRemove = [];
    for (const [bullet_index, bullet] of game.player_bullets.entries())
    {
        bullet.x += bullet.xvel;
        bullet.y += bullet.yvel;
        bullet.range -= 1;
        if(bullet.range <= 0)
        {
            bullet.height -= 0.25;
            bullet.width -= 0.25;
            if(bullet.height < 0 || bullet.width < 0)
            {
                bulletsToRemove.push(bullet_index);                
            }
        }

        //check out of bounds
        if(bullet.x < 0 || bullet.x > windowWidth || bullet.y < 0 || bullet.y > windowHeight)
        {
            if (!bulletsToRemove.includes(bullet_index))
            {
                bulletsToRemove.push(bullet_index);
            }
        }
        else
        {
            //hit dectection
            for (const [baddie_index, baddie] of game.baddies.entries())
            {
                if (bullet.x + bullet.width / 2 > baddie.x - baddie.width / 2 &&
                bullet.x - bullet.width / 2 < baddie.x + baddie.width / 2 &&
                bullet.y + bullet.height / 2 > baddie.y - baddie.height / 2 &&
                bullet.y - bullet.height / 2 < baddie.y + baddie.height / 2) {
                    //hit
                    baddie.hp -=  bullet.damage * player.damage;
                    baddie.flash_timer = game.flash_timer;
                    if(baddie.hp > 0)
                    {
                        playSound(hit_sound, 'hit_sound');

                    }
                  

                    if (baddie.hp <= 0)
                    {
                        if (!baddiesToRemove.includes(baddie_index))
                        {
                            if(game.super_duration === 0)
                            {
                                if(baddie.name === 'mini_square')
                                {
                                    playSound(death_small_sound, 'death_small_sound');
                                }
                                else
                                {
                                    playSound(death_sound, 'death_sound');
                                }
                            }
                            else
                            {
                                playSound(super_death_sound, 'super_death_sound');
                            }                       

                            baddiesToRemove.push(baddie_index);
                            if (game.super_duration > 0)
                                player.money += (baddie.money * player.welth) * player.welth_in_super;
                            else
                                player.money += baddie.money * player.welth;

                            if(player.super !== player.max_super && game.super_duration === 0)
                            {
                                player.super++;
                                if(player.super > player.max_super)
                                    player.super = player.max_super;
                            }
                                
                            createDebree(baddie.x, baddie.y, baddie.width*4);
                        }
                    }
                    bullet.hp -= 1;
                    if (bullet.hp <= 0)
                    {
                        if (!bulletsToRemove.includes(bullet_index))
                        {
                            bulletsToRemove.push(bullet_index);
                        }
                    }
                }
            }
        }
        ellipse(bullet.x, bullet.y, bullet.width, bullet.height)
    }
    //remove dead bullets and baddies
    for (const bullet_index of bulletsToRemove) {
        game.player_bullets.splice(bullet_index, 1); // Remove one element at the given index
      }
    for (const baddies_index of baddiesToRemove) {
        game.baddies.splice(baddies_index, 1); // Remove one element at the given index
    }
}

function findClosestBaddie()
{
    let closestBaddie = null;
    let closestDistance = Infinity; // Initialize with a large value
  
    for (let i = 0; i < game.baddies.length; i++) {
      let baddie = game.baddies[i];
  
      // Calculate the distance between the baddie and the player
      let distance = dist(baddie.x, baddie.y, player.x, player.y);
  
      // Check if this baddie is closer than the previously found closest baddie
      if (distance < closestDistance) {
        closestBaddie = baddie;
        closestDistance = distance;
      }
    }
  
    return closestBaddie;
  }


function createDebree(p_x, p_y, width)
{
    for (let i = 40; i > 0; i --)
    {
        debree =
        {
            width: width/15 +2,
            height: width/15 +2,
            x: p_x + i,
            y: p_y + i,
            xspeed: random(-4, 4),
            yspeed: random(-4, 4),
            color: color(255, random(0,120), random(0,120))
        }
        game.debrees.push(debree);
    }
}

function drawDebree()
{
	for (let i = 0; i < game.debrees.length; i++) {
		game.debrees[i].x = game.debrees[i].x + game.debrees[i].xspeed;
		game.debrees[i].y = game.debrees[i].y + game.debrees[i].yspeed;	

		fill(game.debrees[i].color);
		noStroke();

		rect(game.debrees[i].x, game.debrees[i].y, game.debrees[i].width, game.debrees[i].height);
		game.debrees[i].life --;
		game.debrees[i].height -= 0.2;
		game.debrees[i].width -= 0.2;
		
		//remove squares that are off screen
		if (game.debrees[i].width < 0) {
			game.debrees.splice(i, 1);
			i--;
		}
	}
}

function drawGuns()
{
    for (const [gun_index, gun] of player.weapons.entries())
    {
        const orbitX = player.x + orbitRadius * cos(radians(angle+(gun_index * 200)));
        const orbitY = player.y + orbitRadius * sin(radians(angle+(gun_index * 200)));
        ellipse(orbitX, orbitY, 10, 10);
        gun.x = orbitX;
        gun.y = orbitY;
        angle += 1;
    }
}

function updateWaveTimer() {
    if (game.wave_timer > 0) {
        game.wave_timer--;
        if(game.wave_timer === 0)
        {
            drawUI();
            game.state = 'wave complete';
        }
    }
    if (game.super_duration > 0)
    {
        game.super_duration--;
        //super over
        if(game.super_duration === 0)
        {
            switchToSuperSong(super_themes[isPlaying.theme_playing_index], themes[isPlaying.theme_playing_index])
            player.attack_speed /= 2;
            player.damage /= 2;
            player.move_speed /= 2;
        }
    }
  }

function playSound(sound, sound_string) {
    if(sound_string === 'smg' && isPlaying[sound_string] <= 25)
    {
        isPlaying[sound_string]++;
        sound.play();
    }
    else if(sound_string === 'shot_gun' && isPlaying[sound_string] <= 14)
    {
        isPlaying[sound_string]++;
        sound.play();
    }
    else if(isPlaying[sound_string] <= 3)
    {
        isPlaying[sound_string]++;
        sound.play();
    }
  }

  function startTheme() {
    // Start playing the audio
    themes[0].play();
    isPlaying.theme_playing_index = 0;
  }

  function playNextTheme() {
    if(player.wave > 8)
    {
        if(game.super_duration > 0)
        {
            super_themes[4].play();
        }
        else
        {
            themes[4].play();
        }
        
        isPlaying.theme_playing_index = 4;
    }
    else if(player.wave > 6)
    {
        if(game.super_duration > 0)
        {
            super_themes[3].play();
        }
        else
        {
            themes[3].play();
        }
        
        isPlaying.theme_playing_index = 3;
    }
    else if(player.wave > 4)
    {
        if(game.super_duration > 0)
        {
            super_themes[2].play();
        }
        else
        {
            themes[2].play();
        }
        
        isPlaying.theme_playing_index = 2;
    }

    else if(player.wave > 2)
    {
        if(game.super_duration > 0)
        {
            super_themes[1].play();
        }
        else
        {
            themes[1].play();
        }
        isPlaying.theme_playing_index = 1;
    }

    else
    {
        if(game.super_duration > 0)
        {
            super_themes[0].play();
        }
        else
        {
            themes[0].play();
        }
        isPlaying.theme_playing_index = 0;
    }
  }


  function switchToSuperSong(currentSong, newSong) {
    // Get the current playback position of the current song
    const currentPosition = currentSong.seek();
  
    // Pause the current song
    currentSong.pause();
    
    // Start the new song
    newSong.play();
  
    // Set the playback position of the new song
    newSong.seek(currentPosition);
  }


  function drawUI()
  {
    // Draw the health bar in the UI canvas
    uiCanvas.background(50);
    uiCanvas.noStroke();

    uiCanvas.fill(100, 0, 0);
    uiCanvas.rect(50, 10, 300, uiCanvas.height - 20);

    uiCanvas.fill(255, 0, 0); // Red color for health bar
    uiCanvas.rect(55, 15, 290 * (player.hp/player.max_hp), uiCanvas.height - 30);

    uiCanvas.textSize(20);
    uiCanvas.textAlign(CENTER, CENTER);
    uiCanvas.fill(255); 
    uiCanvas.text("HP: " + player.hp, 200, 24);

    //ui for the wave timer
    uiCanvas.textSize(20);
    uiCanvas.textAlign(CENTER, CENTER);
    uiCanvas.fill(255); 
    uiCanvas.text("Wave " + player.wave + " Timer: " + game.wave_timer + "                       " +
    "Money: " + parseInt(player.money), uiCanvas.width / 2, uiCanvas.height / 2);

    //super bar
    uiCanvas.fill(0, 25, 75);
    uiCanvas.rect(uiCanvas.width - 350, 10, 300, uiCanvas.height - 20);

    //graident for when super is full
    if(player.super === player.max_super)
    {
        graident_changer ++;
        if (graident_changer > 255)
        {
            graident_changer = 0;
        }
        const gradientX = uiCanvas.width - 345;
        const gradientY = 15;
        const gradientWidth = 290;
        const gradientHeight = uiCanvas.height - 30;
    
        const startColor = color(0+graident_changer, 75, 200-graident_changer); // Blue color for the start of the gradient
        const endColor = color(255-graident_changer, 0+graident_changer, 0); // Red color for the end of the gradient
    
        // Loop through the gradient horizontally and interpolate colors
        for (let x = gradientX; x < gradientX + gradientWidth; x++) {
        const inter = map(x, gradientX, gradientX + gradientWidth, 0, 1);
        const c = lerpColor(startColor, endColor, inter);
        uiCanvas.stroke(c);
        uiCanvas.line(x, gradientY, x, gradientY + gradientHeight);
        }

        uiCanvas.textAlign(CENTER, CENTER);
        uiCanvas.fill(255);
        uiCanvas.text("Press SPACE to Super", uiCanvas.width - 200, 24);
    }
    else if (game.super_duration > 0)
    {
        uiCanvas.fill(255); 
        uiCanvas.text("Super Duration: " + game.super_duration, uiCanvas.width - 200, 24);
    }
    else
    {
        uiCanvas.fill(0, 75, 200); // Blue color for super bar
        uiCanvas.rect(uiCanvas.width - 345, 15, 290 * (player.super/player.max_super), uiCanvas.height - 30);
    
        uiCanvas.textAlign(CENTER, CENTER);
        uiCanvas.fill(255); 
        uiCanvas.text("Super: " + Math.floor((player.super/player.max_super)* 100) + "%", uiCanvas.width - 200, 24);
    }
    image(uiCanvas, 0, 0);
  }

  function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }

  //garbage code!  dont look here
  let xPosLeft = -400;
  let xPosRight = undefined;
  let colorMod = 0;
  let color_up = true;
  let waveCompleteText = "WAVE COMPLETE";
  let timeout_called = false;

  function waveComplete() {

    textAlign(LEFT, LEFT);
    if(xPosRight === undefined)
    {
        xPosRight = width -200 ;
    }
    // Animate text sliding in
    if (xPosLeft < width / 2 - textWidth(waveCompleteText) / 2) {
        xPosLeft += 15; // Adjust the sliding speed as needed
    }
    else
    {
        xPosLeft = width / 2 - textWidth(waveCompleteText) / 2;
    }
    if (xPosRight > width / 2 - textWidth(waveCompleteText) / 2) {
        xPosRight -= 15; // Adjust the sliding speed as needed
    }
    else 
    {
        if(!isPlaying.level_complete)
        {
            
            level_complete.play();
            isPlaying.level_complete = true;
        }
        xPosRight= width / 2 - textWidth(waveCompleteText) / 2
    }
    if (colorMod >= 255)
    {
        color_up = false;
    }
    else if (colorMod <= 0)
    {
        color_up = true;
    }
    if (color_up)
    {
        colorMod++;
    }
    else
    {
        colorMod -= 2;
    }
    // Create gradient fill for the text
    let gradientFill = lerpColor(color(colorMod,255,0), color(0,colorMod,255), map(xPosLeft, -400, width / 2, 0, 1));

    // Apply the gradient fill to the text
    fill(gradientFill);

    // Draw "WAVE COMPLETE" text at the current xPosLeft
    textSize(72);
    text(waveCompleteText, xPosRight, height / 2);
    text(waveCompleteText, xPosLeft, height / 2);

    if(xPosRight === width / 2 - textWidth(waveCompleteText) / 2 && !timeout_called)
    {
        timeout_called = true;
        setTimeout(function () {
            shop.generateShopItems();
            game.state = 'shop';
            isPlaying.level_complete = false;
            player.hp = player.max_hp;
            xPosLeft = -400;
            xPosRight = width -200;
            timeout_called = false;
            //end the super
            if(game.super_duration > 0)
            {
                game.super_duration = 0;
                switchToSuperSong(super_themes[isPlaying.theme_playing_index], themes[isPlaying.theme_playing_index])
                player.attack_speed /= 2;
                player.damage /= 2;
                player.move_speed /= 2;
            }
           
            game.baddies = [];
            game.player_bullets = [];
            game.debrees = [];
        }, 2000);
    }
  }


  function showShop() {

    textAlign(CENTER, CENTER);
    background(255);
  
    textSize(72);
    stroke(17, 84, 171);
    strokeWeight(6); // Set border thickness
    fill(24, 120, 245);
    // Draw SHOP title
    text('SHOP', width / 2, 100);
  
    // Reroll button
    textSize(32);
    // Check if the mouse is inside the Reroll button
    if (mouseX >= width/2 - (width/6) / 2 &&
        mouseX <= width/2 + (width/6) / 2 &&
        mouseY >= 165 - height/15/2 &&
        mouseY <= 165 + height/15/2
    ) {
        fill(0, 0, 255); // Highlight the box in a different shade of blue on hover
        if (mouseIsPressed) {
            shop.generateShopItems();
        }
    }
    else
    {
        fill(24, 120, 245);
    }
    rect(width/2, 165, width/6, height/15);
    fill(255);
    text('Reroll', width/2, 163);
  
    // Draw item boxes
    for (let i = 1; i <= 3; i++) {
      let x = width / 4 * i;
      let y = height / 2;
      if(shop.items[i-1].name !== 'sold')
      {
 
          // Check if the mouse is inside the item box
          if (mouseX >= x - (width/4 - 10) / 2 &&
              mouseX <= x + (width/4 - 10) / 2 &&
              mouseY >= y + 20 - y/2 &&
              mouseY <= y + 20 + y/2
          ) {
              fill(0, 0, 255); // Highlight the box in a different shade of blue on hover
              if (mouseIsPressed) {
                  // Mouse is pressed, call the buyItem function for the clicked item
                  buyItem(i-1);
              }
          }
          else
          {
              fill(24, 120, 245);
          }
    
    
        // Outside box
        rect(x, y + 20, width/4 - 10, y);
        // Inside box
        fill(255); // Set text color to white
        rect(x, y + y/15, width/5 - 10, height/2.5);
    
        if (shop.items[i-1].rarity === 1)
        {
            stroke(155);
        }
        else if (shop.items[i-1].rarity === 2)
        {
            stroke(17, 84, 171);
        }
        else if (shop.items[i-1].rarity === 3)
        {
            stroke(117, 0, 207);
        }
        else if (shop.items[i-1].rarity === 4)
        {
            stroke(179, 122, 0);
        }
        
        fill(255); // Set text color to white
        textSize(24);
        text(shop.items[i-1].name, x, y - y/2.5);
  
        //item desc
        textSize(20);
        strokeWeight(4);
        text(shop.items[i-1].description1, x, y - 80);
        if (shop.items[i-1].description2 !== undefined)
        {
          text(shop.items[i-1].description2, x, y - 50);
        }
  
  
        strokeWeight(12);
        stroke(235, 204, 52);
        text("cost: " + shop.items[i-1].cost, x, y + 130);
        strokeWeight(6);
        stroke(17, 84, 171);

      }
      else
      {
        rect(x, y + 20, width/4 - 10, y);
        //sold out
        textSize(48);
        strokeWeight(6);
        text("SOLD OUT", x, y - 80);
      }
    }
  
    // Next wave button
    textSize(32);

    // Check if the mouse is inside the Next Wave button
    if (mouseX >= width/2 - (width/5) / 2 &&
        mouseX <= width/2 + (width/5) / 2 &&
        mouseY >= height - 100 - height/10 &&
        mouseY <= height - 100 + height/10
    ) {
    fill(0, 0, 255); // Highlight the box in a different shade of blue on hover
    if (mouseIsPressed) {
        player.wave ++;
        game.state = 'game';
        game.wave_timer = waves[player.wave-1].timer;
    }
    }
    else
    {
        fill(24, 120, 245);
    }
    rect(width/2, height - 100, width/5, height/10);
    fill(255);
    text('Next Wave', width/2, height - 100);
  
    drawUI();
  }


function buyItem(itemIndex)
{
    const item = shop.items[itemIndex];
    if(player.money >= item.cost)
    {
        if(item.quantity !== undefined)
        {
            item.quantity --;
        }
        
        if (item.type === 'upgrade')
        {
            for (const upgrade of item.upgrades)
            {
                if(upgrade.stat === 'function')
                {
                    upgrade.value();
                }
                else 
                {
                    player[upgrade.stat] += upgrade.value;
                }
            }
        }
        else if (item.type === 'weapon')
        {
            player.weapons.push({...guns[item.key]});
        }
    
        shop.items[itemIndex] = {name: 'sold'};
        player.money -= item.cost;
        upgrade.play();
    }
    else
    {
        playSound(invalid, 'invalid');
    }
}

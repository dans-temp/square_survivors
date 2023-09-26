const game = {
    wave: 1,
    baddies: [],
    player_bullets: [],
    baddie_bullets: [],
    debrees: [],
    flash_timer: 5
}

const player = {
    x: 0,
    y: 0,
    height: 30,
    width: 30,
    hp: 5,
    move_speed: 1,
    attack_speed: 1,
    damage: 1,
    dash: 0,
    dash_duration: 10,
    dash_cd: 0,
    dash_cd_timer: 100,
    wave: 1,
    invince: 0,
    weapons: [
        {
            name: 'smg',
            firerate: 20,
            fireCD: 0,
            damage: 1,
            hp: 1,
            width: 5,
            height: 5,
            move_speed: 8
        }
    ]
}

const waves = [
    {
        max_baddies: 5
    }
]

const guns = {
    name: 'smg',
    firerate: 10,
    fireCD: 0,
    damage: 1,
    hp: 1,
    width: 5,
    height: 5,
    move_speed: 8
}

const baddies = 
{
    angle: 0
}

function preload()
{
    //load all the audio files
    player.x = windowWidth/2;
    player.y = windowHeight/2;
}

function setup()
{
	createCanvas(windowWidth, windowHeight);
	rectMode(CENTER);
}


function draw()
{

    background(255);
    if(game.baddies.length < waves[player.wave - 1].max_baddies)
    {
        spawnBaddie();
    }
    drawDebree();
    drawBaddies();
    drawPlayer();
    fireGuns();
    drawBullets();
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

    if (keyIsDown(32) && player.dash_cd === 0)
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
        player.height -= 6;
    }

    if (player.dash_cd > 0)
    {
        player.dash_cd --;
        if(player.height !== player.width)
        {
            player.height += 3;
        }
    }

    // Update player's position
    const next_x = player.x + (moveX * 3*player.move_speed);
    const next_y =  player.y + (moveY * 3*player.move_speed);
    

    if(next_x > 0 && next_x < windowWidth)
    {
        player.x += moveX * 3*player.move_speed; 
    }
    if(next_y > 0 && next_y < windowHeight)
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
    game.baddies.push(
        {
            x : spawn_point.x,
            y : spawn_point.y,
            width: 20,
            height: 20,
            move_speed: 2,
            hp: 8,
            damage: 1,
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
      spawnY = random(height);
      // Calculate the distance between player and spawn point
      distance = dist(spawnX, spawnY, player.x, player.y);
    } while (distance < 300); // Keep generating until distance is at least 100 units
    return createVector(spawnX, spawnY);
}

function drawBaddies()
{
    for (const baddie of game.baddies)
    {
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
        if (gun.fireCD == 0)
        {
            const closest_baddie = findClosestBaddie();
            // Calculate the direction vector from baddie to player
            let directionX = closest_baddie.x - player.x;
            let directionY = closest_baddie.y - player.y;

            // Calculate the magnitude (distance) of the direction vector
            const magnitude = dist(player.x, player.y, closest_baddie.x, closest_baddie.y);
            // Normalize the direction vector to get a unit vector
            directionX /= magnitude;
            directionY /= magnitude;

            game.player_bullets.push(
                {
                    x: player.x,
                    y: player.y,
                    damage: gun.damage,
                    hp: gun.hp,
                    speed: 4,
                    xvel:  directionX * gun.move_speed,
                    yvel: directionY * gun.move_speed,
                    width: gun.width,
                    height: gun.height
                }
            )
            gun.fireCD = gun.firerate;
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

        //check out of bounds
        if(bullet.x < 0 || bullet.x > windowWidth || bullet.y < 0 || bullet.y > windowHeight)
        {
            bulletsToRemove.push(bullet_index);
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
                    baddie.hp -=  bullet.damage;
                    baddie.flash_timer = game.flash_timer;
                    if (baddie.hp <= 0)
                    {
                        baddiesToRemove.push(baddie_index);
                        createDebree(baddie.x, baddie.y, baddie.width*4);
                    }
                    bullet.hp -= 1;
                    if (bullet.hp == 0)
                    {
                        bulletsToRemove.push(bullet_index);
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
        let xs = random(-5, 5);
        debree =
        {
            width: width/10,
            height: width/10,
            x: p_x + i,
            y: p_y + i,
            xspeed: xs,
            yspeed: random(-5, 5),
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
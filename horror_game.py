import pygame
import random
import sys
import math

pygame.init()
pygame.mixer.init()

WIDTH, HEIGHT = 900, 600
screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("👻 Haunted Shooter FINAL PERFECT")

clock = pygame.time.Clock()
font = pygame.font.SysFont(None, 35)

# ---------- LOAD ----------
player_img = pygame.transform.scale(pygame.image.load("player.png"), (50, 50))
bat_img = pygame.transform.scale(pygame.image.load("bat.png"), (60, 45))
witch_img = pygame.transform.scale(pygame.image.load("witch.png"), (80, 80))
fire_img = pygame.transform.scale(pygame.image.load("fire.png"), (40, 15))
gun_img = pygame.transform.scale(pygame.image.load("gun.png"), (60, 30))

shoot_sound = pygame.mixer.Sound("laser.wav")
hit_sound = pygame.mixer.Sound("hit.wav")

shoot_sound.set_volume(0.5)
hit_sound.set_volume(0.7)

player = player_img.get_rect(center=(200, 400))
witch = witch_img.get_rect(center=(700, 300))

bullets = []
bats = []

for i in range(4):
    bats.append(bat_img.get_rect(center=(random.randint(500,900), random.randint(0,600))))

speed = 5
score = 0
level = 1

shoot_delay = 200
last_shot = 0

# ---------- LOOP ----------
running = True
while running:

    screen.fill((8,8,20))

    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            pygame.quit()
            sys.exit()

    keys = pygame.key.get_pressed()

    if keys[pygame.K_LEFT]: player.x -= speed
    if keys[pygame.K_RIGHT]: player.x += speed
    if keys[pygame.K_UP]: player.y -= speed
    if keys[pygame.K_DOWN]: player.y += speed

    mx, my = pygame.mouse.get_pos()

    # 🔥 HAND POSITION (adjusted)
    hand_x = player.centerx + 15
    hand_y = player.centery + 5

    dx = mx - hand_x
    dy = my - hand_y

    dist = math.hypot(dx, dy)
    if dist == 0:
        dist = 1

    dir_x = dx / dist
    dir_y = dy / dist

    angle = math.degrees(math.atan2(-dy, dx))

    # 🔫 ROTATE GUN
    rotated_gun = pygame.transform.rotate(gun_img, angle)
    gun_rect = rotated_gun.get_rect(center=(hand_x, hand_y))

    # 🔫 SHOOT
    current_time = pygame.time.get_ticks()
    if keys[pygame.K_f]:
        if current_time - last_shot > shoot_delay:
            bullet = pygame.Rect(hand_x, hand_y, 10, 10)
            bullets.append([bullet, dir_x, dir_y])
            last_shot = current_time
            shoot_sound.play()

    # 🔥 BULLETS
    for b in bullets[:]:
        b[0].x += b[1] * 12
        b[0].y += b[2] * 12

        screen.blit(fire_img, b[0])

        if b[0].x < 0 or b[0].x > WIDTH or b[0].y < 0 or b[0].y > HEIGHT:
            bullets.remove(b)

    # 🦇 BATS
    for bat in bats[:]:
        bat.x -= random.randint(3,5)

        if bat.y < player.y:
            bat.y += 1
        else:
            bat.y -= 1

        screen.blit(bat_img, bat)

        for b in bullets[:]:
            if bat.colliderect(b[0]):
                bats.remove(bat)
                bullets.remove(b)
                score += 10
                hit_sound.play()
                break

        if player.colliderect(bat):
            print("💀 GAME OVER")
            pygame.quit()
            sys.exit()

    # 🧙 WITCH
    witch.x += (player.x - witch.x) * 0.01
    witch.y += (player.y - witch.y) * 0.01

    screen.blit(witch_img, witch)

    for b in bullets[:]:
        if witch.colliderect(b[0]):
            bullets.remove(b)
            score += 50
            hit_sound.play()
            witch.x = random.randint(600,900)
            witch.y = random.randint(0,600)

    if player.colliderect(witch):
        print("👻 WITCH GOT YOU")
        pygame.quit()
        sys.exit()

    # 🎮 DRAW ORDER FIX (IMPORTANT)
    screen.blit(player_img, player)       # player first
    screen.blit(rotated_gun, gun_rect)    # gun on top (visible)

    # 🎯 CROSSHAIR
    pygame.draw.circle(screen, (255,0,0), (mx, my), 5, 1)

    # 📈 LEVEL
    if score >= level * 120:
        level += 1
        bats.append(bat_img.get_rect(center=(random.randint(600,900), random.randint(0,600))))

    # UI
    screen.blit(font.render(f"Score: {score}", True, (255,255,255)), (10,10))
    screen.blit(font.render(f"Level: {level}", True, (255,255,0)), (10,40))

    pygame.display.update()
    clock.tick(60)
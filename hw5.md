1)
![image](https://user-images.githubusercontent.com/11626920/119579669-c17cc380-bd73-11eb-8586-19857505532f.png)
``` asm
main:
	addiu   $sp,$sp,-32
	sw      $31,28($sp)
	sw      $fp,24($sp)
	move    $fp,$sp
	li      $4,7                        # 0x4
	jal     fact
	nop

	move    $sp,$fp
	lw      $31,28($sp)
	lw      $fp,24($sp)
	addiu   $sp,$sp,32
	li	    $v0,1
	mflo    $a0
	syscall
	j 	    exit

fact:
	addiu   $sp,$sp,-32
	sw      $31,28($sp)
	sw      $fp,24($sp)
	move    $fp,$sp
	sw      $4,32($fp)
	lw      $2,32($fp)
	nop
	slti    $2,$2,2
	beq      $2,$0,$recursive
	nop

	li      $2,1                        # 0x1
	b       $return
	nop

$recursive:
	lw      $2,32($fp)
	nop
	addiu   $2,$2,-1
	move    $4,$2
	jal     fact
	nop

	move    $3,$2
	lw      $2,32($fp)
	nop
	mult    $3,$2
	mflo    $2
$return:
	move    $sp,$fp
	lw      $31,28($sp)
	lw      $fp,24($sp)
	addiu   $sp,$sp,32
	jr      $ra
	nop
        
exit:
	nop
```
2)

``` asm
main:
	addiu   $sp,$sp,-48
	sw      $31,44($sp)
	sw      $fp,40($sp)
	move    $fp,$sp
	li      $2,2                        # 0x2
	sw      $2,24($fp)
	li      $2,3                        # 0x3
	sw      $2,28($fp)
	li      $2,7                        # 0x7
	sw      $2,32($fp)
	li      $2,8                        # 0x8
	sw      $2,36($fp)
	li      $5,4                        # 0x4
	addiu   $2,$fp,24
	move    $4,$2
	jal     timesTwo
	nop
	
	move    $2,$0
	move    $sp,$fp
	lw      $31,44($sp)
	lw      $fp,40($sp)
	addiu   $sp,$sp,48

	li	$v0, 1
	mflo	$a0
	syscall
	j 	exit
	
timesTwo:
	addiu   $sp,$sp,-24
	sw      $fp,20($sp)
	move    $fp,$sp
	sw      $4,24($fp)
	sw      $5,28($fp)
	sw      $0,8($fp)
	b       $L5
	nop

$L6:
	lw      $2,8($fp)
	nop
	sll     $2,$2,2
	lw      $3,24($fp)
	nop
	addu    $2,$3,$2
	lw      $3,8($fp)
	nop
	sll     $3,$3,2
	lw      $4,24($fp)
	nop
	addu    $3,$4,$3
	lw      $3,0($3)
	nop
	sll     $3,$3,1
	sw      $3,0($2)
	lw      $2,8($fp)
	nop
	addiu   $2,$2,1
	sw      $2,8($fp)
$L5:
	lw      $3,8($fp)
	lw      $2,28($fp)
	nop
	slt     $2,$3,$2
	bne     $2,$0,$L6
	nop

	nop
	move    $sp,$fp
	lw      $fp,20($sp)
	addiu   $sp,$sp,24
	jr       $31
	nop
	
exit:
	nop
```
3)
``` asm
main:
	addiu   $sp,$sp,-56
	sw      $31,52($sp)
	sw      $fp,48($sp)
	move    $fp,$sp
	li      $2,2                        # 0x2
	sw      $2,32($fp)
	li      $2,3                        # 0x3
	sw      $2,36($fp)
	li      $2,7                        # 0x7
	sw      $2,40($fp)
	li      $2,8                        # 0x8
	sw      $2,44($fp)
	addiu   $2,$fp,32
	li      $5,4                        # 0x4
	move    $4,$2
	jal     timesTwo
	sw      $0,24($fp)
	b       $L29
$L30:
	lw      $2,24($fp)
	sll     $2,$2,2
	addiu   $3,$fp,24
	addu    $2,$3,$2
	lw      $2,8($2)
	move    $a0, $2
	li      $v0, 1
	syscall
	li      $a0, 32
	li      $v0, 11
	syscall
	sw      $2,28($fp)
	lw      $2,24($fp)
	addiu   $2,$2,1
	sw      $2,24($fp)
$L29:
	lw      $2,24($fp)
	slti    $2,$2,4
	bne     $2,$0,$L30
	move    $2,$0
	move    $sp,$fp
	lw      $31,52($sp)
	lw      $fp,48($sp)
	addiu   $sp,$sp,56
	j       exit
	
timesTwo:
	addiu   $sp,$sp,-24
	sw      $fp,20($sp)
	move    $fp,$sp
	sw      $4,24($fp)
	sw      $5,28($fp)
	sw      $0,8($fp)
	b       $L5
	nop

$L6:
	lw      $2,8($fp)
	nop
	sll     $2,$2,2
	lw      $3,24($fp)
	nop
	addu    $2,$3,$2
	lw      $3,8($fp)
	nop
	sll     $3,$3,2
	lw      $4,24($fp)
	nop
	addu    $3,$4,$3
	lw      $3,0($3)
	nop
	sll     $3,$3,1
	sw      $3,0($2)
	lw      $2,8($fp)
	nop
	addiu   $2,$2,1
	sw      $2,8($fp)
$L5:
	lw      $3,8($fp)
	lw      $2,28($fp)
	nop
	slt     $2,$3,$2
	bne     $2,$0,$L6
	nop

	nop
	move    $sp,$fp
	lw      $fp,20($sp)
	addiu   $sp,$sp,24
	jr       $31
	nop
	
exit:
	nop
```
4)
```asm
main:
	addiu   $sp,$sp,-48
	sw      $31,44($sp)
	sw      $fp,40($sp)
	move    $fp,$sp
	li      $2,2                        # 0x2
	sw      $2,24($fp)
	li      $2,3                        # 0x3
	sw      $2,28($fp)
	li      $2,7                        # 0x7
	sw      $2,32($fp)
	li      $2,8                        # 0x8
	sw      $2,36($fp)
	li      $5,4                        # 0x4
	addiu   $2,$fp,24
	move    $4,$2
	jal     sum
	nop
	
	move	$a0, $v0
	li	$v0, 1
	syscall

	move    $2,$0
	move    $sp,$fp
	lw      $31,44($sp)
	lw      $fp,40($sp)
	addiu   $sp,$sp,48
	j       exit
	
sum:
	addiu   $sp,$sp,-24
	sw      $fp,20($sp)
	move    $fp,$sp
	sw      $4,24($fp)
	sw      $5,28($fp)
	sw      $0,8($fp)
	sw      $0,12($fp)
	b       $L8
	nop

$L9:
	lw      $2,12($fp)
	nop
	sll     $2,$2,2
	lw      $3,24($fp)
	nop
	addu    $2,$3,$2
	lw      $2,0($2)
	lw      $3,8($fp)
	nop
	addu    $2,$3,$2
	sw      $2,8($fp)
	lw      $2,12($fp)
	nop
	addiu   $2,$2,1
	sw      $2,12($fp)
$L8:
	lw      $3,12($fp)
	lw      $2,28($fp)
	nop
	slt     $2,$3,$2
	bne     $2,$0,$L9
	nop

	lw      $2,8($fp)
	move    $sp,$fp
	lw      $fp,20($sp)
	addiu   $sp,$sp,24
	jr      $31
	nop
	
exit:
	nop
```
5)
![image](https://user-images.githubusercontent.com/11626920/119587037-b8472300-bd82-11eb-9d4a-2227c5e17239.png)
``` asm
main:
	addiu   $sp,$sp,-56
	sw      $31,52($sp)
	sw      $fp,48($sp)
	move    $fp,$sp
	li      $2,2                        # 0x2
	sw      $2,32($fp)
	li      $2,3                       # 0x3
	sw      $2,36($fp)
	li      $2,7                        # 0x7
	sw      $2,40($fp)
	li      $2,8                        # 0x8
	sw      $2,44($fp)
	addiu   $2,$fp,32
	li      $5,4                        # 0x4
	move    $4,$2
	jal     center
	sw      $0,24($fp)
	b       $L29
$L30:
	lw      $2,24($fp)
	sll     $2,$2,2
	addiu   $3,$fp,24
	addu    $2,$3,$2
	lw      $2,8($2)
	move    $a0, $2
	li      $v0, 1
	syscall
	li      $a0, 32
	li      $v0, 11
	syscall
	sw      $2,28($fp)
	lw      $2,24($fp)
	addiu   $2,$2,1
	sw      $2,24($fp)
$L29:
	lw      $2,24($fp)
	slti    $2,$2,4
	bne     $2,$0,$L30
	move    $2,$0
	move    $sp,$fp
	lw      $31,52($sp)
	lw      $fp,48($sp)
	addiu   $sp,$sp,56
	j       exit
	
sum:
	addiu   $sp,$sp,-24
	sw      $fp,20($sp)
	move    $fp,$sp
	sw      $4,24($fp)
	sw      $5,28($fp)
	sw      $0,8($fp)
	sw      $0,12($fp)
	b       $L8
	nop

$L9:
	lw      $2,12($fp)
	nop
	sll     $2,$2,2
	lw      $3,24($fp)
	nop
	addu    $2,$3,$2
	lw      $2,0($2)
	lw      $3,8($fp)
	nop
	addu    $2,$3,$2
	sw      $2,8($fp)
	lw      $2,12($fp)
	nop
	addiu   $2,$2,1
	sw      $2,12($fp)
$L8:
	lw      $3,12($fp)
	lw      $2,28($fp)
	nop
	slt     $2,$3,$2
	bne     $2,$0,$L9
	nop

	lw      $2,8($fp)
	move    $sp,$fp
	lw      $fp,20($sp)
	addiu   $sp,$sp,24
	jr      $31
	nop
	
center:
	addiu   $sp,$sp,-48
	sw      $31,44($sp)
	sw      $fp,40($sp)
	move    $fp,$sp
	sw      $4,48($fp)
	sw      $5,52($fp)
	lw      $5,52($fp)
	lw      $4,48($fp)
	jal     sum
	nop

	sw      $2,28($fp)
	lw      $3,28($fp)
	lw      $2,52($fp)
	nop
	bne     $2,$0,$L20
	break   7
	
$L20:
	div     $0,$3,$2
	mfhi    $2
	mflo    $2
	sw      $2,32($fp)
	sw      $0,24($fp)
	b       $L14
	nop

$L15:
	lw      $2,24($fp)
	nop
	sll     $2,$2,2
	lw      $3,48($fp)
	nop
	addu    $2,$3,$2
	lw      $3,24($fp)
	nop
	sll     $3,$3,2
	lw      $4,48($fp)
	nop
	addu    $3,$4,$3
	lw      $4,0($3)
	lw      $3,32($fp)
	nop
	subu    $3,$4,$3
	sw      $3,0($2)
	lw      $2,24($fp)
	nop
	addiu   $2,$2,1
	sw      $2,24($fp)
$L14:
	lw      $3,24($fp)
	lw      $2,52($fp)
	nop
	slt     $2,$3,$2
	bne     $2,$0,$L15
	nop

	nop
	move    $sp,$fp
	lw      $31,44($sp)
	lw      $fp,40($sp)
	addiu   $sp,$sp,48
	jr       $31
	nop
	
exit:
	nop
```
6)
![image](https://user-images.githubusercontent.com/11626920/119588102-ef1e3880-bd84-11eb-8f33-f94a238108ff.png)
``` asm
main:
	addiu   $sp,$sp,-64
	sw      $31,60($sp)
	sw      $fp,56($sp)
	move    $fp,$sp
	li      $2,2                        # 0x2
	sw      $2,32($fp)
	li      $2,3                        # 0x3
	sw      $2,36($fp)
	li      $2,7                        # 0x7
	sw      $2,40($fp)
	li      $2,8                        # 0x8
	sw      $2,44($fp)
	li      $2,10                 # 0xa
	sw      $2,48($fp)
	li      $2,13                 # 0xd
	sw      $2,52($fp)
	addiu   $2,$fp,32
	li      $7,10                 # 0xa
	li      $6,7                        # 0x7
	li      $5,6                        # 0x6
	move    $4,$2
	jal     removeBetween
	sw      $0,24($fp)
	b       $L29
$L30:
	lw      $2,24($fp)
	sll     $2,$2,2
	addiu   $3,$fp,24
	addu    $2,$3,$2
	lw      $2,8($2)
	move    $a0,$2
	li      $v0,1
	syscall
	li      $a0,32
	li      $v0,11
	syscall
	sw      $2,28($fp)
	lw      $2,24($fp)
	addiu   $2,$2,1
	sw      $2,24($fp)
$L29:
	lw      $2,24($fp)
	slti    $2,$2,6
	bne     $2,$0,$L30
	move    $2,$0
	move    $sp,$fp
	lw      $31,60($sp)
	lw      $fp,56($sp)
	addiu   $sp,$sp,64
	j       exit

removeBetween:
	addiu   $sp,$sp,-40
	sw      $31,36($sp)
	sw      $fp,32($sp)
	move    $fp,$sp
	sw      $4,40($fp)
	sw      $5,44($fp)
	sw      $6,48($fp)
	sw      $7,52($fp)
	lw      $2,44($fp)
	nop
	sll     $2,$2,2
	lw      $3,40($fp)
	nop
	addu    $2,$3,$2
	sw      $2,24($fp)
	b       $L25
	nop

$L27:
	lw      $2,40($fp)
	nop
	lw      $2,0($2)
	nop
	sw      $2,28($fp)
	lw      $6,52($fp)
	lw      $5,48($fp)
	lw      $4,28($fp)
	jal     between
	nop

	beq     $2,$0,$L26
	nop

	lw      $5,24($fp)
	lw      $4,40($fp)
	jal     shiftLeft
	nop

	sw      $2,24($fp)
	b       $L25
	nop

$L26:
	lw      $2,40($fp)
	nop
	addiu   $2,$2,4
	sw      $2,40($fp)
$L25:
	lw      $3,40($fp)
	lw      $2,24($fp)
	nop
	sltu    $2,$2,$3
	beq     $2,$0,$L27
	nop

	nop
	move    $sp,$fp
	lw      $31,36($sp)
	lw      $fp,32($sp)
	addiu   $sp,$sp,40
	jr      $31
	nop
	
between:
	addiu   $sp,$sp,-8
	sw      $fp,4($sp)
	move    $fp,$sp
	sw      $4,8($fp)
	sw      $5,12($fp)
	sw      $6,16($fp)
	lw      $3,8($fp)
	lw      $2,12($fp)
	nop
	slt     $2,$3,$2
	bne     $2,$0,$L17
	nop

	lw      $3,8($fp)
	lw      $2,16($fp)
	nop
	slt     $2,$2,$3
	bne     $2,$0,$L17
	nop

	li      $2,1                        # 0x1
	b       $L18
	nop

$L17:
	move    $2,$0
$L18:
	andi    $2,$2,0x1
	andi    $2,$2,0x00ff
	move    $sp,$fp
	lw      $fp,4($sp)
	addiu   $sp,$sp,8
	jr      $31
	nop
	
shiftLeft:
	addiu   $sp,$sp,-8
	sw      $fp,4($sp)
	move    $fp,$sp
	sw      $4,8($fp)
	sw      $5,12($fp)
	b       $L21
	nop

$L22:
	lw      $2,8($fp)
	nop
	lw      $3,4($2)
	lw      $2,8($fp)
	nop
	sw      $3,0($2)
	lw      $2,8($fp)
	nop
	addiu   $2,$2,4
	sw      $2,8($fp)
$L21:
	lw      $3,8($fp)
	lw      $2,12($fp)
	nop
	sltu    $2,$3,$2
	bne     $2,$0,$L22
	nop

	lw      $2,12($fp)
	nop
	addiu   $2,$2,-4
	move    $sp,$fp
	lw      $fp,4($sp)
	addiu   $sp,$sp,8
	jr      $31
	nop
	
exit:
	nop
```
7)
``` asm
main:
	addiu   $sp,$sp,-40
	sw      $31,36($sp)
	sw      $fp,32($sp)
	move    $fp,$sp
	li      $6,4                        # 0x4
	li      $5,2                        # 0x2
	li      $4,3                        # 0x3
	jal     between
	move    $a0,$2
	li      $v0,1
	syscall

	sw      $2,24($fp)
	move    $2,$0
	move    $sp,$fp
	lw      $31,36($sp)
	lw      $fp,32($sp)
	addiu   $sp,$sp,40
	j       exit
	
between:
	addiu   $sp,$sp,-8
	sw      $fp,4($sp)
	move    $fp,$sp
	sw      $4,8($fp)
	sw      $5,12($fp)
	sw      $6,16($fp)
	lw      $3,8($fp)
	lw      $2,12($fp)
	nop
	slt     $2,$3,$2
	bne     $2,$0,$L17
	nop

	lw      $3,8($fp)
	lw      $2,16($fp)
	nop
	slt     $2,$2,$3
	bne     $2,$0,$L17
	nop

	li      $2,1                        # 0x1
	b       $L18
	nop

$L17:
	move    $2,$0
$L18:
	andi    $2,$2,0x1
	andi    $2,$2,0x00ff
	move    $sp,$fp
	lw      $fp,4($sp)
	addiu   $sp,$sp,8
	jr      $31
	nop
	
exit:
	nop
```
8)
``` asm
main:
	addiu   $sp,$sp,-64
	sw      $31,60($sp)
	sw      $fp,56($sp)
	move    $fp,$sp
	li      $2,2                        # 0x2
	sw      $2,32($fp)
	li      $2,3                        # 0x3
	sw      $2,36($fp)
	li      $2,7                        # 0x7
	sw      $2,40($fp)
	li      $2,8                        # 0x8
	sw      $2,44($fp)
	li      $2,10                 # 0xa
	sw      $2,48($fp)
	li      $2,13                 # 0xd
	sw      $2,52($fp)
	addiu   $2,$fp,32
	addiu   $2,$2,12
	addiu   $3,$fp,32
	addiu   $3,$3,20
	move    $5,$3
	move    $4,$2
	jal     shiftLeft
	sw      $0,24($fp)
	b       $L29
$L30:
	lw      $2,24($fp)
	sll     $2,$2,2
	addiu   $3,$fp,24
	addu    $2,$3,$2
	lw      $2,8($2)
	move    $a0,$2
	li      $v0,1
	syscall
	li      $a0,32
	li      $v0,11
	syscall
	sw      $2,28($fp)
	lw      $2,24($fp)
	addiu   $2,$2,1
	sw      $2,24($fp)
$L29:
	lw      $2,24($fp)
	slti    $2,$2,6
	bne     $2,$0,$L30
	move    $2,$0
	move    $sp,$fp
	lw      $31,60($sp)
	lw      $fp,56($sp)
	addiu   $sp,$sp,64
	j       exit
	
shiftLeft:
	addiu   $sp,$sp,-8
	sw      $fp,4($sp)
	move    $fp,$sp
	sw      $4,8($fp)
	sw      $5,12($fp)
	b       $L21
	nop

$L22:
	lw      $2,8($fp)
	nop
	lw      $3,4($2)
	lw      $2,8($fp)
	nop
	sw      $3,0($2)
	lw      $2,8($fp)
	nop
	addiu   $2,$2,4
	sw      $2,8($fp)
$L21:
	lw      $3,8($fp)
	lw      $2,12($fp)
	nop
	sltu    $2,$3,$2
	bne     $2,$0,$L22
	nop

	lw      $2,12($fp)
	nop
	addiu   $2,$2,-4
	move    $sp,$fp
	lw      $fp,4($sp)
	addiu   $sp,$sp,8
	jr      $31
	nop
	
exit:
	nop
```
9)
length: 32
$sp + 28: $ra
$sp + 24: j
$sp + 20: i
$sp + 16: e
$sp + 12: d
$sp + 8: c
$sp + 4: b
$sp + 0: a

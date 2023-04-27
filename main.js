

kaboom({
  global:true,
  fullscreen:true,
  scale: 2,
  debug:true,
  clearColor: [0,0,0,1]
})

loadRoot('https://i.imgur.com/')
loadSprite('coin', 'wbKxhcd.png')
loadSprite('evil-shroom', 'KPO3fR9.png')
loadSprite('brick', 'pogC9x5.png')
loadSprite('block', 'M6rwarW.png')
loadSprite('mario', 'Wb1qfhK.png')
loadSprite('mushroom', '0wMd92p.png')
loadSprite('surprise', 'gesQ1KP.png')
loadSprite('unboxed', 'bdrLpi6.png')
loadSprite('pipe-top-left', 'ReTPiWY.png')
loadSprite('pipe-top-right', 'hj2GK4n.png')
loadSprite('pipe-bottom-left', 'c1cYSbt.png')
loadSprite('pipe-bottom-right', 'nqQ79eI.png')

loadSprite('blue-block', 'fVscIbn.png')
loadSprite('blue-brick', '3e5YRQd.png')
loadSprite('blue-steel', 'gqVoI2b.png')
loadSprite('blue-evil-shroom', 'SvV4ueD.png')
loadSprite('blue-surprise', 'RMqCc1G.png')

scene("game", ()=>{
  layers(['bg','obj','ui'], 'obj')
  const map = [ 
    '                                                       ',
    '                                                       ',
    '                                                       ',
    '                                                       ',
    '                                                       ',
    '                                                       ',
    '                                                       ',
    '                                                       ',
    '                                                       ',  
    '                                                       ',  
    '               $$                                      ',  
    '            ========**                                 ',  
    '                                                       ',  
    '                              -+                      ',  
    '                 s            ()                       ',  
    '==========================   =========================='
  ]

  const levelCfg = { 
    width: 20,
    height: 20,
    '=': [sprite('block'), solid()],
    '$': [sprite('coin')],
    '*': [sprite('surprise'), solid(), 'coin-surprise'],
    '}': [sprite('unboxed'), solid()],
    '(': [sprite('pipe-bottom-left'), solid(), scale(0.5)],
    ')': [sprite('pipe-bottom-right'), solid(), scale(0.5)],
    '-': [sprite('pipe-top-left'), solid(), scale(0.5)],
    '+': [sprite('pipe-top-right'), solid(), scale(0.5)],
    's': [sprite('evil-shroom'), solid()]
  }

  const gameLevel = addLevel(map, levelCfg)

  const scoreLabel = add([
    text('score'),
    pos(30,6),
    layer('ui'),
    {
      value:'score'
    }
  ])


  add([text('level' + 'test', pos(4,6))])

  const isBig = ()=> {
    let timer = 0
    let isBig = false
    return { 
      update(){
        if(isBig){
          timer -= dt()
          if(timer <= 0){
            this.smallify()
          }
        }
      },
      isBig(){ 
        return isBig
      },
      smallify(){
        this.scale = vec2(1),
        timer = 0,
        isBig = false
      },
      biggify(time){ 
        this.scale = vec2(2),
        timer = 0,
        isBig = true
      }
    }
  }


  const player = add([
    sprite('mario', solid()),
    pos(30, 0),
    isBig(),
    body(),
    origin('bot')
  ])

  let PLAYER_MOVE_SPEED = 110
  const PLAYER_JUMP_FORCE = 450

 
  keyDown('a', ()=>  {
    player.move(-PLAYER_MOVE_SPEED, 0)
  })

  keyDown('d', ()=> { 
    player.move(PLAYER_MOVE_SPEED, 0)
  })

  keyPress('shift', ()=> { 
    PLAYER_MOVE_SPEED += 100
  })

  keyRelease('shift', () => { 
    PLAYER_MOVE_SPEED -= 100
  })
  keyPress('space', () => { 
    if(player.grounded()){
      player.jump(PLAYER_JUMP_FORCE)
    }
  })
})



start("game")




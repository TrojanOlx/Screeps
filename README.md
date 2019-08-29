# Screeps

### Creep 结构   

|Creep|Type|In|Role|Out|
|:--:|:--:|:--:|:--:|:--:|
|开采|Collect|Source.*|挖矿->然后存储到旁边的中转站。<br/>(如果附近有Creep的话直接给Creep)<br/>如果没有中转的话,生成一个优先级为1的建筑|Containers(closest)|   
|填充|Harvester|Containers.*(closest)|从Containers取出能量填充到需要的地方<br/>(能量不够则从其他地方获取)|Spawn/Extension/Tower|   
|建筑|Builder|Containers.*(closest)|从Containers取出能量填充到需要的地方<br/>(能量不够则从其他地方获取)|Construction_Sites|   
|升级|Upgrader|Containers.*(closest)|从Containers取出能量填充到Controller<br/>(能量不够则从其他地方获取)|Controller|

### Creep 属性   
|Creep|Name|Memory|Attribute|Count|
|:--:|:--:|:--:|:--:|:--:|
|Collect|Collect[Game.Time]|collect|WORK\*5,MOVE\*1,CARRY\*1|2|
|Harvester|Harvester[Game.Time]|harvester|WORK\*1,MOVE\*3,CARRY\*3|2|
|Builder|Builder[Game.Time]|builder|WORK\*1,MOVE\*4,CARRY\*3|1|
|Upgrader|Upgrader[Game.Time]|upgrader|WORK\*3,MOVE\*2,CARRY\*2|1|


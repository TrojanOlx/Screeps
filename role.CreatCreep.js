module.exports = {
    run:function(input){
        var creepList = input.CreepList;
        var spawnName = input.SpawnName;
        var spawn = Game.spawns[spawnName];
        
        for(let creep of creepList){
            this.Create(creep,spawn);
        }
    },
    Create:function(creep,spawn){
        if(spawn.spawning){
            let spawningCreep = Game.creeps[spawn.spawning.name];
            spawn.room.visual.text(
               '🌋'+spawningCreep.memory.role,
               spawn.pos.x+1,
               spawn.pos.y,
               {align:'left',opacity:0.8}
            );
        }else{
            let creepName=creep.Name + Game.time;
            spawn.spawnCreep(creep.Action,creepName,{memory:{role:creep.Memory}})
        }
    }
}
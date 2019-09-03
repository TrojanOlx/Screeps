var creepCollect = require('creep.Collect');

module.exports = {
    run:function(){
        for (var creep of Game.creeps) {
            switch(creep.memory.role){
                case 'collect': // 开采
                CollectRole(creep);
                break;
                case 'harvester': // 填充

                break;
                case 'builder': // 建筑

                break;
                case 'upgrader': // 升级

                break;
            }
            
        }
    }
}

// 分配挖矿
function CollectRole(creep){
    if(!creep.memory.in){
        sourceId = SelectSource(roomName);

        if(sourceId){
            creep.memory.in = sourceId;
        }else{
            creep.say("全部都绑定了");
            return;
        }
    }
    
    if(!creep.memory.out){
        // 指定缓存
        creep.memory.out = InitContainer;
    }

    var data = {
        'creep':creep,
    }

    creepCollect.run(data);
}

function SelectSource(roomName){
    var source = undefined;
    
    // 获取所有的 CollectCreep
    let creeps = Game.creeps;
    let creepsMemoryIn = [];
    for (const name in creeps){
        var creep =  creeps[name];
        if(creep.memory.role == 'collect' && creep.memory.in){
            creepsMemoryIn.push(creep.memory.in);
        }
    }
    // 矿源列表
    var sources = Game.rooms[roomName].find(FIND_SOURCES);
    for(let item of sources){
        if(creepsMemoryIn.indexOf(item.id)==-1){
            source = item;
            break;
        }
    }
    return source;
}

function InitContainer(spawnName){
    var spawn = Game.spawns[spawnName];
    var soure = Game.getObjectById(soure.memory.in);

    var recs = search(spawn,soure);

    var rec = recs.path[recs.path.length-1];

    var containerId=undefined;

    for (let item of creep.room.lookAt(rec.pos.x, rec.pos.y)) {
        // console.log('item',JSON.stringify(item));
        if (item.type == LOOK_CONSTRUCTION_SITES) {
            containerId = item.constructionSite.id;
            break;
        }

        if (item.type == LOOK_STRUCTURES && item.structure.structureType == STRUCTURE_CONTAINER) {
            containerId = item.structure.id; // '5d69398242c42a63a046b5e7';
            break;
        }
    }

    if(containerId == undefined){
        spawn.room.createConstructionSite(rec.pos.x, rec.pos.y, STRUCTURE_CONTAINER);
    }

    return containerId;

}


// 分配搬运
function HarvesterRole(creep){
    if(!creep.memory.in){
        // 查找缓存点
        let containerId = SelectContainer(roomName);
        if(!containerId){
            creep.memory.in = containerId;
        }
        else{
            creep.say('没有找到缓存点');
        }
    }

    var data = {
        'creep':creep,

    }
}

function SelectContainer(roomName){

    // 获取所有的 CollectCreep
    let creeps = Game.creeps;
    let creepsMemoryIn = [];
    for (const name in creeps){
        var creep =  creeps[name];
        if(creep.memory.role == 'harvester' && creep.memory.in){
            creepsMemoryIn.push(creep.memory.in);
        }
    }

    // 存储列表
    var containers = Game.rooms[roomName].find(FIND_STRUCTURES, {
        filter: (structure) => {
            return structure.structureType == STRUCTURE_CONTAINER;
        }
    });


    var container = undefined;
    for(let item of containers){
        if(creepsMemoryIn.indexOf(item.id)==-1){
            container = item;
            break;
        }
    }

    return container;
}






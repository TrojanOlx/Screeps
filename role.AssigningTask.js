module.exports = {
    run:function(){
        for (var creep of Game.creeps) {
            switch(creep.memory.role){
                case 'collect': // 开采
                    MineRole(creep);
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

function MineRole(creep){
    if(!creep.memory.in){
        creep.memory.in = '矿源ID';
    }

    if(!creep.memory.out){
        creep.memory.out = '旁边的缓存罐';
    }
}
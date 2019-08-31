var creepCollect = {
    /**@param {mineData} {creep,source,targets}*/
    run: function (input) {
        console.log(JSON.stringify(input));
        // 虫子
        let creep = input.creep;
        // 回调函数
        let func = input.func;
        // 矿点
        let source = Game.getObjectById(input.memory.in);
        // 输出点
        let container = Game.getObjectById(input.memory.out);

        // 工作
        // 先走到矿点
        if (creep.harvest(source) != ERR_NOT_IN_RANGE) {
            if (creep.carry.energy < creep.carryCapacity) {
                // 挖矿  
                creep.say('💣 in source');
            } else {

                // 存到中转站
                if (container) {
                    // 有中转站就存能量
                    if (creep.transfer(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(container, { visualizePathStyle: { stroke: '#ffffff' } });
                        creep.say('💉 in container');
                    }else{
                        creep.say('⏸');
                    }
                } else {
                    // 没中转站就新建一个中转站
                    if (creep.memory.sites) {
                        // 正在建造的话输入能量 transfer
                        let construction_site = Game.getObjectById(creep.memory.sites);
                        if (construction_site != undefined) {
                            if (creep.build(construction_site) == ERR_NOT_IN_RANGE) {
                                creep.moveTo(construction_site, { visualizePathStyle: { stroke: '#ffffff' } });
                                creep.say('🚧 build');
                            }
                        }
                    } else {
                        // 新建一个(脚底下)
                        creep.room.createConstructionSite(creep.pos.x, creep.pos.y, STRUCTURE_CONTAINER);
                        for (let item of creep.room.lookAt(creep.pos.x, creep.pos.y)) {
                            if (item.type == LOOK_CONSTRUCTION_SITES) {
                                creep.memory.sites = item.constructionSite.id;
                                break;
                            }

                            if (item.type == LOOK_STRUCTURES && item.structure.structureType == STRUCTURE_CONTAINER) {
                                creep.memory.out = item.structure.id; // '5d69398242c42a63a046b5e7';
                                creep.memory.sites = undefined;
                            }
                        }
                    }

                }
            }
        } else {
            creep.moveTo(source, { visualizePathStyle: { stroke: '#ffaa00' } });
            creep.say('💣 in source');
        }
    }
}
module.exports = creepCollect;
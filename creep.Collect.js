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
        // 判断是有能量
        if (creep.carry.energy < creep.carryCapacity) {
            if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source, { visualizePathStyle: { stroke: '#ffaa00' } });
                creep.say('💣 in source');
            }else{
                creep.say('💣');
            }
        }else{
            // 判断类型
            if(container.type == LOOK_CONSTRUCTION_SITES){
                // 如果是未建造完的，继续建造
                if (creep.build(construction_site) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(construction_site, { visualizePathStyle: { stroke: '#ffffff' } });
                    creep.say('🚧 build');
                }else{
                    creep.say('🚧');
                }
            }else{
                // 往里面填充能量
                if (creep.transfer(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(container, { visualizePathStyle: { stroke: '#ffffff' } });
                    creep.say('💉 in container');
                }else{
                    creep.say('💉');
                }
            }
        }
    }
}
module.exports = creepCollect;
var creepHarvester = {
    run: function (input) {
        console.log(JSON.stringify(input));
        // 虫子
        let creep = input.creep;
        // 回调函数
        let func = input.func;
        // 输入点
        let container = Game.getObjectById(input.memory.in);
        // 输出点
        let target = Game.getObjectById(input.memory.out);

        // 提取能量
        if (creep.energy < creep.energyCapacity) {
            if (container != undefined) {
                if (creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(container, { visualizePathStyle: { stroke: '#ffaa00' } });
                    creep.say('🏍');
                }else{
                    creep.say('⛽');
                }
            } else {
                creep.say('⏸');
                input.memory.in = undefined;
            }
        }else{
            if (target != undefined) {
                if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, { visualizePathStyle: { stroke: '#ffffff' } });
                    creep.say('🛴 Spawn');
                }
            } else {
                creep.say('⏸');
                input.memory.out = undefined;
            }
        }
    }
};


module.exports = creepHarvester;


var creepUpgrader = {
    run: function(upgraderData) {

        console.log(JSON.stringify(input));
        // 虫子
        let creep = input.creep;
        // 回调函数
        let func = input.func;
        // 矿点
        let source = Game.getObjectById(input.memory.in);
        // 输出点
        let controller = Game.getObjectById(input.memory.out);


        // 如果状态是工作，并且能量为0
        if (creep.memory.status && creep.carry.energy == 0) {
            creep.memory.status = false;
            creep.say('▶ 提取能量');
        }

        if (!creep.memory.status && creep.carry.energy == creep.carryCapacity) {
            creep.memory.status = true;
            creep.say('🛠 工作');
        }

        if(creep.memory.status){
            if(controller!=undefined) {
                if(creep.upgradeController(controller) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(controller, {visualizePathStyle: {stroke: '#ffffff'}});
                    creep.say('🚄 Controller');
                }
            }
            else {
                creep.say('⏹');
                input.memory.out = undefined;
            }
        }else{
            if (container != undefined) {
                if (creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(container, { visualizePathStyle: { stroke: '#ffaa00' } });
                    creep.say('🏍');
                }
            }else{
                creep.say('⏸ 没有能量');
                input.memory.in = undefined;
            }
        }
	}
};

module.exports = creepUpgrader;
module.exports = {
    run:function(){
        for (var creep of Game.creeps) {
            
        }
    }
}

// 获取控制器到矿源的路线

function search(origin, bourns) {
    // 获取 creep
    let creep = Game.creeps.John;

    // We can't actually walk on sources-- set `range` to 1 
    // so we path next to it.

    let goals = _.map(bourns, function (source) {
        return { pos: source.pos, range: 1 };
    });

    console.log('goals',goals);

    // 坐标以及目的地
    // 目标或一系列目标。如果提供了多个目标，则将返回从所有目标中找到的最便宜的路径。目标是RoomPosition或下面定义的对象。
    let ret = PathFinder.search(
        origin.pos, goals,
        {
            // We need to set the defaults costs higher so that we
            // can set the road cost lower in `roomCallback`
            plainCost: 2,
            swampCost: 10,
            roomCallback: function (roomName) {
                // 获取所在房间
                let room = Game.rooms[roomName];
                // In this example `room` will always exist, but since 
                // PathFinder supports searches which span multiple rooms 
                // you should be careful!
                if (!room) return;
                let costs = new PathFinder.CostMatrix;

                room.find(FIND_STRUCTURES).forEach(function (struct) {
                    if (struct.structureType === STRUCTURE_ROAD) {
                        // Favor roads over plain tiles
                        costs.set(struct.pos.x, struct.pos.y, 1);
                    } else if (struct.structureType !== STRUCTURE_CONTAINER &&
                        (struct.structureType !== STRUCTURE_RAMPART ||
                            !struct.my)) {
                        // Can't walk through non-walkable buildings
                        costs.set(struct.pos.x, struct.pos.y, 0xff);
                    }
                });

                // Avoid creeps in the room
                room.find(FIND_CREEPS).forEach(function (creep) {
                    costs.set(creep.pos.x, creep.pos.y, 0xff);
                });

                return costs;
            },
        }
    );
    
    console.log('ret',ret);
    // let pos = ret.path[0];
    // creep.move(creep.pos.getDirectionTo(pos));

}
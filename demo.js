let creep = Game.creeps.John;

let goals = _.map(creep.room.find(FIND_SOURCES), function (source) {
    //我们实际上不能在资源上行走——将“range”设置为1
    //我们沿着它走。
    return { pos: source.pos, range: 1 };
});

let ret = PathFinder.search(
    creep.pos, goals,
    {
        //我们需要将违约成本设置得更高，以便我们
        //可以在“roomCallback”中降低道路成本
        plainCost: 2,
        swampCost: 10,

        roomCallback: function (roomName) {

            let room = Game.rooms[roomName];
            //在这个例子中，“room”将永远存在，但是自从
            // PathFinder支持跨多个房间的搜索
            //你应该小心!
            if (!room) return;
            let costs = new PathFinder.CostMatrix;

            room.find(FIND_STRUCTURES).forEach(function (struct) {
                if (struct.structureType === STRUCTURE_ROAD) {
                    //比起平铺的瓷砖，更喜欢铺路
                    costs.set(struct.pos.x, struct.pos.y, 1);
                } else if (struct.structureType !== STRUCTURE_CONTAINER &&
                    (struct.structureType !== STRUCTURE_RAMPART ||
                        !struct.my)) {
                    //不能穿过不能步行的建筑物
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

let pos = ret.path[0];
creep.move(creep.pos.getDirectionTo(pos));
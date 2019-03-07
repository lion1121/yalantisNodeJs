const users = [
    {id: 1, name: 'Bob'},
    {id: 2, name: 'Joe'},
    {id: 3, name: 'Don', groupId: 1},
    {id: 4, name: 'Kally'},
    {name: 'Alex'},
    {name: 'John'},
];

const groups = [
    {id: 1, title: 'First Group'},
    {id: 2, title: 'Last Group'},
];

function delay(time) {
    return new Promise(function (resolve, reject) {
        setTimeout(resolve, time);
    });
}

const addUser = function (user) {
    return new Promise(function (resolve, reject) {
        resolve(Math.floor(Math.random() * 100))
    });
};

const addGroup = function (group, user) {
    return new Promise(function (resolve, reject) {
        resolve(group.id)
    });
};


const addSelectedGroupToUsers = function (users, group) {
    return new Promise(function (resolve, reject) {
        let loopUsers = async function () {
            try {
                for (let i = 0; i < users.length; i++) {

                    if (!users[i].hasOwnProperty('id')) {
                        await delay(1000);
                        addUser(users[i]).then((res) => users[i].id = res);
                    } else if(!users[i].hasOwnProperty('groupId')){
                        await delay(500);
                        addGroup(group, users[i]).then((res) => users[i].groupId = res);
                    } else {
                        continue;
                    }
                }
                resolve(users);
            } catch (e) {
                console.log(`addSelectedGroupToUsers Error: ${e}`);
                reject(e);
            }
        };
        loopUsers();

    });

};


// const addSelectedGroupToUsers = function (users, group) {
//     return new Promise(function (resolve, reject) {
//
//         let db = users;
//
//         for (let user of db) {
//
//             // if(!user.hasOwnProperty('id')){
//             //     delay(1000).then();
//             // }
//             //
//             // if(!user.hasOwnProperty('groupId')){
//             //     delay(200).then(addGroup(group, user).then((res) => user.groupId = res));
//             // }
//
//             if(!user.hasOwnProperty('id')){
//                 delay(1000).then().then(addUser(user).then((res) => user.id = res));
//             }
//
//             if(!user.hasOwnProperty('groupId')){
//                 delay(200).then(addGroup(group, user).then((res) => user.groupId = res));
//             }
//
//         }
//
//         resolve(db)
//     });
//
// };

addSelectedGroupToUsers(users, groups[1]).then((res) => console.log(res));
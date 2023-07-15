route.post('/meals', async (req, res, next) => {
    try {
        let meal = [];
        let date = req.query.date;
        // for (l = 0; l < 10; l++) {
        for (i = 1, j = 0; i <= 100000; i++) {
            let newMeal = {
            }
            //return Math.floor(Math.random() * (max - min + 1) + min);
            newMeal.breakfast = Math.floor(Math.random() * (2 - 0 + 1) + 0);
            newMeal.lunch = Math.floor(Math.random() * (2 - 0 + 1) + 0);
            newMeal.dinner = Math.floor(Math.random() * (3 - 0 + 1) + 0);
            newMeal.groupId = `G0000000000${j}P`;
            newMeal.userName = "new user";
            newMeal.userId = `USER0000${i}ID`
            newMeal.date = date;
            newMeal.total = newMeal.breakfast + newMeal.lunch + newMeal.dinner;
            meal.push(newMeal);
            if (i % 6 == 0) {
                j += 1;
            }
        }
        // console.log(`${date} data insert done`);
        // date = moment(date).add(1, "days").format("YYYY-MM-DD");
        // }
        let value = await Meals.insertMany(meal);

        if (value) {
            return res.json({
                success: true
            })
        }
    } catch (err) {
        console.log(err);
        res.json({
            msg: err.message,
            success: false,
            body: err.stack
        })
    }
})

route.post('/meals/set', async (req, res, next) => {
    try {
        let date = "2022-01-01";
        let users = [];
        let { imax, j, i } = req.body;
        // for (l = 0; l < 10; l++) {
        for (; i <= imax; i++) {

            let meals = [];
            let totalMeal = 0;
            let user = {};
            for (k = 0; k < 31; k++) {
                let newMeal = {
                }
                newMeal.date = date;
                newMeal.breakfast = Math.floor(Math.random() * (2 - 0 + 1) + 0);
                newMeal.lunch = Math.floor(Math.random() * (2 - 0 + 1) + 0);
                newMeal.dinner = Math.floor(Math.random() * (3 - 0 + 1) + 0);
                totalMeal = totalMeal + (newMeal.breakfast + newMeal.lunch + newMeal.dinner);
                date = moment(date).add(1, "days").format("YYYY-MM-DD");
                meals.push(newMeal);
            }
            user.meals = meals;
            user.groupId = `G0000000000${j}P`;
            user.userName = "new user";
            user.userId = `USER0000${i}ID`
            user.month = moment(date).format("YYYY-MM");
            user.total = totalMeal;
            // Meal.insertMany([user], (err) => {

            // })
            date = "2022-01-01";

            users.push(user);
            if (i % 6 == 0) {
                j += 1;
            }
            if (i == 5000 || i == 10000 || i == 15000 || i == 70000 || i == 95000) {
                console.log(i);
            }
        }


        let value = await Meal.insertMany(users);


        return res.json({
            i: i,
            j: j,
            success: true
        })

    } catch (err) {
        console.log(err);
        res.json({
            msg: err.message,
            success: false,
            body: err.stack
        })
    }
})

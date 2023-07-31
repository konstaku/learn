export class Person {
    constructor(name) {
        this.name = name;
        this.friends = [];
        this.visited = false;
    }

    addFriend(friend) {
        this.friends.push(friend);
    }

    displayNetwork() {
        const toReset = [this];
        const queue = [this];
        this.visited = true;

        while (queue.length) {
            const currentVertex = queue.shift();
            console.log(currentVertex.name);

            for (const friend of currentVertex.friends) {
                if (!friend.visited) {
                    toReset.push(friend);
                    queue.push(friend);
                    friend.visited = true;
                }
            }
        }

        for (const person of toReset) {
            person.visited = false;
        }
    }
}

export class City {
    constructor(name) {
        this.name = name;
        this.routes = new Map();
    }

    addRoute(city, price) {
        this.routes.set(city, price);
    }

    dijkstra(startingCity, otherCities) {
        const routesFromCity = new Map();

        // Initiate an object with lowest proces for each city (for cities other then start city defailts to infinity)
        routesFromCity.set(startingCity, [0, startingCity]);
        otherCities.forEach(city => routesFromCity.set(city, [Infinity, null]));

        const visitedCities = [];
        let currentCity = startingCity;

        while (currentCity) {
            visitedCities.push(currentCity);

            currentCity.routes.forEach((priceInfo, city) => {
                if (routesFromCity.get(city)[0] > priceInfo + routesFromCity.get(currentCity)[0]) {
                    routesFromCity.set(city, [priceInfo + routesFromCity.get(currentCity)[0], currentCity]);
                }
            });

            currentCity = null;
            let cheapestRouteFromCurrentCity = Infinity;

            routesFromCity.forEach((priceInfo, city) => {
                if (priceInfo[0] < cheapestRouteFromCurrentCity && !visitedCities.includes(city)) {
                    cheapestRouteFromCurrentCity = priceInfo[0];
                    currentCity = city;
                }
            });
        }

        const result = [];
        routesFromCity.forEach((price, city) => result.push({ [city.name]: price[0] }));
        return result;
    }
}

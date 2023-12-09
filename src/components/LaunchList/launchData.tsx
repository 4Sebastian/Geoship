import axios from "axios";


export default async function getLaunchData(setLaunches: Function, setCoordinates: Function){
    axios.get('https://fdo.rocketlaunch.live/json/launches/next/5')
            .then(async function (response) {
                var rockets = []
                var coordinates: number[][] = [];
                var fixes: { index: number, location: string }[] = [];
                var remove: number[] = []
                console.log(response)
                for (let index = 0; index < response.data.count; index++) {
                    await new Promise(res => setTimeout(res, 1000)).then(() => {
                        var location = encodeURI(response.data.result[index].pad.name)
                        console.log(location)
                        axios.get(`https://geocode.maps.co/search?q={${location}}`)
                            .then(function (response2) {
                                console.log(response2)
                                if (response2.data && response2.data.length > 0) {
                                    coordinates[index] = [parseFloat(response2.data[0].lat), parseFloat(response2.data[0].lon)]
                                } else {
                                    fixes.push({ index: index, location: response.data.result[index].pad.location.name })
                                }

                            }).catch((err) => {
                                console.log(err)
                                fixes.push({ index: index, location: response.data.result[index].pad.location.name })
                            })
                    });
                    rockets[index] = response.data.result[index]
                }

                for (let index = 0; index < fixes.length; index++) {
                    await new Promise(res => setTimeout(res, 1000)).then(() => {
                        var location = encodeURI(fixes[index].location)
                        console.log(location)
                        axios.get(`https://geocode.maps.co/search?q={${location}}`)
                            .then(function (response2) {
                                console.log(response2)
                                if (response2.data && response2.data.length > 0) {
                                    coordinates[index] = [parseFloat(response2.data[0].lat), parseFloat(response2.data[0].lon)]
                                } else {
                                    console.log("Impossible")
                                }

                            }).catch((err) => {
                                console.log(err)
                                console.log("Impossible")
                                remove.push(index)
                            })
                    });
                }

                var final_coordinates: number[][] = [];
                var final_rockets = []
                for (let index = 0; index < coordinates.length; index++) {
                    if (!remove.includes(index)) {
                        final_coordinates.push(coordinates[index])
                        final_rockets.push(rockets[index])
                    }
                }

                setLaunches(final_rockets);
                setCoordinates(final_coordinates);
            })
            .catch(function (error) {
                console.log(error);
            })
}
export function renderEventsThisMonth() {
    axios
        .get("http://localhost:3000/api/events")
        .then((response) => {
            let events = response.data
            console.log(events)
            events = events.events

            

        })
}
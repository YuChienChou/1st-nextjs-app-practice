
export async function getAllEvents() {

    const response = await fetch('https://udemy-nextjs-prerender-default-rtdb.firebaseio.com/Events.json');

    const data = await response.json();

    const events = [];

    for(let key in data) {
        events.push({
            id: key,
            ...data[key]
        })
    }

    return events;
}

export async function getFeaturedEvents() {
    const allEvents = await getAllEvents();
    return allEvents.filter((event) => event.isFeatured);
}

export async function getEventById(id) {
    const allEvents = await getAllEvents();
    return allEvents.find((event) => event.id === id);
  }
import { useRouter } from "next/router";
import Head from 'next/head';

import { getAllEvents } from "../../components/helpers/api-util";
import EventList from '../../components/events/event-list';
import EventsSearch from "../../components/events/events-search";

function AllEventsPage(props) {
    const router = useRouter();
    const { events } = props;

    function findEventsHandler(year, month) {
        const fullpath = `/events/${year}/${month}`;
        router.push(fullpath);
    }

    return (
        <>
            <Head>
                <title>All Events</title>
                <meta name='description' content='Find a lot of great events that allow you to evolve'/>
            </Head>
            <EventsSearch onSearch={findEventsHandler}/>
            <EventList items={events} />
        </>
    )
}

export async function getStaticProps() {
    const allEvents = await getAllEvents();

    return {
        props: {
            events : allEvents
        },
        revalidate: 60
    }
}

export default AllEventsPage;
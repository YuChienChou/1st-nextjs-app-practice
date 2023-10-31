
import Head from 'next/head';

import { getFeaturedEvents } from "../components/helpers/api-util";
import EventList from "../components/events/event-list";

function HomePage(props) {
    // const featuredEvents = getFeaturedEvents();

    return (
        <>
        <div>
            <Head>
                <title>Next.js Events</title>
                <meta name='description' content='Find a lot of great events that allow you to evolve'/>
            </Head>
            <EventList items={props.events} />
        </div>
        </>
    )
}


export async function getStaticProps() {
   const featuredEvents = await getFeaturedEvents();

   return {
    props : {
        events: featuredEvents
    }, 
    revalidate: 18000
   }
}

export default HomePage;
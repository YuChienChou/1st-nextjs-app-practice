import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import Head from 'next/head';
import { getFilteredEvents } from '../../components/helpers/api-util';
import EventList from '../../components/events/event-list';
import ResultsTitle from '../../components/events/results-title';
import Button from '../../components/ui/button';
import ErrorAlert from '../../components/ui/error-alert';

function FilteredEventsPage(props) {

    const [loadedEvents, setLoadedEvents] = useState();
    const router = useRouter();

    //the below code is required for client side data fetching

    const filteredData = router.query.slug;
    console.log('filteredData in slug page: ', filteredData);

    const { data, error } = useSWR('https://udemy-nextjs-prerender-default-rtdb.firebaseio.com/Events.json', (url) => fetch(url).then(res => res.json())); //don't forget to asign the 2nd parameter in useSWR function.

    console.log('data in slug page: ', data);

    useEffect(() => {

        console.log('useEffect is running in slug...')
        if(data) {
            const events = [];

            for(let key in data) {
                events.push({
                    id: key,
                    ...data[key]
                })
            }

            setLoadedEvents(events);
            console.log('loadedEvents in the useEffect: ', loadedEvents);
        }
    }, [data]);

    console.log("loadedEvents in slug page: ", loadedEvents);


    if(!loadedEvents) {
            return (
                <p className='center'>Loading...</p>
            )
    }
    
    const filteredYear = filteredData[0];
    const filteredMonth = filteredData[1];
    
    const numYear = +filteredYear;
    const numMonth = +filteredMonth;

    if(
        isNaN(numYear) ||
        isNaN(numMonth) ||
        numYear > 2030 ||
        numYear < 2021 ||
        numMonth < 1 ||
        numMonth > 12 ||
        error
    ) {
        return (
            <>
            <ErrorAlert><p>Invalid filter. Please adjust your values!</p></ErrorAlert>
            <div className='center'>
                <Button link='/events'>Show All Events</Button>
            </div>
            </>
            
        )
    }

    let filteredEvents = loadedEvents.filter((event) => {
        const eventDate = new Date(event.date);
        return (
            eventDate.getFullYear() === numYear && eventDate.getMonth() === numMonth - 1
        );
    });


    
    //the above code is required for client side data fetching



    // const filteredEvents = props.events;
    
    if(!filteredEvents || filteredEvents.length === 0) {
        return (
            <>
            <ErrorAlert><p>No events found for the chosen filter!</p></ErrorAlert>
            <div className='center'>
                <Button link='/events'>Show All Events</Button>
            </div>
            </>
        )
    }

    const date = new Date(numYear, numMonth - 1);

    return (
        <>
        <Head>
            <title>Filtered Events</title>
            <meta name='description' content={`All events for ${numMonth}/${numYear}`}/>
        </Head>
        <ResultsTitle date={date} />
        <EventList items={filteredEvents} />
        </>
    )
}

// export async function getServerSideProps(context) {

//     const { params } = context;
//     // console.log('params in slug page: ', params);

//     const filterData = params.slug;
//     // console.log('filterData in slug page: ', filterData);

//     const filteredYear = filterData[0];
//     const filteredMonth = filterData[1];
    
//     const numYear = +filteredYear;
//     const numMonth = +filteredMonth;

//     if(
//         isNaN(numYear) ||
//         isNaN(numMonth) ||
//         numYear > 2030 ||
//         numYear < 2021 ||
//         numMonth < 1 ||
//         numMonth > 12
//     ) {
//         return {
//             props: {
//                 hasError: true
//             }
//             // notFound: true,  //this will show 404 page
//             // redirect: {
//             //     destination: '/error'
//             // }
//         }
//     }

//     const filteredEvents = await getFilteredEvents({
//         year: numYear,
//         month: numMonth,
//     });

//     return {
//         props: {
//             events: filteredEvents,
//             date: {
//                 year: numYear,
//                 month: numMonth,
//             }
//         }
//     }

// }


export default FilteredEventsPage;
import Link from "next/link";

function EventItem(props) {
    console.log('props in event-item component: ', props);
    const { title, image, date, location, id} = props;

    const humanReadableDate = new Date(date).toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });

    const formattedAddress = location.replace(', ', '\n');
    const explorLink = `/events/${id}`;

    return (
        <>
        <li>
            <img src={'/' + image} alt={title} />
        </li>
        <div>
            <div>
                <h2>{title}</h2>
                <div>
                    <time>{humanReadableDate}</time>
                </div>
                <div>
                    <address>{formattedAddress}</address>
                </div>
            </div>
            <div>
                <Link href={explorLink}>Explor Event</Link>
            </div>
        </div>
        </>
    )
}

export default EventItem;
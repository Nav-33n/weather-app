import React from "react";

export default function Time(props) {
    const [currentTime, setCurrentTime] = React.useState('');
    const [currentDate, setCurrentDate] = React.useState('');

    React.useEffect(() => {
        const timer = () => {
            const date = new Date();
            const options = {timeZone: props.timezone};
            const formatDate = {year: "numeric", month: "long", day: "numeric", timeZone: props.timezone};
            const time = date.toLocaleTimeString([], options);
            const cDate = date.toLocaleDateString([], formatDate);

            setCurrentDate(cDate);
            setCurrentTime(time);
        }

        timer();

        const interval = setInterval(timer, 1000);

        return () => {
            clearInterval(interval)
        }
    }, [props.timezone])


    return(
        <div className="time">
            <p>{currentDate} <span>|</span> {currentTime}</p>
        </div>
    )
}
import { useEffect, useState } from 'react';
import { FaMagic } from 'react-icons/fa';

import { formatRelativeDate } from '../utils/date';

const getNearestNoon = () => {
    const nowUtc = new Date();

    nowUtc.setUTCHours(12, 0, 0, 0);

    if (nowUtc.getTime() < Date.now()) {
        return new Date(nowUtc.getTime() + 24 * 60 * 60 * 1000);
    }

    return nowUtc;
};

// calculate the time left till the next day 12:00 AM UTC + 2
export const PredictNext = () => {
    const [nextTime, setNextTime] = useState<Date>();

    useEffect(() => {
        const index = setInterval(() => {
            const todayOrTomorrowAtTwelve = getNearestNoon();

            setNextTime(todayOrTomorrowAtTwelve);
        }, 1000);

        return () => clearInterval(index);
    });

    if (!nextTime) return <div>Loading...</div>;

    const timeLeft = formatRelativeDate(nextTime);

    return (
        <div className="text-neutral-400 flex items-center gap-2">
            next batch {timeLeft} <FaMagic className="text-xs" />
        </div>
    );
};

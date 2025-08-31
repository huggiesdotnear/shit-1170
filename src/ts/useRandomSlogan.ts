import { useState, useEffect } from 'preact/hooks';
import { HUGGIES_SLOGANS } from './slogans';

export const useRandomSlogan = () => {
    const [slogan, setSlogan] = useState<string>('');

    useEffect(() => {
        const randomIndex = Math.floor(Math.random() * HUGGIES_SLOGANS.length);
        setSlogan(HUGGIES_SLOGANS[randomIndex]);
    }, []);

    const getNewSlogan = () => {
        const randomIndex = Math.floor(Math.random() * HUGGIES_SLOGANS.length);
        setSlogan(HUGGIES_SLOGANS[randomIndex]);
    };

    return { slogan, getNewSlogan };
};
import {useCallback, useEffect, useMemo, useState} from "react";
import styles from './app.module.scss';
import styled from 'styled-components';

const StyledDiv = styled.div`
    color: ${props => props.color};
    font-family: ${props => props.fontFamily};
    font-size: ${props => props.fontSize};
    text-align: ${props => props.textAlign};
    width: ${props => props.width};
    height: ${props => props.height};
    --container-height: ${props => props.height};
`;

export function App() {
    const [settings, setSettings] = useState(() => {
        const queryParams = new URLSearchParams(window.location.search);
        return {
            locale: queryParams.get('locale') || 'en-US',
            color: queryParams.get('color') || 'white',
            width: queryParams.get('width') || '256px',
            height: queryParams.get('height') || '50px',
            fontFamily: queryParams.get('font-family') || 'Nunito',
            fontSize: queryParams.get('font-size') || '16px',
            textAlign: queryParams.get('text-align') || 'center',
        };
    });

    const [currentDateTime, setCurrentDateTime] = useState({});

    const updateDateTime = useCallback(() => {
        const now = new Date();
        setCurrentDateTime({
            date: now.toLocaleDateString(settings.locale),
            time: now.toLocaleTimeString(settings.locale)
        });
    }, [settings.locale]);

    useEffect(() => {
        updateDateTime();

        const intervalId = setInterval(updateDateTime, 1000);
        return () => clearInterval(intervalId);
    }, [updateDateTime]);

    const styledDivProps = useMemo(() => ({
        color: settings.color,
        fontFamily: settings.fontFamily,
        fontSize: settings.fontSize,
        textAlign: settings.textAlign,
        width: settings.width,
        height: settings.height
    }), [settings]);

    return (
        <main className={styles.main}>
            <div className={styles.content}>
                <StyledDiv
                    className={styles.content__container}
                    {...styledDivProps}
                >
                    <ul className={styles.content__container__list}>
                        <li className={styles.content__container__list__item}>
                            {currentDateTime.time}
                        </li>
                        <li className={styles.content__container__list__item}>
                            {currentDateTime.date}r.
                        </li>
                    </ul>
                </StyledDiv>
            </div>
        </main>
    );
}

export default App;
